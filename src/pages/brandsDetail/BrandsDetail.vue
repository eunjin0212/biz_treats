<script>
import { snsMenu, menus, mainMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart';
import { genBrandsMockData } from '@/mock/home';
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
import TrophySvg from '@/assets/icons/TrophySvg.vue';
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
        TrophySvg,
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
            selectedFilter: {
                brand: 'ALL',
            },
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
    },
    mounted() {
        this.bestBrandData = this.bestBrand.reduce((obj, data) => {
            const originArray = this.bestBrand.filter((item) => item.keyword === data.keyword)
            obj[data.keyword] = data.keyword === 'ALL' ? this.genBanner(this.bestBrand, 12) : this.genBanner(originArray, 12)
            return obj
        }, {})
    },
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
            <button class="see-all-btn">
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
            </button>
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
