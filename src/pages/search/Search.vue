<script>
import { snsMenu, menus, mainMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart.js';
import { genProductData } from '@/mock/product.js';
import { alertData } from '@/mock/alertData.js'
import { getParams, handleSearch } from '@/modules/search.js';
import { goProductDetail } from '@/modules/product.js'
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
import ProductCartSvg from '@/assets/icons/ProductCartSvg.vue';
import RetrySvg from '@/assets/icons/RetrySvg.vue'
import LoadingSvg from '@/assets/icons/LoadingSvg.vue';
import CartCardSvg from '@/assets/icons/CartCardSvg.vue';

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
        ProductCartSvg,
        RetrySvg,
        LoadingSvg,
        CartCardSvg,
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
                min: '',
                max: '',
            },
            resultData: [],
            observer: null,
            pagination: {
                page: 1,
                perPage: 8,
                lastPage: 100,
            },
            loading: false,
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
        getParams,
        handleSearch,
        goProductDetail,
        async getProductList() {
            if (this.loading) return;
            try {
                this.loading = true;
                setTimeout(() => {
                    this.resultData = [...this.resultData, ...genProductData(this.pagination.perPage)]
                    this.loading = false
                }, 1000);
                this.pagination.page += 1
            } catch (error) {
                // error handle
                this.loading = false
            }
        }
    },
    mounted() {
        this.getProductList()
        const target = this.$refs.sentinel
        this.observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                if (this.pagination.lastPage === this.pagination.page) {
                    this.observer.unobserve(target)
                    return
                }
                this.getProductList()
            },
            {
                threshold: 0,   
            }
        );

        this.observer.observe(target)
    },
    beforeUnmount() {
        this.observer.disconnect();
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
}
</script>
<template>
    <header class="service-header">
        <div class="!w-[1120px]">
            <nav>
                <a
                  href="/"
                  class="!mr-5"
                >
                    <img src="/assets/images/biz_treats_log.png" />
                </a>
                <div class="search-input !w-[442px]">
                    <input
                      type="text"
                      placeholder="Search for Treats"
                      @keypress.enter="() => handleSearch(search)"
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
        <h1
          class="text-[#6E6E6E] font-bold text-[32px] leading-[56px] -tracking-wide text-center py-[30px] border-b-2 border-b-[#CECECE] w-[1120px] mx-auto"
        >Search result<strong class="text-blue-05 font-bold text-3xl leading-[56px] -tracking-wide ml-3">“{{
                        getParams()[1] }}”</strong></h1>
        <ul class="w-[1120px] mx-auto bg-white-20">
            <li class="border-b border-b-[#EAEAEA] py-2 flex items-center">
                <strong class="inline-block w-32 min-w-32 pl-6 text-[#696969] font-semibold text-sm">Price</strong>
                <label class="!inline-flex !flex-row items-center input !gap-1.5">
                    <input
                      class="w-[136px]"
                      v-model="selectedFilter.min"
                      placeholder="Low"
                    />
                    <span class="text-gray-04">~</span>
                    <input
                      class="w-[136px]"
                      v-model="selectedFilter.max"
                      placeholder="High"
                    />
                </label>
            </li>
            <li class="pr-3.5 py-2 border-b border-b-gray-07 flex justify-end items-center gap-3">
                <button
                  class="w-10 h-10 p-0.5 border rounded border-blue-05 hover:bg-sky-50 text-blue-05"
                  @click="() => {
                        selectedFilter.keyword = keyword[0]
                        selectedFilter.min = 0
                        selectedFilter.max = 0
                    }"
                >
                    <RetrySvg />
                </button>
                <button
                  class="w-[157px] h-10 border border-blue-05 rounded py-2 px-4 hover:bg-sky-50 text-blue-05">Search</button>
            </li>
        </ul>
        <section class="pt-4 pb-40 main-section search-section bg-white-17">
            <div class="main-section__wrapper">
                <ul class="mb-12 product">
                    <li
                      v-for="(item, index) in resultData"
                      :key="index"
                    >
                        <figure
                          class="relative"
                          @click="() => goProductDetail(index)"
                        >
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
                                <button>
                                    <CartCardSvg />Buy Now</button>
                                <button>
                                    <ProductCartSvg />Add to Cart
                                </button>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div
                  ref="sentinel"
                  class="w-full h-px bg-transparent"
                ></div>
                <div
                  v-show="loading"
                  class="flex items-center justify-center w-full bg-transparent"
                >
                    <LoadingSvg />
                    Loading...
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
