<script>
import { navMenu, snsMenu, menus, lnbMenu } from '@/constants/components.js';
import { alertData } from '@/mock/alertData.js'
import SearchSvg from '@/assets/icons/SearchSvg.vue';
import BellSvg from '@/assets/icons/BellSvg.vue';
import CartSvg from '@/assets/icons/CartSvg.vue';
import DropdownSvg from '@/assets/icons/DropdownSvg.vue';
import WalletSvg from '@/assets/icons/WalletSvg.vue';
import SwitchSvg from '@/assets/icons/SwitchSvg.vue';
import SignOutSvg from '@/assets/icons/SignOutSvg.vue';
import AlertSvg from '@/assets/icons/AlertSvg.vue';
import PointSvg from '@/assets/icons/PointSvg.vue';
import ReadSvg from '@/assets/icons/ReadSvg.vue';

export default {
    components: {
        SearchSvg,
        BellSvg,
        CartSvg,
        DropdownSvg,
        WalletSvg,
        SwitchSvg,
        SignOutSvg,
        AlertSvg,
        PointSvg,
        ReadSvg,
    },
    data() {
        return {
            navMenu,
            snsMenu,
            menus,
            lnbMenu,
            search: '',
            dropdown: false,
            alertOpen: false,
            alertData,
        }
    },
    methods: {
        handleClick() {
            window.location.href = '/login'
        },
        handleDropdown() {
            this.dropdown = !this.dropdown
        },
        handleAlert() {
            this.alertOpen = !this.alertOpen
        },
        handleGlobalDropdown(e) {
          const { parentNode } = e.target
            if (parentNode !== this.$refs.dropdownRef && !this.$refs.dropdownOptsRef.contains(parentNode)) {
                this.dropdown = false
            }
        },
        handleGlobalAlert(e) {
          const { parentNode } = e.target
            if (parentNode !== this.$refs.alertRef && !this.$refs.alertWrapperRef.contains(parentNode)) {
                this.alertOpen = false
            }
        },
    },
    watch:{
        dropdown(){
            if (this.dropdown) {
                window.addEventListener('click', this.handleGlobalDropdown)
                return
            }
            window.removeEventListener('click', this.handleGlobalDropdown)
        },
        alertOpen(){
            if (this.alertOpen) {
                window.addEventListener('click', this.handleGlobalAlert)
                return
            }
            window.removeEventListener('click', this.handleGlobalAlert)
        },
    },
    computed: {
        matchPath: () => {
            return (path) => path === window.location.pathname
        }
    }
}
</script>
<template>
    <header class="service-header">
        <div>
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
                <div class="relative">
                    <button
                      class="header-btn"
                      ref="alertRef"
                      @click="handleAlert"
                    >
                        <BellSvg />
                        <span class="badge">{{ alertData.length }}</span>
                    </button>
                    <aside
                      class="alert-wrapper"
                      ref="alertWrapperRef"
                      :class="alertOpen ? 'block' : 'hidden'"
                    >
                        <div class="alert-header">
                            <h1>Notification</h1>
                            <p>
                                <span>
                                    That’s all your notifications from the last 14days.
                                </span>
                                <button>
                                    Mark all as read
                                </button>
                            </p>
                        </div>
                        <hr />
                        <ul>
                            <li
                              v-for="(alert, idx) in alertData"
                              :key="idx"
                            >
                                <div>
                                    <span :class="alert.type === 'alert' ? 'bg-[#FCB1E7]' : 'bg-[#A7E5FF]'">
                                        <AlertSvg v-if="alert.type === 'alert'" />
                                        <PointSvg v-else />
                                    </span>
                                    <div>
                                        <p>
                                            <span>{{ alert.title }}</span>
                                            <span>({{ alert.date }})</span>
                                        </p>
                                        <span>{{ alert.description }}</span>
                                    </div>
                                    <span
                                      v-if="alert.read"
                                      class="alert-check"
                                    >
                                        <ReadSvg />
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </aside>
                </div>
                <button class="header-btn inline-flex ml-4.5">
                    <CartSvg />
                    <span class="text-[15px] leading-5 -tracking-[0.323px] font-bold font-inter ml-4 mr-1.5">32</span>
                </button>
                <div class="ml-4 btn-group">
                    <button class="border-r border-r-[#197298]">Wallet Name</button>
                    <div class="dropdown border-l border-l-[#60D0FF]">
                        <button @click="handleDropdown" ref="dropdownRef">
                            <span>
                                10000 points
                            </span>
                            <DropdownSvg />
                        </button>
                        <div
                          class="dropdown-opts"
                          ref="dropdownOptsRef"
                          :class="dropdown ? 'block' : 'hidden'"
                        >
                            <a href="/myWallet">
                                <WalletSvg />My Wallet
                            </a>
                            <a href="/chooseWallet">
                                <SwitchSvg />Switching Wallet
                            </a>
                            <a href="/login">
                                <SignOutSvg />Log out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <main class="bgwhite-17 flex w-[1228px] mx-auto">
        <aside class="lnb service-lnb">
            <ul>
                <li
                  v-for="lnb in lnbMenu"
                  :key="lnb.title"
                >
                    <div>{{ lnb.title }}</div>
                    <hr />
                    <a
                      v-for="children in lnb.children"
                      :key="children.title"
                      :href="children.path"
                      :class="{ 'bg-white-15 !text-black-200': matchPath(children.path) }"
                    >
                        {{ children.title }}
                    </a>
                </li>
            </ul>
        </aside>
        <section class="w-[calc(100%-266px)] max-w-[932px] mr-[106px] flex flex-col">
            <div class="main-section pb-[50px] text-black-100 text-xs leading-5 mb-7">
                <h2>Terms and Service</h2>
                <p class="mt-6 w-[848px] mb-[30px]">The terms of this agreement (“Terms of Service”) govern the
                    relationship between you and SHARE TREATS INNOVATION and its affiliated developer (hereinafter “we”,
                    ”our”, ”us”) regarding your use of SHARE TREATS (“the Service”), and its promotion website and its
                    related services(the “Service”). Use of the Service is also governed by SHARE TREATS INNOVATION’s
                    Privacy Policy, which is incorporated herein by reference.<br>
                    Before accessing or using the Service, including accessing the Service, you must agree to these
                    Terms of Service and the Privacy Policy. You may also be required to register an account on the
                    Service (an “Account”). If you access the Service from a Website and Mobile application (“App”) you
                    shall comply with its terms of service/use as well as these Terms of Service.<br>
                    BY INSTALLING, USING OR OTHERWISE ACCESSING THE SERVICE AND/OR THE APP, IT IS CONSTRUTED THAT YOU
                    AGREE TO THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO THESE TERMS OF SERVICE, PLEASE DO NOT
                    INSTALL, USE OR OTHERWISE ACCESS THE SERVICE. USE OF THE SERVICE IS VOID WHERE PROHIBITED.<br>
                    We reserve the right, at its discretion, to change, modify, add or remove portions of these Terms of
                    Service and its Privacy Policy at any time by
                    posting the amended terms on the Service. You will be deemed to have accepted such changes by
                    continuing to use the Service. If at any point, you
                    do not agree to any portion of the then-current version of our Terms of Service, Privacy Policy, or
                    any other policy, rules, or codes of conduct relating
                    to your use of the Service, your license to use the Service shall immediately terminate, and you
                    must immediately stop using the Service.
                </p>
                <strong class="leading-3.5">Grant of a Limited License to Use the service</strong>
                <p class="w-[848px] mb-[30px]">
                    Subject to your agreement and continuing compliance with these Terms of Service and any other
                    relevant policies, we grant you a non-exclusive, non-transferable, non-sub-licensable, revocable
                    limited license subject to the limitation below to access and use the Service for your own
                    non-commercial entertainment purposes. You agree not to use the Service for any other purpose.
                </p>
                <strong class="leading-3.5">The following restrictions apply to the user of the service</strong>
                <p class="w-[848px] mb-[30px]">
                    You shall not have more than two (2) Accounts at any given time with 1 International Mobile
                    Equipment Identity (IMEI), sell or give away your Account, create an Account using a false identify
                    or information, or on behalf of someone other than yourself. You shall not use the Service if you
                    have previously been removed by us or previously been banned from using the service; You shall use
                    your Account only for non-commercial purposes; You shall not use the Service to advertise, or
                    solicit, or transmit any commercial advertisements, including chain letters, junk or spam-email or
                    repetitive messages to anyone.
                </p>
                <strong class="leading-3.5">Username and Password</strong>
                <p class="w-[848px] mb-5">
                    During the Account creation process, you will be required to log in via E-mail ("Login
                    Information"). You shall not share the Account or the Login Information, nor let anyone else access
                    your account or do anything else that might jeopardize the security of your Account. In the event
                    you become aware of or reasonably suspect any breach of security, including without limitation any
                    loss, theft, or unauthorized disclosure of the Login Information, you must immediately notify us and
                    modify your Login Information. You are solely responsible for maintaining the confidentiality of the
                    Login Information, and you will be responsible for all uses of the Login Information, including
                    purchases, whether or not authorized by you. You are responsible for anything that happens to your
                    Account. We reserve the right to remove or reclaim any usernames at any time and for any reason,
                    including but not limited to claims by a third party that a user name violates the third party’s
                    rights.
                </p>
                <strong class="leading-3.5">License Limitations</strong>
                <p class="w-[848px] mb-[30px]">
                    Any use of the Service in violation of these License Limitations is strictly prohibited, can result
                    in the immediate revocation of your limited license and may subject you to liability for violation
                    of law.
                </p>
                <strong class="leading-3.5 my-6 block">You agree that you will not, under any circumstances</strong>
                <ol class="w-[848px] list-decimal pl-4 mb-[30px]">
                    <li>Engage in any act that we deem to be in conflict with the spirit or intent of the Service or
                        make improper use of the Service.</li>
                    <li>Use automation software, bots, hacks, mods or any unauthorized third-party software designed to
                        modify the Service, the "App" experience or without our express written consent, modify or cause
                        to be modified any files that are a part of the Service or Disrupt, overburden, or aid or assist
                        in the disruption or overburdening of any computer or server ("Server") used to offer or support
                        the Service or the website of application environment.</li>
                    <li>Institute, assist, or become involved in any type of attack, including without limitation
                        distribution of a virus, denial of service upon the Service, or other attempts to disrupt the
                        Service or any other person’s use or enjoyment of the Service.</li>
                    <li>Attempt to gain unauthorized access to the Service, Account registered to others or to the
                        computers, Servers, or networks connected to the Service by any means other than the user
                        interface provided by us, including but not limited to, by circumventing or modifying,
                        attempting to circumvent or modify, or encouraging or assisting any other person to circumvent
                        or modify, any security, technology, device or software that is part of the Service.</li>
                    <li>Post any information that is abusive, threatening, obscene, defamatory, libelous or racially,
                        sexually, religiously or otherwise objectionable or offensive.</li>
                    <li>Post any information that contains nudity, excessive violence, or offensive subject matter or
                        that contains a link to such contents.</li>
                    <li>Attempt to or harass, abuse, or harm, or advocate or incite harassment, abuse, or harm of
                        another person, group, including our employees, including our customer service representatives.
                    </li>
                    <li>Make available through the Service any material or information that infringes any copyright,
                        trademark, patent, trade secret, right of privacy, right of publicity, or other right of any
                        person or entity or impersonates any other person, including without limitation our employee.
                    </li>
                    <li>Reverse engineer, decompile, disassemble, decipher or otherwise attempt to derive the source
                        code for any underlying software or other intellectual property used to provide the Service, or
                        to obtain any information from the Service or the App using any method not expressly permitted
                        by us.</li>
                    <li>Solicit or attempt to solicit personal information from other users of the Service or the App or
                        post anyone’s private information, including personally identifiable information (whether in
                        text, image or video form), identification documents, or financial information through the
                        Service.</li>
                </ol>
                <strong class="leading-3.5">Suspension and Termination of Account and Service</strong>
                <p class="w-[848px] mb-5">
                    WITHOUT LIMITING ANY OTHER REMEDIES, WE MAY LIMIT, SUSPEND, TERMINATE, MODIFY OR DELETE ACCOUNTS OR
                    ACCESS TO THE SERVICE OR PORTIONS THEREOF IF YOU ARE, OR WE SUSPECT THAT YOU ARE, FAILING TO COMPLY
                    WITH ANY OF THESE TERMS OF SERVICE OR FOR ANY ACTUAL OR SUSPECTED ILLEGAL OR IMPROPER USE OF THE
                    SERVICE, WITH OR WITHOUT PRIOR NOTICE. YOU CAN LOSE YOUR USER NAME AND PERSONA AS A RESULT OF
                    ACCOUNT TERMINATION OR LIMITATION, AS WELL AS ANY BENEFITS, PRIVILEGES, EARNED ITEMS AND PURCHASED
                    ITEMS ASSOCIATED WITH YOUR USE OF THE SERVICE, AND WE ARE UNDER NO OBLIGATION TO COMPENSATE YOU FOR
                    ANY SUCH LOSSESS OR RESULTS.
                </p>
                <p class="w-[848px] mb-5">
                    WITHOUT LIMITING OUR OTHER REMEDIES, WE MAY LIMIT, SUSPEND, OR TERMINATE THE SERVICE AND USER
                    ACCOUNTS OR PORTIONS THEREOF, PROHIBIT ACCESS TO THE SERVICE AND RELATED SITES, AND THEIR CONTENT,
                    SERVICES AND TOOLS, DELAY OR REMOVE HOSTED CONTENT, AND TAKE TECHNICAL AND LEGAL STEP TO PREVENT
                    USER FROM ACCESSING THE SERVICE IF WE BELEVE THAT THEY ARE CREATING RISK OR POSSIBLE LEGAL
                    LIABILITIES, INFRINGING THE INTELLECTUAL PROPERTY RIGHT OF THIRD PARTIES, OR ACTING INCONSISTENTLY
                    WITH THE LETTER OR SPIRIT OF OUR TERMS OR POLICIES. ADDITIONALLY, WE MAY, IN APPROPRIATE
                    CIRCUMSTANCES AND AT OUR SOLE DICRETION, SUSPEND OR TERMINATE ACCOUNTS OF USERS WHO MAY BE REPEATED
                    INFRINGERS OF THIRD PARTY INTELLECTUAL PROPERTY RIGHTS.
                </p>
                <p class="w-[848px] mb-5">
                    WE RESERVE THE RIGHT TO TERMINATTE ANY ACCOUNT THAT HAS BEEN INACTIVE FOR 180 DAYS.
                </p>
                <p class="w-[848px] mb-5">
                    We reserve the rights to stop offering and/or supporting the Service or the App or part of Service
                    at any time, at which point your license to use the Service or a part thereof will be automatically
                    terminated. In such event, we shall not be required to provide refunds, benefits or other
                    compensation to users in connection with such discontinued Services. Termination of your Account can
                    include disabling your access to the Service or any part thereof including any content you submitted
                    or other submitted.
                </p>
                <p class="w-[848px] mb-5">
                    You may voluntarily terminate your Account at any time and for any reason by disconnecting or
                    deleting your facebook account to the Service. Once you disconnect or delete your Account, your
                    Account will be automatically terminated.
                </p>
                <strong class="leading-3.5">Suspension and Termination of Account and Service</strong>
                <p class="w-[848px] mb-5">
                    WITHOUT LIMITING ANY OTHER REMEDIES, WE MAY LIMIT, SUSPEND, TERMINATE, MODIFY OR DELETE ACCOUNTS OR
                    ACCESS TO THE SERVICE OR PORTIONS THEREOF IF YOU ARE, OR WE SUSPECT THAT YOU ARE, FAILING TO COMPLY
                    WITH ANY OF THESE TERMS OF SERVICE OR FOR ANY ACTUAL OR SUSPECTED ILLEGAL OR IMPROPER USE OF THE
                    SERVICE, WITH OR WITHOUT PRIOR NOTICE. YOU CAN LOSE YOUR USER NAME AND PERSONA AS A RESULT OF
                    ACCOUNT TERMINATION OR LIMITATION, AS WELL AS ANY BENEFITS, PRIVILEGES, EARNED ITEMS AND PURCHASED
                    ITEMS ASSOCIATED WITH YOUR USE OF THE SERVICE, AND WE ARE UNDER NO OBLIGATION TO COMPENSATE YOU FOR
                    ANY SUCH LOSSESS OR RESULTS.
                </p>
                <p class="w-[848px] mb-5">
                    WITHOUT LIMITING OUR OTHER REMEDIES, WE MAY LIMIT, SUSPEND, OR TERMINATE THE SERVICE AND USER
                    ACCOUNTS OR PORTIONS THEREOF, PROHIBIT ACCESS TO THE SERVICE AND RELATED SITES, AND THEIR CONTENT,
                    SERVICES AND TOOLS, DELAY OR REMOVE HOSTED CONTENT, AND TAKE TECHNICAL AND LEGAL STEP TO PREVENT
                    USER FROM ACCESSING THE SERVICE IF WE BELEVE THAT THEY ARE CREATING RISK OR POSSIBLE LEGAL
                    LIABILITIES, INFRINGING THE INTELLECTUAL PROPERTY RIGHT OF THIRD PARTIES, OR ACTING INCONSISTENTLY
                    WITH THE LETTER OR SPIRIT OF OUR TERMS OR POLICIES. ADDITIONALLY, WE MAY, IN APPROPRIATE
                    CIRCUMSTANCES AND AT OUR SOLE DICRETION, SUSPEND OR TERMINATE ACCOUNTS OF USERS WHO MAY BE REPEATED
                    INFRINGERS OF THIRD PARTY INTELLECTUAL PROPERTY RIGHTS.
                </p>
                <p class="w-[848px] mb-5">
                    WE RESERVE THE RIGHT TO TERMINATTE ANY ACCOUNT THAT HAS BEEN INACTIVE FOR 180 DAYS.
                </p>
                <p class="w-[848px] mb-5">
                    We reserve the rights to stop offering and/or supporting the Service or the App or part of Service
                    at any time, at which point your license to use the Service or a part thereof will be automatically
                    terminated. In such event, we shall not be required to provide refunds, benefits or other
                    compensation to users in connection with such discontinued Services. Termination of your Account can
                    include disabling your access to the Service or any part thereof including any content you submitted
                    or other submitted.
                </p>
                <p class="w-[848px] mb-5">
                    You may voluntarily terminate your Account at any time and for any reason by disconnecting or
                    deleting your facebook account to the Service. Once you disconnect or delete your Account, your
                    Account will be automatically terminated.
                </p>
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
        <hr />
        <p>
            Copyright © SHARE TREATS. All rights reserved.
        </p>
    </footer>
</template>
