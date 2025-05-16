/**
 * @file Defines the CompanyController class.
 * @module CompanyController
 * @author Anna Ståhlberg
 */

import { client } from '../config/sanityClient.js'

/**
 * Encapsulates the Companycontroller.
 */
export class CompanyController {
 /**
  * Fetches company information from the sanity-api and renders a view with this data.
  *
  * @param {object} req - The Express request object.
  * @param {object} res - The Express response object.
  * @param {Function} next - The Express function to handle errors or the next middleware.
  * @throws {Error} If an error occurs while fetching data or rendering the view.
  */
  async getCompany (req, res, next) {
    try {
      const company = await client.fetch('*[_type == "company"]')
      //console.log('Company:', JSON.stringify(company, null, 2))
      const viewData = this.formatCompanyData(company)
      //console.log('Viewdata:', JSON.stringify(viewData, null, 2))
      res.render('company/company', { viewData })
    } catch (error) {
      console.error('Error fetching company data:', error)
      next(error)
    }
  }

  /**
   * Formats the raw company data into a structured format.
   *
   * @param {Array} rawCompanyData - The raw company data fetched from the sanity-api.
   * @param {object} rawCompanyData[].description - An array of blocks containing the company's description.
   * @param {string} rawCompanyData[].description[].listItem - Indicates whether the block is a list item ('bullet') or regular text.
   * @param {Array} rawCompanyData[].description[].children - The children elements within a description block. Each child has a `text` field.
   * @returns {object} A formatted company object with a `description` string and a `listItem` array.
   */
  formatCompanyData(rawCompanyData) {
    const company = rawCompanyData[0]
    const formatted = {
      description: '',
      listItem: [],
    }
  
    for (const block of company.description) {
      if (block.listItem === 'bullet') {
        const text = block.children.map(child => child.text).join('')
        formatted.listItem.push(text)
      } else {
        const text = block.children.map(child => child.text).join('')
        formatted.description += text + '\n'
      }
    }
    return formatted
  }
}