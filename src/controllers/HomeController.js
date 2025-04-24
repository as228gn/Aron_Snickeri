/**
 * @file Defines the HomeController class.
 * @module HomeController
 * @author Anna Ståhlberg
 */

import nodemailer from 'nodemailer'

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
  index (req, res, next) {
    res.render('home/index')
  }

  getContact (req, res, next){
    res.render('home/contact')
  }

  async postContact (req, res, next){
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      host: 'smtp.office365.com',
      port: 587,
      tls: {
        ciphers:'SSLv3',
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
