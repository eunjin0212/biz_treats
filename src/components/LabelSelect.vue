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
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        defaultSelected: {
            type: String,
            default: '',
        },
        option: {
            type: Array,
            default: () => ([])
        }
    },
    data(props) {
        return {
            model: props.modelValue
        }
    }
}
</script>
<template>
    <label
      class="flex flex-col w-full"
    >
        <span class="text-label font-medium text-xs leading-[18px] font-roboto block">
            {{ label }}
        </span>
        <select
          v-model="model"
          :name="name"
          :placeholder="placeholder"
          @change="$emit('update:modelValue', model)"
          class="border border-input-border placeholder:text-placeholder rounded-lg h-10 pl-4 pr-2 font-normal tracking-[0.5px] text-xs leading-[26px] appearance-none bg-no-repeat bg-[right_9px_center] bg-[url('@/assets/icons/select_arrow.svg')]"
        >
            <option disabled :value="defaultSelected">
                {{ defaultSelected }}
            </option>
            <option
              v-for="opt in option"
              :value="opt?.value || opt"
            >
                {{ opt?.label || opt }}
            </option>
        </select>
    </label>
</template>