export const hotKeyword = [
    {
        brand: 'greenwich',
        name: 'Double All-In Overload',
        sale_price: 259,
        price: 315,
        keyword: 'chicken',
        img: 'path/img.png',
        is_soldout: true,
    },
    {
        brand: 'McDonald’s',
        name: 'Regular Coke McFloat',
        sale_price: 259,
        price: 315,
        keyword: 'coffee',
        img: 'path/img.png',
        is_soldout: false,
    },
    {
        brand: 'GrabFood',
        name: 'GrabFood P200 PromoCode',
        sale_price: 259,
        price: 315,
        keyword: 'eGift',
        img: 'path/img.png',
        is_soldout: false,
    },
    {
        brand: 'Shawa wama',
        name: 'Primo Beef',
        sale_price: 259,
        price: 315,
        keyword: 'dessert',
        img: 'path/img.png',
        is_soldout: false,
    },
    {
        brand: 'GrabFood',
        name: 'GrabFood P200 PromoCode',
        sale_price: 259,
        price: 315,
        keyword: 'dessert',
        img: 'path/img.png',
        is_soldout: false,
    },
    {
        brand: 'Shawa wama',
        name: 'Primo Beef',
        sale_price: 259,
        price: 315,
        keyword: 'burger',
        img: 'path/img.png',
        is_soldout: false,
    },
]

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const genMockData = (length = 10) => {
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
