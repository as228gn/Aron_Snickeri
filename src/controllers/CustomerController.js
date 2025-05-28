/**
 * @file Defines the CustomerController class.
 * @module CustomerController
 * @author Anna Ståhlberg
 */

import { client, urlFor } from '../config/sanityClient.js'

/**
 * Encapsulates the Companycontroller.
 */
export class CustomerController {
  /**
   * Fetches and formats carpentry data from the sanity-api, then renders the carpentry page with the formatted data.
   *
   * @param {object} req - The request object, representing the HTTP request.
   * @param {object} res - The response object, used to send a response to the client.
   * @param {Function} next - The next middleware function to be called.
   */
  async getCarpentry(req, res, next) {
    try {
      const carpentry = await client.fetch('*[_type == "carpentry"]')
      const viewData = carpentry.map(item => ({
        description: item.description,
        imageUrl: urlFor(item.image).url()
      }))
      res.render('customer/carpentry', { viewData })
    } catch (error) {
      console.error("Error fetching carpentry data:", error)
      next(error)
    }
  }

  /**
   * Fetches and formats kitchen-related data from the sanity-api, including text and gallery images and renders the kitchen page with the formatted data.
   * 
   * @param {bject} req - The request object, representing the HTTP request.
   * @param {object} res - The response object, used to send a response to the client.
   * @param {Function} next - The next middleware function to be called.
   * @throws {Error} If there is an issue fetching or processing the kitchen data.
   */
  async getKitchen(req, res, next) {
    let kitchenInfo
    const kitchenGallery = []

    try {
      const kitchenText = await client.fetch('*[_type == "kitchenText"]')
      const kitchenImage = await client.fetch('*[_type == "kitchenGallery"]')

      kitchenText.map(item => {
        kitchenInfo = item.description;
      })

      kitchenImage.forEach(item => {
        const kitchenObject = {
          description: item.description,
          imageUrl: urlFor(item.image).url()
        }
        kitchenGallery.push(kitchenObject)
      })
      
      const viewData = {
        kitchenInfo,
        kitchenGallery
      }
      res.render('customer/kitchen', { viewData })

    } catch (error) {
      console.error('Error fetching kitchen data:', error)
      next(error)
    }
  }
}