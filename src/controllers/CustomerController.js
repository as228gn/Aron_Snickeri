/**
 * @file Defines the CustomerController class.
 * @module CustomerController
 * @author Anna Ståhlberg
 */

/**
 * Encapsulates the Companycontroller.
 */
export class CustomerController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  getCarpentry (req, res, next) {
    res.render('customer/carpentry')
  }

  getKitchen (req, res, next) {
    res.render('customer/kitchen')
  }

}