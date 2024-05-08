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
import AccordionSvg from '@/assets/icons/AccordionSvg.vue';

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
        AccordionSvg,
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
            accordionData: [
                {
                    title: 'About BIZ TREATS',
                    children: [
                        {
                            title: 'What is BIZ TREATS?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                        {
                            title: 'Are there any contacts for additional inquiries?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                    ],
                },
                {
                    title: 'Sign Up / Sign In',
                    children: [
                        {
                            title: 'How can we tie-up to Biz Treats?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                    ],
                },
                {
                    title: 'Merchant / Redemption',
                    children: [
                        {
                            title: 'How to redeem?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                    ],
                },
                {
                    title: 'Treats Code',
                    children: [
                        {
                            title: 'Code Validity',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                        {
                            title: 'What if I need technical help?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                        {
                            title: 'What if I sent the treat to wrong number?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                        {
                            title: 'What if my recipient did not receive the voucher code?',
                            content: "BIZ TREATS is a gifting service that allows Smart, Talk 'N Text, & SUN Prepaid Subscribers to send instant gifts to friends and loved ones. The service allows the use of airtime load as payment channel for purchasing gift items. It has two items for users, STICKER and FREEBIE. Sticker can be downloaded directly to the user’s mobile phone while the Freebie can be claimed by presenting the SMS notification with freebie code to our partner merchant/s nationwide.",
                            active: false,
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
        handleToggle(content) {
            const index = this.accordionData.findIndex((data) => data.children.some((item) => content.title === item.title))
            const activeItem = this.accordionData[index].children.find((item) => item.title === content.title)
            // 단일 아코디언
            this.accordionData.forEach((data) => {
                data.children.forEach((item) => {
                    if (item.title !== content.title) {
                        item.active = false
                    }
                })
            })
            activeItem.active = !activeItem.active

            // 다중 아코디언
            // activeItem.active = !activeItem.active

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
        <section class="w-[calc(100%-266px)] max-w-[932px] mb-5">
            <div class="main-section pb-[50px]">
                <h2>FAQS</h2>
                <div
                  class="accordion"
                  v-for="accordion in accordionData"
                  :key="accordion.title"
                >
                    <h3
                      class="accordion__section-title text-main font-bold text-base leading-5 mt-6 pb-3 border-b border-b-accordion-border"
                    >{{ accordion.title }}</h3>
                    <div
                      class="accordion__section-content"
                      v-for="content in accordion.children"
                      :key="content.title"
                    >
                        <h4
                          @click="() => handleToggle(content)"
                          class="py-4 cursor-pointer text-[#495057] border-b border-b-[#F0F2F4] inline-flex items-center justify-between w-full pr-5"
                        >{{ content.title }}
                            <AccordionSvg />
                        </h4>
                        <div
                          class="px-3 pt-3.5 pb-8 font-normal leading-3.4 text-[13px] text-neutral-500 bg-white-18 hidden h-0 transition-all"
                          :class="{ '!h-auto !block': content.active }"
                        >
                            {{ content.content }}
                        </div>
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
