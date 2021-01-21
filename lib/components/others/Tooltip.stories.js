import Tooltip from './Tooltip'

export default {
  component: Tooltip,
  title: 'Others / Tooltip',
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft']
      }
    },
    event: {
      control: {
        type: 'select',
        options: ['click', 'hover']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div class="flex w-full mt-32 items-center justify-center"><DwTooltip :position="position" :content="content" :disabled="disabled" :event="event"><DwButton>DwTooltip</DwButton></DwTooltip></div>'
})

const TemplateWithSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div class="flex w-full mt-32 items-center justify-center"><DwTooltip :position="position" :disabled="disabled" :event="event"><div slot="content" v-html="content" /><template><DwButton>DwTooltip</DwButton></template></DwTooltip></div>'
})

export const Default = Template.bind({})
export const WithSlot = TemplateWithSlot.bind({})

Default.args = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}

WithSlot.args = {
  content: 'Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> 😍'
}
