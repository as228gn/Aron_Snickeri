/**
 * @file Defines the company router.
 * @module companyRouter
 * @author Anna Ståhlberg
 */

import express from 'express'
import { CompanyController } from '../controllers/CompanyController.js'

export const router = express.Router()

const controller = new CompanyController()

router.get('/company', (req, res, next) => controller.getCompany(req, res, next))