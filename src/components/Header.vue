<script>
import { navMenu } from '@/constants/components.js';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            navMenu,
        };
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        }
    }
};
</script>

<template>
    <header class="header">
        <nav class="">
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
</template>
