/**
 * The main script file of the application.
 *
 * @author Anna Ståhlberg <as228gn@student.lnu.se>
 * @version 1.0.0
 */
import './cookie-banner.js'

window.addEventListener('load', () => {
    if (!localStorage.getItem('cookieAccepted')) {
       const newBanner = document.createElement('cookie-banner')
      document.body.appendChild(newBanner)
    }
  })

