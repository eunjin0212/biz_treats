<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { transferRows, retrieveRows } from '@/mock/pointsTransferRetrieve.js'
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
import ChevronLeftSvg from '@/assets/icons/ChevronLeftSvg.vue';
import ChevronRightSvg from '@/assets/icons/ChevronRightSvg.vue';
import InfoSvg from '@/assets/icons/InfoSvg.vue';
import CardWalletSvg from '@/assets/icons/CardWalletSvg.vue';
import PrevPageSvg from '@/assets/icons/PrevPageSvg.vue';
import CheckSvg from '@/assets/icons/CheckSvg.vue';
import { cartData } from '@/mock/cart';

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
        ChevronLeftSvg,
        ChevronRightSvg,
        InfoSvg,
        CardWalletSvg,
        PrevPageSvg,
        CheckSvg,
    },
    data() {
        const rowPerPage = 6
        const pagination = {
            total: transferRows.length,
            page: 1, // 현재 페이지
            rowPerPage, // 테이블 row 수
            lastPage: Math.ceil(transferRows.length / rowPerPage), // 마지막 페이지
        }
        const initFilters = {
            fromDate: moment(new Date()).format('DD/MM/YYYY'),
            toDate: moment(new Date()).format('DD/MM/YYYY'),
            type: '',
            tableSearch: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            cartData,
            alertData,
            myPoint: 1000,
            tableColumns: [
                { label: '', field: 'selected', class: '' },
                { label: 'Name', field: 'name', class: '' },
                { label: 'Status', field: 'status', class: '' },
                { label: 'Email(ID)', field: 'email', class: '' },
                { label: 'Balance', field: 'balance', class: '' },
                { label: 'Amount', field: 'amount', class: '' },
                { label: 'Notes', field: 'notes', class: '' },
            ],
            data: transferRows.map((row) => ({ ...row, selected: false })).slice(pagination.page - 1, rowPerPage),
            typeStyle: {
                Deduct: 'text-red-300',
                'Top-up': 'text-blue-300',
            },
            statusStyle: {
                active: 'bg-blue-200 w-16',
                resigned: 'bg-red-400 w-16',
            },
            statusLabel: {
                active: 'Active',
                resigned: 'Resigned',
            },
            moment,
            typeOptions: ['Deduct', 'Topup',],
            filters: { ...initFilters },
            initFilters,
            pagination,
            formatDate: {
                to: moment(new Date()).format('YYYY-MM-DD'),
                from: moment(new Date()).format('YYYY-MM-DD'),
            },
            tab: 'Transfer',
            tabOptions: ['Transfer', 'Retrieve'],
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
            const array = value === 'Retrieve' ? retrieveRows : transferRows
            this.data = array.map((row) => ({ ...row, selected: false })).slice(this.pagination.page - 1, this.rowPerPage)
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
            return (path) => path.toLocaleLowerCase().includes(window.location.pathname.replace('/', ''))
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
        totalAmount: function () {
            return this.data.filter((row) => row.selected).reduce((acc, cur) => +acc + +cur.amount, 0)
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
                <button class="header-btn inline-flex ml-4.5" @click="() => handleCartLocation()">
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
        <section class="w-[calc(100%-266px)] max-w-[970px] flex flex-col">
            <div class="section-card !px-0 mb-11 mt-4.5">
                <a
                  href="/pointsTransferRetrieve"
                  class="flex items-center px-3 mb-3 ml-3 text-xl font-semibold leading-8 text-black-200"
                >
                    <span class="bg-blue-300 rounded-lg mr-2.5">
                        <PrevPageSvg />
                    </span>
                    Points Transfer/Retrieve
                </a>
                <div class="pl-6 mb-4 tab">
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
                <div class="point-info-bar">
                    <div class="point-card">
                        <div class="point-card-title__wrapper">
                            <span>
                                <CardWalletSvg />
                            </span>
                            <p>
                                <strong>Teddy Bear</strong>
                                <span>Promotion 2024</span>
                            </p>
                        </div>
                        <div class="point-card-content">
                            <strong>{{ myPoint.toLocaleString() }}</strong>
                            <span>Points</span>
                        </div>
                    </div>
                    <p>Active Balance
                        <InfoSvg />
                    </p>
                </div>
                <div class="border-t data-table__wrapper border-t-white-10">
                    <table class="table-fixed data-table">
                        <thead>
                            <tr>
                                <th
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                >
                                    <label
                                      class="checkbox"
                                      v-if="column.field === 'selected'"
                                      @click.prevent="() => {
                        data = data.map(row => ({ ...row, selected: !data.every((row) => row.selected) }))
                    }"
                                    >
                                        <span :class="{ 'active': data.every((row) => row.selected) }">
                                            <CheckSvg
                                              :class="data.every((row) => row.selected) ? 'text-white-20' : 'hidden'"
                                            />
                                        </span>
                                        <input
                                          type="checkbox"
                                          :name="column.field"
                                        />
                                    </label>
                                    <template v-else>
                                        {{ column.label }}
                                    </template>
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
                                    <label
                                      class="checkbox"
                                      v-if="column.field === 'selected'"
                                      @click.prevent="() => {
                        row[column.field] = !row[column.field];
                    }"
                                    >
                                        <span :class="{ 'active': row[column.field] }">
                                            <CheckSvg :class="row[column.field] ? 'text-white-20' : 'hidden'" />
                                        </span>
                                        <input
                                          type="checkbox"
                                          :name="row.name"
                                          v-model="row[column.field]"
                                        />
                                    </label>
                                    <div v-else-if="column.field === 'status'" :class="statusStyle[row[column.field]]" class="rounded-md text-stone-03 font-semibold text-xs w-[65px] h-7 inline-flex justify-center items-center">
                                        {{ statusLabel[row[column.field]] }}
                                    </div>
                                    <div
                                      v-else-if="column.field === 'balance'"
                                      class="flex items-center justify-between"
                                    >
                                        {{ row[column.field].toLocaleString() }}P
                                    </div>
                                    <div v-else-if="['amount', 'notes'].includes(column.field)">
                                        <label class="input">
                                            <input
                                              :class="{'!text-red-300': column.field === 'amount' && row.selected && row.status === 'resigned'}"
                                              v-model="row[column.field]"
                                              type="text"
                                              :disabled="!row.selected"
                                            />
                                        </label>
                                    </div>
                                    <template v-else>
                                        {{ row[column.field] || '-' }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-40 mb-8 pagination-wrapper">
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
                <div class="text-center">
                    <div class="flex items-center mb-3 flex-nowrap">
                        <hr class="flex-grow border-white-10">
                        <span
                          class="w-[66px] inline-block font-semibold text-blue-300 text-sm leading-6 text-center tracking-wide mx-[60px]"
                        >
                            Massage
                        </span>
                        <hr class="flex-grow border-white-10" />
                    </div>
                    <label class="textarea">
                        <textarea
                          placeholder="Enter your name"
                          class="w-[calc(100%-48px)] !max-h-28 !min-h-28 !h-28 mx-6 resize-none"
                          auto
                        />
                    </label>
                    <div class="flex items-center mt-2.5 mb-3 flex-nowrap">
                        <hr class="flex-grow border-white-10">
                        <span
                          class="inline-block w-40 mx-3 text-sm font-semibold leading-6 tracking-wide text-center text-blue-300 text-nowrap"
                        >
                            Total Amount : {{ totalAmount.toLocaleString() }}P
                        </span>
                        <hr class="flex-grow border-white-10" />
                    </div>
                    <span
                      v-if="myPoint < totalAmount"
                      class="text-[13px] leading-4 font-light text-red-500 block pb-9"
                    >
                        *Lack of points to transfer. Please recheck it.
                    </span>
                    <hr class="border-white-10" />
                    <div class="flex items-center justify-end gap-2 pt-3 pr-6">
                        <button
                          class="outline-0 w-[120px] h-12 rounded-lg text-[15px] leading-6 font-bold bg-white-19 border-2 text-[#9A9FA5] hover:bg-secondary-04-light border-white-10"
                        >Cancel</button>
                        <button
                          :disabled="myPoint < totalAmount"
                          :class="tab !== 'Retrieve' ? 'bg-main hover:bg-blue-400' : 'bg-red-300 hover:bg-red-350'"
                          class="outline-0 w-[180px] h-12 text-white-20 rounded-lg text-[15px] leading-6 font-bold "
                        >{{ tab }}</button>
                    </div>
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
