<script>
import Check from '@/assets/icons/Check.vue'

export default {
    name: 'Checkbox',
    components: { Check },
    data(props) {
        return {
            model: props.modelValue,
        }
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        modelValue: {
            type: Boolean,
            default: false,
            required: true,
        },
    }
}
</script>
<template>
    <div
      class="flex items-center w-full cursor-pointer"
      @click.prevent="() => {
        model = !model;
        $emit('update:modelValue', model)
    }"
    >
        <input
          :id="name"
          type="checkbox"
          :value="model"
          :name="name"
          class="hidden"
        />
        <span
          :class="model ? 'border-blue-600 bg-blue-600' : 'border-neutral-300 bg-white'"
          class="mr-[6px] border rounded-sm block w-6 h-6"
        >
            <Check :class="model ? 'text-white' : 'hidden'" />
        </span>
        <label
          :for="name"
          class="font-roboto text-[13px] leading-5 text-subLink"
        >
            {{ label }}
        </label>
    </div>
</template>
