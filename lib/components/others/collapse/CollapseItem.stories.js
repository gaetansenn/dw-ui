import CollapseItem from './CollapseItem'

export default {
  component: CollapseItem,
  title: 'Others / DwCollapseItem',
  argTypes: {
    name: {
      control: {
        type: 'text'
      }
    },
    title: {
      control: {
        type: 'text'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    noIcon: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCollapseItem :name="name" :title="title" :disabled="disabled" :no-icon="noIcon">My content</DwCollapseItem>'
})

export const Simple = Template.bind({})

Simple.args = {
  title: 'My title'
}
