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
  template: '<div>{{ date }}<DwDatePicker v-model="date" :locale="$i18n.locale" :loading="loading" :disabled-dates="disabledDates" /></div>'
})

export const Simple = Template.bind({})
export const Loading = Template.bind({})

Simple.args = {
  date: null,
  loading: false,
  disabledDates: ['2020-12-04']
}

Loading.args = {
  ...Simple.args,
  loading: true
}
