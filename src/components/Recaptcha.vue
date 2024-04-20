<script>
import Check from '@/assets/icons/Check.vue'

export default {
    name: 'Recaptcha',
    components: { Check },
    data() {
        return {
            reCaptcha: false,
        }
    }
}
</script>
<template>
    <div
      class="h-14 w-full rounded-lg bg-[#F9F9F9] border border-[#E0E0E0] flex justify-between items-center px-[30px]">
        <div
          class="flex items-center w-full cursor-pointer"
          @click.prevent="() => {
            reCaptcha = !reCaptcha;
            $emit('update:modelValue', reCaptcha)
          }"
        >
            <input
              id="reCaptcha"
              type="checkbox"
              :value="reCaptcha"
              name="reCaptcha"
              class="hidden"
            />
            <span
              :class="reCaptcha ? 'border-blue-600 bg-blue-600' : 'border-neutral-300 bg-white'"
              class="mr-2 border rounded-sm block w-4 h-4"
            >
                <Check :class="reCaptcha ? 'text-white' : 'hidden'" />
            </span>
            <label
              for="reCaptcha"
              class="text-xs leading-3"
            >
                I'm not a robot
            </label>
        </div>
        <img
          src="/assets/icons/reCAPTCHA_logo.svg"
          alt="reCAPTCHA_logo"
          class="h-8"
        />
    </div>
</template>