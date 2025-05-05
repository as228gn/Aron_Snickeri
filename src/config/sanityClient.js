import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'ofwef1ge',
  dataset: 'aron',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

export { client, urlFor }