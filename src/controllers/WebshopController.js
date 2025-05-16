/**
 * @file Defines the WebshopController class.
 * @module WebshopController
 * @author Anna Ståhlberg
 */

/**
 * Encapsulates the Webshopcontroller.
 */
export class WebshopController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getWebshop(req, res, next) {
    const query = `
    {
  products(first: 10) {
    edges {
      node {
        title
        description
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
              }
            }
          }
        }
      }
    }
  }
}
    `
    const response = await fetch('https://xinwyp-x3.myshopify.com/api/2023-04/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN
      },
      body: JSON.stringify({ query })
    })
    const json = await response.json()
    const products = json.data.products.edges

    const viewData = products.map(edge => {
      const product = edge.node
      const variant = product.variants.edges[0]?.node
      const image = product.images.edges[0]?.node
    
      return {
        title: product.title,
        imageUrl: image?.url || null,
        description: product.description,
        price: variant?.priceV2.amount || null,
        variantId: variant?.id || null
      }
    })
    res.render('webshop/shop', {viewData, checkoutUrl: req.session.checkoutUrl || null})
  }

  async addToCart(req, res, next) {
    const variantId = req.body.variantId

    if (!req.session.cartId) {
    const query = 
    `mutation {
            cartCreate(input: {
              lines: [
                {
                  merchandiseId: "${variantId}",
                  quantity: 1
                }
              ]
            }) {
              cart {
                id
                checkoutUrl
              }
            }
          }
        `

    const response = await fetch('https://xinwyp-x3.myshopify.com/api/2023-04/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
      },
      body: JSON.stringify({query}),
    })

    const cartInfo = await response.json()

    req.session.cartId = cartInfo.data.cartCreate.cart.id
    console.log(req.session.cartId)
    req.session.checkoutUrl = cartInfo.data.cartCreate.cart.checkoutUrl
  } else {
    const query = 
    `
    mutation {
      cartLinesAdd(
        cartId: "${req.session.cartId}",
        lines: [
          {
            merchandiseId: "${variantId}",
            quantity: 1
          }
        ]
      ) {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const response = await fetch('https://xinwyp-x3.myshopify.com/api/2023-04/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()
  }
    res.redirect('./shop')
  }

  async updateCart(req, res, next) {
    if(req.body.action == 'decrease') {
      console.log('decrease')
      console.log(req.body)
      res.redirect('./')
    } else {
      console.log('increase')
      console.log(req.body)
      res.redirect('./')
    }
  }

  async goToCart(req, res, next) {

    if(!req.session.cartId){
res.render('webshop/emptyCart')
    } else {
    
    const query = `
    query {
  cart(id: "${req.session.cartId}") {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
              }
              product {
                title
              }
            }
          }
        }
      }
    }
  }
}
`
const response = await fetch('https://xinwyp-x3.myshopify.com/api/2023-04/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN,
  },
  body: JSON.stringify({ query }),
})

const json = await response.json()
    const products = json.data.cart

    const viewData = products.lines.edges.map(edge => {
      const item = edge.node
      const variant = item.merchandise
    
      return {
        title: `${variant.product.title}${variant.title !== 'Default Title' ? ' - ' + variant.title : ''}`,
        price: `${variant.price.amount} ${variant.price.currencyCode}`,
        quantity: item.quantity,
        imageUrl: variant.image?.url || '',
        variantId: variant.id
      }
    })
    console.log(viewData)
    res.render('webshop/cart', {viewData, checkoutUrl: products.checkoutUrl})
  }
  }

}