/**
 * @file This module contains the options object for the session middleware.
 * @module config/sessionOptions
 * @author Anna Ståhlberg
 * @version 1.0.0
 * @see {@link https://github.com/expressjs/session}
 */

export const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict',
    httpOnly: true
  }
}

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true
}