<script>
import LabelInput from '@/components/LabelInput.vue';
import Checkbox from '@/components/Checkbox.vue';
import Recaptcha from '@/components/Recaptcha.vue';
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    components: {
        LabelInput,
        Checkbox,
        Recaptcha,
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
            <template
              v-for="form in formData"
              :key="form.label"
            >
                <LabelInput
                  :label="form.label"
                  :name="form.name"
                  :placeholder="form.placeholder"
                  :type="form.type"
                  v-model="formModel[form.key]"
                  @update:modelValue="(val) => handleUpdate(form.key, val)"
                />
            </template>
            <Checkbox
              label="Remember this account"
              v-model="rememberAccount"
              name="remember"
              class="my-5"
              @update:modelValue="handleCheck"
            />
            <Recaptcha class="mb-5" />
            <button type="submit">Login</button>
            <a
              href="/password"
              class="text-subLink text-xs tracking-[0.1px] mt-3"
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
