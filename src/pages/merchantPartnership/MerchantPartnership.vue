<script>
import { snsMenu, menus, lnbMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart.js';
import { alertData } from '@/mock/alertData.js'
import { handleSearch } from '@/modules/search.js';
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
            snsMenu,
            menus,
            lnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            cartData,
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
        }
    }
}
</script>
<template>
    <header class="service-header">
        <div>
            <nav>
                <a href="/">
                    <img src="/assets/images/biztreats_logo.svg" />
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
    <main class="bg-white-17 flex w-[1228px] mx-auto">
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
                <h1>Merchant Partnership</h1>
                <hr />
                <h2 class="!mb-4.5"><span class="!bg-orange-02"></span>Overview</h2>
                <div
                  class="py-4.5 px-4 mb-6 ml-3 bg-white-18 rounded text-sm font-normal tracking-normal leading-6 text-[#33383F]"
                >
                    Be a part of our partner merchants who have found new customers, increased brand awareness and
                    secured profitable<br>
                    marketing with no upfront cost.
                </div>
                <h2 class="!mb-[30px]"><span></span>Let’s work together as partners with ShareTreats!
                </h2>
                <div class="flex items-center mb-24 ml-12 gap-7">
                    <div class="flex items-start gap-3">
                        <span
                          class="inline-flex items-center justify-center w-8 h-8 border rounded-full border-white-07"
                        >
                            <MailSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Email</span>
                            <span class="text-[#626262] font-medium text-xs leading-5">Partner@sharetreats.com</span>
                        </p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span
                          class="inline-flex items-center justify-center w-8 h-8 border rounded-full border-white-07"
                        >
                            <SmartphoneSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Phone</span>
                            <span class="text-[#626262] font-medium text-xs leading-5">02-8994-0446</span>
                        </p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span
                          class="inline-flex items-center justify-center w-8 h-8 border rounded-full border-white-07"
                        >
                            <MapSvg />
                        </span>
                        <p class="flex flex-col">
                            <span class="text-[#B6B4BA] font-normal text-xs leading-4.5 font-manrope">Location</span>
                            <span class="text-[#626262] font-medium text-xs leading-3">Unit 501 BDO Equitable tower,<br>
                                8751 Paseo De Roxas, Makati City</span>
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
                      src="/assets/images/biztreats_logo.svg"
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
