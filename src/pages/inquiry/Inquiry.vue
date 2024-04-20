<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import Background from '@/components/Background.vue';

export default {
    components: {
        Header,
        Footer,
        Form,
        Background,
    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Inquiry"
          description="Join Biz Treats now! You can treat your with bulk at once."
        >
            <button class="form-btn">Inquiry</button>
        </Form>
    </Background>
    <Footer />
</template>
