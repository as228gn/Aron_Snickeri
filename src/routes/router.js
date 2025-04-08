/**
 * @file Defines the main router.
 * @module router
 * @author Anna Ståhlberg
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as customerRouter } from './customerRouter.js'
import { router as webshopRouter } from './webshopRouter.js'
import { router as companyRouter } from './companyRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/customer', customerRouter)
router.use('/webshop', webshopRouter)
router.use('/company', companyRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
