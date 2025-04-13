/**
 * @file Defines the HomeController class.
 * @module HomeController
 * @author Anna Ståhlberg
 */

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

  postContact (req, res, next){
    console.log('Postcontact')
  }
}
