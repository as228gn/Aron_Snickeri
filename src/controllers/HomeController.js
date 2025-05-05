/**
 * @file Defines the HomeController class.
 * @module HomeController
 * @author Anna Ståhlberg
 */

import nodemailer from 'nodemailer'
import { client, urlFor} from '../config/sanityClient.js'

/**
 * Encapsulates the Homecontroller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index(req, res, next) {
   
    const news = await client.fetch('*[_type == "news"]')
    //console.log(JSON.stringify(news, null, 2))
    const viewData = news.map(item => ({
      title: item.title,
      description: item.description,
      imageUrl: urlFor(item.image).url()
    }))
    console.log('Viewdata:', JSON.stringify(viewData, null, 2))
    res.render('home/index', {viewData})
  }

  getContact(req, res, next) {
    res.render('home/contact')
  }

  async postContact(req, res, next) {
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      host: 'smtp.office365.com',
      port: 587,
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      },
    })

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      replyTo: req.body.email,
      subject: `Ny kontaktförfrågan från ${req.body.name}`,
      text: `
  Namn: ${req.body.name}
  Telefon: ${req.body.telephone}
  E-post: ${req.body.email}
  
  Meddelande:
  ${req.body.question}
      `
    }

    await transporter.sendMail(mailOptions)
  }
}
