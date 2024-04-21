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
    'login': {
        title: 'Login',
        path: '/login',
        hide: true,
    },
    'forgotPassword': {
        title: 'ForgotPassword',
        path: '/forgot_password',
        hide: true,
    },
}
