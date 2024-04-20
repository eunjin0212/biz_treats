<script>
export default {
    data() {
        return {
            reCaptcha: false,
        }
    }
}
</script>
<template>
    <div
      class="h-[50px] rounded bg-gray border border-neutral-300 flex justify-between items-center pl-[13px] pr-[21px] py-2"
    >
        <Checkbox
          v-model="reCaptcha"
          label="I'm not a robot"
          name="robot"
        />
        <img
          src="/assets/images/reCAPTCHA_logo.svg"
          alt="reCAPTCHA_logo"
          class="h-8"
        />
    </div>
</template>
<style></style>