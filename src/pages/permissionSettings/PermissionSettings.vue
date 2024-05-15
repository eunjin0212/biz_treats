<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { users } from '@/mock/permissionSettings.js'
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
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            users,
            userList: [],
            profileColors: ['!bg-green-03', '!bg-orange-01', '!bg-blue-100'],
            permissionList: [
                {
                    label: 'Campaign Info',
                    value: 'campaign_info',
                    options: [{ label: 'only view', value: '0' }, { label: 'Edit', value: '1' }],
                },
                {
                    label: 'Member Management',
                    value: 'member_management',
                    options: [{ label: 'N/A', value: '0' }, { label: 'Access&Edit', value: '1' }],
                },
                {
                    label: 'Points Top-up Management',
                    value: 'points_top_up_management',
                    options: [{ label: 'N/A', value: '0' }, { label: 'Access&Edit', value: '1' }],
                },
                {
                    label: 'Points Transfer/Retrieve',
                    value: 'points_transfer_retrieve',
                    options: [{ label: 'N/A', value: '0' }, { label: 'Access&Edit', value: '1' }],
                },
                {
                    label: 'Monthly Report',
                    value: 'monthly_report',
                    options: [{ label: 'N/A', value: '0' }, { label: 'Access&Edit', value: '1' }],
                },
                {
                    label: 'Permission Settings',
                    value: 'permission_settings',
                    options: [{ label: 'N/A', value: '0' }, { label: 'Access&Edit', value: '1' }],
                },
            ],
            userPermission: {}
        }
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
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
        handleActive: function (id) {
            this.userList = this.userList.map((user) => ({ ...user, active: false }))
            console.log(id)
            const findRow = this.userList.find((user) => id === user.id)
            console.log(findRow)
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
    },
    beforeMount() {
        // create member data
        this.userList = users.map((user, idx) => ({ ...user, id: idx, active: false, color: this.profileColors[Math.floor(Math.random() * 3)] }))
        this.userList[0].active = true
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
            <div class="section-card mb-11 !px-0 !pb-0 mt-3.5">
                <h2><span class="!bg-green-03"></span>Permission Settings</h2>
                <div class="flex h-[738px]">
                    <div class="border-t border-r border-r-white-10 border-t-white-10">
                        <h3 class="text-[15px] font-semibold leading-6 text-slate-01 p-3.5 bg-[#FAFAFA]">Member List
                        </h3>
                        <ul class="h-[calc(738px-52px)] pr-4.5 pl-3.5 overflow-y-scroll">
                            <li
                              v-for="user in userList"
                              :key="user.name"
                              class="py-1 mb-1 border-b border-b-white-10"
                            >
                                <button
                                  class="flex items-center justify-between py-3 px-2 w-[266px] rounded-md hover:bg-[#F5F5F5]"
                                  :class="{ 'bg-[#F5F5F5]': user.active }"
                                  @click="() => handleActive(user.id)"
                                >
                                    <label>
                                        <img
                                          v-if="user.profile"
                                          :src="user.profile"
                                          :alt="user.name"
                                        />
                                        <span
                                          v-else
                                          :class="user.color"
                                          class="text-white-20 mr-2 inline-flex justify-center items-center w-[38px] h-[38px] rounded-full text-lg leading-6 font-bold"
                                        >{{ user.name.charAt(0).toUpperCase() }}</span>
                                        {{ user.name }}
                                    </label>
                                    <span
                                      v-if="user.is_admin"
                                      class="bg-blue-300 text-white-20 border border-[#F2F2F2] rounded-md inline-block w-[50px] text-center leading-6 font-semibold text-[10px]"
                                    >Admin</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <form
                      class="flex-grow border-t border-t-white-10"
                      @submit="handleSubmit"
                    >
                        <h3 class="text-[15px] font-semibold leading-6 text-slate-01 p-3.5 bg-[#FAFAFA]">Permission List
                        </h3>
                        <ul>
                            <li
                              v-for="permission in permissionList"
                              :key="permission.value"
                              class="border-b border-b-white-10 flex items-center w-full px-6 py-[22px]"
                            >
                                <label>{{ permission.label }}</label>
                            </li>
                            <button
                              type="submit"
                              class="float-right w-[180px] h-12 bg-blue-300 mr-5 mt-[26px] text-white-20 rounded-lg text-[15px] leading-6 font-bold hover:bg-blue-400"
                            >Save</button>
                        </ul>
                    </form>
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
