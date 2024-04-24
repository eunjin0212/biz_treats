<script>
import LabelInput from '@/components/LabelInput.vue';
import Recaptcha from '@/components/Recaptcha.vue';
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    components: {
        LabelInput,
        Recaptcha,
    },
    data() {
        const formModel = {
            companyEmail: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            formModel,
            forgetPwFormData: {
                label: 'Company Email',
                name: 'company_email',
                value: formModel.companyEmail,
                placeholder: 'Enter the email',
                type: 'text',
                key: 'companyEmail'
            },
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
        handleSubmit(e) {
            e.preventDefault();
        },
        handleUpdate(key, value) {
            this.formModel[key] = value
        },
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
          @submit="handleSubmit"
          class="form mb-12 mt-7 !gap-6"
        >
            <div>
                <h3>
                    Forgot Password
                </h3>
            </div>
            <LabelInput
              :label="forgetPwFormData.label"
              :name="forgetPwFormData.name"
              :placeholder="forgetPwFormData.placeholder"
              :type="forgetPwFormData.type"
              v-model="formModel[forgetPwFormData.key]"
              @update:modelValue="(val) => handleUpdate(forgetPwFormData.key, val)"
            />
            <Recaptcha />
            <button
              class="form-btn"
              type="submit"
            >
                Send Temporary Password
            </button>
            <a
              href="/login"
              class="text-main mt-2 text-xs"
            >
                Back to Login
            </a>
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
