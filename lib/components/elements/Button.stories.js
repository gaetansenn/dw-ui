import config from '../../../lib/utils/config'
import Button from './Button'

const variants = Object.keys(config().Button.variants)

export default {
  component: Button,
  title: 'Elements / Button',
  argTypes: {
    type: {
      control: {
        type: 'select',
        // TODO: Import it from prop component
        options: ['button', 'reset', 'submit']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: variants
      }
    },
    size: {
      control: {
        type: 'select',
        // TODO: Import it from global size prop
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    },
    rounded: {
      control: {
        type: 'select',
        // TODO: Import it from global rounded prop
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwButton :size="size" :variant="variant" :rounded="rounded">My Button</DwButton>'
})

export const Simple = Template.bind({})

Simple.args = {
  variant: variants[0]
}
