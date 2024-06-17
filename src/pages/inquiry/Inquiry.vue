<script>
import { snsMenu, menus, navMenu } from '@/constants/components.js';
import InquirySvg from '@/assets/icons/InquirySvg.vue'

export default {
    components: {
        InquirySvg,
    },
    data() {
        const formModel = {
            companyName: '',
            PICName: '',
            email: '',
            phone: '',
            province: '선택',
            city: '선택',
            municipality: '',
            inquiry: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            formModel,
            formData: [
                {
                    label: 'Company Name',
                    name: 'company_name',
                    value: formModel.companyName,
                    placeholder: 'Enter the Company Name',
                    type: 'text',
                    key: 'companyName',
                },
                {
                    label: 'PIC Name',
                    name: 'pic_name',
                    value: formModel.PICName,
                    placeholder: 'Enter the PIC Name',
                    type: 'text',
                    key: 'PICName',
                },
                {
                    label: 'Email',
                    name: 'email',
                    value: formModel.email,
                    placeholder: 'abc@gmail.com',
                    type: 'email',
                    key: 'email',
                },
                {
                    label: 'Phone',
                    name: 'phone',
                    value: formModel.phone,
                    type: 'text',
                    key: 'phone',
                },
                {
                    label: 'Select a Province',
                    name: 'province',
                    value: formModel.province,
                    placeholder: 'Select a Province',
                    defaultSelected: '선택',
                    option: ['서울시'],
                    type: 'select',
                    key: 'province',
                },
                {
                    label: 'Select a City/Municipality',
                    name: 'city',
                    value: formModel.city,
                    placeholder: 'Select a City/Municipality',
                    defaultSelected: '선택',
                    option: ['서울시'],
                    type: 'select',
                    key: 'city',
                },
                {
                    label: '',
                    name: 'municipality',
                    value: formModel.municipality,
                    type: 'text',
                    class: 'mt-1',
                    key: 'municipality',
                },
                {
                    label: 'Inquiry',
                    name: 'inquiry',
                    value: formModel.inquiry,
                    type: 'textarea',
                    class: 'mb-3',
                    key: 'inquiry',
                },
            ],
            isOpen: false,
        };
    },
    methods: {
        handleUpdate(key, value) {
            this.formModel[key] = value
        },
        handleClick() {
            window.location.href = '/login'
        },
        handleSubmit(e) {
            e.preventDefault()
            this.isOpen = true
            const body = document.getElementsByTagName('body')[0]
            body.className = 'overflow-hidden'
        },
        handleModal() {
            this.isOpen = false
            const body = document.getElementsByTagName('body')[0]
            body.className = ''
        }
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        }
    }
}
</script>
<template>
    <header class="bg-white-20 w-full py-2.5">
        <nav class="flex items-center justify-between w-full max-w-[1120px] mx-auto">
            <ul class="flex items-center gap-3 w-fit">
                <li>
                    <a href="/">
                        <img
                          src="/assets/images/biztreats_logo.svg"
                          class="h-12"
                        />
                    </a>
                </li>
                <li
                  class="w-[140px] inline-flex justify-center items-center group cursor-pointer"
                  v-for="menu in Object.values(navMenu).flat()"
                  :key="menu.title"
                  v-show="!menu?.hide"
                  :data-active="matchPath(menu.path)"
                >

                    <a
                      class="w-fit block text-base -tracking-wide text-black-100 font-medium relative group-data-[active=true]:before:content-[''] group-data-[active=true]:before:bg-blue-05 group-data-[active=true]:before:w-full group-data-[active=true]:before:h-px group-data-[active=true]:before:absolute group-data-[active=true]:before:bottom-0 group-data-[active=true]:before:left-0 group-data-[active=true]:text-blue-05 group-hover:text-blue-05 group-hover:before:content-[''] group-hover:before:bg-blue-05 group-hover:before:w-full group-hover:before:h-px group-hover:before:absolute group-hover:before:bottom-0 group-hover:before:left-0"
                      
                      :href="menu.path"
                    >
                        {{ menu.title }}
                    </a>
                </li>
            </ul>
            <div class="inline-flex items-center gap-3">
                <a
                  href="/inquiry"
                  class="w-[140px] text-base -tracking-wide text-blue-05 border border-blue-05 py-3 rounded-md inline-flex items-center font-medium h-12 gap-1 justify-center hover:bg-sky-50"
                >
                    <InquirySvg class="" />
                    Inquiry
                </a>
                <a
                  href="login"
                  class="text-base font-medium text-center border rounded-md border-white-03 py-3 bg-blue-05 hover:bg-blue-06 text-white-20 -tracking-wide w-[148px] h-12"
                >
                    Log in
                </a>
            </div>
        </nav>
    </header>
    <main class="pb-12 pt-7 bg-[url('@/assets/images/company_website_bg.png')] bg-no-repeat bg-center bg-cover">
        <form
          @submit="handleSubmit"
          class="form !mx-auto !w-[637px] !max-w-[637px] !py-7"
        >
            <div>
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="header-log"
                />
                <h3>
                    Inquiry
                </h3>
                <p class="text-center !mt-0.5 mb-4">
                    Join Biz Treats now! You can treat your with bulk at once.
                </p>
            </div>
            <template
              v-for="form in formData"
              :key="form.label"
            >
                <label
                  class="select !gap-1"
                  :class="form?.class"
                  v-if="form.type === 'select'"
                >
                    <span>
                        {{ form.label }}
                    </span>
                    <select
                      v-model="formModel[form.key]"
                      :name="form.name"
                      :placeholder="form.placeholder"
                      @change="(e) => handleUpdate(form.key, e.target.value)"
                    >
                        <option
                          disabled
                          :value="form?.defaultSelected"
                        >
                            {{ form?.defaultSelected }}
                        </option>
                        <option
                          v-for="opt in form?.option"
                          :key="opt"
                          :value="opt?.value || opt"
                        >
                            {{ opt?.label || opt }}
                        </option>
                    </select>
                </label>
                <label
                  class="textarea !gap-1"
                  v-else-if="form.type === 'textarea'"
                >
                    <span>
                        {{ form.label }}
                    </span>
                    <textarea
                      v-model="formModel[form.key]"
                      :name="form.name"
                      @input="(e) => handleUpdate(form.key, e.target.value)"
                    />
                </label>
                <label
                  class="input !gap-1"
                  v-else
                >
                    <span>
                        {{ form.label }}
                    </span>
                    <div
                      v-if="form.key === 'phone'"
                      class="flex items-center w-full gap-2.5"
                    >
                        <input
                          class="disabled:bg-white-16 disabled:text-zinc-03 w-[60px]"
                          disabled
                          type="text"
                          value="+63"
                        />
                        <input
                          :type="form.type"
                          :name="form.name"
                          :class="form?.class"
                          v-model="formModel[form.key]"
                          @input="(e) => handleUpdate(form.key, e.target.value)"
                          autocomplete="on"
                          class="flex-grow"
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
                </label>
            </template>
            <button class="mt-4">Inquiry</button>
        </form>
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
        <hr class="w-[1120px] mx-auto" />
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
    <Teleport to="body">
        <aside
          class="modal__wrapper"
          v-if="isOpen"
        >
            <div
              class="rounded-[20px] bg-[#FCFCFD] w-[420px] h-[244px] mx-auto mt-7 pt-6 pb-5 px-4.5 flex flex-col items-center"
            >
                <h1 class="text-main font-bold text-[22px] leading-10 -tracking-wider mb-3">Thanks for reaching out.
                </h1>
                <p class="text-sm font-normal leading-6 text-center font-poppins text-slate-02">
                    Our CS team will contact you as soonest.<br>
                    When your account creation is complete,<br>
                    you can receive an alert by email.
                </p>
                <button
                  @click="handleModal"
                  class="w-full bg-main text-white-20 font-bold text-base leading-4 font-dmsans py-4 mt-7 rounded-[10px]"
                >Confirm</button>
            </div>
        </aside>
    </Teleport>
</template>