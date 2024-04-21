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
                    type: 'text',
                },
                {
                    label: 'Password',
                    name: 'password',
                    value: formModel.password,
                    placeholder: 'Password',
                    type: 'password',
                },
            ]
        }
    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Log In"
          description="Join Biz Treats now! You can treat your with bulk at once."
        >
            <template v-for="form in formData">
                <LabelInput
                  :label="form.label"
                  :name="form.name"
                  :placeholder="form.placeholder"
                  v-model="form.value"
                />
            </template>
            <Checkbox
              label="Remember this account"
              v-model="rememberAccount"
              name="remember"
              class="mt-7"
            />
            <Recaptcha />
            <button class="form-btn">Login</button>
        </Form>
    </Background>
    <Footer />
</template>
