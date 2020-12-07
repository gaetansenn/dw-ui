import Component from './Breadcrumb'

const items = [{
  label: 'Home',
  href: '/'
}, 'Categories', {
  label: 'Mon produit'
}]

export default {
  component: Component,
  title: 'Navigation / Breadcrumb',
  argTypes: {
    items: {
      control: {
        type: 'value'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwBreadcrumb :items="items" />'
})

export const Breadcrumb = Template.bind({})

Breadcrumb.args = {
  items
}
