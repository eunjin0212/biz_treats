<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import Background from '@/components/Background.vue';
import LabelInput from '@/components/LabelInput.vue';
import Recaptcha from '@/components/Recaptcha.vue';

export default {
    components: {
        Header,
        Footer,
        Form,
        LabelInput,
        Recaptcha,
        Background,
    },
    data() {
        const formModel = {
            companyEmail: window.location.href.split('=')[1],
            password: '',
            confirmPw: '',
        }
        return {
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
        handleClick() {
            console.log(window.location)
            // 새 비밀번호 등록
        },
        handleUpdate(key, value) {
            this.formModel[key] = value
        }
    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Welcome to Biz Treats!"
          description="Please set your password in order to access the service."
          class="gap-3"
          @submit="handleClick"
        >
        <template v-for="form in setupPwFormData">
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
              class="form-btn mt-10"
              type="submit"
            >
                Submit
            </button>
        </Form>
    </Background>
    <Footer />
</template>
