import Card from './Card'

export default {
  component: Card,
  title: 'Others / Card'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCard :href="href">This is my card content</DwCard>'
})

const TemplateSubmit = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwCard :submit="submit"><DwButton type="submit">Submit</DwButton></DwCard>'
})

export const Default = Template.bind({})
export const WithLink = Template.bind({})
export const WithSubmit = TemplateSubmit.bind({})

Default.args = {
  href: null
}

WithLink.args = {
  href: '#'
}

WithSubmit.args = {
  submit: () => console.log('submit called')
}
