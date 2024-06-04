<script>
import { companyWebsiteMenu, menus, snsMenu } from '@/constants/components.js';

export default {
    data() {
        return {
            snsMenu,
            menus,
            companyWebsiteMenu,
        }
    },
    methods: {
        handleClick(url = 'inquiry') {
            window.location.href = url
        },
    },
    watch: {
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        }
    }
}
</script>
<template>
    <header class="w-full bg-white-20 border-b border-b-[#EBEBEB] py-2.5">
        <nav class="flex items-center justify-between w-[1120px] mx-auto">
            <div class="flex items-center gap-3">
                <a href="/">
                    <img src="/assets/images/biz_treats_log.png" class="h-12" />
                </a>
                <a
                  v-for="menu in Object.values(companyWebsiteMenu).flat()"
                  :href="menu.path"
                  :key="menu.title"
                  class="w-[140px] text-center block text-base -tracking-wide text-black-100 font-medium"
                  v-show="!menu?.hide"
                >
                    {{ menu.title }}
                </a>
            </div>
            <div class="flex items-center gap-3">
                <a href="/inquiry" class="w-[140px] text-center block text-base -tracking-wide text-black-100 font-medium">
                    Inquiry
                </a>
                <a href="login" class="text-base font-medium text-center border rounded-md border-white-03 py-3 bg-blue-05 hover:bg-blue-06 text-white-20 -tracking-wide w-[148px] h-12">
                    Log in
                </a>
            </div>
        </nav>
    </header>
    <main class="bg-white-17 flex w-[1220px] mx-auto h-56">
        <section>
        </section>
    </main>
    <footer class="service-footer">
        <div>
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
        </div>
        <hr class="w-[1120px] mx-auto" />
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
