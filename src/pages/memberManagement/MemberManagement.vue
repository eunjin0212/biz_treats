<script>
import { navMenu, snsMenu, menus, myPageLnbMenu } from '@/constants/components.js';
import { cartData } from '@/mock/cart';
import { alertData } from '@/mock/alertData.js'
import { rows } from '@/mock/memberManagement.js'
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
import EditSvg from '@/assets/icons/EditSvg.vue';
import PlusSvg from '@/assets/icons/PlusSvg.vue';
import CloseSvg from '@/assets/icons/CloseSvg.vue';

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
        EditSvg,
        PlusSvg,
        CloseSvg,
    },
    data() {
        const rowPerPage = 6
        const pagination = {
            total: rows.length,
            page: 1, // 현재 페이지
            rowPerPage, // 테이블 row 수
            lastPage: Math.ceil(rows.length / rowPerPage), // 마지막 페이지
        }
        const initFilters = {
            tableSearch: '',
        }
        const formModel = {
            type: 'false',
            name: '',
            email: '',
            phone: '',
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
            cartData,
            tableColumns: [
                { label: 'Name', field: 'name', class: '' },
                { label: 'Type', field: 'type', class: 'w-[122px]' },
                { label: 'Email(ID)', field: 'email', class: '' },
                { label: 'Phone', field: 'phone', class: '' },
                { label: 'Register Date', field: 'register_date', class: 'w-[140px]' },
                { label: 'Balance', field: 'balance', class: '' },
                { label: 'Status', field: 'status', class: '' },
                { label: '', field: 'button', class: '' },
            ],
            data: rows.map((row) => ({ ...row, button: row.status === 'invited' ? 'cancel' : row.status === 'canceled' ? 'none' : 'editable' })).slice(pagination.page - 1, rowPerPage),
            initFilters,
            pagination,
            filters: { ...initFilters },
            statusClass: {
                resigned: 'bg-purple-01',
                invited: 'bg-green-02',
                canceled: 'bg-red-04',
                active: 'bg-blue-03',
            },
            statusLabel: {
                resigned: 'Resigned',
                invited: 'Invited',
                canceled: 'Invite Cancelled',
                active: 'Active',
            },
            statusOptions: [{ label: 'Resigned', value: 'resigned' }, { label: 'Active', value: 'active' }],
            isOpen: false,
            formModel,
            modalForm: [
                {
                    label: 'Type',
                    name: 'name',
                    value: formModel.type,
                    type: 'radio',
                    key: 'type',
                },
                {
                    label: 'Name',
                    name: 'name',
                    value: formModel.name,
                    placeholder: 'Enter Member Name',
                    type: 'text',
                    key: 'name',
                },
                {
                    label: 'Phone Number',
                    name: 'phone',
                    value: formModel.phone,
                    placeholder: 'Enter Phone Number',
                    type: 'text',
                    key: 'phone',
                },
                {
                    label: 'Email',
                    name: 'email',
                    value: formModel.email,
                    placeholder: 'Enter Work Email',
                    type: 'email',
                    key: 'email',
                },
            ],
        }
    },
    methods: {
        handleUpdate(key, value) {
            this.formModel[key] = value
        },
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
        handleSave(event) {
            event.preventDefault();
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
                <button class="header-btn inline-flex ml-4.5" @click="() => handleCartLocation()">
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
        <section class="w-[calc(100%-266px)] max-w-[932px] mb-32 flex flex-col">
            <div class="section-card !px-0">
                <h2 class="!mb-4.5 px-3 justify-between">
                    <div class="inline-flex items-center">
                        <span class="!bg-green-03"></span>Member Management
                    </div>
                    <button
                      @click="() => handleModal(true)"
                      class="inline-flex items-center gap-1 font-bold text-sm leading-6 text-white-19 py-3 pl-5.5 pr-6.5 bg-blue-05 rounded-lg"
                    >
                        <PlusSvg />Invite
                    </button>
                </h2>
                <div class="table-filter-bar">
                    <form @submit="handleSubmit">
                        <label class="search-input">
                            <input
                              type="text"
                              placeholder="Enter the name"
                              name="search"
                              v-model="filters.tableSearch"
                            />
                            <SearchSvg />
                        </label>
                        <button type="submit">
                            Search
                        </button>
                    </form>
                </div>
                <div class="data-table__wrapper h-[495px]">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                  :class="column.class"
                                >
                                    {{ column.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                              v-for="row in data"
                              :key="row.order_id"
                            >
                                <td
                                  v-for="column in tableColumns"
                                  :key="column.field"
                                  :class="column.class"
                                >
                                    <div
                                      v-if="['name', 'phone'].includes(column.field)"
                                      class="flex items-center justify-between"
                                    >
                                        <template v-if="row.button !== 'save'">
                                            {{ row[column.field] }}
                                        </template>
                                        <input
                                          v-else
                                          @input="(e) => row[column.field] = e.target.value"
                                          :value="row[column.field]"
                                          :class="column.field === 'name' ? 'w-24 -ml-4' : 'w-[130px]'"
                                          class="px-2 py-3 text-xs border rounded-lg leading-6 border-white-02 bg-white-20 focus:ring-0 focus-visible:border-white-02 focus-within:border-white-02"
                                        />
                                    </div>
                                    <!-- balance -->
                                    <div
                                      v-else-if="column.field === 'balance'"
                                      class="flex items-center justify-between"
                                    >
                                        {{ row[column.field].toLocaleString() }}P
                                    </div>
                                    <!-- status -->
                                    <div
                                      v-else-if="column.field === 'status'"
                                      class="flex items-center justify-between"
                                    >
                                        <!-- exclude canceled invite row -->
                                        <span
                                          class="text-stone-04 text-xs leading-6 font-semibold rounded-md px-3 py-[2px]"
                                          :class="statusClass[row[column.field]]"
                                          v-if="['cancel', 'editable', 'none'].includes(row.button)"
                                        >
                                            {{ statusLabel[row[column.field]] }}
                                        </span>
                                        <select
                                          class="w-28 appearance-none bg-no-repeat bg-[right_10px_center] bg-[url('@/assets/icons/table_select.svg')] border border-white-02 text-xs leading-6 rounded-lg bg-white-20 py-2 pl-4 pr-2.5 focus:ring-0 focus-visible:border-white-02 focus-within:border-white-02"
                                          v-else-if="row.button === 'save'"
                                          :value="row[column.field]"
                                          @change="(e) => {
                        row[column.field] = e.target.value
                    }"
                                        >
                                            <option
                                              v-for="opt in statusOptions"
                                              :value="opt.value"
                                              :key="opt.value"
                                            >{{ opt.label }}</option>
                                        </select>
                                    </div>
                                    <!-- edit, save, cancel button -->
                                    <div
                                      v-else-if="column.field === 'button'"
                                      class="flex items-center justify-between"
                                    >
                                        <button
                                          v-if="row[column.field] === 'editable'"
                                          class="inline-flex items-center justify-center w-10 h-10 border rounded-lg bg-white-20 border-white-02"
                                          @click="() => row[column.field] = 'save'"
                                        >
                                            <EditSvg />
                                        </button>
                                        <button
                                          v-else-if="row[column.field] === 'save'"
                                          class="py-2 text-xs font-semibold text-blue-05 border rounded-lg leading-6 bg-white-20 border-white-02 px-9"
                                          @click="() => row[column.field] = 'editable'"
                                        >
                                            Save
                                        </button>
                                        <button
                                          v-else-if="row[column.field] === 'cancel'"
                                          class="rounded-lg bg-white-20 border border-white-02 py-2 px-3.5 text-xs leading-6 font-semibold text-red-06"
                                        >Invited Cancel</button>
                                    </div>
                                    <!-- ...rest -->
                                    <template v-else>
                                        {{ row[column.field] }}
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination-wrapper mt-14 mb-[31px]">
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
                      :class="{ '!bg-main !text-white-20': page === pagination.page }"
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
                            <span class="!bg-orange-01 ml-0.5"></span>Member Invite
                        </div>
                        <button
                          @click="() => handleModal(false)"
                          class="inline-flex items-center bg-white-10 rounded-full p-2 mr-4.5"
                        >
                            <CloseSvg />
                        </button>
                    </h2>
                    <hr class="border-white-10 !m-0" />
                    <form class="flex flex-col pt-8 pb-3 gap-6 font-inter" @submit="handleSave">
                        <fieldset
                          class="mx-6 modal-form__label-input"
                          v-for="form in modalForm"
                          :key="form.key"
                        >
                            <span>
                                {{ form.label }}
                            </span>
                            <label
                              v-if="form.type === 'radio'"
                              class="radio"
                              :for="form.name"
                            >
                                <input
                                  :type="form.type"
                                  :name="form.name"
                                  :id="form.name"
                                  checked
                                  autocomplete="on"
                                />
                                Member
                            </label>
                            <div
                              v-else-if="form.name === 'phone'"
                              class="flex items-center w-full gap-3"
                            >
                                <input
                                  class="disabled:bg-white-16 disabled:text-zinc-03 !w-[52px] !py-3 !px-3.5"
                                  disabled
                                  type="text"
                                  value="+63"
                                />
                                <input
                                  :type="form.type"
                                  :name="form.name"
                                  :class="form?.class"
                                  :placeholder="form.placeholder"
                                  v-model="formModel[form.key]"
                                  @input="(e) => handleUpdate(form.key, e.target.value)"
                                  autocomplete="on"
                                />
                            </div>
                            <input
                              v-else
                              :type="form.type"
                              :name="form.name"
                              :class="form?.class"
                              :placeholder="form.placeholder"
                              v-model="formModel[form.key]"
                              @input="(e) => handleUpdate(form.key, e.target.value)"
                              autocomplete="on"
                            />
                        </fieldset>
                        <hr class="border-white-10" />
                        <div class="flex items-center justify-end pr-6 -mt-3 gap-2">
                            <button
                              type="button"
                              class="outline-0 w-[120px] h-12 rounded-lg text-[15px] leading-6 font-bold bg-white-19 border-2 text-[#9A9FA5] hover:bg-secondary-04-light border-white-10"
                            >Cancel</button>
                            <button
                              type="submit"
                              class="outline-0 w-[180px] h-12 bg-main text-white-20 rounded-lg text-[15px] leading-6 font-bold hover:bg-blue-06"
                            >Invite</button>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    </Teleport>
</template>
