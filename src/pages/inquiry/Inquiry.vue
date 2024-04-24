<script>
import LabelInput from '@/components/LabelInput.vue';
import LabelSelect from '@/components/LabelSelect.vue';
import LabelTextArea from '@/components/LabelTextArea.vue';
import { snsMenu, menus, navMenu } from '@/constants/components.js';

export default {
    components: {
        LabelInput,
        LabelSelect,
        LabelTextArea,
    },
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
                    class: 'mt-[6px]',
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
                    class: 'mt-3',
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
          @submit="handleSubmit"
          class="form mb-12 mt-7"
        >
            <div>
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="header-log"
                />
                <h3>
                    Inquiry
                </h3>
                <p>
                    Join Biz Treats now! You can treat your with bulk at once.
                </p>
            </div>
            <template
              v-for="form in formData"
              :key="form.label"
            >
                <LabelSelect
                  v-if="form.type === 'select'"
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form?.placeholder"
                  :option="form?.option"
                  :defaultSelected="form?.defaultSelected"
                  v-model="formModel[form.key]"
                  @update:modelValue="(val) => handleUpdate(form.key, val)"
                />
                <LabelTextArea
                  v-else-if="form.type === 'textarea'"
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form.placeholder"
                  v-model="formModel[form.key]"
                  @update:modelValue="(val) => handleUpdate(form.key, val)"
                />
                <LabelInput
                  v-else
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form.placeholder"
                  v-model="formModel[form.key]"
                  @update:modelValue="(val) => handleUpdate(form.key, val)"
                />
            </template>
            <button>Inquiry</button>
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