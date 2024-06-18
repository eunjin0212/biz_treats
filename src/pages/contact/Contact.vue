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
        <div>
            <nav>
                <a href="/">
                    <img src="/assets/images/biztreats_logo.svg" />
                </a>
                <template
                  v-for="menu in navMenu"
                  :key="menu.title"
                >
                    <a
                      :href="menu.path"
                      v-if="!menu?.hide"
                    >
                        {{ menu.title }}
                    </a>
                </template>
            </nav>
            <button @click="handleClick">
                Contact
            </button>
        </div>
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
    <footer class="service-footer">
        <div>
            <aside>
                <div>
                    <img
                      src="/assets/images/biztreats_logo.svg"
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
        </div>
        <hr class="w-[1120px] mx-auto" />
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
