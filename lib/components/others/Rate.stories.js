import Rate from './Rate'

export default {
  component: Rate,
  title: 'Others / Rate',
  argTypes: {
    size: {
      control: {
        type: 'select',
        // TODO: Import it from global size prop
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwRate v-model="rate" :size="size" :readonly="readonly" /><div class="mt-3">Rate: {{ rate }}</div></div>'
})

export const Default = Template.bind({})
export const ReadOnly = Template.bind({})

Default.args = {
  rate: 2.3,
  readonly: false
}

ReadOnly.args = {
  ...Default.args,
  readonly: true
}
