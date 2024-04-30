<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
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
import Calendar from '@/assets/icons/Calendar.vue';

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
        Calendar,
    },
    data() {
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
                { label: 'Order ID', field: 'order_id', class: '' },
                { label: 'Trans Info', field: 'trans_info', class: '' },
                { label: 'Quantity', field: 'quantity', class: '' },
                { label: 'Points', field: 'points', class: '' },
                { label: 'Notes', field: 'notes', class: '' },
                { label: 'Order Date', field: 'order_date', class: '' },
                { label: 'Sent Date', field: 'sent_date', class: '' },
                { label: 'Status', field: 'status', class: '' },
                { label: 'Recipient List', field: 'recipient_list', class: '' },
            ],
            rows: [
                {
                    order_id: '202402260001',
                    trans_info: 'McDonald’s Regular Coke McFloat',
                    quantity: '200',
                    points: '-1,280',
                    notes: 'This is testing sending for check the template.',
                    order_date: '02/31/2024 09:01',
                    sent_date: '02/31/2024 09:01',
                    status: 'Completed',
                    recipient_list: '',
                },
            ],
            moment,
            fromDate: moment(new Date()).format('DD/MM/YYYY'),
            toDate: moment(new Date()).format('DD/MM/YYYY')
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        }
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
    <main class="bg-bg flex">
        <aside class="lnb">
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
                      :class="{ 'bg-lnb-hover !text-lnb-hover-text': matchPath(children.path) }"
                    >
                        {{ children.title }}
                    </a>
                </li>
            </ul>
        </aside>
        <section class="w-[calc(100%-266px)] max-w-[932px] mr-[106px] flex flex-col">
            <div class="section-card">
                <h2><span></span>My Wallet</h2>
                <ul class="bg-info-wrapper px-4 py-2.5 rounded-xl flex items-center gap-[22px]">
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
                        <hr class="border-gray100" />
                        <ul class="wallet-info__card-content ml-2.5 !pt-2.5">
                            <li class="!text-point-unit !text-sm leading-5 !font-bold !font-poppins !items-center">
                                <i class="!text-point font-semibold font-inter leading-[48px] text-4xl">100,000</i>
                                Points
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="section-card">
                <h2><span></span>Summary of March</h2>
                <ul class="flex items-center gap-[22px] px-3 mb-4.5">
                    <li class="pt-5 pb-[9px] px-8 bg-[#B5E4CA40] rounded-xl flex-1">
                        <p class="font-inter text-[#33383F] font-semibold text-[13px] leading-4">Top-up</p>
                        <div class="flex items-end mb-3 mt-1">
                            <i class="text-point font-inter font-bold text-5xl leading-[48px]">10,000</i>
                            <span class="text-point-unit font-bold text-sm leading-5 font-poppins">Points</span>
                        </div>
                        <span
                          class="bg-point-chip p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-point-up rounded -tracking-wide"
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
                          class="bg-point-chip p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-point-down rounded -tracking-wide"
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
                          class="bg-point-chip p-1 flex w-fit items-center gap-1 text-xs leading-4 font-bold text-point-up rounded -tracking-wide"
                        >
                            <UpSvg /> 37.8%
                        </span>
                    </li>
                </ul>
            </div>
            <div class="section-card !px-0">
                <h2 class="px-3"><span></span>Point History</h2>
                <div class="table-function-bar">
                    <label class="date-picker">
                        <Calendar />
                        {{ fromDate }}
                        <input
                          type="date"
                          :value="fromDate"
                          @change="event => fromDate = moment(event.target.value).format('DD/MM/YYYY')"
                        />
                    </label>
                    <span class="date-range-symbol"></span>
                    <label class="date-picker">
                        <Calendar />
                        {{ toDate }}
                        <input
                          type="date"
                          :value="toDate"
                          @change="event => toDate = moment(event.target.value).format('DD/MM/YYYY')"
                        />
                    </label>
                    <div class="search-input">
                        <input
                          type="text"
                          placeholder="Search for Treats"
                          name="search"
                          v-model="search"
                        />
                        <SearchSvg />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th
                              v-for="column in tableColumns"
                              :key="column.field"
                            >{{ column.label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                          v-for="row in rows"
                          :key="row.order_id"
                        >
                            <td
                              v-for="column in tableColumns"
                              :key="column.field"
                            >{{ row[column.field] }}</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
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
