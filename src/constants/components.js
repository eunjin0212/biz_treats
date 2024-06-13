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

const companyWebsiteNav = {
    index: {
        title: 'Home',
        path: 'home',
    },
    'about': {
        title: 'About us',
        path: 'about'
    },
    'brands': {
        title: 'Brands',
        path: 'brands'
    },
    'contact': {
        title: 'Contact us',
        path: 'contact'
    },
}

export const companyWebsiteMenu = Object.values(companyWebsiteNav).flat()

const headerNav = {
    ...companyWebsiteNav,
    index: {
        title: 'Home',
        path: '/'
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

export const lnbMenu = [
    {
        title: 'Help',
        children: [
            {
                title: 'FAQS',
                path: '/faqs'
            },
            {
                title: 'Customer Service',
                path: '/customerService'
            },
        ],
    },
    {
        title: 'Terms',
        children: [
            {
                title: 'Terms and Service',
                path: '/termsService'
            },
            {
                title: 'Privacy Policy',
                path: '/privacyPolicy'
            },
        ],
    },
    {
        title: 'Links',
        children: [
            {
                title: 'About Us',
                path: '/about'
            },
            {
                title: 'Merchant Partnership',
                path: '/merchantPartnership'
            },
            {
                title: 'Company Website',
                path: '/companyWebsite'
            },
        ],
    },
]

export const myPageLnbMenu = [
    {
        title: 'My Treats',
        children: [
            {
                title: 'My Wallet',
                path: '/myWallet'
            },
            {
                title: 'Treats History',
                path: '/treatsHistory'
            },
            {
                title: 'Account Info',
                path: '/accountInfo'
            },
        ],
    },
    {
        title: 'My Campaign',
        children: [
            {
                title: 'Campaign Info',
                path: '/campaignInfo'
            },
            {
                title: 'Member Management',
                path: '/memberManagement'
            },
            {
                title: 'Points Top-up Management',
                path: '/pointsTopUpManagement'
            },
            {
                title: 'Points Transfer/Retrieve',
                path: '/pointsTransferRetrieve'
            },
            {
                title: 'Monthly Report',
                path: '/monthlyReport'
            },
            {
                title: 'Permission Settings',
                path: '/permissionSettings'
            },
            {
                title: 'System Settings',
                path: '/systemSettings'
            },
        ],
    },
]

export const mainMenu = [
    {
        title: 'Home',
        path: '/home'
    },
    {
        title: 'Budget',
        path: '/budget'
    },
    {
        title: 'Brand',
        path: '/brands'
    },
    {
        title: 'Hybrid',
        path: '/hybrid'
    },
    {
        title: 'Display1',
        path: '/display1'
    },
]

export const categoryFilter = [
  { label: 'ALL', icon: 'all', textClass: '' },
  { label: 'eWallet', icon: 'ewallet', textClass: '' },
  { label: 'Grocery & Essentials', icon: 'grocery_essentials', textClass: '!-tracking-[0.14px] min-w-14' },
  { label: 'Fast Food', icon: 'fast_food', textClass: 'text-nowrap' },
  { label: 'Casual Resto', icon: 'casual_resto', textClass: '' },
  { label: 'Bread & Dessert', icon: 'bread_dessert', textClass: '' },
  { label: 'Drugstore & Wellness', icon: 'drugstore', textClass: '!-tracking-[0.14px] min-w-14' },
  { label: 'Beauty & Lifestyle', icon: 'beauty_lifestyle', textClass: '' },
  { label: 'Transpo & Travel', icon: 'transpo_travel', textClass: '' },
  { label: 'Digital & Appliance', icon: 'digital_appliance', textClass: '' },
  { label: 'Home & Kids', icon: 'home_kids', textClass: '' },
]