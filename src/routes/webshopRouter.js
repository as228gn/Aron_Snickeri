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

router.post('/addToCart', (req, res, next) => controller.addToCart(req, res, next))
router.post('/cart/update', (req, res, next) => controller.updateCart(req, res, next))

router.get('/cart', (req, res, next) => controller.goToCart(req, res, next))