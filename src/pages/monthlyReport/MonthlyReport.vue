<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { monthlyReportRows } from '@/mock/monthlyReport.js'
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
import UpSvg from '@/assets/icons/UpSvg.vue';
import DownSvg from '@/assets/icons/DownSvg.vue';
import FileDownloadSvg from '@/assets/icons/FileDownloadSvg.vue';
import ChevronLeftSvg from '@/assets/icons/ChevronLeftSvg.vue';
import ChevronRightSvg from '@/assets/icons/ChevronRightSvg.vue';
import CloseSvg from '@/assets/icons/CloseSvg.vue';
import CheckSvg from '@/assets/icons/CheckSvg.vue'
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
        UpSvg,
        DownSvg,
        FileDownloadSvg,
        ChevronLeftSvg,
        ChevronRightSvg,
        CloseSvg,
        CheckSvg,
    },
    data() {
        const rowPerPage = 6
        const pagination = {
            total: monthlyReportRows.length,
            page: 1, // 현재 페이지
            rowPerPage, // 테이블 row 수
            lastPage: Math.ceil(monthlyReportRows.length / rowPerPage), // 마지막 페이지
        }
        const initFilters = {
            month: '',
        }
        const formModel = {
            monthly: 'false',
            type: '',
            account: '',
        }
        const monthOptions = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
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
            tableColumns: [
                { label: 'Date', field: 'date', class: '' },
                { label: 'Requester', field: 'requester', class: '' },
                { label: 'Type', field: 'type', class: '' },
                { label: 'Account Number', field: 'account', class: '' },
            ],
            data: monthlyReportRows.slice(pagination.page - 1, rowPerPage),
            filters: { ...initFilters },
            monthOptions,
            pagination,
            isOpen: false,
            formModel,
            modalForm: [
                {
                    label: 'Monthly',
                    name: 'monthly',
                    value: formModel.monthly,
                    type: 'select',
                    options: monthOptions,
                    key: 'monthly',
                    required: true,
                },
                {
                    label: 'Type',
                    name: 'type',
                    value: formModel.type,
                    type: 'select',
                    options: ['Used'],
                    key: 'type',
                    required: true,
                },
                {
                    label: 'Account',
                    name: 'account',
                    value: formModel.account,
                    type: 'list',
                    key: 'account',
                    listOptions: [
                        { label: 'Sena ABC Kim(sena@sharetreats.com)', checked: false },
                        { label: 'Sena ABC Kim(sena@sharetreats.com)',checked: false },
                        { label: 'Sena ABC Kim(sena@sharetreats.com)', checked: false },
                        { label: 'Sena ABC Kim(sena@sharetreats.com)', checked: false },
                        { label: 'Sena ABC Kim(sena@sharetreats.com)', checked: false },
                    ],
                    required: true,
                },
            ],
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
        handleDropdown() {
            this.dropdown = !this.dropdown
        },
        handleAlert() {
            this.alertOpen = !this.alertOpen
        },
        handleGlobalDropdown(event) {
            const { parentNode } = event.target
            if (parentNode !== this.$refs.dropdownRef && !this.$refs.dropdownOptsRef.contains(parentNode)) {
                this.dropdown = false
            }
        },
        handleGlobalAlert(event) {
            const { parentNode } = event.target
            if (parentNode !== this.$refs.alertRef && !this.$refs.alertWrapperRef.contains(parentNode)) {
                this.alertOpen = false
            }
        },
        handleModal(value) {
            this.isOpen = value
        },
        handleExtract(event) {
            event.preventDefault();
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
        <section class="w-[calc(100%-266px)] max-w-[932px] flex flex-col">
            <div class="section-card !px-0 mt-3.5">
                <h2><span class="!bg-green-03"></span>Monthly Report</h2>
                <div class="!border-b-0 table-filter-bar !pt-2.5 !pb-3.5">
                    <form @submit="handleSubmit">
                        <select
                          class="search-select !w-[140px] !h-12"
                          v-model="filters.month"
                          @change="(event) => filters.month = event.target.value"
                        >
                            <option
                              disabled
                              value=""
                            >
                                Month
                            </option>
                            <option
                              v-for="opt in monthOptions"
                              :key="opt"
                              :value="opt"
                            >
                                {{ opt }}
                            </option>
                        </select>
                        <button
                          type="submit"
                          class="!text-white-20 !bg-main !text-xs !font-inter !h-12 !w-[104px]"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <ul class="flex items-center gap-[22px] px-6 mb-4.5">
                    <li class="pt-5 pb-[9px] px-8 bg-[#B5E4CA40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Top-up</p>
                        <div class="flex items-end mt-1 mb-3">
                            <i class="text-stone-02 font-inter font-bold text-5xl leading-[48px]">10,000</i>
                            <span class="text-sm font-bold leading-5 text-gray-06 font-poppins">Points</span>
                        </div>
                        <span
                          class="flex items-center gap-1 p-1 text-xs font-bold leading-4 rounded bg-white-19 w-fit text-green-01 -tracking-wide"
                        >
                            <UpSvg /> 37.8%
                        </span>
                    </li>
                    <li class="pt-5 pb-[9px] px-8 bg-[#B1E5FC40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Transfer</p>
                        <div class="flex items-end mt-1 mb-3">
                            <i class="text-stone-02 font-inter font-bold text-5xl leading-[48px]">-5,000</i>
                            <span class="text-sm font-bold leading-5 text-gray-06 font-poppins">Points</span>
                        </div>
                        <span
                          class="flex items-center gap-1 p-1 text-xs font-bold leading-4 text-red-200 rounded bg-white-19 w-fit -tracking-wide"
                        >
                            <DownSvg /> 37.8%
                        </span>
                    </li>
                    <li class="pt-5 pb-[9px] px-8 bg-[#CABDFF40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Used</p>
                        <div class="flex items-end mt-1 mb-3">
                            <i class="text-stone-02 font-inter font-bold text-5xl leading-[48px]">6,000</i>
                            <span class="text-sm font-bold leading-5 text-gray-06 font-poppins">Points</span>
                        </div>
                        <span
                          class="flex items-center gap-1 p-1 text-xs font-bold leading-4 rounded bg-white-19 w-fit text-green-01 -tracking-wide"
                        >
                            <UpSvg /> 37.8%
                        </span>
                    </li>
                </ul>
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
                                      v-if="column.field === 'account'"
                                      class="flex items-center justify-between"
                                    >
                                        {{ row[column.field] }}
                                        <button
                                          @click="() => handleModal(true)"
                                          class="flex gap-2 items-center h-10 px-3 py-2 border border-white-02 rounded text-gray-05 hover:bg-[#A9A9A920] text-sm leading-5 font-semibold font-manrope float-right"
                                        >
                                            <FileDownloadSvg /> Excel Download
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
                <div class="mb-8 pagination-wrapper mt-9">
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
    <Teleport to="body">
        <aside
          class="modal__wrapper inline-flex justify-center items-center !p-0"
          v-if="isOpen"
        >
            <div class="rounded-2xl w-[578px] mx-auto pt-[30px] pb-3 pl-4.5 pr-6 flex flex-col items-center">

                <div class="section-card !px-0 !m-0">
                    <h2 class="!mb-5 mt-1.5 px-3 justify-between">
                        <div class="inline-flex items-center">
                            <span class="!bg-orange-01 ml-0.5"></span>Monthly Report Extract
                        </div>
                        <button
                          @click="() => handleModal(false)"
                          class="inline-flex items-center bg-white-10 rounded-full p-2 mr-4.5"
                        >
                            <CloseSvg />
                        </button>
                    </h2>
                    <hr class="border-white-10 !m-0" />
                    <form
                      class="flex flex-col gap-5 pt-8 pb-3 font-inter"
                      @submit="handleExtract"
                    >
                        <fieldset
                          class="px-4.5 modal-form__label-input"
                          v-for="form in modalForm"
                          :key="form.key"
                          :class="{
                        'border-b border-b-white-10 pb-7': form.name === 'type',
                        '-mt-2.5 flex-col !items-start': form.name === 'account',
                    }"
                        >
                            <label class="w-16 text-sm leading-6 min-w-16 mr-14">
                                <span class=" text-slate-01">
                                    {{ form.label }}
                                </span>
                                <span
                                  class="text-[#FF2C2C]"
                                  v-if="form.required"
                                >*</span>
                            </label>
                            <select
                              class="w-full select"
                              v-if="form.options?.length"
                            >
                                <option
                                  :value="opt"
                                  :key="opt"
                                  v-for="opt in form.options"
                                >{{ opt }}</option>
                            </select>
                            <div
                              class="flex flex-col w-full"
                              v-else
                            >
                                <label
                                  class="px-4.5 mt-3 checkbox"
                                  @click.prevent="() => {
                                    form.listOptions = form.listOptions.map(row => ({ ...row, checked: !form.listOptions.every((row) => row.checked) }))
                                  }"
                                >
                                    <span :class="{ 'active': form.listOptions.every((row) => row.checked) }">
                                        <CheckSvg :class="form.listOptions.every((row) => row.checked) ? 'text-white-20' : 'hidden'" />
                                    </span>
                                    <input
                                      type="checkbox"
                                      :name="opt"
                                    />
                                    <p class="font-medium text-[13px] text-stone-05 ml-2">
                                        All
                                    </p>
                                </label>
                                <ul
                                  class="mt-2.5 overflow-y-scroll border rounded-md h-52 border-white-10 font-medium text-[13px] text-stone-05"
                                >
                                    <li
                                      class="py-3 px-4.5 border-b border-b-white-10"
                                      :class="{'last-of-type:border-0': form.listOptions.length > 4}"
                                      :key="opt.label"
                                      v-for="opt in form.listOptions"
                                    >
                                        <label
                                          class="checkbox"
                                          @click.prevent="() => {
                                            opt.checked = !opt.checked
                                          }"
                                        >
                                            <span
                                              :class="{ 'active': opt.checked }"
                                              class="mr-2"
                                            >
                                                <CheckSvg 
                                                  :class="opt.checked ? 'text-white-20' : 'hidden'"
                                                />
                                            </span>
                                            <input
                                              type="checkbox"
                                              :name="opt.label"
                                            />
                                            {{ opt.label }}
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </fieldset>
                        <hr class="border-white-10" />
                        <div class="flex items-center justify-end gap-2 pr-6 -mt-1">
                            <button
                              @click="() => handleModal(false)"
                              type="button"
                              class="outline-0 w-[120px] h-12 rounded-lg text-[15px] leading-6 font-bold bg-white-19 border-2 text-[#9A9FA5] hover:bg-[#9A9FA520] border-white-10"
                            >Cancel</button>
                            <button
                              type="submit"
                              class="outline-0 w-[180px] h-12 bg-main text-white-20 rounded-lg text-[15px] leading-6 font-bold hover:bg-blue-400"
                            >Invite</button>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    </Teleport>
</template>
