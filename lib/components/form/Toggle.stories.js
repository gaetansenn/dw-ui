import Toggle from './Toggle'

export default {
  component: Toggle,
  title: 'Form components / Toggle',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwToggle v-model="value" :size="size" value="checked" />'
})

export const Default = Template.bind({})

Default.args = {
  value: 'checked'
}
