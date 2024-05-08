<script>
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    data() {
        const formModel = {
            companyName: '',
            PICName: '',
            email: '',
            phone: '+63',
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
                    class: 'mt-1.5',
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
                    type: 'tel',
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
    }
}
</script>
<template>
    <header class="header">
        <nav>
            <a href="/">
                <img src="/assets/images/biz_treats_log.png" />
            </a>
            <a
              v-for="menu in navMenu"
              :href="menu.path"
              :key="menu.title"
              v-show="!menu?.hide"
            >
                {{ menu.title }}
            </a>
        </nav>
        <button @click="handleClick">
            Log in
        </button>
    </header>
    <main>
        <form
          @submit="handleSubmit"
          class="form !mx-auto !w-[637px] !max-w-[637px] !py-7 mt-7 mb-12"
        >
            <div>
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="header-log"
                />
                <h3>
                    Inquiry
                </h3>
                <p class="text-center">
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
                    <input
                      :type="form.type"
                      :label="form.label"
                      :name="form.name"
                      :class="form?.class"
                      :placeholder="form.placeholder"
                      v-model="formModel[form.key]"
                      @input="(e) => handleUpdate(form.key, e.target.value)"
                      autocomplete
                    />
                </label>
            </template>
            <button class="mt-4">Inquiry</button>
        </form>
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
                <p class="text-center font-poppins text-sm leading-6 font-normal text-link">
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