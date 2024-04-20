<script>
import routes from '../routes';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            routes: Object.values(routes).flat(),
        };
    },
};
</script>

<template>
    <header class="flex justify-between items-center pt-3 pb-4 pl-12 pr-14 border-b border-b-gray">
        <nav class="flex justify-start items-center gap-4">
            <a
              href="/"
              class="w-32 h-16"
            >
                <img src="/assets/images/biz_treats_log.png" />
            </a>
            <a
              v-for="menu in routes"
              :href="menu.path"
              :key="menu.title"
              v-show="!menu?.hide"
              class="block w-36 text-center text-base font-medium -tracking-[0.2px] text-secondary"
            >
                {{ menu.title }}
            </a>
        </nav>
        <button class="text-main text-base font-medium -tracking-[0.2px] rounded-md border border-gray w-40 h-12">
            Log in
        </button>
    </header>
</template>
