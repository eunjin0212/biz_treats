<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
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
import CloseSvg from '@/assets/icons/CloseSvg.vue';
import CalendarSvg from '@/assets/icons/CalendarSvg.vue';
import CautionSvg from '@/assets/icons/CautionSvg.vue';
import CheckSvg from '@/assets/icons/CheckSvg.vue'
import TableCalendarSvg from '@/assets/icons/TableCalendarSvg.vue'

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
        CloseSvg,
        CalendarSvg,
        CautionSvg,
        CheckSvg,
        TableCalendarSvg,
    },
    data() {
        const systemsList = [
            {
                value: 'notification',
                title: 'Notification',
                description: 'This is for the notification function on the menu bar. If you turn it on, you can get an alert of Points movement and reserve sending result.',
            },
            {
                value: 'monthly_report',
                title: 'Monthly Report',
                description: 'This is for the extract report function of each month. If you turn it on, you can extract all member’s point usage history.',
            },
            {
                value: 'team_wallet_mode',
                title: 'Team Wallet Mode',
                description: 'This is for using the campaign in ‘Team’ mode. If you turn it off, other people can’t access this campaign.',
                caution: '*Once turned on, it can’t be changed OFF mode.',
            },
        ]
        const initSystemData = {
            notification: false,
            monthly_report: false,
            team_wallet_mode: false,
        }
        const formModel = {
            delegation_date: moment(new Date()).format('DD/MM/YYYY'),
            account: '',
            notes: '',
            agree: false,
        }
        return {
            navMenu,
            snsMenu,
            menus,
            myPageLnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
            systemsList,
            systemData: initSystemData,
            isOpen: false,
            formModel,
            displayModalFormDate: moment(new Date()).format('YYYY-MM-DD'),
            modalForm: [
                {
                    label: 'Delegation Date',
                    name: 'delegation_date',
                    value: formModel.delegation_date,
                    type: 'date',
                    key: 'delegation_date',
                    required: true,
                },
                {
                    label: 'New PIC Account',
                    name: 'account',
                    value: formModel.account,
                    type: 'select',
                    options: [
                        'Lana Kim(lana@sharetreats.com)',
                        'Lana Kim(lana@sharetreats.com)',
                    ],
                    key: 'account',
                    required: true,
                },
                {
                    label: 'Notes',
                    name: 'notes',
                    value: formModel.notes,
                    type: 'textarea',
                    key: 'notes',
                    required: false,
                },
            ],
            requestColumns: [
                { label: 'Date', field: 'date', class: '', type: 'date' },
                { label: 'Name', field: 'name', class: 'w-[168px]', type: 'input', placeholder: 'Enter Name' },
                { label: 'Notes', field: 'notes', class: 'w-[325px]', type: 'input', placeholder: 'Enter Notes' },
                { label: '', field: 'button', class: '', type: 'button', },
            ],
            rows: [
                { date: moment(new Date()).format('DD/MM/YYYY'), name: '', notes: '' }
            ],
            isRequest: false,
            displayRowDate: moment(new Date()).format('MM/DD/YYYY'),
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
        handleDate() {
            this.formModel.delegation_date = moment(event.target.value).format('DD/MM/YYYY')
            this.displayModalFormDate = moment(event.target.value).format('YYYY-MM-DD')
        },
        handleRequest(event) {
            event.preventDefault();
            this.handleModal(false)
            this.isRequest = true
        },
        handleRowDate() {
            this.rows[0].date = moment(event.target.value).format('DD/MM/YYYY')
            this.displayRowDate = moment(event.target.value).format('MM/DD/YYYY')
        }
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
                <h2><span class="!bg-green-03 ml-3"></span>System Settings</h2>
                <hr class="!mx-0 !mt-0 !mb-6 border-white-10" />
                <div class="flex flex-col gap-4.5 px-6.5 pb-12">
                    <div
                      v-for="(item, index) in systemsList"
                      :key="index"
                      class="flex flex-col px-5 py-4 border border-white-10 rounded-xl"
                    >
                        <p class="flex items-center h-6 mb-4">
                            <strong class="inline-block w-32 mr-4 text-sm font-semibold leading-6 text-black-200">
                                {{ item.title }}
                            </strong>
                            <label class="toggle">
                                <input
                                  type="checkbox"
                                  :checked="systemData[item.value]"
                                />
                                <span class="slider round"></span>
                            </label>
                        </p>
                        <small class="text-xs font-normal leading-5 text-slate-01">{{ item.description }}</small>
                        <span
                          v-if="item?.caution"
                          class="text-xs font-normal leading-5 text-red-600"
                        >{{ item.caution }}</span>
                    </div>
                </div>
                <h2><span class="!bg-green-03 ml-3"></span>Manager Delegation</h2>
                <hr class="!mx-0 !mt-0 !mb-6 border-white-10" />
                <div class="pb-20 pl-6.5">
                    <p class="flex flex-col">
                        <strong class="text-sm font-semibold leading-6 text-black-200">
                            Request Delegation
                        </strong>
                        <span class="text-xs font-normal leading-6 text-slate-01">
                            Once delegated authority has been delegated, it cannot be restored. When you reactivate your
                            account, it will change to a sub wallet.
                        </span>
                    </p>
                    <button
                      @click="() => handleModal(true)"
                      v-if="!isRequest"
                      class="w-[264px] h-12 rounded-xl border border-white-02 mt-3.5 text-blue-300 font-bold text-[15px] leading-6"
                    >
                        Delegation Reservation
                    </button>
                    <table v-else class="mt-3">
                        <thead>
                            <tr>
                                <th
                                  v-for="col in requestColumns"
                                  :key="col.field"
                                  :class="col.class"
                                  class="text-[#B2B3BD] font-semibold text-[13px] leading-4.5 text-left px-2 pb-1 first-of-type:pl-0 last-of-type:pr-0 border-b border-b-[#E4E4E4]"
                                >{{ col.label }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                              v-for="row in rows"
                              :key="row"
                            >
                                <td
                                  v-for="col in requestColumns"
                                  :key="col.field"
                                  class="px-2 py-2 first-of-type:pl-0 last-of-type:pr-0"
                                >
                                    <label
                                      class="date-picker no-hover !rounded-md !h-11 !w-[132px] !text-black-200 !text-xs !leading-6"
                                      v-if="col.type === 'date'"
                                    >
                                        <TableCalendarSvg class="mr-3" />
                                        {{ displayRowDate }}
                                        <input
                                          :type="col.type"
                                          :value="row[col.field]"
                                          @change="handleRowDate"
                                        />
                                    </label>
                                    <label class="input" v-else-if="col.type === 'input'">
                                        <input
                                          type="text"
                                          :placeholder="col?.placeholder"
                                        />
                                    </label>
                                    <button v-else class="w-[120px] border-2 border-white-10 rounded-lg h-11 bg-white-19 text-[#9A9FA5]">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            <div class="rounded-2xl w-[578px] h-[468px] mx-auto pt-[30px] pb-3 pl-4.5 pr-6 flex flex-col items-center">

                <div class="section-card !px-0 !m-0">
                    <h2 class="!mb-5 mt-1.5 px-3 justify-between">
                        <div class="inline-flex items-center">
                            <span class="!bg-orange-01 ml-0.5"></span>Request Delegation
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
                      @submit="handleRequest"
                    >
                        <fieldset
                          class="px-4.5 modal-form__label-input"
                          v-for="form in modalForm"
                          :key="form.key"
                        >
                            <label class="w-32 text-sm leading-6 min-w-32 mr-7">
                                <span class=" text-slate-01 text-nowrap">
                                    {{ form.label }}
                                </span>
                                <span
                                  class="text-[#FF2C2C]"
                                  v-if="form.required"
                                >*</span>
                            </label>
                            <select
                              class="w-full select !border-white-10"
                              v-model="form.value"
                              v-if="form.type === 'select'"
                            >
                                <option
                                  :value="opt"
                                  :key="opt"
                                  v-for="opt in form.options"
                                >{{ opt }}</option>
                            </select>
                            <textarea
                              v-else-if="form.type === 'textarea'"
                              placeholder="Enter the comments"
                              class="resize-none h-36"
                              v-model="form.value"
                            />
                            <label
                              class="!w-full !justify-start date-picker no-hover pl-4 !h-12 !text-slate-01"
                              v-else-if="form.type === 'date'"
                            >
                                <CalendarSvg class="mr-4" />
                                {{ displayModalFormDate }}
                                <input
                                  :type="form.type"
                                  :value="form.value"
                                  @change="handleDate"
                                />
                            </label>
                        </fieldset>
                        <div class="bg-[#EF466F14] mx-4.5 px-5 py-3.5 rounded-lg">
                            <p class="inline-flex items-center gap-2 mb-3 text-sm font-medium leading-4 text-red-700">
                                <CautionSvg />
                                After delegation, the request cannot be undone.
                            </p>
                            <label
                              class="text-sm font-medium leading-4 checkbox text-slate-01"
                              @click.prevent="() => {
                        formModel.agree = !formModel.agree
                    }"
                            >
                                <input
                                  type="checkbox"
                                  :checked="formModel.agree"
                                />
                                <span
                                  class="mr-2.5"
                                  :class="{ 'active': formModel.agree }"
                                >
                                    <CheckSvg :class="formModel.agree ? 'text-white-20' : 'hidden'" />
                                </span>I Agree with this
                            </label>
                        </div>
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
                            >Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    </Teleport>
</template>
