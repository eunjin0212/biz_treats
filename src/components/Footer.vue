<script>
export default {
    name: 'Footer',
    data() {
        return {
            snsMenu: {
                title: 'Follow Us',
                children: [
                    {
                        name: 'Instagram',
                        link: 'https://www.instagram.com/sharetreatsid/',
                        target: '_blank',
                        icon: '/assets/icons/instagram.svg',
                    },
                    {
                        name: 'Facebook',
                        link: 'https://www.facebook.com/ShareTreatsID/',
                        target: '_blank',
                        icon: '/assets/icons/facebook.svg',
                    },
                ]
            },
            menus: [
                {
                    title: 'Links',
                    children: [
                        { name: 'About Us', link: '' },
                        { name: 'Merchant Partnership', link: '' },
                        { name: 'Company Website', link: '' },
                    ]
                },
                {
                    title: 'Help',
                    children: [
                        { name: 'Customer Service', link: '' },
                        { name: 'FAQS', link: '' },
                    ]
                },
                {
                    title: 'Terms',
                    children: [
                        { name: 'Terms and Service', link: '' },
                        { name: 'Privacy Policy', link: '' },
                    ],
                },
            ]
        }
    }
}
</script>

<template>
    <footer class="relative bottom-0 left-0 bg-white w-full px-[111px] border-t border-t-separate">
        <aside class="flex pb-16 pt-20">
            <div class="mr-[283px]">
                <img
                  src="/assets/images/biz_treats_log.png"
                  alt="footer-log"
                  class="w-[117px] h-[59px]"
                />
                <h4 class="text-base font-medium text-title font-inter mt-6">
                    {{ snsMenu.title }}
                </h4>
                <div class="flex gap-2 mt-2">
                    <a
                      v-for="sns in snsMenu.children"
                      :key="sns.name"
                      class="inline-flex items-center justify-center w-10 h-10 bg-sns text-center rounded-full"
                    >
                        <img
                          :src="sns.icon"
                          :alt="sns.name"
                          class="text-xs"
                        />
                    </a>
                </div>
            </div>
            <div
              v-for="menu in menus"
              :key="menu.title"
              class="w-40 mr-[108px] last-of-type:mr-0"
            >
                <h4 class="text-base font-medium text-title font-inter mb-5">
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
                      class="block text-xs font-medium text-link mb-6 last-of-type:mb-0"
                    >
                        {{ sub.name }}
                    </a>
                </template>
            </div>
        </aside>

        <div class="font-inter text-sm font-medium text-link pt-[30px] pb-[34px] border-t border-t-separate">
            Copyright © SHARE TREATS. All rights reserved.
        </div>
    </footer>
</template>
