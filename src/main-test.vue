<template>
    <div>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-primary-600 text-white-20 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          @click="onMoveToExample('/home')"
        >
            <PlusIcon
              class="w-5 h-5 mr-2 -ml-1"
              aria-hidden="true"
            />
            home
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-primary-600 text-white-20 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          @click="startLoadingSpinner"
        >
            <PlusIcon
              class="w-5 h-5 mr-2 -ml-1"
              aria-hidden="true"
            />
            test loading-spinner elements
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-primary-600 text-white-20 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          @click="signOut"
        >
            <PlusIcon
              class="w-5 h-5 mr-2 -ml-1"
              aria-hidden="true"
            />
            sign out
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-primary-600 text-white-20 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          @click="() => openNotify([notify])"
          v-for="notify in notifyData"
          :key="notify.status"
        >
            {{ notify.status }}
        </button>
        <button @click="() => openAllNotify(notifyAllData)">All Notify</button>
    </div>
    <Teleport to="body">
        <loadingSpinner />
    </Teleport>
    <Teleport to="body">
        <main
          v-if="notify.length"
          class="notify"
        >
            <template
                v-for="(item, idx) in notify"
                :key="item?.status"
            >
                <aside
                    v-if="item !== null"
                    :class="item.status"
                    class="notify__contents"
                >
                    <div>
                        <img :src="`/assets/icons/notify_${item?.status}.svg`" />
                        <p>
                            <span>{{ statusLabel[item?.status] }}</span>
                            <label>{{ item?.text }}</label>
                        </p>
                    </div>
                    <button @click="() => notify.splice(idx, 1)">
                        <NotifyClose />
                    </button>
                </aside>
            </template>
        </main>
    </Teleport>
</template>
<script>

import { PlusIcon } from '@heroicons/vue/solid';
import loadingSpinner from '@/components/elements/loading-spinner.vue'
import NotifyClose from '@/assets/icons/NotifyClose.vue'

export default {
    components: {
        PlusIcon,
        loadingSpinner,
        NotifyClose,
    },
    mounted() {
        const isPrd = process.env.VUE_APP_SERVER_MODE === 'prd'; // production
        if (isPrd) {
            location.href = '/home';
        }
    },
    data() {
        return {
            notify: [],
            notifyData: [
                {
                    status: 'error',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'success',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'warning',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'info',
                    text: 'Provide users with non-disruptive',
                },
            ],
            notifyAllData: [
                {
                    status: 'error',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'success',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'warning',
                    text: 'Provide users with non-disruptive',
                },
                {
                    status: 'info',
                    text: 'Provide users with non-disruptive',
                },
            ],
            statusLabel: {
                error: 'Error',
                success: 'Success',
                warning: 'Warning',
                info: 'Info',
            },
        }
    },
    methods: {
        onMoveToExample(url) {
            location.href = url;
        },
        startLoadingSpinner() {
            const self = this;
            self.$emitter.$emit("UI_EVENT_USE_LOADING_BACKGROUND", true);

            //5초뒤 종료
            setTimeout(() => self.$emitter.$emit("UI_EVENT_USE_LOADING_BACKGROUND", false), 5000);
        },
        signOut() {
            const self = this;

            const url = self.$api("uri", "post-sign-out");

            self.$axios.post(url)
                .then(() => {
                    alert("signOut")
                })
                .catch(() => {
                    alert("error");
                });
        },
        openNotify(data) {
            this.notify = data
        },
        openAllNotify(data) {
            this.notify = data
        }
    },
};
</script>