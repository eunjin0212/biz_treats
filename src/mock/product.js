const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const productBrands = ['Shawa wama', 'GrabFood', 'McDonald’s', 'greenwich']
const productNames = [
    'Double All-In Overload',
    'Regular Coke McFloat',
    'GrabFood P200 PromoCode',
    'Primo Beef',
]
const productKeywords = [
    'ALL', 
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

export const genProductData = (length = 10) => {
    return Array.from({ length }).map((_, idx) => ({
        brand: productBrands[getRandom(0, productBrands.length - 1)],
        name: productNames[getRandom(0, productNames.length - 1)],
        sale_price: getRandom(0, 1000),
        price: getRandom(0, 1000),
        keyword: productKeywords[getRandom(0, productKeywords.length - 1)],
        img: `path/img_${idx}.png`,
        is_soldout: false,
    }))
}