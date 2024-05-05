<script>
import { navMenu, snsMenu, menus, lnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
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
import CheckRoundSvg from '@/assets/icons/CheckRoundSvg.vue';

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
        CheckRoundSvg,
    },
    data() {
        return {
            navMenu,
            snsMenu,
            menus,
            lnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
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
                  @click="alertOpen = !alertOpen"
                >
                    <BellSvg />
                    <span class="badge">{{ alertData.length }}</span>
                </button>
                <aside
                  class="alert-wrapper"
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
    </header>
    <main class="bg-bg flex">
        <aside class="lnb">
            <ul>
                <li
                  v-for="lnb in lnbMenu"
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
        <section class="w-[calc(100%-266px)] max-w-[932px] mr-[106px] mb-32">
            <div class="main-section pb-24">
                <h2>Customer Service</h2>
                <div class="ml-2.5 mt-[30px]">
                    <h3 class="text-2xl font-bold leading-8 text-[#595959]">Customer Service hotline</h3>
                    <p
                      v-for="data in hotline"
                      :key="data.title"
                      class="text-base leading-7 font-normal mt-3.5"
                    >
                        <span class="text-list-title">{{ data.title }}</span> :
                        <span class="text-[#1211278F]">{{ data.content }}</span>
                    </p>
                    <h3 class="mt-8 flex items-center text-main font-semibold text-sm leading-6 tracking-wider mb-5">
                        NOTICE
                        <hr class="flex-1 ml-3.5 border-t-[#1211271F]" />
                    </h3>
                    <div
                      v-for="notice in noticeData"
                      :key="notice.title"
                    >
                        <h4 class="text-sm leading-[25px] font-normal text-list-title inline-flex items-center">
                            <CheckRoundSvg class="mr-3" /> {{ notice.title }}
                        </h4>
                        <ul class="mt-3 list-disc ml-10 mb-9">
                            <li
                              v-for="(item, idx) in notice.content"
                              :key="idx"
                              class="text-[#1211278F] text-sm leading-6 font-medium"
                              v-html="item"
                            ></li>
                        </ul>
                    </div>
                </div>
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
