/**
 * @file Defines the customer router.
 * @module customerRouter
 * @author Anna Ståhlberg
 */

import express from 'express'
import { CustomerController } from '../controllers/CustomerController.js'

export const router = express.Router()

const controller = new CustomerController()

router.get('/carpentry', (req, res, next) => controller.getCarpentry(req, res, next))

router.get('/kitchen', (req, res, next) => controller.getKitchen(req, res, next))