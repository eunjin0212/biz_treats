<template>
    <header>
        <nav>
            <a
              class="text-red-50"
              v-for="menu in routes"
              :href="menu.path"
              :key="menu.title"
            >
                {{ menu.title }}
            </a>
        </nav>
    </header>
</template>

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

<style
  lang="scss"
  scoped
></style>
