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
  template: '<DwDatePicker :locale="$i18n.locale" :disabled-dates="disabledDates" />'
})

export const Simple = Template.bind({})

Simple.args = {
  disabledDates: ['2020-12-04']
}
