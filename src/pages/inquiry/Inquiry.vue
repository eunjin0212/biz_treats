<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import LabelInput from '@/components/LabelInput.vue';
import LabelSelect from '@/components/LabelSelect.vue';
import LabelTextArea from '@/components/LabelTextArea.vue';
import Background from '@/components/Background.vue';

export default {
    components: {
        Header,
        Footer,
        Form,
        LabelInput,
        LabelSelect,
        LabelTextArea,
        Background,
    },
    data() {
        const formModel = {
            companyName: '',
            PICName: '',
            email: '',
            phone: '+63',
            province: '선택',
            city: '선택',
            municipality: '',
            inquiry: '',
        }
        return {
            formModel,
            formData: [
                {
                    label: 'Company Name',
                    name: 'company_name',
                    value: formModel.companyName,
                    placeholder: 'Enter the Company Name',
                    type: 'text',
                    class: 'mt-[6px]'
                },
                {
                    label: 'PIC Name',
                    name: 'pic_name',
                    value: formModel.PICName,
                    placeholder: 'Enter the PIC Name',
                    type: 'text',
                },
                {
                    label: 'Email',
                    name: 'email',
                    value: formModel.email,
                    placeholder: 'abc@gmail.com',
                    type: 'text',
                },
                {
                    label: 'Phone',
                    name: 'phone',
                    value: formModel.phone,
                    type: 'text',
                },
                {
                    label: 'Select a Province',
                    name: 'province',
                    value: formModel.province,
                    placeholder: 'Select a Province',
                    defaultSelected: '선택',
                    option: ['서울시'],
                    type: 'select',
                },
                {
                    label: 'Select a City/Municipality',
                    name: 'city',
                    value: formModel.city,
                    placeholder: 'Select a City/Municipality',
                    defaultSelected: '선택',
                    option: ['서울시'],
                    type: 'select',
                },
                {
                    label: '',
                    name: 'municipality',
                    value: formModel.municipality,
                    type: 'text',
                    class: 'mt-3'
                },
                {
                    label: 'Inquiry',
                    name: 'inquiry',
                    value: formModel.inquiry,
                    type: 'textarea',
                    class: 'mb-3'
                },
            ]
        }

    }
}
</script>
<template>
    <Header />
    <Background>
        <Form
          title="Inquiry"
          class="mb-12 mt-7"
          description="Join Biz Treats now! You can treat your with bulk at once."
        >
            <template v-for="form in formData">
                <LabelInput
                  v-if="form.type === 'text'"
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form.placeholder"
                  v-model="form.value"
                />
                <LabelSelect
                  v-if="form.type === 'select'"
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form?.placeholder"
                  :option="form?.option"
                  :defaultSelected="form?.defaultSelected"
                  v-model="form.value"
                />
                <LabelTextArea
                  v-if="form.type === 'textarea'"
                  :label="form.label"
                  :name="form.name"
                  :class="form?.class"
                  :placeholder="form.placeholder"
                  v-model="form.value"
                />
            </template>
            <button class="form-btn">Inquiry</button>
        </Form>
    </Background>
    <Footer />
</template>
