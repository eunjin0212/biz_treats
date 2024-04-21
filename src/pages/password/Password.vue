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
            password: '',
            confirmPw: '',
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
            setupPwFormData: [
                {
                    label: 'Company Email',
                    name: 'company_email',
                    value: formModel.companyEmail,
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
            if (this.formModel.companyEmail) {
                this.sendTempPassword = true
            }
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
          :title="sendTempPassword ? 'Welcome to Biz Treats!' : 'Forgot Password'"
          :img="sendTempPassword ? '/assets/images/biz_treats_log.png' : ''"
          :description="sendTempPassword ? 'Please set your password in order to access the service.' : ''"
          :class="!sendTempPassword ? 'gap-6' : 'gap-3'"
          @submit="handleClick"
        >
            <template v-if="!sendTempPassword">
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
            </template>
            <template v-else>
                <template v-for="form in setupPwFormData">
                    <LabelInput
                      :label="form.label"
                      :name="form.name"
                      :placeholder="form.placeholder"
                      :type="form.type"
                      :disabled="form.disabled"
                      v-model="formModel[form.key]"
                    />
                </template>
                <button
                  class="form-btn mt-10"
                  type="submit"
                >
                    Submit
                </button>
            </template>
        </Form>
    </Background>
    <Footer />
</template>
