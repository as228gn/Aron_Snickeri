/**
 * @file Defines the webshop router.
 * @module webshopRouter
 * @author Anna Ståhlberg
 */

import express from 'express'
import { WebshopController } from '../controllers/WebshopController.js'

export const router = express.Router()

const controller = new WebshopController()

router.get('/shop', (req, res, next) => controller.getWebshop(req, res, next))