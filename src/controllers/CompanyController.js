/**
 * @file Defines the CompanyController class.
 * @module CompanyController
 * @author Anna Ståhlberg
 */

/**
 * Encapsulates the Companycontroller.
 */
export class CompanyController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  getCompany (req, res, next) {
    res.render('company/company')
  }

}