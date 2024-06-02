<script>
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { snsMenu, menus, mainMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart';
import { genKeywordMockData, genBrandsMockData, genBudgetMockData } from '@/mock/home';
import { alertData } from '@/mock/alertData.js'
import SearchSvg from '@/assets/icons/SearchSvg.vue';
import BellSvg from '@/assets/icons/BellSvg.vue';
import CartSvg from '@/assets/icons/CartSvg.vue';
import DropdownSvg from '@/assets/icons/DropdownSvg.vue';
import WalletSvg from '@/assets/icons/WalletSvg.vue';
import SwitchSvg from '@/assets/icons/SwitchSvg.vue';
import SignOutSvg from '@/assets/icons/SignOutSvg.vue';
import AlertSvg from '@/assets/icons/AlertSvg.vue';
import PointSvg from '@/assets/icons/PointSvg.vue';
import ReadSvg from '@/assets/icons/ReadSvg.vue';
import SliderLeftSvg from '@/assets/icons/SliderLeftSvg.vue';
import SliderRightSvg from '@/assets/icons/SliderRightSvg.vue';
import FireSvg from '@/assets/icons/FireSvg.vue';
import TrophySvg from '@/assets/icons/TrophySvg.vue';
import CoinSvg from '@/assets/icons/CoinSvg.vue';
import ProductCartSvg from '@/assets/icons/ProductCartSvg.vue';
import RightArrowSvg from '@/assets/icons/RightArrowSvg.vue';
import LeftArrowSvg from '@/assets/icons/LeftArrowSvg.vue';

export default {
    components: {
        SearchSvg,
        BellSvg,
        CartSvg,
        DropdownSvg,
        WalletSvg,
        SwitchSvg,
        SignOutSvg,
        AlertSvg,
        PointSvg,
        ReadSvg,
        SliderLeftSvg,
        SliderRightSvg,
        FireSvg,
        TrophySvg,
        CoinSvg,
        ProductCartSvg,
        RightArrowSvg,
        LeftArrowSvg,
    },
    data() {
        return {
            snsMenu,
            mainMenu,
            menus,
            search: '',
            dropdown: false,
            alertOpen: false,
            cartData,
            alertData,
            hotline: [
                {
                    title: 'Telephone number',
                    content: '+63)917-712-4921',
                },
                {
                    title: 'Email',
                    content: 'biztreats@sharetreats.com',
                },
                {
                    title: 'Business Hours',
                    content: '10AM - 5PM (Monday-Friday)',
                },
            ],
            noticeData: [
                {
                    title: 'Response',
                    content: ['Our CS will contact the customers within 2 business days via email or phone.'],
                },
                {
                    title: 'Resolution',
                    content: ['Our CS will resolve the issue and contact the customers within 10 business days once the inquiry is received.', 'In any special case that more investigation is required, our CS will answer the customers for an estimated timeline.'],
                },
                {
                    title: 'Refund',
                    content: ['Refund will be made approximately within 10 business days depending on the payment issuer’s process once <br> the refund is confirmed by our CS.'],
                },
            ],
            mainSliderCurrent: 1,
            mainSlider: null,
            slides: [
                '/path/to/your-image1.jpg',
                '/path/to/your-image2.jpg',
                '/path/to/your-image3.jpg',
                '/path/to/your-image4.jpg',
                '/path/to/your-image5.jpg',
                '/path/to/your-image6.jpg',
                '/path/to/your-image7.jpg',
                // Add more image paths as needed
            ],
            keywordFilter: [
                { label: '#Chicken', value: 'chicken', class: 'bg-blue-01 text-blue-08 border-blue-08 hover:bg-blue-04 data-[active=true]:bg-blue-04 data-[active=true]:text-white-20 ', },
                { label: '#Coffee', value: 'coffee', class: 'bg-red-01 text-pink-02 border-pink-02 hover:bg-pink-01 data-[active=true]:bg-pink-01 data-[active=true]:text-white-20 ', },
                { label: '#eGift', value: 'eGift', class: 'bg-primary-01 text-blue-11 border-blue-11 hover:bg-blue-12 data-[active=true]:bg-blue-12 data-[active=true]:text-white-20 ', },
                { label: '#Dessert', value: 'dessert', class: 'bg-purple-01 text-purple-03 border-purple-03 hover:bg-purple-04 data-[active=true]:bg-purple-04 data-[active=true]:text-white-20 ', },
                { label: '#Burger', value: 'burger', class: 'bg-orange-01 text-orange-05 border-orange-04 hover:bg-orange-03 data-[active=true]:bg-orange-03 data-[active=true]:text-white-20 ', },
            ],
            hotKeyword: genKeywordMockData(50),
            selectedFilter: {
                keyword: 'chicken',
                brand: 'ALL',
                budget: 0,
            },
            hotKeywordData: {},
            keywordSliderCurrent: 0,
            brandFilter: [
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
            ],
            bestBrand: genBrandsMockData(100),
            bestBrandData: {},
            bestBrandSliderCurrent: 0,
            budgetFilter: [
                { label: 'Below P50', min: 0, max: 50 },
                { label: 'P51~P100', min: 51, max: 100 },
                { label: 'P101~P300', min: 101, max: 300 },
                { label: 'P301~P500', min: 301, max: 500 },
                { label: 'P501 and UP', min: 501, max: 99999 },
            ],
            budgetRecommend: genBudgetMockData(100),
            budgetData: {},
            budgetSliderCurrent: 0,
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
        handleCartLocation() {
            window.location.href = '/multiCart'
        },
        handleDropdown() {
            this.dropdown = !this.dropdown
        },
        handleAlert() {
            this.alertOpen = !this.alertOpen
        },
        handleGlobalDropdown(e) {
            const { parentNode } = e.target
            if (parentNode !== this.$refs.dropdownRef && !this.$refs.dropdownOptsRef.contains(parentNode)) {
                this.dropdown = false
            }
        },
        handleGlobalAlert(e) {
            const { parentNode } = e.target
            if (parentNode !== this.$refs.alertRef && !this.$refs.alertWrapperRef.contains(parentNode)) {
                this.alertOpen = false
            }
        },

        // 배너 이중 배열을 만듦
        genBanner(originArr, chunkSize = 4) {
            return originArr.reduce((result, item, index) => {
                const chunkIndex = Math.floor(index / chunkSize);

                if (!result[chunkIndex]) {
                    result[chunkIndex] = [];
                }

                result[chunkIndex].push(item);

                return result;
            }, []);
        },
    },
    watch: {
        dropdown() {
            if (this.dropdown) {
                window.addEventListener('click', this.handleGlobalDropdown)
                return
            }
            window.removeEventListener('click', this.handleGlobalDropdown)
        },
        alertOpen() {
            if (this.alertOpen) {
                window.addEventListener('click', this.handleGlobalAlert)
                return
            }
            window.removeEventListener('click', this.handleGlobalAlert)
        },
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        },
        totalSlider() {
            const total = this.mainSlider ? [...Array(this.mainSlider.track.details.slides.length).keys()] : []
            return `${total.length < 10 ? '0' : ''}${total.length}`
        },
        currentSlider() {
            return `${this.mainSliderCurrent < 10 ? '0' : ''}${this.mainSliderCurrent}`
        },
    },
    mounted() {
        // https://keen-slider.io/
        this.mainSlider = new KeenSlider(this.$refs.mainSlider, {
            loop: true,
            drag: false,
            slides: { origin: "center", perView: 'auto', spacing: 30 },
            slideChanged: (s) => {
                this.mainSliderCurrent = s.track.details.rel + 1
            },
        }, [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 5000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]);

        this.hotKeywordData = this.hotKeyword.reduce((obj, data) => {
            const originArray = this.hotKeyword.filter((item) => item.keyword === data.keyword)
            obj[data.keyword] = this.genBanner(originArray)
            return obj
        }, {})

        this.bestBrandData = this.bestBrand.reduce((obj, data) => {
            const originArray = this.bestBrand.filter((item) => item.keyword === data.keyword)
            obj[data.keyword] = data.keyword === 'ALL' ? this.genBanner(this.bestBrand, 12) : this.genBanner(originArray, 12)
            return obj
        }, {})

        const budgetOriginArray = (min = 0, max = 50) => this.budgetRecommend.filter((item) => item.sale_price >= min && item.sale_price < max)
        this.budgetData = this.budgetFilter.reduce((obj, data) => {
            const originData = budgetOriginArray(data.min, data.max)
            obj[data.min] = this.genBanner(originData)
            return obj
        }, {})

    },
    beforeUnmount() {
        if (this.mainSlider) this.mainSlider.destroy();
    }
}
</script>
<template>
    <header class="service-header">
        <div class="!w-[1120px]">
            <nav>
                <a href="/" class="!mr-5">
                    <img src="/assets/images/biz_treats_log.png" />
                </a>
                <div class="search-input !w-[442px]">
                    <input
                      type="text"
                      placeholder="Search for Treats"
                      name="search"
                      v-model="search"
                    />
                    <SearchSvg />
                </div>
                <div class="relative">
                    <button
                      class="header-btn"
                      ref="alertRef"
                      @click="handleAlert"
                    >
                        <BellSvg />
                        <span class="badge">{{ alertData.length }}</span>
                    </button>
                    <aside
                      class="alert-wrapper"
                      ref="alertWrapperRef"
                      :class="alertOpen ? 'block' : 'hidden'"
                    >
                        <div class="alert-header">
                            <h1>Notification</h1>
                            <p>
                                <span>
                                    That’s all your notifications from the last 14days.
                                </span>
                                <button>
                                    Mark all as read
                                </button>
                            </p>
                        </div>
                        <hr />
                        <ul>
                            <li
                              v-for="(alert, idx) in alertData"
                              :key="idx"
                            >
                                <div>
                                    <span :class="alert.type === 'alert' ? 'bg-[#FCB1E7]' : 'bg-[#A7E5FF]'">
                                        <AlertSvg v-if="alert.type === 'alert'" />
                                        <PointSvg v-else />
                                    </span>
                                    <div>
                                        <p>
                                            <span>{{ alert.title }}</span>
                                            <span>({{ alert.date }})</span>
                                        </p>
                                        <span>{{ alert.description }}</span>
                                    </div>
                                    <span
                                      v-if="alert.read"
                                      class="alert-check"
                                    >
                                        <ReadSvg />
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </aside>
                </div>
                <button
                  class="header-btn inline-flex ml-4.5"
                  @click="() => handleCartLocation()"
                >
                    <CartSvg />
                    <span class="text-[15px] leading-5 -tracking-[0.323px] font-bold font-inter ml-4 mr-1.5">{{
                        cartData.length }}</span>
                </button>
                <div class="ml-4 btn-group">
                    <button class="border-r border-r-[#197298]">Wallet Name</button>
                    <div class="dropdown border-l border-l-[#60D0FF]">
                        <button
                          @click="handleDropdown"
                          ref="dropdownRef"
                        >
                            <span>
                                10000 points
                            </span>
                            <DropdownSvg />
                        </button>
                        <div
                          class="dropdown-opts"
                          ref="dropdownOptsRef"
                          :class="dropdown ? 'block' : 'hidden'"
                        >
                            <a href="/myWallet">
                                <WalletSvg />My Wallet
                            </a>
                            <a href="/chooseWallet">
                                <SwitchSvg />Switching Wallet
                            </a>
                            <a href="/login">
                                <SignOutSvg />Log out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <main class="flex flex-col w-full mx-auto">
        <nav class="w-full main-menu min-w-[1440px]">
            <div>
                <a
                  :class="{ 'active-main-menu': matchPath(menu.path) }"
                  v-for="menu in mainMenu"
                  :key="menu.title"
                  :href="menu.path"
                >{{ menu.title }}</a>
            </div>
        </nav>
        <section class="main-section main-section bg-white-17 h-[430px] pt-7">
            <aside class="relative w-full h-full overflow-hidden main-banner">
                <ul
                  class="flex h-[327px] w-full select-none keen-slider"
                  ref="mainSlider"
                >
                    <li
                      class="w-[812px] max-w-[812px] min-w-[812px] min-h-full keen-slider__slide"
                      :class="`number-slide${idx + 1}`"
                      v-for="(banner, idx) in slides"
                      :key="banner"
                    >
                        <div
                          v-if="mainSliderCurrent !== idx + 1"
                          class="bg-black-0/50 w-full h-[327px] absolute rounded-2xl transition-opacity ease-linear delay-200"
                        ></div>
                        <img
                          :src="banner"
                          :alt="banner"
                          height="327"
                          class="rounded-2xl"
                        />
                    </li>
                </ul>
                <div class="flex items-center justify-center w-48 pt-4 mx-auto">
                    <span
                      class="p-[11px] rounded-full bg-white-20 shadow-[0_4px_8px_0_#00000015] cursor-pointer"
                      v-if="mainSlider"
                      @click="mainSlider.prev()"
                    >
                        <SliderLeftSvg />
                    </span>
                    <span class="text-[#5F5F5F] text-xl leading-7 font-medium select-none ml-4">{{ currentSlider
                        }}</span>
                    <span class="text-[#C8CAD2] text-xl leading-7 font-medium select-none mx-1.5">/</span>
                    <span class="text-[#C8CAD2] text-xl leading-7 font-medium select-none mr-4">{{ totalSlider }}</span>
                    <span
                      class="p-[11px] rounded-full bg-white-20 shadow-[0_4px_8px_0_#00000015] cursor-pointer"
                      v-if="mainSlider"
                      @click="mainSlider.next()"
                    >
                        <SliderRightSvg />
                    </span>
                </div>
            </aside>
        </section>
        <section class="pt-24 main-section keyword-section bg-white-17">
            <div class="main-section__wrapper w-[1121px]">
                <div class="flex items-center justify-between">
                    <h1 class="main-section__title">
                        <p class="flex items-center mb-2 h-fit">
                            HOT
                            <FireSvg />
                        </p>
                        KEYWORD
                    </h1>
                    <ul class="inline-flex gap-2.5">
                        <li
                          :class="filter.class"
                          :data-active="filter.value === selectedFilter.keyword"
                          class="cursor-pointer border w-[120px] h-fit text-center py-2.5 rounded-[28px] text-base leading-[22px] font-semibold hover:text-white-20"
                          v-for="filter in keywordFilter"
                          :key="filter.value"
                          @click="() => {
                        keywordSliderCurrent = 0;
                        selectedFilter.keyword = filter.value;
                    }"
                        >{{ filter.label }}</li>
                    </ul>
                </div>
                <aside class="relative">
                    <div class="flex overflow-hidden product-wrapper">
                        <ul
                          class="mt-8 mb-12 product"
                          v-for="(data, index) in hotKeywordData[selectedFilter.keyword]"
                          :key="index"
                          :style="{ transform: `translateX(-${keywordSliderCurrent * 100}%)` }"
                        >
                            <li
                              v-for="(item, idx) in data"
                              :key="idx"
                            >
                                <figure class="relative">
                                    <img
                                      :src="item.img"
                                      :alt="item.img"
                                    />
                                    <figcaption v-if="item.is_soldout">
                                        <span>SOLD OUT</span>
                                    </figcaption>
                                </figure>
                                <dl class="product__detail">
                                    <strong class="product__brand">{{ item.brand }}</strong>
                                    <dd class="product__name">{{ item.name }}</dd>
                                    <dd class="product__price">
                                        <strong class="product__price-sale">P{{ item.sale_price }}</strong>
                                        <s class="product__price-origin">P{{ item.price }}</s>
                                    </dd>
                                    <dd class="buttons">
                                        <button>Buy Now</button>
                                        <button>
                                            <ProductCartSvg /> Add to Cart
                                        </button>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <button
                      :disabled="keywordSliderCurrent === 0"
                      class="banner-nav__btn left"
                      @click="() => keywordSliderCurrent = (keywordSliderCurrent - 1 + hotKeywordData[selectedFilter.keyword].length) % hotKeywordData[selectedFilter.keyword].length"
                    >
                        <LeftArrowSvg />
                    </button>
                    <button
                      :disabled="keywordSliderCurrent >= hotKeywordData[selectedFilter.keyword]?.length - 1"
                      class="banner-nav__btn right"
                      @click="() => keywordSliderCurrent = (keywordSliderCurrent + 1) % hotKeywordData[selectedFilter.keyword].length"
                    >
                        <RightArrowSvg />
                    </button>
                </aside>
            </div>
        </section>
        <section class="pt-[75px] pb-[60px] main-section best-brands-section bg-white-20">
            <div class="main-section__wrapper w-[1121px]">
                <h1 class="main-section__title">
                    <p class="flex items-center gap-2 h-fit">
                        BEST BRANDS
                        <TrophySvg />
                    </p>
                </h1>
                <ul class="inline-flex gap-2.5 w-[1058px] flex-wrap mt-8">
                    <li
                      :data-active="filter === selectedFilter.brand"
                      :class="{ 'w-36': filter === 'ALL' }"
                      class="cursor-pointer text-nowrap border border-[#E5E5E5] h-9 text-center px-2.5 py-1.5 rounded-[31px] text-sm leading-[22px] font-medium font-poppins text-blue-05 hover:text-white-20 hover:bg-blue-05 hover:border-blue-05 data-[active=true]:text-white-20 data-[active=true]:bg-blue-05 data-[active=true]:border-blue-05"
                      v-for="filter in brandFilter"
                      :key="filter"
                      @click="() => {
                        bestBrandSliderCurrent = 0
                        selectedFilter.brand = filter
                    }"
                    >{{ filter }}</li>
                </ul>
            </div>
            <aside
              class="w-[1121px] relative border border-white-13 shadow-[0_4px_8px_0_#0000000A] mx-auto h-[460px] mb-10 mt-5"
            >
                <div class="flex overflow-hidden brand-wrapper">
                    <ul
                      class="brand"
                      v-for="(data, index) in bestBrandData[selectedFilter.brand]"
                      :key="index"
                      :style="{ transform: `translateX(-${bestBrandSliderCurrent * 100}%)` }"
                    >
                        <li
                          v-for="(item, idx) in data"
                          :key="idx"
                        >
                            <img
                              :src="item.img"
                              :alt="item.img"
                              class="object-contain"
                            />
                            <dl class="brand__detail">
                                <strong class="brand__name">{{ item.brand }}</strong>
                                <dd class="brand__locations">{{ item.locations.toLocaleString() }} Locations</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <button
                  :disabled="bestBrandSliderCurrent === 0"
                  class="banner-nav__btn left"
                  @click="() => bestBrandSliderCurrent = (bestBrandSliderCurrent - 1 + bestBrandData[selectedFilter.brand].length) % bestBrandData[selectedFilter.brand].length"
                >
                    <LeftArrowSvg />
                </button>
                <button
                  :disabled="bestBrandSliderCurrent >= bestBrandData[selectedFilter.brand]?.length - 1"
                  class="banner-nav__btn right"
                  @click="() => bestBrandSliderCurrent = (bestBrandSliderCurrent + 1) % bestBrandData[selectedFilter.brand].length"
                >
                    <RightArrowSvg />
                </button>
            </aside>
            <a class="see-all-btn" href="/brands">
                See All Brand
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="#979797"
                      stroke-width="2"
                    />
                </svg>
            </a>
        </section>
        <section class="pt-[51px] pb-[65px] main-section budget-section bg-white-17">
            <div class="main-section__wrapper w-[1121px]">
                <div class="flex justify-between">
                    <h1 class="main-section__title">
                        <p class="flex items-center mb-2 h-fit">
                            BY BUDGET
                            <CoinSvg />
                        </p>
                        RECOMMEND
                    </h1>
                    <ul class="inline-flex gap-2.5">
                        <li
                          :data-active="filter.min === selectedFilter.budget"
                          class="cursor-pointer text-nowrap border border-[#DADADA] h-11 w-[120px] text-center py-2.5 rounded-[29px] text-base leading-[22px] font-semibold text-zinc-01 bg-white-20 hover:text-white-20 hover:bg-blue-05 hover:border-blue-05 data-[active=true]:text-white-20 data-[active=true]:bg-blue-05 data-[active=true]:border-blue-05"
                          v-for="filter in budgetFilter"
                          :key="filter.min"
                          @click="() => {
                        budgetSliderCurrent = 0;
                        selectedFilter.budget = filter.min;
                    }"
                        >{{ filter.label }}</li>
                    </ul>
                </div>
                <aside class="relative">
                    <div class="flex overflow-hidden product-wrapper">
                        <ul
                          class="mt-8 mb-12 product"
                          v-for="(data, index) in budgetData[selectedFilter.budget]"
                          :key="index"
                          :style="{ transform: `translateX(-${budgetSliderCurrent * 100}%)` }"
                        >
                            <li
                              v-for="(item, idx) in data"
                              :key="idx"
                            >
                                <figure class="relative">
                                    <img
                                      :src="item.img"
                                      :alt="item.img"
                                    />
                                    <figcaption v-if="item.is_soldout">
                                        <span>SOLD OUT</span>
                                    </figcaption>
                                </figure>
                                <dl class="product__detail">
                                    <strong class="product__brand">{{ item.brand }}</strong>
                                    <dd class="product__name">{{ item.name }}</dd>
                                    <dd class="product__price">
                                        <strong class="product__price-sale">P{{ item.sale_price }}</strong>
                                        <s class="product__price-origin">P{{ item.price }}</s>
                                    </dd>
                                    <dd class="buttons">
                                        <button>Buy Now</button>
                                        <button>
                                            <ProductCartSvg /> Add to Cart
                                        </button>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <button
                      :disabled="budgetSliderCurrent === 0"
                      class="banner-nav__btn left"
                      @click="() => budgetSliderCurrent = (budgetSliderCurrent - 1 + budgetData[selectedFilter.budget].length) % budgetData[selectedFilter.budget].length"
                    >
                        <LeftArrowSvg />
                    </button>
                    <button
                      :disabled="budgetSliderCurrent >= budgetData[selectedFilter.budget]?.length - 1"
                      class="banner-nav__btn right"
                      @click="() => budgetSliderCurrent = (budgetSliderCurrent + 1) % budgetData[selectedFilter.budget].length"
                    >
                        <RightArrowSvg />
                    </button>
                </aside>
                <a href="/budget" class="see-all-btn">See More
                    <svg
                      width="9"
                      height="14"
                      viewBox="0 0 9 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                          d="M1 1L7 7L1 13"
                          stroke="#979797"
                          stroke-width="2"
                        />
                    </svg>
                </a>
            </div>
        </section>
    </main>
    <footer class="service-footer">
        <div>
            <aside>
                <div>
                    <img
                      src="/assets/images/biz_treats_log.png"
                      alt="footer-log"
                    />
                    <h4>
                        {{ snsMenu.title }}
                    </h4>
                    <div>
                        <a
                          v-for="sns in snsMenu.children"
                          :key="sns.name"
                        >
                            <img
                              :src="sns.icon"
                              :alt="sns.name"
                            />
                        </a>
                    </div>
                </div>
                <div
                  v-for="menu in menus"
                  :key="menu.title"
                >
                    <h4>
                        {{ menu.title }}
                    </h4>
                    <template
                      v-for="sub in menu.children"
                      :key="sub.title"
                    >
                        <a
                          :href="sub.link"
                          :target="sub.target"
                          :alt="sub.name"
                        >
                            {{ sub.name }}
                        </a>
                    </template>
                </div>
            </aside>
        </div>
        <hr />
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
