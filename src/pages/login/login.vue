<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import Background from '@/components/Background.vue';
import LabelInput from '@/components/LabelInput.vue';
import Checkbox from '@/components/Checkbox.vue';
import Recaptcha from '@/components/Recaptcha.vue';

export default {
    components: {
        Header,
        Footer,
        Form,
        LabelInput,
        Checkbox,
        Recaptcha,
        Background,
    },
    data() {
        const formModel = {
            companyEmail: '',
            password: '',
        }
        return {
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
    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Log In"
          class="gap-3"
        >
            <template v-for="form in formData">
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
            <button class="form-btn" type="submit">Login</button>
            <a href="/password" class="text-subLink text-sm tracking-[0.1px] mt-3">Forgot your password? Click here!</a>
        </Form>
    </Background>
    <Footer />
</template>
