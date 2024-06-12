<script>
import { companyWebsiteMenu, menus, snsMenu } from '@/constants/components.js';
import { genBrandsMockData } from '@/mock/home.js';
import ResourcesSvg from '@/assets/icons/ResourcesSvg.vue'
import RecruitmentSvg from '@/assets/icons/RecruitmentSvg.vue'
import SalesSvg from '@/assets/icons/SalesSvg.vue'
import MarketingSvg from '@/assets/icons/MarketingSvg.vue'
import InquirySvg from '@/assets/icons/InquirySvg.vue'
import SliderLeftSvg from '@/assets/icons/SliderLeftSvg.vue';
import SliderRightSvg from '@/assets/icons/SliderRightSvg.vue';
import RightArrowSvg from '@/assets/icons/RightArrowSvg.vue';
import LeftArrowSvg from '@/assets/icons/LeftArrowSvg.vue';
import QuotationMarkSvg from '@/assets/icons/QuotationMarkSvg.vue';
import ChevronLeftSmallSvg from '@/assets/icons/ChevronLeftSmallSvg.vue';
import ChevronRightSmallSvg from '@/assets/icons/ChevronRightSmallSvg.vue';

export default {
    components: {
        ResourcesSvg,
        RecruitmentSvg,
        SalesSvg,
        MarketingSvg,
        InquirySvg,
        SliderLeftSvg,
        SliderRightSvg,
        LeftArrowSvg,
        RightArrowSvg,
        QuotationMarkSvg,
        ChevronLeftSmallSvg,
        ChevronRightSmallSvg,
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
            successStories: [
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
            bestBrand: genBrandsMockData(100),
            bestBrandData: {},
            bestBrandSliderCurrent: 0,
            satisfiedClients: [
                {
                    label: 'BizTreats',
                    url: 'https://www.youtube.com/embed/yee0UOng9NM?si=4uQ7PM8QnukbOaEo?autoplay=1&loop=1&playlist=yee0UOng9NM',
                    title: 'Share Treats was able to give us a digital solution1',
                    description: 'Loyalty Engagement, AXA Philippines',
                },
                {
                    label: 'BizReward',
                    url: 'https://www.youtube.com/embed/yee0UOng9NM?si=4uQ7PM8QnukbOaEo?autoplay=1&loop=1&playlist=yee0UOng9NM',
                    title: 'Share Treats was able to give us a digital solution2',
                    description: 'Loyalty Engagement, AXA Philippines',
                },
                {
                    label: 'Biz API',
                    url: 'https://www.youtube.com/embed/yee0UOng9NM?si=4uQ7PM8QnukbOaEo?autoplay=1&loop=1&playlist=yee0UOng9NM',
                    title: 'Share Treats was able to give us a digital solution3',
                    description: 'Loyalty Engagement, AXA Philippines',
                },
            ],
            selectedFilter: {
                brand: 'ALL',
                clients: 'BizTreats',
            },
            brandFilter: [
                'ALL',
                'eWallet & Shopping',
                'Grocery & Essentials',
                'Fast Food',
                'Casual Resto',
                'Bread & Dessert',
                'Drugstore & Wellness',
                'Beauty & Lifestyle',
                'Transpo & Travel',
                'Digital & Appliance',
                'Home & Kids',
            ],
            sliderInterval: null,
            isTransitioning: false,
            isPaused: false,
            worksData: [
                {
                    title: 'Sign-up by email',
                    class: 'top-[172px] left-[2px] w-[312px]',
                    titleClass: 'text-[#5846DF]',
                    description: 'Get started by creating your account at biztreats.ph',
                },
                {
                    title: 'Top-up Wallet',
                    class: 'top-[250px] left-[490px] w-[238px]',
                    titleClass: 'text-[#D280FF]',
                    description: 'Wait for our confirmation once your wallet has been loaded.',
                },
                {
                    title: 'Send Treats',
                    class: 'top-[338px] right-[-26px] w-[208px]',
                    titleClass: 'text-[#00C9BD]',
                    description: 'You may now start sending gifts to your employees.',
                },
            ]
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
        genBanner(originArr, chunkSize = 8) {
            return originArr.reduce((result, item, index) => {
                const chunkIndex = Math.floor(index / chunkSize);

                if (!result[chunkIndex]) {
                    result[chunkIndex] = [];
                }

                result[chunkIndex].push(item);

                return result;
            }, []);
        },
        startAutoSlide() {
            this.stopAutoSlide();
            this.sliderInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.nextSlide();
                }
            }, 3000);
        },
        stopAutoSlide() {
            clearInterval(this.sliderInterval);
        },
        nextSlide() {
            const brandLength = this.bestBrandData[this.selectedFilter.brand].length;
            this.isTransitioning = true;
            this.bestBrandSliderCurrent++;
            if (this.bestBrandSliderCurrent >= brandLength) {
                setTimeout(() => {
                    this.isTransitioning = false;
                    this.bestBrandSliderCurrent = 0;
                }, 300); // 애니메이션 시간
            }
        },
        prevSlide() {
            const brandLength = this.bestBrandData[this.selectedFilter.brand].length;
            this.isTransitioning = true;
            this.bestBrandSliderCurrent--;
            if (this.bestBrandSliderCurrent < 0) {
                setTimeout(() => {
                    this.isTransitioning = false;
                    this.bestBrandSliderCurrent = brandLength - 1;
                }, 300); // 애니메이션 시간
            }
        },
        pauseSlide() {
            this.isPaused = true;
            this.stopAutoSlide(); // 버튼 클릭시 자동 슬라이딩 정지
        },
        resumeSlide() {
            this.isPaused = false;
            this.startAutoSlide(); // 마우스가 슬라이드를 벗어나면 자동 슬라이딩 시작
        },
        restartSlide() {
            this.pauseSlide();
            setTimeout(() => {
                this.resumeSlide();
            }, 3000); // 3초 후 자동 슬라이딩 재시작
        },
        prevTab(label = 'BizTreats') {
            const currentIdx = this.satisfiedClients.findIndex((item) => item.label === label)
            const prevIdx = currentIdx === 0 ? this.satisfiedClients.length - 1 : currentIdx >= this.satisfiedClients.length ? 0 : currentIdx - 1
            this.selectedFilter.clients = this.satisfiedClients[prevIdx].label
        },
        nextTab(label = 'BizTreats') {
            const currentIdx = this.satisfiedClients.findIndex((item) => item.label === label)
            const nextIdx = currentIdx === this.satisfiedClients.length - 1 ? 0 : currentIdx + 1
            this.selectedFilter.clients = this.satisfiedClients[nextIdx].label
        }
    },
    mounted() {
        this.bestBrandData = this.bestBrand.reduce((obj, data) => {
            const originArray = this.bestBrand.filter((item) => item.keyword === data.keyword)
            obj[data.keyword] = data.keyword === 'ALL' ? this.genBanner(this.bestBrand, 12) : this.genBanner(originArray, 12)
            return obj
        }, {})

        this.startAutoSlide();

        const scrollEventHandler = () => {
            const windowHeight = window.innerHeight
            const el = document.querySelector('.about-wrapper')

            if (el.getBoundingClientRect().top < windowHeight - 200) {
                setTimeout(() => {
                    el.style.animation = 'appear_from_bottom ease 0.5s'
                    el.style.opacity = 1
                }, 100)
                window.removeEventListener('scroll', scrollEventHandler)
            }
        }

        window.addEventListener('scroll', scrollEventHandler)
    },
    beforeUnmount() {
        this.stopAutoSlide();
    },
    computed: {
        dots() {
            return this.bestBrandData[this.selectedFilter.brand]?.length
        },
        clientsData() {
            return this.satisfiedClients.find((item) => item.label === this.selectedFilter.clients)
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

                    <a
                      class="w-fit block text-base -tracking-wide text-black-100 font-medium relative group-data-[active=true]:before:content-[''] group-data-[active=true]:before:bg-blue-05 group-data-[active=true]:before:w-full group-data-[active=true]:before:h-px group-data-[active=true]:before:absolute group-data-[active=true]:before:bottom-0 group-data-[active=true]:before:left-0 group-data-[active=true]:text-blue-05 group-hover:text-blue-05 group-hover:before:content-[''] group-hover:before:bg-blue-05 group-hover:before:w-full group-hover:before:h-px group-hover:before:absolute group-hover:before:bottom-0 group-hover:before:left-0"
                      v-show="!menu?.hide"
                    >
                        {{ menu.title }}
                    </a>
                </li>
            </ul>
            <div class="flex items-center gap-3">
                <a
                  href="/inquiry"
                  class="w-[140px] text-base -tracking-wide text-blue-05 border border-blue-05 py-3 rounded-md inline-flex items-center font-medium h-12 gap-1 justify-center hover:bg-sky-50"
                >
                    <InquirySvg class="" />
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
          class="bg-[url('@/assets/images/company_website_bg.png')] bg-no-repeat bg-center bg-cover w-full pt-[45px] pb-6"
          id="home"
        >
            <div
              class="w-[1158px] mx-auto flex items-center bg-[url('@/assets/images/company_website.png')] bg-no-repeat bg-center bg-contain"
            >
                <div class="h-[515px] pl-12 pt-16">
                    <h1 class="text-[#183B56] font-black text-[44px] leading-[52px] mb-4.5">
                        Enhance engagement<br>
                        with your employees<br>
                        and customers
                    </h1>
                    <p class="text-[#5A7184] font-normal text-[28px] leading-[30px] mb-8">
                        Foster Relationships with<br>
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
              class="h-full w-full bg-[url('@/assets/images/company_about.png')] bg-center bg-no-repeat bg-cover pb-28"
            >
                <div class="w-[1158px] mx-auto pt-[60px] relative">
                    <h1 class="mb-10 pb-0.5 text-4xl font-normal leading-7 text-white-20 font-poppins">The leading
                        platform for sending
                        <strong class="text-4xl font-extrabold leading-7">
                            Digital Treats
                        </strong>
                    </h1>
                    <ul class="absolute flex gap-5 about-wrapper">
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
                    <h1 class="text-[#183B56] font-black text-[50px] leading-[52px] mb-[42px]">Our Success Stories</h1>
                    <ul class="flex gap-5">
                        <li
                          v-for="item in successStories"
                          :key="item.title"
                          class="py-14 px-6 rounded-xl shadow-[0px_20px_50px_0px_#12112714] w-[264px]"
                        >
                            <component
                              :is="item.icon"
                              class="mb-6"
                            />
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
        <section class="pt-[65px] pb-24 bg-[#ADE2F3]">
            <div class="w-[1158px] mx-auto">
                <h1 class="text-[#183B56] font-bold text-[40px] leading-[48px] mb-5">Our Satisfied Clients</h1>
                <div class="flex items-center gap-2 mb-14">
                    <button
                      v-for="clients in satisfiedClients"
                      :key="clients.label"
                      :data-active="selectedFilter.clients === clients.label"
                      @click="() => selectedFilter.clients = clients.label"
                      class="py-3 w-[154px] rounded-xl text-xl leading-6 -tracking-wide font-medium bg-[#8ACDE2] text-[#1283AC] data-[active=true]:bg-blue-05 data-[active=true]:text-white-20"
                    >
                        {{ clients.label }}
                    </button>
                </div>
                <aside class="flex items-center gap-[34px]">
                    <div>
                        <iframe
                          width="560"
                          height="315"
                          :src="clientsData.url"
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                          class="rounded-[10px]"
                        />
                    </div>
                    <div class="flex flex-col">
                        <QuotationMarkSvg class="mb-2" />
                        <h2
                          class="mb-9 text-black-0 font-poppins font-semibold text-[32px] leading-10 -tracking-wide w-[500px]"
                        >
                            {{ clientsData.title }}
                        </h2>
                        <small class="mb-5 font-poppins font-medium text-xl leading-6 -tracking-wide text-[#688792]">
                            {{ clientsData.description }}
                        </small>
                        <div class="flex items-center gap-2">
                            <button
                              class="w-11 h-11 rounded-lg inline-flex items-center justify-center bg-[#A0CFE0]"
                              @click="() => prevTab(clientsData.label)"
                            >
                                <ChevronLeftSmallSvg />
                            </button>
                            <button
                              class="w-11 h-11 rounded-lg inline-flex items-center justify-center bg-[#A0CFE0]"
                              @click="() => nextTab(clientsData.label)"
                            >
                                <ChevronRightSmallSvg />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
        <section
          class="py-14 bg-[#EFF9FF] h-[677px] bg-[url('@/assets/images/how_it_works_bg.png')] bg-no-repeat bg-[length:932px_568px] bg-right-bottom"
        >
            <div class="w-[1300px] mx-auto">
                <h1 class="px-[71px] text-[#183B56] font-bold text-[40px] leading-[64px]">How It Works</h1>
                <div
                  class="px-[71px] h-[556px] bg-[url('@/assets/images/how_it_works.png')] bg-no-repeat bg-[length:1212px_414px] bg-[left_20px_top] -mt-3"
                >
                    <ul class="relative h-full">
                        <li
                          v-for="(data, idx) in worksData"
                          :key="data.title"
                          class="absolute"
                          :class="data.class"
                        >
                            <span
                              :class="data.titleClass"
                              class="font-bold font-firasans w-[68px] inline-block text-center text-[56px] leading-[50px]"
                            >0{{ idx + 1 }}</span>
                            <p class="text-[#4A4A4A] font-bold text-2xl leading-8">{{ data.title }}</p>
                            <div class="font-medium text-base leading-5 text-[#4A4A4A]">{{ data.description }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section
          class="pt-[70px] pb-[52px] bg-white-20"
          id="brands"
        >
            <div class="w-[1158px] mx-auto">
                <h1 class="text-[#183B56] font-bold text-[40px] leading-[64px]">Our Merchant Partners</h1>
                <ul class="inline-flex gap-2.5 w-[1058px] flex-wrap mt-9">
                    <li
                      :data-active="filter === selectedFilter.brand"
                      :class="{ 'w-36': filter === 'ALL' }"
                      class="cursor-pointer text-nowrap border border-[#E5E5E5] h-9 text-center px-2.5 py-1.5 rounded-[31px] text-sm leading-[22px] font-medium font-poppins text-blue-05 hover:text-white-20 hover:bg-blue-05 hover:border-blue-05 data-[active=true]:text-white-20 data-[active=true]:bg-blue-05 data-[active=true]:border-blue-05"
                      v-for="filter in brandFilter"
                      :key="filter"
                      @click="() => {
                    mainSliderCurrent = 0
                    selectedFilter.brand = filter
                }"
                    >{{ filter }}</li>
                </ul>
            </div>
            <aside
              class="w-[1158px] relative border border-white-13 shadow-[0_4px_8px_0_#0000000A] mx-auto h-[460px] mb-10 mt-5"
            >
                <div class="flex overflow-hidden brand-wrapper">
                    <ul
                      class="transition-all brand"
                      :class="{ 'transition-none': !isTransitioning }"
                      v-for="(data, index) in bestBrandData[selectedFilter.brand]"
                      :key="index"
                      :style="{ transform: `translateX(-${bestBrandSliderCurrent * 100}%)` }"
                      @transitionend="onTransitionEnd"
                      @mouseover="pauseSlide"
                      @mouseleave="resumeSlide"
                    >
                        <li
                          v-for="(item, idx) in data"
                          :key="idx"
                        >
                            <img
                              :src="item.img"
                              :alt="item.img"
                              class="object-contain"
                            />
                            <dl class="brand__detail">
                                <strong class="brand__name">{{ item.brand }}</strong>
                                <dd class="brand__locations">{{ item.locations.toLocaleString() }} Locations</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center gap-2 mt-7">
                    <span
                      v-for="dot in dots"
                      :key="dot"
                      class="w-3.5 h-3.5 block rounded-full cursor-pointer"
                      @click="() => bestBrandSliderCurrent = dot - 1"
                      :class="(dot - 1) === bestBrandSliderCurrent ? 'bg-blue-05' : 'bg-white-08'"
                    >
                    </span>
                </div>
                <button
                  class="banner-nav__btn left"
                  @click="() => { prevSlide(); restartSlide(); }"
                >
                    <LeftArrowSvg class="text-[#878787]" />
                </button>
                <button
                  :disabled="bestBrandSliderCurrent >= bestBrandData[selectedFilter.brand]?.length - 1"
                  class="banner-nav__btn right"
                  @click="() => { nextSlide(); restartSlide(); }"
                >
                    <RightArrowSvg class="text-[#878787]" />
                </button>
            </aside>
        </section>
        <section
          class="bg-[#EFF9FF] h-[559px]"
          id="contact"
        >
            <div
              class="w-[1270px] pl-[101px] mx-auto h-full py-[124px] bg-[url('@/assets/images/contact_bg.png')] bg-[left_top_38px] bg-no-repeat bg-contain"
            >
                <aside class="flex gap-[30px]">
                    <div>
                        <iframe
                          width="566"
                          height="311"
                          src="https://www.youtube.com/embed/yee0UOng9NM?si=4uQ7PM8QnukbOaEo?autoplay=1&loop=1&playlist=yee0UOng9NM&controls=0"
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                          class="rounded-[10px]"
                        />
                    </div>
                    <div class="flex flex-col pt-[42px]">
                        <h2 class="mb-4 text-[#0BC0EB] font-poppins font-bold text-[32px] leading-[45px]">
                            We’re here to assist you
                        </h2>
                        <small class="font-poppins font-medium text-[15px] leading-6 text-[#1211278F]">
                            ShareTreats Innovation Corporation offers a robust suite of platforms that are designed to
                            digitize traditional gifting and rewarding.<br>
                            A young, but relentless company, Sharetreats was founded June of 2017.<br>
                            In a span of two years, in stantly became the hallmark brand for O2O<br>
                            gifting in the Philippines.
                        </small>
                    </div>
                </aside>
            </div>
        </section>
        <section class="bg-gradient-90-2">
            <div class="w-[1280px] mx-auto bg-[url('@/assets/images/get_started_bg.png')] bg-no-repeat bg-[right_bottom_-30px] bg-[length:88px_88px]">
                <div
                  class="w-[1158px] mx-auto h-60 flex items-center justify-center gap-14"
                >
                    <span class="text-white-20 font-normal text-[32px] leading-10 font-roboto inline-block">
                        The
                        <strong class="font-bold">most customizable Digital Treats platform</strong>for building<br>
                        <strong class="font-bold">your online business.</strong>
                    </span>
                    <button
                      class="rounded-[60px] border-2 border-white-20 text-white-20 h-[72px] px-[46px] hover:bg-white-02-light"
                    >GET STARTED</button>
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
