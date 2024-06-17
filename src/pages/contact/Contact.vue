<script>
import { navMenu, snsMenu, menus } from '@/constants/components.js';

export default {
    components: {
    },
    data() {
        return {
            navMenu,
            snsMenu,
            menus,
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
    }
}
</script>
<template>
    <header class="header">
        <nav>
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
    <main class="background">
        <div>
            <section>
                <p>
                    Digital Treats For Your Business
                </p>
                <span>
                    Foster Relationships with your Employees and Customers
                </span>
                <img src="/assets/images/bg.png" />
            </section>
        </div>
    </main>
    <footer class="footer">
        <aside>
            <div>
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="footer-log"
                />
                <h4>
                    {{ snsMenu.title }}
                </h4>
                <div>
                    <a
                      v-for="sns in snsMenu.children"
                      :key="sns.name"
                    >
                        <img
                          :src="sns.icon"
                          :alt="sns.name"
                        />
                    </a>
                </div>
            </div>
            <div
              v-for="menu in menus"
              :key="menu.title"
            >
                <h4>
                    {{ menu.title }}
                </h4>
                <template
                  v-for="sub in menu.children"
                  :key="sub.title"
                >
                    <a
                      :href="sub.link"
                      :target="sub.target"
                      :alt="sub.name"
                    >
                        {{ sub.name }}
                    </a>
                </template>
            </div>
        </aside>
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
