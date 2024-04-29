

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
            colors : {
                'top-menu-blue' : '#29AAE3',
                'primary' :{
                    100: '#EDE6FF',
                    200: '#DBD0FF',
                    300: '#C5B3FF',
                    400: '#AB92FD',
                    500: '#9272FA',
                    600: '#764DFB',
                    700: '#602FFF'
                },
                main: '#29ABE2',
                secondary: '#333333',
                title: '#171719',
                link: '#777E90',
                separate: '#E6E8EC',
                sns: '#EEF1F3',
                label: '#858587',
                'input-border': '#E0E0E2',
                placeholder: '#BBBBBB',
                'subLink': '#898989',
                neutral: '#888888',
                'disabled': '#F0F0F0',
                'search-border': '#ECECEC',
                'search-bg': '#FDFDFD',
                'bg': '#F9F9F9',
                'header-btn-border': '#EFEFEF',
                'badge': '#FF6363',
                'gray' :{
                    50: '#E7E7E7',
                    100: '#E9E9E9',
                    200: '#D0D0D0',
                    500: '#898989',
                    600: '#666666',
                    700: '#454546'
                }
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'],
                inter: ["inter", "sans-serif"],
                nanum: ["NanumSquareRound", "sans-serif"],
            },
        },
        screens: {
            'lucky' : '600px',
            'sm' : '640px',
            'md' : '768px',
            'lg' : '1024px',
            'xl' : '1280px',
            '2xl' : '1536px',
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
