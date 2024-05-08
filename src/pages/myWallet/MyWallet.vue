<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { rows } from '@/mock/pointHistory.js'
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
import MessageSvg from '@/assets/icons/MessageSvg.vue';
import PhoneSvg from '@/assets/icons/PhoneSvg.vue';
import BookmarkSvg from '@/assets/icons/BookmarkSvg.vue';
import PinSvg from '@/assets/icons/PinSvg.vue';
import UpSvg from '@/assets/icons/UpSvg.vue';
import DownSvg from '@/assets/icons/DownSvg.vue';
import CalendarSvg from '@/assets/icons/CalendarSvg.vue';
import FileDownloadSvg from '@/assets/icons/FileDownloadSvg.vue';
import ChevronLeftSvg from '@/assets/icons/ChevronLeftSvg.vue';
import ChevronRightSvg from '@/assets/icons/ChevronRightSvg.vue';

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
        MessageSvg,
        PhoneSvg,
        BookmarkSvg,
        PinSvg,
        UpSvg,
        DownSvg,
        FileDownloadSvg,
        CalendarSvg,
        ChevronLeftSvg,
        ChevronRightSvg,
    },
    data() {
        const rowPerPage = 6
        const pagination = {
            total: rows.length,
            page: 1, // 현재 페이지
            rowPerPage, // 테이블 row 수
            lastPage: Math.ceil(rows.length / rowPerPage), // 마지막 페이지
        }
        const filters = {
            fromDate: moment(new Date()).format('DD/MM/YYYY'),
            toDate: moment(new Date()).format('DD/MM/YYYY'),
            type: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            tableColumns: [
                { label: 'Date', field: 'date', class: '' },
                { label: 'Type', field: 'type', class: '' },
                { label: 'Points', field: 'points', class: '' },
                { label: 'Top-up ID', field: 'top_up_id', class: '' },
                { label: 'Order ID', field: 'order_id', class: '' },
                { label: 'Sender/Requester', field: 'sender', class: '' },
                { label: 'Balance', field: 'balance', class: '' },
                { label: 'Notes', field: 'notes', class: '' },
            ],
            data: rows.slice(pagination.page - 1, rowPerPage),
            typeStyle: {
                Canceled: 'bg-red-100',
                Transfer: 'bg-blue-400',
                Deduct: 'bg-primary-450',
                Topup: 'bg-blue-200',
            },
            moment,
            typeOptions: ['Canceled', 'Transfer', 'Deduct', 'Topup',],
            filters,
            pagination,
            formatDate: {
                to: moment(new Date()).format('YYYY-MM-DD'),
                from: moment(new Date()).format('YYYY-MM-DD'),
            }
        }
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
        },
        handlePage(direction) {
            if (direction === 'next') {
                this.pagination.page++;
                return;
            }

            this.pagination.page--;
        },
        updatePage(page) {
            this.pagination = { ...this.pagination, page }
        },
        handleFromDate(event) {
            this.filters.fromDate = moment(event.target.value).format('DD/MM/YYYY')
            this.formatDate.from = moment(event.target.value).format('YYYY-MM-DD')
        },
        handleToDate(event) {
            this.filters.toDate = moment(event.target.value).format('DD/MM/YYYY')
            this.formatDate.to = moment(event.target.value).format('YYYY-MM-DD')
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
    watch:{
        dropdown(){
            if (this.dropdown) {
                window.addEventListener('click', this.handleGlobalDropdown)
                return
            }
            window.removeEventListener('click', this.handleGlobalDropdown)
        },
        alertOpen(){
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
        displayedPageNumbers: function () {
            const numbersArray = Array.from({ length: this.pagination.lastPage }, (_, index) => index + 1);
            function chunkArray(array, size) {
                const chunks = [];
                for (let i = 0; i < array.length; i += size) {
                    chunks.push(array.slice(i, i + size));
                }
                return chunks;
            }

            const paginationArr = chunkArray(numbersArray, 5)
            const currentIndexPages = paginationArr.find((page) => page.includes(this.pagination.page))
            return currentIndexPages;
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
                <button class="header-btn inline-flex ml-4.5">
                    <CartSvg />
                    <span class="text-[15px] leading-5 -tracking-[0.323px] font-bold font-inter ml-4 mr-1.5">32</span>
                </button>
                <div class="btn-group ml-4">
                    <button class="border-r border-r-[#197298]">Wallet Name</button>
                    <div class="dropdown border-l border-l-[#60D0FF]">
                        <button @click="handleDropdown" ref="dropdownRef">
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
    <main class="bgwhite-17 flex w-[1228px] mx-auto">
        <aside class="lnb service-lnb">
            <ul>
                <li
                  v-for="lnb in myPageLnbMenu"
                  :key="lnb.title"
                >
                    <div>{{ lnb.title }}</div>
                    <hr />
                    <a
                      v-for="children in lnb.children"
                      :key="children.title"
                      :href="children.path"
                      :class="{ 'bg-white-15 !text-black-200': matchPath(children.path) }"
                    >
                        {{ children.title }}
                    </a>
                </li>
            </ul>
        </aside>
        <section class="w-[calc(100%-266px)] max-w-[932px] flex flex-col">
            <div class="section-card">
                <h2><span></span>My Wallet</h2>
                <ul class="bg-white-18 px-4 py-2.5 rounded-xl flex items-center gap-[22px]">
                    <li class="wallet-info__card">
                        <h3 class="wallet-info__card-header">
                            <span class="">Account Info</span>
                            <a href="/accountInfo">Edit Info ></a>
                        </h3>
                        <hr />
                        <ul class="wallet-info__card-content">
                            <li>
                                <span>
                                    <MessageSvg />
                                </span>sena@sharetreats.com
                            </li>
                            <li>
                                <span>
                                    <PhoneSvg />
                                </span>09123456789
                            </li>
                        </ul>
                    </li>
                    <li class="wallet-info__card">
                        <h3 class="wallet-info__card-header">
                            <span class="">Campaign Info</span>
                            <a href="/campaignInfo">Edit Info ></a>
                        </h3>
                        <hr />
                        <ul class="wallet-info__card-content">
                            <li>
                                <span>
                                    <BookmarkSvg />
                                </span>Share Treats Marketing
                            </li>
                            <li class="!leading-[14px]">
                                <span>
                                    <PinSvg />
                                </span>Unit 501, BDO Equitable Tower, 8751Paseo De Roxas, Makati City, 1209
                            </li>
                        </ul>
                    </li>
                    <li class="wallet-info__card">
                        <h3 class="wallet-info__card-header">
                            <span class="">Wallet Name</span>
                            <a href="/walletName">Edit Info ></a>
                        </h3>
                        <hr class="border-white-04" />
                        <ul class="wallet-info__card-content ml-2.5 !pt-2.5">
                            <li class="!text-point-unit !text-sm leading-5 !font-bold !font-poppins !items-center">
                                <i class="!text-point font-semibold font-inter leading-[48px] text-4xl">100,000</i>
                                Points
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="section-card mt-3.5">
                <h2><span></span>Summary of March</h2>
                <ul class="flex items-center gap-[22px] px-3 mb-4.5">
                    <li class="pt-5 pb-[9px] px-8 bg-[#B5E4CA40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Top-up</p>
                        <div class="flex items-end mb-3 mt-1">
                            <i class="text-point font-inter font-bold text-5xl leading-[48px]">10,000</i>
                            <span class="text-point-unit font-bold text-sm leading-5 font-poppins">Points</span>
                        </div>
                        <span
                          class="bg-white-19 p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-point-up rounded -tracking-wide"
                        >
                            <UpSvg /> 37.8%
                        </span>
                    </li>
                    <li class="pt-5 pb-[9px] px-8 bg-[#B1E5FC40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Transfer</p>
                        <div class="flex items-end mb-3 mt-1">
                            <i class="text-point font-inter font-bold text-5xl leading-[48px]">-5,000</i>
                            <span class="text-point-unit font-bold text-sm leading-5 font-poppins">Points</span>
                        </div>
                        <span
                          class="bg-white-19 p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-red-200 rounded -tracking-wide"
                        >
                            <DownSvg /> 37.8%
                        </span>
                    </li>
                    <li class="pt-5 pb-[9px] px-8 bg-[#CABDFF40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Used</p>
                        <div class="flex items-end mb-3 mt-1">
                            <i class="text-point font-inter font-bold text-5xl leading-[48px]">6,000</i>
                            <span class="text-point-unit font-bold text-sm leading-5 font-poppins">Points</span>
                        </div>
                        <span
                          class="bg-white-19 p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-point-up rounded -tracking-wide"
                        >
                            <UpSvg /> 37.8%
                        </span>
                    </li>
                </ul>
            </div>
            <div class="section-card !px-0 mb-11 mt-4.5">
                <h2 class="px-3"><span></span>Point History</h2>
                <div class="table-function-bar">
                    <form @submit="handleSubmit">
                        <label class="date-picker">
                            <CalendarSvg />
                            {{ filters.fromDate }}
                            <input
                              type="date"
                              :value="formatDate.from"
                              @change="handleFromDate"
                            />
                        </label>
                        <span class="date-range-symbol"></span>
                        <label class="date-picker">
                            <CalendarSvg />
                            {{ filters.toDate }}
                            <input
                              type="date"
                              :value="formatDate.to"
                              @change="handleToDate"
                            />
                        </label>
                        <select
                          class="search-select"
                          v-model="filters.type"
                          placeholder="Type"
                          @change="(event) => filters.type = event.target.value"
                        >
                            <option
                              disabled
                              value=""
                            >
                                Type
                            </option>
                            <option
                              v-for="opt in typeOptions"
                              :key="opt"
                              :value="opt"
                            >
                                {{ opt }}
                            </option>
                        </select>
                        <label class="search-input">
                            <input
                              type="text"
                              placeholder="Search for Treats"
                              name="search"
                              v-model="search"
                            />
                            <SearchSvg />
                        </label>
                        <button type="submit">
                            Search
                        </button>
                    </form>
                    <button type="button">
                        <FileDownloadSvg /> Excel Download
                    </button>
                </div>
                <div class="data-table__wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                >
                                    {{ column.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                              v-for="row in data"
                              :key="row.order_id"
                            >
                                <td
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                >
                                    <div
                                      :class="typeStyle[row[column.field]]"
                                      v-if="column.field === 'type'"
                                      class="py-[2px] px-2 rounded-md text-[#4E4E4E] leading-6 font-semibold w-fit"
                                    >
                                        {{ row[column.field] }}
                                    </div>
                                    <div
                                      v-else-if="column.field === 'notes'"
                                      class="flex justify-between items-center"
                                    >
                                        {{ row[column.field] }}
                                        <a
                                          class="border border-white-02 rounded-lg bg-white px-[34px] py-2 text-main font-semibold leading-6 hover:bg-white-02-light">
                                            Detail
                                        </a>
                                    </div>
                                    <template v-else>
                                        {{ row[column.field] }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination-wrapper mt-9 mb-8">
                    <button
                      class="page-left"
                      @click="() => handlePage('prev')"
                      :disabled="pagination.page === 1"
                    >
                        <ChevronLeftSvg />
                    </button>
                    <button
                      v-for="page in displayedPageNumbers"
                      :key="page"
                      :aria-current="page === pagination.page && 'page'"
                      :class="{ '!bg-main !text-white-20': page === pagination.page }"
                      @click="() => updatePage(page)"
                    >
                        {{ page }}
                    </button>
                    <button
                      class="page-right"
                      @click="() => handlePage('next')"
                      :disabled="pagination.page === pagination.lastPage"
                    >
                        <ChevronRightSvg />
                    </button>
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
