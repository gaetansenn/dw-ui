import config from '../../../lib/utils/config'
import InputEmail from './InputEmail'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputEmail,
  title: 'Form elements / Input Email',
  argTypes: {
    value: {
      control: {
        type: 'text'
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
  template: '<DwInputEmail v-model="value" name="input-text" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :help-tooltip="helpTooltip" :validation="validation" :placeholder="placeholder" />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputEmail v-model="value" ref="input" name="input-text" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" /><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></div>'
})

const TemplateConfirm = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div>
    <DwInputEmail v-model="value" :same="confirm" ref="input" name="input-email" :variant="variant" :size="size" :required="true" :inline="inline" :help="help" :validation="validation" label="Your Email" />
    <DwInputEmail v-model="confirm" name="input-confirm" class="mt-5" :variant="variant" :size="size" :required="true" :inline="inline" :help="help" :validation="validation" label="Confirm your Email" /><br>
    <DwButton @click.native="$refs.input.validate()">Submit</DwButton>
  </div>`
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithTooltipHelp = Template.bind({})
export const WithValidation = TemplateValidation.bind({})
export const WithConfirm = TemplateConfirm.bind({})

Simple.args = {
  variant: variants[0],
  placeholder: 'Type your text here',
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  helpTooltip: undefined
}

WithLabel.args = {
  ...Simple.args,
  label: 'Input text'
}

Required.args = {
  ...WithLabel.args,
  required: true
}

WithHelp.args = {
  ...Simple.args,
  help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec massa eros.'
}

WithTooltipHelp.args = {
  ...Simple.args,
  helpTooltip: 'Lorem ipsum dolor sit amet'
}

WithValidation.args = {
  ...Simple.args
}

WithConfirm.args = {
  confirm: '',
  ...Simple.args
}
