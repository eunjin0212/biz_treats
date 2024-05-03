<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
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
        ChevronLeftSvg,
        ChevronRightSvg,
    },
    data() {
        const rowPerPage = 4
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
            alert: false,
            alertData: [
                {
                    title: 'Reserve sending was Complete!',
                    date: '04/21/2024',
                    type: 'alert',
                    description: 'Order ID 20240226000 was successfully sent.',
                    read: true,
                },
                {
                    title: 'Points Transfer',
                    date: '04/21/2024',
                    type: 'point',
                    description: 'You received the N Points from(Sender). Check your wallet balance.',
                    read: true,
                },
                {
                    title: 'Reserve sending was Complete!',
                    date: '04/21/2024',
                    type: 'alert',
                    description: 'Order ID 20240226000 was successfully sent.',
                    read: false,
                },
            ],
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
                Canceled: 'bg-canceled',
                Transfer: 'bg-transfer',
                Deduct: 'bg-primary-450',
                Topup: 'bg-topup',
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
        }
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
                  @click="alert = !alert"
                >
                    <BellSvg />
                    <span class="badge">{{ alertData.length }}</span>
                </button>
                <aside
                  class="alert-wrapper"
                  :class="alert ? 'block' : 'hidden'"
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
                    <button @click="dropdown = !dropdown">
                        <span>
                            10000 points
                        </span>
                        <DropdownSvg />
                    </button>
                    <div
                      class="dropdown-opts"
                      :class="dropdown ? 'block' : 'hidden'"
                    >
                        <span>
                            <WalletSvg />My Wallet
                        </span>
                        <span>
                            <SwitchSvg />Switching Wallet
                        </span>
                        <span>
                            <SignOutSvg />Log out
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main class="bg-bg">
        <section class="w-[940px] h-[752px] mx-auto mt-7 mb-11 flex flex-col bg-white rounded-xl">
            <ul class="font-inter text-center mt-[52px] mb-4">
                <li class="text-main text-[28px] font-bold leading-10 mb-1">Choose your Wallet type</li>
                <li class="text-[#1211278F] text-sm font-normal leading-6">It can access each campaign wallet and manage each balance.</li>
                <li class="text-[#1211278F] text-sm font-normal leading-6">Create a wallet for eachPurpose and use it!</li>
            </ul>
            <!-- box-shadow: 0px 20px 50px 0px #12112714; -->
            <div class="grid"></div>
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
                    :class="{ '!bg-main !text-white': page === pagination.page }"
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
        </section>
    </main>
    <footer class="footer">
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
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
