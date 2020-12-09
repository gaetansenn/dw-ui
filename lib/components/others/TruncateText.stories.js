import TruncateText from './TruncateText'

export default {
  component: TruncateText,
  title: 'Others / Truncate Text',
  argTypes: {
    text: {
      control: {
        type: 'text'
      }
    },
    lines: {
      control: {
        type: 'number'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwTruncateText :lines="lines" :text="text" />'
})

const TemplateWithSlots = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwTruncateText :lines="lines"><template>{{ text }}</template><template #more="{ opened }">{{ opened ? "its opened" : "not opened" }}</template></DwTruncateText>'
})

export const Default = Template.bind({})
export const WithSlot = TemplateWithSlots.bind({})

const context = {
  text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
  lines: 2
}

Default.args = {
  ...context
}

WithSlot.args = {
  ...context
}
