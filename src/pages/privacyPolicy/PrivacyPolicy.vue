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
                <div class="ml-4 btn-group">
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
            <div class="main-section pb-[50px] text-black-100 text-xs leading-5 mb-7">
                <h2>Privacy Policy</h2>
                <strong class="mt-6 leading-3.5 block">Use of Information</strong>
                <p class="w-[848px] mb-5">
                    Share Treats Innovation Corp. will not collect any information about you unless you knowingly and
                    voluntarily provide your personal information. Personal Identifiable information shall include but
                    not limited to your name, e-mail address, phone number, and other specific information about you.
                </p>
                <p class="w-[848px] mb-5">
                    Share Treats Innovation Corp. however, may share the non-personal aggregate, or summary of
                    information regarding users of the site or the participants of the programs (“The Users”) with
                    partners or other third parties solely for the purpose of improving its site and its programs.
                </p>
                <p class="w-[848px] mb-5">
                    Share Treats Innovation Corp. does not sell, share or disclose any personal identifiable
                    information.
                </p>
                <p class="w-[848px] mb-5">
                    From time to time, Share Treats may use your personal identifiable information in order to notify
                    you and other users of any news and updates in the site or in any of its programs. You may, however,
                    unsubscribe yourself from receiving Site and Programs’ news and updates from Share Treats and any
                    time by sending an email to biztreats@sharetreats.com requesting that your email address be removed
                    from the mailing list of site and programs’ news and updates.
                </p>
                <strong class="leading-3.5">Transfer of user benefits and materials.</strong>
                <p class="w-[848px] mb-[30px]">
                    Except as otherwise prohibited herein, the benefits and materials, including but not limited to API
                    documentation, software tools and development kits, instruction manual, software, technical support
                    incidents, and application keys, provided to you as part of your access to this site and programs
                    may not be transferred. You agree that you will not otherwise transfer, publish, copy, or
                    disseminate such materials.
                </p>
                <strong class="leading-3.5">Accuracy of published site content information.</strong>
                <p class="w-[848px] mb-[30px]">
                    It is your responsibility to evaluate the accuracy completeness and usefulness of any opinion,
                    advice, services or other information provided. The information of this site may be changed or
                    updated without notice. Share Treats may also make improvement and/or changes in the site and
                    programs at any time without notice. Information provided on this site is believed to be reliable
                    when posted. However, Share Treats cannot guarantee that information will be accurate, complete and
                    current at all times. All information on this site is subject to modification from time to time
                    without notice. Every time you access this site, make sure that you check this page. Share Treats
                    has used its discretion, best judgement and all reasonable efforts in collecting and preparing the
                    information, documents (incl. copy, graphics, pictures, etc.) or other items provided or available
                    herein, but any such information, document or other item is provided or available without any
                    warrant of any kind, either express or implied, including but not limited to, the warranties of
                    completeness, accuracy, fitness for a particular purpose, or non-infringement of any intellectual
                    property rights.
                </p>
                <strong class="leading-3.5">Data protection Officer Information</strong>
                <p class="w-[848px] mb-[30px]">
                    SHARE TREATS INNOVATION CORPORATION<br>
                    Unit 501 BDO Equitable tower, 8751 Paseo De Roxas, Makati City<br>
                    Email : dpo.ph@sharetreats.com
                </p>
                <div class="text-center w-fit">
                    <img
                      src="/assets/images/validity_period.webp"
                      alt="validity_period"
                    />
                    <em>Validity Period : May 4, 2024</em>
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
