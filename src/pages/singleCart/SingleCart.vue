<script>
import { navMenu, snsMenu, menus, lnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { singleCartData, cartData } from '@/mock/cart.js'
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
import CardWalletSvg from '@/assets/icons/CardWalletSvg.vue';

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
        CardWalletSvg,
    },
    data() {
        const orderData = {
            0: {
                recipient: [],
                quantity: 0,
                isSchedule: true,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm:ss'),
            },
        }
        const initForm = {
            name: '',
            qty: '',
            mobile_number: '',
            email: '',
            massage: '',
            notes: '',
        }
        const recipientForm = [
            { label: 'Recipient Name', value: 'name', contentClass: 'w-[222px]', class: 'col-span-2 grid-cols-[150px_auto]', placeholder: 'Enter Recipient Name', type: 'text' },
            { label: 'Qty', value: 'qty', contentClass: 'w-[261px]', class: 'col-span-2 grid-cols-[112px_auto]', placeholder: 'Enter Qty', type: 'text' },
            { label: 'Recipient Mobile Number', value: 'mobile_number', contentClass: 'w-[222px]', class: 'col-span-2 grid-cols-[150px_auto]', placeholder: 'Enter Recipient Mobile Number', type: 'text' },
            { label: 'Recipient Email', value: 'email', contentClass: 'w-[261px]', class: 'col-span-2 grid-cols-[112px_auto]', placeholder: 'Enter Recipient Email', type: 'email' },
            { label: 'Sending Message', value: 'massage', contentClass: 'w-[634px]', class: 'col-span-4 grid-cols-[150px_auto]', placeholder: 'Max 50', type: 'text' },
            { label: 'Notes', value: 'notes', contentClass: 'w-[634px]', class: 'col-span-4 grid-cols-[150px_auto]', placeholder: 'EnterPO / Ref#', type: 'text' },
        ]
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
            singleCartData,
            orderData,
            insufficientStock: [],
            recipientForm,
            isFormOpen: false,
            initForm,
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
        handleSchedule(toggleValue, id) {
            this.orderData[id].isSchedule = toggleValue
            this.orderData[id].date = toggleValue ? moment().format('YYYY-MM-DD') : ''
            this.orderData[id].time = toggleValue ? moment().format('hh:mm:ss') : ''
        },
        handleScheduleDate(event, id) {
            this.orderData[id].date = moment(event.target.value).format('YYYY-MM-DD')
        },
        handleScheduleTime(event, id) {
            this.orderData[id].time = moment(event.target.value).format('hh:mm:ss')
        },
        handlePayment() {
            const stock = this.singleCartData.filter((cart) => +cart.available_stock >= +this.orderData[cart.id].quantity)
            if (stock.length) {
                // modal open
                this.insufficientStock = stock
                return;
            }

            window.location.href = '/completed'
        },
        async updateRecipient() {
            // submit
        },
        handleForm() {
          this.isFormOpen = true;
          this.orderData[0].recipient.push({ ...this.initForm })
        },
        handleDelete(idx) {
            this.isFormOpen = this.orderData[0].recipient.length
            this.orderData[0].recipient.splice(idx, 1)
        }
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
            return (id) => {
                const checkDate = this.orderData[id].date && this.orderData[id].time

                if (checkDate) {
                    const fullDate = `${this.orderData[id].date} ${this.orderData[id].time.split(' ')[0]}`
                    return moment(fullDate).format('hh:mm A')
                }

                return ''
            }
        },
        handleDisplayScheduleSending: function () {
            return (id) => {
                const checkDate = this.orderData[id].date && this.orderData[id].time

                if (checkDate) {
                    const fullDate = `${this.orderData[id].date} ${this.orderData[id].time.split(' ')[0]}`
                    return moment(fullDate).format('MM.DD.YYYY HH:mm')
                }

                return ''
            }
        },
        handleUnavailableTime: function () {
            return (id) => (moment(`${this.orderData[id].date} ${this.orderData[id].time}`, 'YYYYMMDDhhmmss').fromNow()).includes('ago') ? '*It’s a unavailable set time.' : ''
        },
        getInsufficientStock: function () {
            return (cart) => +cart.available_stock >= +this.orderData[cart.id].quantity
        },
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
    <main class="bg-white-17 flex w-[1240px] mx-auto justify-between gap-3 pt-[46px] pb-[70px]">
        <section class="flex flex-col flex-grow max-w-[876px]">
            <div class="relative section-card !mx-0 !my-0 !px-0">
                <h2 class="pl-4"><span class="!bg-primary-250"></span>
                    Single Purchase (Up to 10 Recipients)
                </h2>
                <button
                  class="absolute top-5 right-9 px-5.5 py-2 text-sm font-semibold border rounded border-error text-error hover:bg-red-50"
                >Delete All</button>
                <hr class="!mx-0 !mt-0 !mb-5 border-white-10" />
                <ul
                  v-for="cart in singleCartData"
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
                        `${orderData[cart.id]?.recipient.length}/${orderData[cart.id]?.quantity}` : '-'
                                        }}
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

                    <li class="inline-flex justify-between items-center px-4 py-1.5 border-b border-b-gray-07 w-full">
                        <span class="text-sm font-medium font-manrope text-secondary-04">Schedule Sending</span>
                        <label class="toggle">
                            <input
                              type="checkbox"
                              @change="(e) => handleSchedule(e.target.checked, cart.id)"
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
                            <label class="date-picker no-hover !w-40 !h-11 py-2 px-3 !rounded-md">
                                <CartCalendarSvg class="mr-3" />
                                <input
                                  type="date"
                                  :value="orderData[cart.id].date"
                                  @change="(e) => handleScheduleDate(e, cart.id)"
                                />
                                <p class="inline-flex flex-col">
                                    <span class="text-[10px] leading-3 font-medium text-slate-01">Date</span>
                                    <span class="text-xs font-normal text-black-200 text-nowrap">
                                        {{ handleDisplayScheduleDate(cart.id) }}
                                    </span>
                                </p>
                            </label>
                            <label class="time-picker no-hover !w-40">
                                <ClockSvg class="mr-3" />
                                <input
                                  type="time"
                                  class="absolute top-0 left-0 z-10 w-full h-full p-0 opacity-0"
                                  :value="orderData[cart.id].time"
                                  @change="(e) => handleScheduleTime(e, cart.id)"
                                />
                                <p class="inline-flex flex-col">
                                    <span class="text-[10px] leading-3 font-medium text-slate-01">Time</span>
                                    <span class="text-xs font-normal text-black-200 text-nowrap">
                                        {{ handleDisplayScheduleTime(cart.id) }}
                                    </span>
                                </p>
                            </label>
                        </div>
                        <p
                          v-if="handleUnavailableTime(cart.id)"
                          class="text-[10px] font-normal leading-3 text-red-500 mt-2"
                        >
                            {{ handleUnavailableTime(cart.id) }}
                        </p>
                    </li>
                    <li class="inline-flex items-center justify-between w-full px-4 py-2">
                        <span class="text-sm font-medium font-manrope text-secondary-04">Recipient({{
                        orderData[cart.id].recipient.length }})</span>
                        <button
                          class="text-blue-300 border border-blue-300 py-2 w-[170px] rounded hover:bg-sky-50"
                          @click="handleForm"
                        >Add Recipient</button>
                    </li>
                    <template v-if="isFormOpen">

                    </template>
                    <li
                      v-for="(item, idx) in orderData[0].recipient"
                      :key="idx"
                      class="border-t border-t-gray-07"
                    >
                        <form class="bg-white-11 py-4.5 px-5 grid grid-cols-4 gap-x-10 gap-y-6">
                            <fieldset
                              v-for="recipient in recipientForm"
                              :key="recipient.value"
                              :class="recipient.class"
                              class="grid items-center"
                            >
                                <label
                                  class="inline-block text-xs font-medium leading-6 text-slate-01 -tracking-wide">{{
                        recipient.label }}</label>
                                <input
                                  class="!h-12 !-tracking-wide input"
                                  :name="recipient.value"
                                  v-model="item[recipient.value]"
                                  :class="recipient.contentClass"
                                  :placeholder="recipient.placeholder"
                                  :type="recipient.type"
                                />
                            </fieldset>
                            <button
                              @click="() => handleDelete(idx)"
                              type="button"
                              class="text-gray-03 justify-self-end bg-white-20 font-medium text-[15px] leading-6 px-6.5 py-2 border rounded-lg border-white-10 col-end-5 w-24 hover:bg-secondary-04-light"
                            >Delete</button>
                        </form>
                    </li>
                </ul>
            </div>
        </section>
        <aside
          class="w-[352px] inline-block h-fit min-h-[687px] bg-white-20 border border-white-05 rounded-xl shadow-[0px_40px_32px_-24px] shadow-[#0F0F0F1F]"
        >
            <div class="section-card !mx-0 !my-0 !p-5">
                <h2 class="!ml-0 !mb-5"><span class="!bg-primary-250"></span>
                    Order Summary
                </h2>
                <p class="text-slate-01 font-semibold text-[13px] leading-4">{{ singleCartData.length }} Items</p>
                <ul
                  class="border rounded-lg p-3.5 mt-2.5"
                  :class="(!!getInsufficientStock(cart) && !!handleDisplayScheduleSending(cart.id)) && (cart.point * cart.quantity)
                        ? 'border-[#E2E1E1]' : 'border-red-800'"
                  v-for="cart in singleCartData"
                  :key="cart.id"
                >
                    <li
                      class="text-[13px] leading-4 text-black-100 font-medium inline-flex justify-between items-center w-full"
                    >
                        {{ cart.brand }}
                        <span
                          v-if="getInsufficientStock(cart)"
                          :class="!(cart.point * cart.quantity) ? 'text-black-200' : 'text-blue-300'"
                          class="text-base font-semibold leading-5"
                        >
                            {{ (cart.point * cart.quantity)
                        ? (cart.point * cart.quantity).toLocaleString()
                        : '-'
                            }}P
                        </span>
                    </li>
                    <li class="mb-2 text-sm font-normal leading-4 text-stone-05">{{ cart.name }}</li>
                    <li
                      v-if="cart.quantity"
                      class="bg-[#F2F2F2] rounded-md px-2 text-[13px] leading-6 font-semibold text-blue-700 w-fit"
                    >
                        QTY: {{ cart.quantity }}
                    </li>
                    <li
                      v-if="getInsufficientStock(cart)"
                      class="text-xs leading-3.5 font-normal text-[#9A9FA5] mt-1"
                    >
                        {{ handleDisplayScheduleSending(cart.id) ? `[Reserved]
                        ${handleDisplayScheduleSending(cart.id)}` : '-' }}
                    </li>
                    <li
                      v-if="!getInsufficientStock(cart)"
                      class="mt-2 text-sm font-medium text-red-800"
                    >Insufficient Stock</li>
                </ul>
                <hr class="border-gray-07 !mx-0 !mt-4 !mb-3.5" />
                <label class="input !gap-0">
                    <span>Promo Code</span>
                    <div class="inline-flex w-full gap-2">
                        <input
                          type="text"
                          class="!w-[230px] !h-12"
                          placeholder="Enter the Promo Code"
                        />
                        <button
                          class="px-5 !h-12 text-xs font-bold leading-6 text-blue-300 border rounded-lg border-white-03 hover:bg-sky-50"
                        >Apply</button>
                    </div>
                </label>
                <hr class="border-gray-07 !mx-0 !mt-7 !mb-3.5" />
                <p class="flex items-center justify-between">
                    <span class="text-xs font-normal leading-6 text-slate-01">Subtotal</span>
                    <span class="text-base font-semibold text-black-200">25,600P</span>
                </p>
                <p class="flex items-center justify-between">
                    <span class="text-xs font-normal leading-6 text-slate-01">Discount</span>
                    <span class="text-base font-semibold text-[#FF0F1D]">-600P</span>
                </p>
                <hr class="border-gray-07 !mx-0 !my-4" />
                <p class="flex items-center justify-between mb-14">
                    <strong class="text-2xl font-semibold leading-6 text-slate-01">
                        Total
                    </strong>
                    <strong class="text-2xl font-semibold leading-6 text-blue-300">
                        25,000P
                    </strong>
                </p>
                <div class="flex items-center justify-between border border-[#EAEAEA] rounded-lg py-2 px-2.5 mb-6.5">
                    <p class="inline-flex items-center gap-1.5">
                        <span class="inline-flex items-center justify-center p-2 bg-red-700 rounded-full w-9 h-9">
                            <CardWalletSvg />
                        </span>
                        <strong class="text-red-700 font-bold text-[13px] leading-[18px]">Teddy Bear</strong>
                    </p>
                    <i class="text-lg font-medium leading-6 text-blue-300">
                        152,200P
                    </i>
                </div>
                <button
                  @click="handlePayment"
                  class="w-full h-12 bg-blue-300 rounded-lg text-white-19 font-bold text-[15px] leading-6 hover:bg-blue-400"
                >Proceed
                    Payment</button>
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
    <Teleport
      to="body"
      v-if="insufficientStock.length"
    >
        <aside class="modal__wrapper inline-flex justify-center items-center !p-0">
            <div class="rounded-2xl w-[486px] h-[522px] mx-auto flex flex-col items-center">
                <div class="section-card !m-0 !pt-6 !pb-4 !px-4.5 text-center">
                    <h3 class="mb-2 text-2xl font-bold leading-10 text-blue-300">Insufficient Stock</h3>
                    <p class="text-slate-02 text-[15px] leading-6 font-medium mb-5">Sorry, We’ll have it in stock soon.
                    </p>
                    <ul class="h-80 mb-2.5 overflow-y-scroll border border-white-10 rounded-md">
                        <li
                          v-for="item in insufficientStock"
                          :key="item.id"
                          class="text-[13px] text-[#404040] leading-5 font-medium border-b border-b-white-05 p-4.5"
                        >
                            {{ item.brand }}/{{ item.name }}’s available stock is max <span class="text-[#FF1D2A]">{{
                                item.available_stock.toLocaleString() }}</span>.<br>
                            Please adjust your order.
                        </li>
                    </ul>
                    <button
                      @click="() => insufficientStock = []"
                      class="rounded-lg bg-blue-300 w-full py-5 text-lg leading-4.5 text-[#FCFCFD] font-bold font-dmsans"
                    >Confirm</button>
                </div>
            </div>
        </aside>
    </Teleport>
</template>
