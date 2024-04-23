<script>
export default {
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
            required: true,
        },
        name: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    data(props) {
        return {
            model: props.modelValue
        }
    }
}
</script>
<template>
    <label class="flex flex-col w-full">
        <span class="text-label font-medium text-xs leading-[18px] font-roboto block">
            {{ label }}
        </span>
        <input
          v-model="model"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="$emit('update:modelValue', model)"
          autocomplete
          class="border border-input-border placeholder:text-placeholder rounded-lg h-10 px-4 font-normal tracking-[0.5px] text-xs leading-[26px] disabled:bg-disabled"
        />
    </label>
</template>