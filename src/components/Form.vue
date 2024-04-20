<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        img: {
            type: String,
            default: '/assets/images/biz_treats_log.png',
        }
    }
}
</script>
<template>
    <form
      @submit="(e) => {
        e.preventDefault();
        $emit('submit');
    }"
      class="py-7 w-full gap-3 mr-[150px] max-w-[450px] px-11 bg-white flex flex-col items-center rounded shadow-[0px 12px 24px 0px #00000014]"
    >
        <div class="flex flex-col items-center">
            <img
              v-if="img"
              :src="img"
              alt="header-log"
              class="w-[87px] h-11"
            />
            <h3 class="font-roboto font-bold text-[26px] leading-[41px] tracking-[0.15px] text-main mt-[8.5px]">
                {{ title }}
            </h3>
            <p
              v-if="description"
              class="font-roboto text-sm leading-[22px] tracking-[0.15px] text-main mt-[15.5px]"
            >
                {{ description }}
            </p>
        </div>
        <slot></slot>
    </form>
</template>
