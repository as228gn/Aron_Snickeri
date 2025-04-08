/**
 * @file Defines the home router.
 * @module homeRouter
 * @author Anna Ståhlberg
 */

import express from 'express'
import { HomeController } from '../controllers/HomeController.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/contact', (req, res, next) => controller.getContact(req, res, next))
router.post('/contact', (req, res, next) => controller.postContact(req, res, next))

router.get('/about', (req, res, next) => controller.getAbout(req, res, next))
