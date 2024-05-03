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
            password: '',
        }
        return {
            navMenu,
            snsMenu,
            menus,
            reCaptcha: false,
            rememberAccount: false,
            formModel,
            formData: [
                {
                    label: 'Company Email',
                    name: 'company_email',
                    value: formModel.companyEmail,
                    placeholder: 'Enter the email',
                    type: 'email',
                    key: 'companyEmail',
                },
                {
                    label: 'Password',
                    name: 'password',
                    value: formModel.password,
                    placeholder: 'Password',
                    type: 'password',
                    key: 'password',
                },
            ],
        };
    },
    methods: {
        handleUpdate(key, value) {
            this.formModel[key] = value
        },
        handleCheck(val) {
            this.rememberAccount = val
        },
        handleClick() {
            window.location.href = '/login'
        },
        handleSubmit(e) {
            e.preventDefault();
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
          class="form !gap-3"
          @submit="handleSubmit"
        >
            <div>
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="header-log"
                />
                <h3>
                    Log In
                </h3>
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
                  :label="form.label"
                  :name="form.name"
                  :placeholder="form.placeholder"
                  v-model="formModel[form.key]"
                  @input="(e) => handleUpdate(form.key, e.target.value)"
                  autocomplete
                />
            </label>
            <div
              class="checkbox my-2.5"
              @click.prevent="() => {
                rememberAccount = !rememberAccount;
            }"
            >
                <input
                  id="remember"
                  type="checkbox"
                  :value="rememberAccount"
                  name="remember"
                  class="hidden"
                />
                <span :class="rememberAccount ? 'border-blue-600 bg-blue-600' : 'border-neutral-300 bg-white'">
                    <CheckSvg :class="rememberAccount ? 'text-white' : 'hidden'" />
                </span>
                <label for="remember">
                    Remember this account
                </label>
            </div>
            <div class="recaptcha mb-5">
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
                    <span :class="reCaptcha ? 'border-blue-600 bg-blue-600' : 'border-neutral-300 bg-white'">
                        <CheckSvg :class="reCaptcha ? 'text-white' : 'hidden'" />
                    </span>
                    <label for="reCaptcha">
                        I'm not a robot
                    </label>
                </div>
                <img
                  src="/assets/icons/reCAPTCHA_logo.svg"
                  alt="reCAPTCHA_logo"
                />
            </div>
            <button type="submit">Login</button>
            <a
              href="/password"
              class="text-gray-500 text-xs tracking-[0.1px] mt-3"
            >Forgot your password? Click here!</a>
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
