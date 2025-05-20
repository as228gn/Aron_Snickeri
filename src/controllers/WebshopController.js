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
   * Hämtar produktdata från Shopify Storefront API och renderar webbutikens vy.
   *
   * @param {import('express').Request} req - Express request-objekt.
   * @param {import('express').Response} res - Express response-objekt.
   * @param {import('express').NextFunction} next - Express next-funktion för felhantering.
   * 
   */
  async getWebshop(req, res, next) {
    try {
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
      res.render('webshop/shop', { viewData })
    } catch (error) {
      console.error('Error in getWebshop:', error)
      next(error)
    }
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
                totalQuantity
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
        body: JSON.stringify({ query }),
      })

      const cartInfo = await response.json()

      req.session.cartId = cartInfo.data.cartCreate.cart.id
      req.session.checkoutUrl = cartInfo.data.cartCreate.cart.checkoutUrl
      req.session.totalQuantity = cartInfo.data.cartCreate.cart.totalQuantity
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
          totalQuantity
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

      const cartInfo = await response.json()
      req.session.totalQuantity = cartInfo.data.cartLinesAdd.cart.totalQuantity
    }
    res.redirect('./shop')
  }

  async updateCart(req, res, next) {
    const variantId = req.body.variantId
    const lineId = req.body.lineId
    if (req.body.action == 'decrease') {
      const currentQuantity = parseInt(req.body.quantity)
      const newQuantity = currentQuantity - 1
      const query =
        `mutation {
  cartLinesUpdate(
    cartId: "${req.session.cartId}",
    lines: [
      {
        id: "${lineId}",
        quantity: ${newQuantity}
      }
    ]
  ) {
    cart {
      id
      totalQuantity
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
              }
            }
          }
        }
      }
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
      req.session.totalQuantity = data.data.cartLinesUpdate.cart.totalQuantity
      res.redirect('./')
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
            totalQuantity
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
      req.session.totalQuantity = data.data.cartLinesAdd.cart.totalQuantity
      res.redirect('./')
    }

  }

  async goToCart(req, res, next) {

    if (!req.session.cartId) {
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
          id
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
          lineId: item.id,
          variantId: variant.id
        }
      })
      res.render('webshop/cart', { viewData })
    }
  }

  goToCheckout(req, res, next) {
    const checkoutUrl = req.session.checkoutUrl
    req.session.destroy()
    res.redirect(checkoutUrl)
  }

}