import Tabs from './Tabs'

export default {
  component: Tabs,
  title: 'Navigation / Tabs'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<DwTabs v-model="current">
    <DwTabsPane name="tab1" label="tab 1" attribute="h2">Content 1</DwTabsPane>
    <DwTabsPane name="tab2" label="tab 2">Content 2</DwTabsPane>
    <DwTabsPane name="tab3" label="tab3">Content 3</DwTabsPane>
  </DwTabs>`
})

export const Breadcrumb = Template.bind({})

Breadcrumb.args = {
  current: 'tab1'
}
