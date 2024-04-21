/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "/default.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: '#29ABE2',
                gray: '#E7E7E7',
                secondary: '#333333',
                title: '#171719',
                link: '#777E90',
                separate: '#E6E8EC',
                sns: '#EEF1F3',
                label: '#858587',
                'input-border': '#E0E0E2',
                placeholder: '#BBBBBB',
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

