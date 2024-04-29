<script>
import { navMenu, snsMenu, menus } from '@/constants/components.js';
import SearchSvg from '@/assets/icons/SearchSvg.vue';
import BellSvg from '@/assets/icons/BellSvg.vue';
import CartSvg from '@/assets/icons/CartSvg.vue';
import DropdownSvg from '@/assets/icons/DropdownSvg.vue';

export default {
    components: {
        SearchSvg,
        BellSvg,
        CartSvg,
        DropdownSvg,
    },
    data() {
        return {
            navMenu,
            snsMenu,
            menus,
            search: '',
            dropdown: false,
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
    <header class="service-header">
        <nav>
            <a href="/">
                <img src="/assets/images/biz_treats_log.png" />
            </a>
            <div class="search-input">
                <input
                  type="text"
                  placeholder="Search for Treats"
                  name="search"
                  v-model="search"
                />
                <SearchSvg />
            </div>
            <button class="header-btn relative">
                <BellSvg />
                <span class="badge absolute -top-2 -right-3">12</span>
            </button>
            <button class="header-btn inline-flex ml-4.5">
                <CartSvg />
                <span class="text-[15px] leading-5 -tracking-[0.323px] font-bold font-inter ml-4 mr-1.5">32</span>
            </button>
            <div class="btn-group ml-4">
                <button class="border-r border-r-[#197298]">Wallet Name</button>
                <div class="dropdown border-l border-l-[#60D0FF]">
                    <button @click="dropdown = !dropdown">
                        <span>
                            10000 points
                        </span>
                        <DropdownSvg />
                    </button>
                    <div
                      class="dropdown-opts"
                      :class="dropdown ? 'block' : 'hidden'"
                    >
                        <span>option</span>
                        <span>option</span>
                        <span>option</span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main class="bg-bg">
        <aside class="lnb">
            <ul>
                <li>
                    <div>Help</div>
                    <hr />
                    <a>FAQS</a>
                    <a>Customer Service</a>
                </li>
                <li>
                    <div>Terms</div>
                    <hr />
                    <a>Terms and Service</a>
                    <a>Privacy Policy</a>
                </li>
                <li>
                    <div>Links</div>
                    <hr />
                    <a>About Us</a>
                    <a>Merchant Partnership</a>
                    <a>Company Website</a>
                </li>
            </ul>
        </aside>
        <section>
        </section>
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
