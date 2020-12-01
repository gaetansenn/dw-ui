import Collapse from './Collapse'
import CollapseItem from './CollapseItem'

export default {
  component: Collapse,
  subcomponents: { CollapseItem },
  title: 'Others / DwCollapse',
  argTypes: {
    value: {
      control: {
        type: 'text',
        options: ['item1', 'item2']
      }
    },
    accordion: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCollapse v-model="value"><DwCollapseItem name="item1" title="Item 1">My First item</DwCollapseItem><DwCollapseItem name="item2" title="Item 2">My Second item</DwCollapseItem></DwCollapse>'
})

export const Simple = Template.bind({})
export const Accordion = Template.bind({})

Simple.args = {
  value: 'item1',
  accordion: true
}
