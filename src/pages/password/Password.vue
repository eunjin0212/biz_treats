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
            companyEmail: '',
        }
        return {
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
            // 이메일 보내기
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
          title="Forgot Password"
          img=""
          class="gap-6"
          @submit="handleClick"
        >
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
              class="text-main mt-2"
            >
                Back to Login
            </a>
        </Form>
    </Background>
    <Footer />
</template>
