<script>
import { snsMenu, menus, mainMenu, categoryFilter } from '@/constants/components.js';
import { cartData } from '@/mock/cart.js';
import { genBrandsMockData } from '@/mock/brand.js';
import { alertData } from '@/mock/alertData.js'
import { handleSearch } from '@/modules/search.js';
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
                category: 'ALL'
            },
            categoryFilter,
            brands: genBrandsMockData(100),
            brandsData: {},
            isScroll: false,
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
        handleBrandClick(id) {
            window.location.href = `/brandsDetail?id=${id}`
        },
        handleSearch,
        headerScroll() {
            const stickyDiv = document.getElementById('stickyDiv');
            this.isScroll = stickyDiv ? window.scrollY >= stickyDiv.offsetTop : false;
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
        this.brandsData = this.categoryFilter.reduce((obj, data) => {
            const originArray = this.brands.filter((item) => item.keyword === data.label)
            obj[data.label] = data.label === 'ALL' ? this.brands : originArray
            return obj
        }, {})
        
        window.addEventListener('scroll', this.headerScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.headerScroll);
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
                    <img src="/assets/images/biztreats_logo.svg" />
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
        <nav class="w-full main-menu min-w-[1440px] mb-4.5">
            <div>
                <a
                  :class="{ 'active-main-menu': matchPath(menu.path) }"
                  v-for="menu in mainMenu"
                  :key="menu.title"
                  :href="menu.path"
                >{{ menu.title }}</a>
            </div>
        </nav>
        <div
          class="min-w-[1120px] w-full mx-auto pt-1 sticky top-0 z-20"
          :class="isScroll ? 'bg-white-20 border-b border-b-[#CECECE]' : 'bg-white-17'"
          id="stickyDiv"
        >
            <ul class="flex gap-[54px] w-[1120px] mx-auto justify-center">
                <li
                  v-for="category in categoryFilter"
                  :key="category.label"
                  :data-active="category.label === selectedFilter.category"
                  class="category-filter group"
                  @click="() => {
                        selectedFilter.category = category.label;
                    }"
                >
                    <div>
                        <img
                          v-if="category.label === selectedFilter.category"
                          :src="`/assets/icons/${category?.icon}_on.png`"
                        />
                        <img
                          v-else
                          :src="`/assets/icons/${category?.icon}_off.png`"
                        />
                    </div>
                    <span
                      :class="category.textClass"
                      class="group-data-[active=true]:font-semibold group-data-[active=true]:text-blue-05 group-data-[active=true]:before:content-[''] group-data-[active=true]:before:absolute group-data-[active=true]:before:bottom-0 group-data-[active=true]:before:w-full group-data-[active=true]:before:h-[2px] group-data-[active=true]:before:bg-blue-05"
                    >
                        {{ category.label }}
                    </span>
                </li>
            </ul>
        </div>
        <hr class="border-t-1 border-t-[#CECECE] w-[1120px] mx-auto" />
        <section class="pt-5 pb-40 main-section bg-white-17">
            <div class="main-section__wrapper">
                <ul class="grid grid-cols-[repeat(3,minmax(344px,344px))] gap-x-11 gap-y-9">
                    <li
                      v-for="(item, idx) in brandsData[selectedFilter.category]"
                      :key="idx"
                      class="cursor-pointer"
                      @click="() => handleBrandClick(item.id)"
                    >
                        <figure class="flex flex-col items-center">
                            <img
                              :src="item.img"
                              :alt="item.img"
                              width="344"
                              height="228"
                              class="object-contain h-[228px] rounded-2xl"
                            />
                            <figcaption
                              class="text-center mt-5 pt-2 pb-2.5 w-full border-t border-b border-b-[#CACACA] border-t-[#CACACA]"
                            >
                                <strong
                                  class="block text-[#626262] mb-1 font-semibold text-xl leading-6 -tracking-wide"
                                >{{ item.brand }}</strong>
                                <span class="text-[#909090] -tracking-wide leading-[18px] text-[13px] font-normal">{{
                        item.locations.toLocaleString() }} Locations</span>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>
        </section>
    </main>
    <footer class="service-footer">
        <div>
            <aside>
                <div>
                    <img
                      src="/assets/images/biztreats_logo.svg"
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
