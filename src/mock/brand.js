const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const genBrandsMockData = (length = 10) => {
    const keywords = [
        'eWallet',
        'Grocery & Essentials',
        'Fast Food',
        'Casual Resto',
        'Bread & Dessert',
        'Drugstore & Wellness',
        'Beauty & Lifestyle',
        'Transpo & Travel',
        'Digital & Appliance',
        'Home & Kids',
    ]
    const brands = [
        { label: 'ideal vision', img: '/assets/images/brands_0.png', },
        { label: 'CINNABON', img: '/assets/images/brands_1.png', },
    ]
    return Array.from({ length }).map((_, idx) => {
        const brandsItem = brands[getRandom(0, brands.length - 1)]
        return {
            id: idx,
            brand: brandsItem.label,
            locations: 12300,
            keyword: keywords[getRandom(0, keywords.length - 1)],
            img: brandsItem.img
        }
    })
}


const productBrands = ['Shawa wama', 'GrabFood', 'McDonald’s', 'greenwich']
const productNames = [
    'Double All-In Overload',
    'Regular Coke McFloat',
    'GrabFood P200 PromoCode',
    'Primo Beef',
]
const productKeywords = [
    'chicken',
    'coffee',
    'eGift',
    'dessert',
    'burger',
]
const soldOuts = [true, false]

export const genProductMockData = (length = 10) => Array.from({ length }).map((_, idx) => ({
    brand: productBrands[getRandom(0, productBrands.length - 1)],
    name: productNames[getRandom(0, productNames.length - 1)],
    sale_price: 259,
    price: 315,
    keyword: productKeywords[getRandom(0, productKeywords.length - 1)],
    img: `path/img_${idx}.png`,
    is_soldout: soldOuts[getRandom(0, soldOuts.length - 1)],
}))