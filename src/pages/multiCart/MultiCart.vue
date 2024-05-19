<script>
import { navMenu, snsMenu, menus, lnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { cartData } from '@/mock/cart.js'
import moment from 'moment';
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
import CartCalendarSvg from '@/assets/icons/CartCalendarSvg.vue';
import ClockSvg from '@/assets/icons/ClockSvg.vue';

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
        CartCalendarSvg,
        ClockSvg,
    },
    data() {
        const orderData = {
            0: {
                recipient: 0,
                quantity: 0,
                isSchedule: false,
                date: '',
                time: '',
            },
            1: {
                recipient: 200,
                quantity: 200,
                isSchedule: true,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('h:mm A'),
            },
            2: {
                recipient: 200,
                quantity: 200,
                isSchedule: true,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('h:mm A'),
            },
        }
        return {
            navMenu,
            snsMenu,
            menus,
            lnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            cartData,
            orderData,
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
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
        handleSchedule(id) {
            this.orderData[id].isSchedule = !this.orderData[id].isSchedule
            this.orderData[id].date = moment().format('YYYY-MM-DD')
            this.orderData[id].time = moment().format('h:mm A')
        },
        handleScheduleDate(event, id) {
            this.orderData[id].date = moment(event.target.value).format('YYYY-MM-DD')
        },
        handleScheduleTime(event, id) {
            this.orderData[id].time = moment(event.target.value).format('h:mm A')
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
        handleDisplayScheduleDate: function () {
            return (id) => moment(this.orderData[id].date).format('MMMM DD, YYYY')
        },
        handleDisplayScheduleTime: function () {
            return (id) => moment(`${this.orderData[id].date} ${this.orderData[id].time}`).format('h:mm A')
        },
        handleDisplayScheduleSending: function () {
            return (id) => moment(`${this.orderData[id].date} ${this.orderData[id].time}`).format('MM.DD.YYYY HH:mm')
        },
        handleUnavailableTime: function () {
            return (id) => (moment(`${this.orderData[id].date} ${this.orderData[id].time}`, 'YYYYMMDDhhmmss').fromNow()).includes('ago') ? '*It’s a unavailable set time.' : ''
        },
        getOrders: function () {
            const sendData = Object.keys(this.orderData).filter((id) => +this.orderData[id].isSchedule)
            return this.cartData.filter((cart) => sendData.includes(String(cart.id)))
        },
        getInsufficientStock: function () {
            return (order) => +order.available_stock >= +order.quantity
        }
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
                <button class="header-btn inline-flex ml-4.5">
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
    <main class="bg-white-17 flex w-[1240px] mx-auto justify-between gap-3 pt-[46px] pb-[70px]">
        <section class="flex flex-col flex-grow max-w-[876px]">
            <div class="relative section-card !mx-0 !my-0 !px-0">
                <h2 class="pl-4"><span class="!bg-primary-250"></span>
                    <div class="text-blue-500">{{ cartData.length }}</div>&nbsp;Items in your cart
                </h2>
                <button
                  class="absolute top-5 right-9 px-5.5 py-2 text-sm font-semibold border rounded border-error text-error"
                >Delete All</button>
                <hr class="!mx-0 !mt-0 !mb-5 border-white-10" />
                <ul
                  v-for="cart in cartData"
                  :key="cart.id"
                  class="mb-6 overflow-hidden border rounded-md mx-7 border-gray-07"
                >
                    <li class="px-4 py-3.5 border-b border-b-gray-07">
                        <div class="px-4 py-2 rounded-lg bg-white-18 inline-flex gap-3.5 w-full">
                            <img
                              :src="cart.product_img"
                              :alt="cart.name"
                              class="w-20 h-20 border border-gray-09"
                            />
                            <ul class="inline-flex flex-col w-full gap-1">
                                <li class="font-medium text-[13px] leading-4 text-black-100">{{ cart.brand }}</li>
                                <li class="!inline-flex items-center justify-between">
                                    <div class="text-base font-normal leading-5 text-secondary-04 mb-0.5">
                                        {{ cart.name }}
                                    </div>
                                    <div class="text-xs leading-3.5 text-blue-300 font-normal">Recipient/Quantity</div>
                                </li>
                                <li class="!inline-flex items-center justify-between">
                                    <div class="text-base font-bold leading-5 text-blue-300">
                                        {{ cart.point.toLocaleString() }}p
                                    </div>
                                    <i class="text-xl font-bold leading-6 text-blue-600">
                                        {{ orderData[cart.id]?.recipient || orderData[cart.id]?.quantity ?
                        `${orderData[cart.id]?.recipient}/${orderData[cart.id]?.quantity}` : '-' }}
                                    </i>
                                </li>
                                <li
                                  class="bg-red-01 py-1 px-1.5 text-red-500 text-[10px] leading-3 font-normal rounded-sm w-fit"
                                >
                                    Available stock : {{ cart.available_stock.toLocaleString() }}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="inline-flex justify-between px-4 py-1.5 border-b border-b-gray-07 w-full">
                        <span class="text-sm font-medium font-manrope text-secondary-04">Recipient Upload</span>
                    </li>
                    <li class="inline-flex justify-between px-4 py-1.5 border-b border-b-gray-07 w-full">
                        <span class="text-sm font-medium font-manrope text-secondary-04">Schedule Sending</span>
                        <label class="toggle">
                            <input
                              type="checkbox"
                              @change="() => handleSchedule(cart.id)"
                              :checked="orderData[cart.id].isSchedule"
                            />
                            <span class="slider round"></span>
                        </label>
                    </li>
                    <li
                      v-if="orderData[cart.id].isSchedule"
                      class="border-b border-b-gray-07 bg-white-11 py-2 px-3.5"
                    >
                        <div class="inline-flex items-center w-full gap-2">
                            <label class="date-picker no-hover !w-fit !h-11 py-2 px-3 !rounded-md">
                                <CartCalendarSvg class="mr-3" />
                                <input
                                  type="date"
                                  :value="orderData[cart.id].date"
                                  @change="(e) => handleScheduleDate(e, cart.id)"
                                />
                                <p class="inline-flex flex-col">
                                    <span class="text-[10px] leading-3 font-medium text-slate-01">Date</span>
                                    <span class="text-xs font-normal text-black-200 text-nowrap">{{
                        handleDisplayScheduleDate(cart.id) }}</span>
                                </p>
                            </label>
                            <label class="time-picker no-hover">
                                <ClockSvg class="mr-3" />
                                <input
                                  type="time"
                                  class="absolute top-0 left-0 z-10 w-full h-full p-0 opacity-0"
                                  :value="orderData[cart.id].time"
                                  @change="(e) => handleScheduleTime(e, cart.id)"
                                />
                                <p class="inline-flex flex-col">
                                    <span class="text-[10px] leading-3 font-medium text-slate-01">Time</span>
                                    <span class="text-xs font-normal text-black-200 text-nowrap">{{
                        handleDisplayScheduleTime(cart.id) }}</span>
                                </p>
                            </label>
                            <input
                              placeholder="Enter Message"
                              type="text"
                              class="rounded-md h-11 font-medium text-xs w-full leading-6 border-white-10 px-3.5 py-2.5 focus:border-white-10 focus-visible:border-white-10 focus:ring-0 ring-0 placeholder:text-[#C6C6C6]"
                            />
                        </div>
                        <p class="text-[10px] font-normal leading-3 text-red-500 mt-2">{{ handleUnavailableTime(cart.id)
                            }}</p>
                    </li>
                    <li class="px-4 py-1.5 w-full text-right">
                        <button
                          class="text-gray-03 font-medium text-[15px] leading-6 px-6.5 py-2 border rounded-lg border-white-10"
                        >Delete</button>
                    </li>
                </ul>
            </div>
        </section>
        <aside
          class="w-[352px] inline-block min-h-[687px] bg-white-20 border border-white-05 rounded-xl shadow-[0px_40px_32px_-24px] shadow-[#0F0F0F1F]"
        >
            <div class="section-card !mx-0 !my-0 !p-5 h-full">
                <h2 class="!ml-0 !mb-5"><span class="!bg-primary-250"></span>
                    Order Summary
                </h2>
                <p class="text-slate-01 font-semibold text-[13px] leading-4">{{ getOrders.length }} Items</p>
                <ul
                  class="border rounded-lg p-3.5 mt-2.5"
                  :class="getInsufficientStock(order) ? 'border-[#E2E1E1]' : 'border-red-800'"
                  v-for="order in getOrders"
                  :key="order.id"
                >
                    <li
                      class="text-[13px] leading-4 text-black-100 font-medium inline-flex justify-between items-center w-full"
                    >
                        {{ order.brand }}
                        <span class="text-base font-semibold leading-5 text-blue-300">{{ (order.point *
                        order.quantity).toLocaleString() }}P</span>
                    </li>
                    <li class="mb-2 text-sm font-normal leading-4 text-stone-05">{{ order.name }}</li>
                    <li class="bg-[#F2F2F2] rounded-md px-2 text-[13px] leading-6 font-semibold text-blue-700 w-fit">
                        QTY: {{ order.quantity }}
                    </li>
                    <li v-if="getInsufficientStock(order)" class="text-xs leading-3.5 font-normal text-[#9A9FA5] mt-1">
                        [Reserved] {{ handleDisplayScheduleSending(order.id) }}
                    </li>
                    <li
                      v-if="!getInsufficientStock(order)"
                      class="mt-2 text-sm font-medium text-red-800"
                    >Insufficient Stock</li>
                </ul>
            </div>
        </aside>
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
