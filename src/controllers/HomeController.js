/**
 * @file Defines the HomeController class.
 * @module HomeController
 * @author Anna Ståhlberg
 */

import { client, urlFor } from '../config/sanityClient.js'
import nodemailer from 'nodemailer'

/**
 * Encapsulates the Homecontroller.
 */
export class HomeController {
  /**
  * Retrieves the latest news and start page information from the sanity-api, processes the data, and renders the home page with the retrieved content.
  * 
  * @param {object} req - The request object, containing the HTTP request information.
  * @param {object} res - The response object, used to send the HTTP response back to the client.
  * @param {Function} next - The next middleware function in the stack.
  * @throws {Error} - If an error occurs during the fetching of data, it will be passed to the next middleware.
  */
  async index(req, res, next) {

    let startInfo
    const newsInfo = []

    try {
      const news = await client.fetch('*[_type == "news"]  | order(publishedAt desc)[0...4]')
      const start = await client.fetch('*[_type == "start"]')

      start.map(item => {
        startInfo = item.description;
      })
  
      news.forEach(item => {
        const newsObject = {
          description: item.description,
          imageUrl: urlFor(item.image).url()
        }
        newsInfo.push(newsObject)
      })

      const viewData = {
        startInfo,
        newsInfo
      }
      res.render('home/index', { viewData })
  
    } catch (error) {
      next(error)
    }
  }

  /**
   * Fetches all news articles from the sanity-api and renders the news page with the retrieved content.
   * 
   * @param {bject} req - The request object, containing the HTTP request information.
   * @param {object} res - The response object, used to send the HTTP response back to the client.
   * @param {Function} next - The next middleware function in the stack.
   * @throws {Error} - If an error occurs during the fetching of data, it will be passed to the next middleware.
   */
  async getNewsPage(req, res, next) {
    try {
      const news = await client.fetch('*[_type == "news"]')
  
      const viewData = news.map(item => ({
        description: item.description,
        imageUrl: urlFor(item.image).url()
      }))

      res.render('home/news', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Renders the contact page.
   * 
   * @param {object} req - The request object, containing the HTTP request information.
   * @param {object} res - The response object, used to send the HTTP response back to the client.
   * @param {Function} next - The next middleware function in the stack.
   */
  getContact(req, res, next) {
    res.render('home/contact')
  }

  async postContact(req, res, next) {
    console.log(req.body.name)
    console.log(req.body.telephone)
    console.log(req.body.email)
    console.log(req.body.question)
    res.render('home/postForm')
  }
}
