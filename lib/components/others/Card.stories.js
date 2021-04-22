import Card from './Card'

export default {
  component: Card,
  title: 'Others / Card'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCard header="This is my header">This is my card content<template slot="footer">This is my footer</template></DwCard>'
})

const TemplateSubmit = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCard :submit="submit"><DwButton type="submit">Submit</DwButton></DwCard>'
})

const TemplateCollapse = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCard header="This is my header" :arrow="arrow" collapse>This is my card content</DwCard>'
})

const TemplateHeaderSlot = (args, { argTypes }) => ({
  template: '<DwCard collapse><template #header="{ opened }">Opened: {{ opened }}</template>This is my card content</DwCard>'
})

export const Default = Template.bind({})
export const WithLink = Template.bind({})
export const WithSubmit = TemplateSubmit.bind({})
export const WithCollapse = TemplateCollapse.bind({})
export const WithCollapseWithoutArrow = TemplateCollapse.bind({})
export const WithHeaderSlot = TemplateHeaderSlot.bind({})

Default.args = {
  href: null
}

WithLink.args = {
  href: '#'
}

WithSubmit.args = {
  submit: () => console.log('submit called')
}

WithCollapse.args = {
  arrow: true
}

WithCollapseWithoutArrow.args = {
  arrow: false
}

WithHeaderSlot.args = {}
