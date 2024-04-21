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
            formData: {
                label: 'Company Email',
                name: 'company_email',
                value: formModel.companyEmail,
                placeholder: 'Enter the email',
                type: 'text',
            },
        }
    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Forgot Password"
          description="Join Biz Treats now! You can treat your with bulk at once."
          class="gap-6"
        >
            <LabelInput
              :label="formData.label"
              :name="formData.name"
              :placeholder="formData.placeholder"
              :type="formData.type"
              v-model="formData.value.value"
            />
            <Recaptcha />
            <button class="form-btn">Send Temporary Password</button>
            <a href="/login" class="text-main mt-2">Back to Login</a>
        </Form>
    </Background>
    <Footer />
</template>
