<script>
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { snsMenu, menus, mainMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart';
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
            current: 1,
            slider: null,
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
            const total = this.slider ? [...Array(this.slider.track.details.slides.length).keys()] : []
            return `${total.length < 10 ? '0' : ''}${total.length}`
        },
        currentSlider() {
            return `${this.current < 10 ? '0' : ''}${this.current}`
        },
    },
    mounted() {
        // https://keen-slider.io/
        this.slider = new KeenSlider(this.$refs.slider, {
            loop: true,
            drag: false,
            slides: { origin: "center", perView: 'auto', spacing: 30 },
            slideChanged: (s) => {
                this.current = s.track.details.rel + 1
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
    },
    beforeUnmount() {
        if (this.slider) this.slider.destroy();
    }
}
</script>
<template>
    <header class="service-header">
        <div>
            <nav>
                <a href="/">
                    <img src="/assets/images/biz_treats_log.png" />
                </a>
                <div class="search-input">
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
            <aside class="relative w-full h-full overflow-hidden main-banner slider">
                <ul
                  class="flex h-[327px] w-full select-none keen-slider"
                  ref="slider"
                >
                    <li
                      class="w-[812px] max-w-[812px] min-w-[812px] min-h-full keen-slider__slide"
                      :class="`number-slide${idx + 1}`"
                      v-for="(banner, idx) in slides"
                      :key="banner"
                    >
                        <div
                          v-if="current !== idx + 1"
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
                      v-if="slider"
                      @click="slider.prev()"
                    >
                        <SliderLeftSvg />
                    </span>
                    <span class="text-[#5F5F5F] text-xl leading-7 font-medium select-none ml-4">{{ currentSlider
                        }}</span>
                    <span class="text-[#C8CAD2] text-xl leading-7 font-medium select-none mx-1.5">/</span>
                    <span class="text-[#C8CAD2] text-xl leading-7 font-medium select-none mr-4">{{ totalSlider }}</span>
                    <span
                      class="p-[11px] rounded-full bg-white-20 shadow-[0_4px_8px_0_#00000015] cursor-pointer"
                      v-if="slider"
                      @click="slider.next()"
                    >
                        <SliderRightSvg />
                    </span>
                </div>
            </aside>
        </section>
        <section class="pt-24 main-section keyword-section bg-white-17 h-96">
            <div class="main-section__wrapper">
                <div class="flex justify-between">
                    <h1 class="main-section__title">
                        <p class="flex items-center mb-2 h-fit">
                            HOT
                            <FireSvg />
                        </p>
                        KEYWORD
                    </h1>
                    <ul>
                        <li>#Chicken</li>
                        <li>#Coffee</li>
                        <li>#eGift</li>
                        <li>#Dessert</li>
                        <li>#Burger</li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="main-section best-brands-section bg-white-20 h-96">
            <div class="main-section__wrapper">
                <h1 class="main-section__title">
                    <p class="flex items-center gap-2 h-fit">
                        BEST BRANDS
                        <TrophySvg />
                    </p>
                </h1>
                <ul>
                    <li>Best-Brands</li>
                    <li>eWallet & Shopping</li>
                    <li>Grocery & Essentials</li>
                    <li>Fast Food</li>
                    <li>Casual Resto</li>
                    <li>Bread & Dessert</li>
                    <li>Drugstore & Wellness</li>
                    <li>Best-Brands</li>
                    <li>eWallet & Shopping</li>
                    <li>Grocery & Essentials</li>
                    <li>Fast Food</li>
                    <li>Casual Resto</li>
                    <li>Bread & Dessert</li>
                    <li>Drugstore & Wellness</li>
                    <li>Beauty & Lifestyle</li>
                    <li>Transpo & Travel</li>
                    <li>Digital & Appliance</li>
                    <li>Home & Kids</li>
                    <li>Beauty & Lifestyle</li>
                    <li>Transpo & Travel</li>
                    <li>Digital & Appliance</li>
                    <li>Home & Kids</li>
                </ul>
            </div>
        </section>
        <section class="main-section recommend-section bg-white-17 h-96">
            <div class="main-section__wrapper">
                <div class="flex justify-between">
                    <h1 class="main-section__title">
                        <p class="flex items-center mb-2 h-fit">
                            BY BUDGET
                            <CoinSvg />
                        </p>
                        RECOMMEND
                    </h1>
                    <ul class="main-section__filter">
                        <li>Below P50</li>
                        <li>P51~P100</li>
                        <li>P101~P300</li>
                        <li>P301~P500</li>
                        <li>P501 and UP</li>
                    </ul>
                </div>
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
