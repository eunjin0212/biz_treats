<script>
import { snsMenu, menus, mainMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart.js';
import { genProductData } from '@/mock/product.js';
import { alertData } from '@/mock/alertData.js'
import { getParams } from '@/modules/search.js';
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
import TabSearchSvg from '@/assets/icons/TabSearchSvg.vue';

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
        TabSearchSvg,
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
            resultData: genProductData(100),
            tabs: ['Description', 'Participating Stores'],
            tab: 'Description',
            storeSearch: '',
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
        async handleSearch() {
            // get data with filter
        },
        getParams,
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
        <section class="pt-4 mb-40 bg-white-18 w-[1120px] mx-auto">
            <div class="flex items-center justify-center py-16 mb-4 bg-white-20">
                <figure class="overflow-hidden relative border rounded-lg border-white-00 w-[370px] h-[370px] p-9">
                    <img
                      :src="`path/assets/img_${getParams()[1]}.png`"
                      :alt="`path/assets/img_${getParams()[1]}.png`"
                      class="object-contain w-full h-full"
                    />
                    <figcaption
                      class="bg-[#00000033] absolute w-full h-full top-0 left-0 inline-flex justify-center items-center"
                      v-if="false"
                    >
                        <span
                          class="inline-flex justify-center items-center w-[170px] h-[170px] border-[5px] border-red-11 text-red-11 font-bold rounded-full bg-white-20/95 text-[32px] leading-8 -rotate-[17.19deg] text-wrap text-center"
                        >SOLD OUT</span>
                    </figcaption>
                </figure>
                <dl class="ml-[42px] w-[370px]">
                    <dd class="text-base leading-[14px] font-semibold -tracking-wide text-[#979797] mb-3">The Coffee
                        Bean & Tea Leaf</dd>
                    <dd class="text-[28px] leading-9 font-semibold -tracking-wide text-[#606060] mb-10">P100 Worth
                        Voucher</dd>
                    <dd class="text-blue-05 text-[32px] -tracking-wide leading-[26px] font-bold">P259<s
                          class="ml-1 text-2xl font-medium leading-6 -tracking-wide text-secondary-05"
                        >P315</s></dd>
                    <dd
                      class="bg-white-16 text-[#A8A8A8] text-sm leading-[14px] font-medium -tracking-wide py-2 px-4 rounded-md mt-[30px]"
                    ><span class="text-[#9C9C9C] mr-2">•</span>Treats Code Validity : 60days</dd>
                    <hr class="border-t-[#EDEDED] mt-[22px] mb-3">
                    <dd class="flex items-center gap-2">
                        <button
                          class="py-4 px-6.5 min-w-[134px] border border-blue-05 text-blue-05 text-base font-medium leading-5 hover:bg-sky-50"
                        >Buy Now</button>
                        <button
                          class="inline-flex items-center justify-center flex-grow bg-blue-05 py-4 px-6.5 text-white-20 min-w-56"
                        >
                            <ProductCartSvg class="w-6 h-6 mr-3 text-white-20" /> Add to Cart
                        </button>
                    </dd>
                </dl>
            </div>
            <div
              class="flex items-center row bg-[#F3F5F7] border-b border-b-blue-05"
            >
                <div
                  v-for="value in tabs"
                  :key="value"
                  class="py-4 w-[284px] cursor-pointer text-center font-semibold text-base leading-6 -tracking-wide text-[#717171] data-[active=true]:bg-blue-05 data-[active=true]:text-white-20 data-[active=true]:text-lg"
                  :data-active="tab === value"
                  @click="() => {
                        tab = value
                        storeSearch = ''
                    }"
                >{{ value }}{{ value === 'Participating Stores' ? ` (${129})` : '' }}
                </div>
                <hr
                  class="w-px h-5 border-l border-l-[#CECECE]"
                  v-if="tab === 'Description'"
                >
            </div>
            <template v-if="tab === 'Description'">
                <div class="px-10 pt-12 pb-[76px] border border-white-15 bg-white-20">
                    <p
                      class="bg-[#F9FAFB] py-3 px-4.5 flex items-center text-blue-05 font-semibold text-base leading-[22px]">
                        <span class="mr-3 w-1.5 h-1.5 block bg-blue-05"></span>About MESA
                    </p>
                    <ul class="mt-3.5 pl-[30px]">
                        <li class="text-[#6E6E6E] text-base leading-[22px] -tracking-wide font-medium">
                            Mesa Philippines is the first and only grill-restaurant that provides on the spot grilling
                            right
                            at your table, with innovative Filipino Modern Dishes, and has now 60+ branches nationwide.
                        </li>
                    </ul>
                </div>
                <div class="px-10 pt-12 pb-[85px] border border-white-15 bg-white-20">
                    <p
                      class="bg-[#F9FAFB] py-3 px-4.5 flex items-center text-blue-05 font-semibold text-base leading-[22px]">
                        <span class="mr-3 w-1.5 h-1.5 block bg-blue-05"></span>HOW TO REDEEM TREATS
                    </p>
                    <ul class="mt-3.5 pl-6">
                        <li
                          class="list-decimal list-inside text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium"
                        >
                            Simply present the SMS or Email with the Treats code to the store for verification.
                        </li>
                        <li
                          class="list-decimal list-inside text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium"
                        >
                            Tell the store frontliner that you want to claim Treats.
                        </li>
                        <li
                          class="list-decimal list-inside text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium"
                        >
                            Treats will be released once the code has been verified by the store.
                        </li>
                    </ul>
                </div>
                <div class="px-10 pt-12 pb-[76px] border border-white-15 bg-white-20">
                    <p
                      class="bg-[#F9FAFB] py-3 px-4.5 flex items-center text-blue-05 font-semibold text-base leading-[22px]">
                        <span class="mr-3 w-1.5 h-1.5 block bg-blue-05"></span>TERMS OF USE
                    </p>
                    <ul class="mt-3.5 pl-11">
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">
                            eVoucher code is valid immediately after receiving it and until the validity period. (Please
                            refer to SMS or Email received)</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">It can
                            be redeemed only in participating Merchant branches.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">
                            Available for Dine in and Take out transactions only.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">One
                            time use, and unused amount will be forfeited. </li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">Extra
                            charges will apply in excess value of the eVoucher.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">No
                            maximum number of redemptions per day.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">Order
                            cannot be cancelled once processed. No refunds and cancellation will be entertained.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">
                            eVoucher may not be redeemed when the store is offline or out of stock.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">
                            eVoucher is not exchangeable for cash or credit and can’t be used in conjunction with any
                            other promo or discount.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">The
                            recipient is responsible for the safekeeping of the eVoucher code. This should only be
                            presented to the branch/store crew. Share Treats is not liable for any misused codes.</li>
                        <li class="list-disc text-[#6E6E6E] text-base leading-[37px] -tracking-wide font-medium">The
                            Merchant is responsible for the quality of their products and/or services.</li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <div
                  class="bg-white-20 border border-white-15 border-t-0 px-[42px] pt-4 pb-7 border-b border-b-[#E3E2E5]"
                >
                    <p class="text-[#717171] font-poppins font-semibold text-base leading-7 mb-2.5">Enter the keyword
                    </p>
                    <div class="flex gap-4">
                        <label
                          class="flex flex-grow border border-[#1211271F] rounded-md bg-white-20 focus:border-[#1211271F] focus-visible:border-[#1211271F] focus:ring-0 ring-0 p-[15px] font-normal text-sm leading-[26px]"
                        >
                            <TabSearchSvg />
                            <input
                              v-model="storeSearch"
                              placeholder="Search"
                              class="ml-3.5 p-0 border-0 focus:border-0 focus-visible:border-0 focus:ring-0 w-full h-full placeholder:text-[#12112766] bg-transparent"
                            />
                        </label>
                        <button
                          class="w-[158px] min-w-[158px] rounded-md bg-blue-05 text-white-20 py-3.5 px-8 font-medium text-base leading-6 font-poppins"
                        >Search</button>
                    </div>
                </div>
                <div class="bg-white-20 py-3.5 px-11 border border-white-15 border-t-0">
                    <div class="accordion-container">
                        <p class="accordion-title">
                            <strong>title</strong>
                            <span>description</span>
                        </p>
                    </div>
                </div>
            </template>
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
