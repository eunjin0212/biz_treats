<script>
import CheckSvg from '@/assets/icons/CheckSvg.vue'
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    components: {
        CheckSvg,
    },
    data() {
        const formModel = {
            companyEmail: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            reCaptcha: false,
            formModel,
            formData: {
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
            <label class="input">
                <span>
                    {{ formData.label }}
                </span>
                <input
                  :name="formData.name"
                  :placeholder="formData.placeholder"
                  :type="formData.type"
                  v-model="formModel[formData.key]"
                  @input="(e) => handleUpdate(formData.key, e.target.value)"
                  autocomplete="on"
                />
            </label>
            <div class="mb-5 recaptcha">
                <div
                class="checkbox"
                  @click.prevent="() => {
                    reCaptcha = !reCaptcha;
                  }"
                >
                    <input
                      id="reCaptcha"
                      type="checkbox"
                      :value="reCaptcha"
                      name="reCaptcha"
                    />
                    <span :class="reCaptcha ? 'border-blue-07 bg-blue-07' : 'border-neutral-300 bg-white'">
                        <CheckSvg :class="reCaptcha ? 'text-white-20' : 'hidden'" />
                    </span>
                    <label
                      for="reCaptcha"
                    >
                        I'm not a robot
                    </label>
                </div>
                <img
                  src="/assets/icons/reCAPTCHA_logo.svg"
                  alt="reCAPTCHA_logo"
                />
            </div>
            <button
              class="form-btn"
              type="submit"
            >
                Send Temporary Password
            </button>
            <a
              href="/login"
              class="mt-2 text-xs text-main"
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
