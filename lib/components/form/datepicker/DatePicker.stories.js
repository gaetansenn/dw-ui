import DatePicker from './DatePicker.vue'

export default {
  component: DatePicker,
  title: 'Form elements / DatePicker',
  argTypes: {
    disabledDates: {
      control: {
        type: 'array'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div>{{ date }}<DwDatePicker v-model="date" :locale="$i18n.locale" :disabled-dates="disabledDates" /></div>'
})

export const Simple = Template.bind({})

Simple.args = {
  date: null,
  disabledDates: ['2020-12-04']
}
