/** @type {import('tailwindcss').Config} */
export default {
    content: {
        relative: true,
        files: [
            "/index.html",
            "/src/pages/**/*.{html,js,vue}",
            "/src/components/**/*.{html,js,vue}",
        ]
    },
    theme: {
        extend: {},
    },
    plugins: [],
}

