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
  getWebshop (req, res, next) {
    res.render('webshop/shop')
  }

}