/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "/index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        container: {},
        extend: {
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            spacing: {
                '1.5': '0.375rem', // 6px
                '2.5': '0.625rem', // 10px
                '3.5': '0.875rem', // 14px
                '4.5': '1.125rem', // 18px
            },
            colors: {
                'primary': {
                    100: '#EDE6FF',
                    200: '#DBD0FF',
                    300: '#C5B3FF',
                    400: '#AB92FD',
                    450: '#B5A3FF',
                    500: '#9272FA',
                    600: '#764DFB',
                    700: '#602FFF',
                },
                'top-menu-blue': '#29AAE3',
                main: '#29ABE2',
                'transfer': '#B1E5FC',
                'topup': '#62D0FF',

                title: '#171719',
                'lnb-hover-text': '#1A1D1F',
                secondary: '#333333',
                'point-unit': '#A3A3A3',
                'download-btn-text': '#A9A9A9',
                placeholder: '#BBBBBB',
                'alert-description': '#B4B4B4',
                'date-picker-text': '#B6B6B6',
                'point': '#4D4D4D',
                'info-content': '#676767',
                'dropdown-text': '#6F767E',
                link: '#777E90',
                'subLink': '#898989',
                neutral: '#888888',
                label: '#858587',

                separate: '#E6E8EC',
                sns: '#EEF1F3',
                'date-picker-border': '#EBEAED',
                'search-border': '#ECECEC',
                'header-btn-border': '#EFEFEF',
                'input-border': '#E0E0E2',
                'btn-border': '#E3E3E3',

                'search-bg': '#FDFDFD',
                'disabled': '#F0F0F0',
                'alert-hr': '#F1F1F1',
                'dropdown-hover-bg': '#F3F3F3',
                'lnb-hover': '#F4F4F4',
                'bg': '#F9F9F9',
                'alert-border': '#F6F6F6',
                'info-wrapper': '#FBFBFB',
                'point-chip': '#FCFCFC',

                'point-up': '#83BF6E',

                'badge': '#FF6363',
                'point-down': '#FF6A55',
                canceled: '#FF9789',
                'gray': {
                    50: '#E7E7E7',
                    100: '#E9E9E9',
                    200: '#D0D0D0',
                    500: '#898989',
                    600: '#666666',
                    700: '#454546',
                    800: '#504F54',
                }
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'],
                inter: ["inter", "sans-serif"],
                nanum: ["NanumSquareRound", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                manrope: ["Manrope", "sans-serif"]
            },
        },
        screens: {
            'lucky': '600px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
