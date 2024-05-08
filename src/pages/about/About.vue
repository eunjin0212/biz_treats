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
import MailSvg from '@/assets/icons/MailSvg.vue';
import MapSvg from '@/assets/icons/MapSvg.vue';
import SmartphoneSvg from '@/assets/icons/SmartphoneSvg.vue';

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
        MailSvg,
        MapSvg,
        SmartphoneSvg,
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
                    <span class="text-[15px] leading-5 -tracking-[0.323px] font-bold font-inter ml-4 mr-1.5">32</span>
                </button>
                <div class="btn-group ml-4">
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
    <main class="bgwhite-17 flex w-[1228px] mx-auto">
        <aside class="lnb service-lnb">
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
                      :class="{ 'bg-white-15 !text-black-200': matchPath(children.path) }"
                    >
                        {{ children.title }}
                    </a>
                </li>
            </ul>
        </aside>
        <section class="w-[calc(100%-266px)] max-w-[932px] flex flex-col">
            <div class="section-card">
                <h1>Company Information</h1>
                <hr />
                <h2 class="!mb-4.5"><span class="!bg-[#FFBC99]"></span>Overview</h2>
                <div
                  class="py-4.5 px-4 mb-6 ml-3 bg-white-18 rounded text-sm font-normal tracking-normal leading-6 text-[#33383F]"
                >
                    The first in the country to introduce the power of Gifticon, Share Treats Innovation Corporation
                    (STIC) provides its clients cutting<br>
                    edge service when it comes to revolutionizing their process and content for rewards and loyalty
                    platforms.<br>
                    STIC believes that seamless redemption and Digital execution is the future of Loyalty, Rewards and
                    Engagement Programs.<br>
                    With its versatile cloud-based solution, we ensure that our service help companies evolve fast on
                    top of the rapidly moving<br>
                    technology curve.
                </div>
                <h2 class="!mb-[30px]"><span></span>Let's work together as partners with ShareTreats! Talk to us now at
                </h2>
                <div class="flex items-center ml-12 mb-8 gap-7">
                    <div class="flex items-start gap-3">
                        <span
                          class="w-8 h-8 border border-white-07 rounded-full inline-flex justify-center items-center"
                        >
                            <MailSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Email</span>
                            <span class="text-[#626262] font-medium text-xs leading-5">biztreats@sharetreats.com</span>
                        </p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span
                          class="w-8 h-8 border border-white-07 rounded-full inline-flex justify-center items-center"
                        >
                            <SmartphoneSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Phone</span>
                            <span class="text-[#626262] font-medium text-xs leading-5">+63-917-712-4921</span>
                        </p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span
                          class="w-8 h-8 border border-white-07 rounded-full inline-flex justify-center items-center"
                        >
                            <MapSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Location</span>
                            <span class="text-[#626262] font-medium text-xs leading-3">Unit 501 BDO Equitable tower,<br> 8751 Paseo De Roxas, Makati City</span>
                        </p>
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
