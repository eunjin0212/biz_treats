<script>
import LabelInput from '@/components/LabelInput.vue';
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    components: {
        LabelInput,
    },
    data() {
        const formModel = {
            companyEmail: window.location.href.split('=')[1],
            password: '',
            confirmPw: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            formModel,
            setupPwFormData: [
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
                <img src="/assets/images/biz_treats_log.png" />
            </a>
            <strong class="text-base leading-[22px] font-semibold text-[#4E4E4E]">
                Password set up

            </strong>
        </nav>
    </header>
    <main class="background">
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
                  src="/assets/images/biz_treats_log.png"
                  alt="header-log"
                />
                <h3>
                    Welcome to Biz Treats!
                </h3>
                <p>
                    Please set your password in order to access the service.
                </p>
            </div>
            <template
              v-for="form in setupPwFormData"
              :key="form.label"
            >
                <LabelInput
                  :label="form.label"
                  :name="form.name"
                  :placeholder="form.placeholder"
                  :type="form.type"
                  :disabled="form.disabled"
                  v-model="formModel[form.key]"
                  @update:modelValue="(val) => handleUpdate(form.key, val)"
                />
            </template>
            <button
              class="mt-10"
              type="submit"
            >
                Submit
            </button>
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
</template>
