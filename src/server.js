/**
 * @file The starting point of the application.
 * @module src/server
 * @author Anna Ståhlberg
 * @version 1.0.0
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sessionOptions } from './config/sessionOptions.js'
import { router } from './routes/router.js'

// Create Express application.
const app = express()

// Get the path of the current module's directory.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Serve static files.
app.use(express.static(join(directoryFullName, 'public')))

// Setup and use session middleware (https://github.com/expressjs/session)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}
app.use(session(sessionOptions))
// Middleware to be executed before the routes.

app.use((req, res, next) => {
  // Prevent browser from caching pages, especially for session-sensitive content.
  res.set('Cache-Control', 'no-store')
  next()
})

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use((req, res, next) => {
  // Pass the base URL to the views.
  res.locals.baseURL = baseURL
  res.locals.totalQuantity = req.session.totalQuantity || 0

  next()
})

// Register routes.
app.use('/', router)

// Error handler.
app.use((err, req, res, next) => {
  console.error(err)

  if (err.status === 403) {
    res
      .status(403)
      .sendFile(join(directoryFullName, 'views', 'errors', '403.html'))
    return
  }

  if (err.status === 404) {
    res
      .status(404)
      .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
    return
  }

  res
    .status(500)
    .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
})

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
  console.log('Press Ctrl-C to terminate...')
})
