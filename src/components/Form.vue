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
        },
        classes: {
            type: String,
            default: '',
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
      class="py-7 px-[46px] w-full gap-1 mr-[150px] max-w-[450px] bg-white flex flex-col items-center rounded shadow-[0px_12px_24px_0px_#00000014]"
      :class="classes"
    >
        <div class="flex flex-col items-center w-full">
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
              class="font-roboto w-full text-sm leading-[22px] tracking-[0.3px] text-main mt-[15.5px]"
            >
                {{ description }}
            </p>
        </div>
        <slot></slot>
    </form>
</template>
