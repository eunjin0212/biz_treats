const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const genKeywordMockData = (length = 10) => {
    const brands = ['Shawa wama', 'GrabFood', 'McDonald’s', 'greenwich']
    const names = [
        'Double All-In Overload',
        'Regular Coke McFloat',
        'GrabFood P200 PromoCode',
        'Primo Beef',
    ]
    const keywords = [
        'chicken',
        'coffee',
        'eGift',
        'dessert',
        'burger',
    ]
    const soldOuts = [true, false]
    return Array.from({ length }).map((_, idx) => {
        return {
            brand: brands[getRandom(0, brands.length - 1)],
            name: names[getRandom(0, names.length - 1)],
            sale_price: 259,
            price: 315,
            keyword: keywords[getRandom(0, keywords.length - 1)],
            img: `path/img_${idx}.png`,
            is_soldout: soldOuts[getRandom(0, soldOuts.length - 1)],
        }
    })
}

export const genBrandsMockData = (length = 10) => {
    const brands = [
        'Jollibee',
        'KFC',
        'Mang Inasal',
        'Red Ribbon',
    ]
    const keywords = [
        'ALL',
        'eWallet & Shopping',
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
    return Array.from({ length }).map((_, idx) => {
        return {
            brand: brands[getRandom(0, brands.length - 1)],
            locations: 12300,
            keyword: keywords[getRandom(0, keywords.length - 1)],
            img: `path/img_${idx}.png`,
        }
    })
}
