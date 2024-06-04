<script>
import {  snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { doneRows } from '@/mock/treatsHistory.js'
import { cartData } from '@/mock/cart.js'
import { handleSearch } from '@/modules/search.js';
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
        FileDownloadSvg,
        CalendarSvg,
        ChevronLeftSvg,
        ChevronRightSvg,
    },
    data() {
        const rowPerPage = 6
        const pagination = {
            total: doneRows.length,
            page: 1, // 현재 페이지
            rowPerPage, // 테이블 row 수
            lastPage: Math.ceil(doneRows.length / rowPerPage), // 마지막 페이지
        }
        const initFilters = {
            fromDate: moment(new Date()).format('DD/MM/YYYY'),
            toDate: moment(new Date()).format('DD/MM/YYYY'),
            status: '',
            tableSearch: '',
        }
        return {
            
            snsMenu,
            menus,
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            cartData,
            tableColumns: [
                { label: 'Order ID', field: 'order_id', class: '' },
                { label: 'Trans Info', field: 'trans_info', class: 'w-[122px]' },
                { label: 'Quantity', field: 'quantity', class: '' },
                { label: 'Points', field: 'points', class: '' },
                { label: 'Notes', field: 'notes', class: 'w-[140px]' },
                { label: 'Order Date', field: 'order_date', class: '' },
                { label: 'Sent Date', field: 'sent_date', class: '!text-center' },
                { label: 'Status', field: 'status', class: '' },
                { label: 'Recipient List', field: 'recipient_list', class: '!text-center' },
            ],
            data: doneRows.slice(pagination.page - 1, rowPerPage),
            moment,
            filters: { ...initFilters },
            initFilters,
            pagination,
            statusOptions: ['Completed'],
            formatDate: {
                to: moment(new Date()).format('YYYY-MM-DD'),
                from: moment(new Date()).format('YYYY-MM-DD'),
            },
            tab: 'Done',
            tabOptions: ['Done', 'Reserved Schedule'],
        }
    },
    methods: {
        handleCartLocation() {
            window.location.href = '/multiCart'
        },
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
        handleTab(value) {
            this.tab = value
            this.filters = { ...this.initFilters }
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
        handleSearch,
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
                      @keypress.enter="() => handleSearch(search)"
                      name="search"
                      v-model="search"
                    />
                    <SearchSvg />
                </div>
                <div class="relative">
                    <button
                      class="header-btn"
                      @click="handleAlert"
                      ref="alertRef"
                    >
                        <BellSvg />
                        <span class="badge">{{ alertData.length }}</span>
                    </button>
                    <aside
                      class="alert-wrapper"
                      :class="alertOpen ? 'block' : 'hidden'"
                      ref="alertWrapperRef"
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
    <main class="bg-white-17 flex w-[1228px] mx-auto">
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
            <div class="section-card !px-0 mb-11 mt-4.5 h-[815px]">
                <h2 class="px-3 !mb-4"><span></span>Treats History</h2>
                <div class="tab mb-3.5 pl-6">
                    <ul class="gap-6">
                        <li
                          v-for="opt in tabOptions"
                          :key="opt"
                          :class="{ 'border-b-4 border-b-main !text-main': opt === tab }"
                          @click="() => handleTab(opt)"
                        >
                            <span class="inline-block px-1 py-2">{{ opt }}</span>
                        </li>
                    </ul>
                </div>
                <div class="table-filter-bar">
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
                          v-model="filters.status"
                          placeholder="Type"
                          v-if="tab === 'Done'"
                          @change="(event) => filters.status = event.target.value"
                        >
                            <option
                              disabled
                              value=""
                            >
                                Status
                            </option>
                            <option
                              v-for="opt in statusOptions"
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
                              v-model="filters.tableSearch"
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
                <div class="data-table__wrapper h-[495px]">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                  :class="column.class"
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
                                  :class="column.class"
                                >
                                    <div
                                      v-if="column.field === 'sent_date' && tab === 'Reserved Schedule'"
                                      class="flex items-center justify-between"
                                    >
                                        <button
                                          class="border border-white-02 rounded-lg bg-white px-[31px] py-1.5 text-red-05 font-semibold leading-6 hover:bg-white-02-light"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div
                                      v-else-if="column.field === 'recipient_list'"
                                      class="flex items-center justify-between"
                                    >
                                        {{ row[column.field] }}
                                        <button
                                          class="border border-white-02 rounded-lg bg-white px-[21px] py-1.5 text-main font-semibold leading-6 hover:bg-white-02-light"
                                        >
                                            Download
                                        </button>
                                    </div>
                                    <template v-else>
                                        {{ row[column.field] }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination-wrapper mt-14 mb-[31px]">
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
