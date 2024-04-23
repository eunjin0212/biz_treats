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
        <textarea
          v-model="model"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', model)"
          class="border border-input-border placeholder:text-placeholder rounded-lg min-h-40 max-h-40 h-40 px-4 font-normal tracking-[0.5px] text-xs leading-[26px]"
        />
    </label>
</template>