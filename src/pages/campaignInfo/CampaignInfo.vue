<script>
import { snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import { cartData } from '@/mock/cart.js'
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
import UploadSvg from '@/assets/icons/UploadSvg.vue';

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
        UploadSvg,
    },
    data() {
        return {
            snsMenu,
            menus,
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            cartData,
            colorPicker: '#ffffff',
            preview: null,
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
        handleColorPicker(e) {
            this.colorPicker = e.target.value
        },
        handleFilePicker(e) {
            if (!e.target.files.length) return
            const reader = new FileReader()
            reader.onload = (event) => {
                this.preview = event.target.result
            }
            reader.readAsDataURL(e.target.files[0])
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
            <div class="section-card !px-0">
                <h2 class="!mb-4.5 px-3"><span></span>Campaign Info</h2>
                <hr class="!mx-0" />
                <form class="px-6 font-inter flex flex-col gap-[26px] pb-7">
                    <fieldset class="form__label-input">
                        <span>
                            Campaign No.
                        </span>
                        <input
                          type="text"
                          disabled
                          value="T120435"
                        />
                    </fieldset>
                    <fieldset class="form__label-input">
                        <span>
                            Campaign Name
                        </span>
                        <input
                          type="text"
                          placeholder="Enter the Campaign Name"
                        />
                    </fieldset>
                    <fieldset class="form__label-input">
                        <span>
                            Campaign Color
                        </span>
                        <div class="inline-flex items-center gap-6.5">
                            <span
                              :style="{ backgroundColor: colorPicker }"
                              class="inline-block w-9 h-9 border-2 rounded-md border-[#D7D7D7]"
                            ></span>
                            <label
                              class="relative h-12 px-5 py-3 text-xs font-bold leading-6 border cursor-pointer text-blue-05 w-fit rounded-xl border-white-02 hover:bg-white-02-light"
                            >
                                <input
                                  type="color"
                                  :value="colorPicker"
                                  class="absolute top-0 left-0 w-full h-full opacity-0"
                                  @input="handleColorPicker"
                                />
                                Select Color
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="form__label-input">
                        <span>
                            Campaign Logo
                        </span>
                        <div class="flex gap-3.5">
                            <img
                              class="border border-white-10 rounded-lg w-52 h-[116px] object-none"
                              :src="preview ?? '/assets/icons/img_placeholder.svg'"
                              alt=""
                            />
                            <div class="flex flex-col gap-1.5">
                                <label
                                  class="cursor-pointer inline-flex relative items-center gap-1 py-3 pl-7 pr-[42px] rounded-xl border border-white-02 text-blue-05 text-xs leading-6 font-bold hover:bg-white-02-light"
                                >
                                    <input
                                      type="file"
                                      accept="image/*"
                                      class="absolute top-0 left-0 w-full h-full opacity-0"
                                      @change="handleFilePicker"
                                    />
                                    <UploadSvg />
                                    Upload
                                </label>
                                <p class="inline-flex flex-col">
                                    <span class="text-xs leading-3.5 font-medium text-zinc-04">
                                        Click to upload
                                    </span>
                                    <span class="text-xs leading-3.5 font-normal text-zinc-04">
                                        PNG, JPG(max 5MB)
                                    </span>
                                </p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="form__label-input">
                        <span>
                            Campaign Address
                        </span>
                        <input
                          type="text"
                          placeholder="Enter the Campaign Address"
                        />
                    </fieldset>
                </form>
                <hr class="!mx-0 !mb-0" />
                <div class="flex items-center justify-end gap-2 pt-3 pr-6">
                    <button
                      class="w-[120px] h-12 rounded-lg text-[15px] leading-6 font-bold bg-white-19 border-2 text-[#9A9FA5] hover:bg-secondary-04-light border-white-10"
                    >Cancel</button>
                    <button
                      class="w-[180px] h-12 bg-main text-white-20 rounded-lg text-[15px] leading-6 font-bold hover:bg-blue-06"
                    >Save</button>
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
