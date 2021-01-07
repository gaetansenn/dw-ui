import config from '../../../lib/utils/config'
import Tag from './Tag'

const variants = Object.keys(config().Tag.variants)

export default {
  component: Tag,
  title: 'Data / Tag',
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: variants
      }
    },
    rounded: {
      control: {
        type: 'select',
        // TODO: Import it from global rounded prop
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full']
      }
    },
    size: {
      control: {
        type: 'select',
        // TODO: Import it from global size prop
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwTag :variant="variant" :rounded="rounded" :size="size">#dewib</DwTag>'
})

export const Default = Template.bind({})

Default.args = {}
