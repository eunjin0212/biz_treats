/**
 * @description key is folder name
 * @description title is menu name
 * @description path is a route alias
 */
module.exports = {
    index: {
        title: 'Home',
        path: '/'
    },
    'about': {
        title: 'About us',
        path: '/about'
    },
    'brands': {
        title: 'Brands',
        path: '/brands'
    },
    'contact': {
        title: 'Contact us',
        path: '/contact'
    },
    'inquiry': {
        title: 'Inquiry',
        path: '/inquiry'
    },
    'password': {
        title: 'Forgot Password',
        path: '/password',
        hide: true,
    },
    'reset': {
        title: 'Reset Password',
        path: '/reset',
        hide: true,
    },
    'login': {
        title: 'Login',
        path: '/login',
        hide: true,
    },
}
