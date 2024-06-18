<script>
import { snsMenu, menus } from '@/constants/components.js';

export default {
    data() {
        const formModel = {
            companyEmail: window.location.href.split('=')[1],
            password: '',
            confirmPw: '',
        }
        return {
            snsMenu,
            menus,
            formModel,
            formData: [
                {
                    label: 'Company Email',
                    name: 'company_email',
                    value: formModel.companyEmail, // 리다이렉트 이메일 입력
                    placeholder: 'Enter the email',
                    type: 'email',
                    disabled: true,
                    key: 'companyEmail'
                },
                {
                    label: 'Password',
                    name: 'password',
                    value: formModel.password,
                    placeholder: 'Password',
                    type: 'password',
                    key: 'password'
                },
                {
                    label: 'Confirm Password',
                    name: 'confirm_pw',
                    value: formModel.confirmPw,
                    placeholder: 'Enter the email',
                    type: 'text',
                    key: 'confirmPw'
                },
            ],
            sendTempPassword: false
        }
    },
    methods: {
        handleUpdate(key, value) {
            this.formModel[key] = value
        },
        handleSubmit(e) {
            e.preventDefault();
            // 새 비밀번호 등록
        },
    }
}
</script>
<template>
    <header class="header">
        <nav class="!gap-2">
            <a href="/">
                <img src="/assets/images/biztreats_logo.svg" />
            </a>
            <strong class="text-base leading-[22px] font-semibold text-[#4E4E4E]">
                Password set up
            </strong>
        </nav>
    </header>
    <main class="background">
        <div>
            <section>
                <p>
                    Digital Treats For Your Business
                </p>
                <span>
                    Foster Relationships with your Employees and Customers
                </span>
                <img src="/assets/images/bg.png" />
            </section>
            <form
              class="form !gap-3"
              @submit="handleSubmit"
            >
                <div>
                    <img
                      src="/assets/images/biztreats_logo.svg"
                      alt="header-log"
                    />
                    <h3>
                        Welcome to Biz Treats!
                    </h3>
                    <p>
                        Please set your password in order to access the service.
                    </p>
                </div>
                <label
                  v-for="form in formData"
                  :key="form.label"
                  class="input"
                >
                    <span>
                        {{ form.label }}
                    </span>
                    <input
                      :type="form.type"
                      :name="form.name"
                      :placeholder="form.placeholder"
                      v-model="formModel[form.key]"
                      :disabled="form.disabled"
                      @input="(e) => handleUpdate(form.key, e.target.value)"
                      autocomplete="on"
                    />
                </label>
                <button
                  class="mt-10"
                  type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
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
</template>
