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
                '0.5': '0.125rem', // 2px
                '1.5': '0.375rem', // 6px
                '2.5': '0.625rem', // 10px
                '3.5': '0.875rem', // 14px
                '4.5': '1.125rem', // 18px
                '5.5': '1.375rem', // 22px
                '6.5': '1.625rem', // 26px
            },
            colors: {
                'primary': {
                    '01': '#F8FAFF',
                    '100': '#EDE6FF',
                    '200': '#DBD0FF',
                    '250': '#CABDFF',
                    '300': '#C5B3FF',
                    '400': '#B5A3FF',
                    '450': '#AB92FD',
                    '500': '#9272FA',
                    '600': '#764DFB',
                    '700': '#602FFF',
                },
                purple: {
                    '01': '#FDFBFF',
                    '02': '#B685E7',
                    '03': '#9A5FD2',
                    '04': '#BB73FF',
                },
                blue: {
                    '01': '#DBF4FF',
                    '02': '#B1E5FC',
                    '03': '#62D0FF',
                    '04': '#3DB7EB',
                    '05': '#29ABE2', // main
                    '06': '#299bd9',
                    '07': '#0099FF',
                    '08': '#258CB7',
                    '09': '#007EB8',
                    '10': '#006C9E',
                    '11': '#3E81F6',
                    '12': '#629BFF'
                },
                orange: {
                    '01': '#FFF9F2',
                    '02': '#FFBC99',
                    '03': '#FF9745',
                    '04': '#FF7C15',
                    '05': '#FF7F1C',
                },
                red: {
                    '01': '#FFF9FA',
                    '02': '#FFC7C7',
                    '03': '#FF9789',
                    '04': '#ED7767',
                    '05': '#FF6A55',
                    '06': '#FF6363',
                    '07': '#ef4444',
                    '08': '#FF3737',
                    '09': '#E22929',
                    '10': '#FF0F1D',
                    '11': '#EC4446',
                },
                pink: {
                  '01': '#FF8AA5',
                  '02': '#EC5C7D',
                  '03': '#EF466F',
                  '04': '#EE1E43',
                  '05': '#FF003D',
                },
                error: '#FC3400',
                main: '#29ABE2',
                black: {
                    '0': '#000000',
                    '100': '#333333',
                    '200': '#1A1D1F',
                    '300': '#171719',
                    '400': '#121127',
                },
                white: {
                    '00': '#E0E0E0',
                    '01': '#E0E0E2',
                    '02': '#E3E3E3',
                    '02-light': '#E3E3E320',
                    '03': '#E7E7E7',
                    '04': '#E9E9E9',
                    '05': '#E6E8EC',
                    '06': '#EEF1F3',
                    '07': '#EBEAED',
                    '08': '#ECECEC',
                    '09': '#EEEEEE',
                    '10': '#EFEFEF',
                    '11': '#FDFDFD',
                    '12': '#F0F0F0',
                    '13': '#F1F1F1',
                    '14': '#F3F3F3',
                    '15': '#F4F4F4',
                    '16': '#F6F6F6',
                    '17': '#F9F9F9',
                    '18': '#FBFBFB',
                    '19': '#FCFCFC',
                    '20': '#FFFFFF'
                },
                gray: {
                    '00': '#D0D0D0',
                    '01': '#BBBBBB',
                    '02': '#BEBEBE',
                    '03': '#B4B4B4',
                    '04': '#B6B6B6',
                    '05': '#A9A9A9',
                    '06': '#A3A3A3',
                    '07': '#E1E3E1',
                    '08': '#C4C7CA',
                    '09': '#E1E1E2',
                    '10': '#E8E8E8',
                },
                secondary: {
                    '01': '#858587',
                    '02': '#888888',
                    '03': '#898989',
                    '04': '#929292',
                    '04-light': '#9A9FA520'
                },
                zinc: {
                    '01': '#666666',
                    '02': '#676767',
                    '03': '#5D5D5D',
                    '04': '#5E5D5D',
                    '05': '#5B5B5B',
                },
                stone: {
                    '01': '#504F54',
                    '02': '#4D4D4D',
                    '03': '#4E4E4E',
                    '04': '#454546',
                },
                slate: {
                    '01': '#6F767E',
                    '02': '#777E90',
                },
                green: {
                    '01': '#83BF6E',
                    '02': '#85CBA5',
                    '03': '#B5E4CA',
                },
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'],
                inter: ["inter", "sans-serif"],
                nanum: ["NanumSquareRound", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                manrope: ["Manrope", "sans-serif"],
                dmsans: ["DM Sans", "sans-serif"],
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
