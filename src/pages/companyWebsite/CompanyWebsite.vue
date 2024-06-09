<script>
import { companyWebsiteMenu, menus, snsMenu } from '@/constants/components.js';
import ResourcesSvg from '@/assets/icons/ResourcesSvg.vue'
import RecruitmentSvg from '@/assets/icons/RecruitmentSvg.vue'
import SalesSvg from '@/assets/icons/SalesSvg.vue'
import MarketingSvg from '@/assets/icons/MarketingSvg.vue'

export default {
    components: {
        ResourcesSvg,
        RecruitmentSvg,
        SalesSvg,
        MarketingSvg,
    },
    data() {
        return {
            snsMenu,
            menus,
            companyWebsiteMenu,
            currentActive: 'home',
            digitalTreats: [
                {
                    digital: 0,
                    description: 'Clients & Partners',
                    color: 'bg-[#7CD8FF]',
                },
                {
                    digital: 0,
                    description: 'Participating stores',
                    color: 'bg-[#FF8B63]',
                },
                {
                    digital: 0,
                    description: 'Treats Served',
                    color: 'bg-[#70C217]',
                },
            ],
            useOfBizTreats: [
                {
                    title: 'Human Resources',
                    description: 'Employee Satisfaction & Retention Workforce Motivation Talent Mgt. for Behavioral Change Org. Culture Building/ Transformation',
                    icon: 'ResourcesSvg',
                },
                {
                    title: 'Recruitment',
                    description: 'Build Applicant Pipeline Encourage Cleaner & Accurate Database Increase Footfall Pre-establish Impressive Company Culture',
                    icon: 'RecruitmentSvg',
                },
                {
                    title: 'Sales',
                    description: 'Generate and Convert Leads to Sales Express Appreciation to Target Audience Strengthen Client Relations and Loyalty Recruit and Retain Critical Talent',
                    icon: 'SalesSvg',
                },
                {
                    title: 'Marketing',
                    description: 'Augment Promotional Campaigns Develop B2B/B2C Improve Customer Image and Perception Raise Brand Awareness',
                    icon: 'MarketingSvg',
                },
            ],
        }
    },
    methods: {
        handleClick(url = 'inquiry') {
            window.location.href = url
        },
        handleScroll(id = 'home') {
            const target = document.getElementById(id)
            window.scrollTo(0, target.offsetTop)
            this.currentActive = id
        },
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        },
    },
}
</script>
<template>
    <header class="w-full bg-white-20 border-b border-b-[#EBEBEB] py-2.5">
        <nav class="flex items-center justify-between w-[1120px] mx-auto">
            <ul class="flex items-center gap-3">
                <li>
                    <a href="/">
                        <img
                          src="/assets/images/biz_treats_log.png"
                          class="h-12"
                        />
                    </a>
                </li>
                <li
                  class="w-[140px] inline-flex justify-center items-center group cursor-pointer"
                  v-for="menu in Object.values(companyWebsiteMenu).flat()"
                  :key="menu.title"
                  :data-active="currentActive === menu.path"
                  @click="() => handleScroll(menu.path)"
                >
                    <div
                      class="px-0.5 pb-0.5 relative group-data-[active=true]:before:content-[''] group-data-[active=true]:before:bg-blue-05 group-data-[active=true]:before:w-full group-data-[active=true]:before:h-px group-data-[active=true]:before:absolute group-data-[active=true]:before:bottom-0 group-data-[active=true]:before:left-0 group-hover:before:content-[''] group-hover:before:bg-blue-05 group-hover:before:w-full group-hover:before:h-px group-hover:before:absolute group-hover:before:bottom-0 group-hover:before:left-0 "
                    >
                        <a
                          class="w-fit block text-base -tracking-wide text-black-100 font-medium relative group-data-[active=true]:before:content-[''] group-data-[active=true]:before:bg-blue-05 group-data-[active=true]:before:w-full group-data-[active=true]:before:h-px group-data-[active=true]:before:absolute group-data-[active=true]:before:bottom-0 group-data-[active=true]:before:left-0 group-data-[active=true]:text-blue-05 group-hover:text-blue-05 group-hover:before:content-[''] group-hover:before:bg-blue-05 group-hover:before:w-full group-hover:before:h-px group-hover:before:absolute group-hover:before:bottom-0 group-hover:before:left-0"
                          v-show="!menu?.hide"
                        >
                            {{ menu.title }}
                        </a>
                    </div>
                </li>
            </ul>
            <div class="flex items-center gap-3">
                <a
                  href="/inquiry"
                  class="w-[140px] text-center block text-base -tracking-wide text-black-100 font-medium"
                >
                    Inquiry
                </a>
                <a
                  href="login"
                  class="text-base font-medium text-center border rounded-md border-white-03 py-3 bg-blue-05 hover:bg-blue-06 text-white-20 -tracking-wide w-[148px] h-12"
                >
                    Log in
                </a>
            </div>
        </nav>
    </header>
    <main class="flex flex-col">
        <section
          class="bg-[#BDEFFF] w-full pt-[50px] pb-6"
          id="home"
        >
            <div
              class="w-[1158px] mx-auto flex items-center bg-[url('@/assets/images/company_website.png')] bg-no-repeat bg-center bg-contain"
            >
                <div class="h-[515px] pl-14 pt-[118px]">
                    <h1 class="text-[#183B56] font-black text-[50px] leading-[52px] mb-3.5">
                        Digital Treats<br>
                        for Your Business
                    </h1>
                    <p class="text-[#5A7184] font-normal text-[28px] leading-[30px] mb-8">
                        Foster Relationships with <br>
                        your employees and customers
                    </p>
                    <button class="text-base font-bold leading-5 rounded-md text-white-20 bg-blue-05 py-4 px-[50px]">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
        <section
          id="about"
          class="bg-gradient-90"
        >
            <div
              class="h-full w-full bg-[url('@/assets/images/company_about.png')] bg-center bg-no-repeat bg-cover pb-24"
            >
                <div class="w-[1158px] mx-auto pt-[60px] relative">
                    <h1 class="mb-10 pb-0.5 text-4xl font-normal leading-7 text-white-20">The number one service
                        <strong class="text-4xl font-bold leading-7">
                            for Digital Treats.
                        </strong>
                    </h1>
                    <ul class="absolute flex gap-5">
                        <li
                          v-for="item in digitalTreats"
                          :key="item.description"
                          class="pt-9 pl-12 bg-white-20 rounded-2xl shadow-[0px_25px_40px_0px_#0000000D] w-[360px] h-[186px]"
                        >
                            <p class="text-[#183B56] font-poppins font-medium text-[40px] leading-[46px] mb-3.5">
                                {{ item.digital.toLocaleString() }}+
                            </p>
                            <span
                              :class="item.color"
                              class="block w-12 h-1 mb-2"
                            ></span>
                            <small class="font-poppins text-xl leading-[26px] text-[#5D6180]">
                                {{ item.description }}
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-white-20 pt-[135px] pb-20">
                <div class="w-[1158px] mx-auto">
                    <h1 class="text-[#183B56] font-black text-[50px] leading-[52px] mb-[42px]">Use of Biz Treats</h1>
                    <ul class="flex gap-5">
                        <li
                          v-for="item in useOfBizTreats"
                          :key="item.title"
                          class="py-14 px-6 rounded-xl shadow-[0px_20px_50px_0px_#12112714] w-[264px]"
                        >
                            <component :is="item.icon" class="mb-6" />
                            <strong class="block mb-4 text-xl font-bold font-poppins text-black-400">
                                {{ item.title }}
                            </strong>
                            <small class="font-normal text-[13px] leading-6 font-poppins text-[#1211278F]">
                                {{ item.description }}
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
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
