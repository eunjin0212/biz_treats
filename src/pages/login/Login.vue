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
        <div>
            <nav>
                <a href="/">
                    <img src="/assets/images/biztreats_logo.svg" />
                </a>
                <strong class="text-base leading-[22px] font-semibold text-[#4E4E4E]">
                    Log In
                </strong>
            </nav>
        </div>
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
                      autocomplete="on"
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
                    <span :class="rememberAccount ? 'border-blue-09 bg-blue-09' : 'border-neutral-300 bg-white'">
                        <CheckSvg :class="rememberAccount ? 'text-white-20' : 'hidden'" />
                    </span>
                    <label for="remember">
                        Remember this account
                    </label>
                </div>
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
                        <span :class="reCaptcha ? 'border-blue-09 bg-blue-09' : 'border-neutral-300 bg-white'">
                            <CheckSvg :class="reCaptcha ? 'text-white-20' : 'hidden'" />
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
                  class="text-secondary-03 text-xs tracking-[0.1px] mt-3"
                >Forgot your password? Click here!</a>
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
