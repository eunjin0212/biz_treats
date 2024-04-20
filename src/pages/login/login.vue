<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import Background from '@/components/Background.vue';
import Recaptcha from '@/components/Recaptcha.vue';
import Checkbox from '@/components/Checkbox.vue';

export default {
    components: {
        Header,
        Footer,
        Form,
        Checkbox,
        Recaptcha,
        Background,
    },
    data() {
        return {
            rememberAccount: false,
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
            <Checkbox
              label="Remember this account"
              v-model="rememberAccount"
              name="remember"
            />
            <Recaptcha />
            <button class="form-btn">Login</button>
        </Form>
    </Background>
    <Footer />
</template>
