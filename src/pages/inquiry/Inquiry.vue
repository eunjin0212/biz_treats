<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Background from '@/components/Background.vue';

export default {
    components: {
        Header,
        Footer,
        Background,
    }
}
</script>
<template>
    <Header />
    <Background>
        <form class="form py-7">
            <img src="/assets/images/biz_treats_log.png" alt="header-log">
            <h3>Inquiry</h3>
            <p>Join Biz Treats now! You can treat your with bulk at once.</p>
            
        </form>
    </Background>
    <Footer />
</template>
