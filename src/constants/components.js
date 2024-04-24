export const snsMenu = {
    title: 'Follow Us',
    children: [
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/sharetreatsid/',
            target: '_blank',
            icon: '/assets/icons/instagram.svg',
        },
        {
            name: 'Facebook',
            link: 'https://www.facebook.com/ShareTreatsID/',
            target: '_blank',
            icon: '/assets/icons/facebook.svg',
        },
    ]
};
export const menus = [
    {
        title: 'Links',
        children: [
            { name: 'About Us', link: '' },
            { name: 'Merchant Partnership', link: '' },
            { name: 'Company Website', link: '' },
        ]
    },
    {
        title: 'Help',
        children: [
            { name: 'Customer Service', link: '' },
            { name: 'FAQS', link: '' },
        ]
    },
    {
        title: 'Terms',
        children: [
            { name: 'Terms and Service', link: '' },
            { name: 'Privacy Policy', link: '' },
        ],
    },
]

const headerNav = {
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

export const navMenu = Object.values(headerNav).flat()