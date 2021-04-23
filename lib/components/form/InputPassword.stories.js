import config from '../../../lib/utils/config'
import InputPassword from './InputPassword'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputPassword,
  title: 'Form elements / Input Password',
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
  template: '<form><DwInputPassword v-model="value" name="input-password" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :help-tooltip="helpTooltip" :validation="validation" :placeholder="placeholder" autocomplete="current-password" /></form>'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<form><DwInputPassword v-model="value" ref="input" name="input-password" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :validate-password="validatePassword" autocomplete="current-password" required /><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></form>'
})

const TemplateEye = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<form><DwInputPassword v-model="value" name="input-password" rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :placeholder="placeholder" autocomplete="current-password" eye /></form>'
})

const TemplateConfirm = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<form>
    <DwInputPassword v-model="value" :confirm="$refs.confirm" ref="input" name="input-password" :variant="variant" :size="size" :required="true" :inline="inline" :help="help" :validation="validation" label="Your password" autocomplete="current-password" eye />
    <DwInputPassword v-model="confirm" ref="confirm" name="input-confirm" class="mt-5" :variant="variant" :size="size" :required="true" :inline="inline" :help="help" :validation="validation" label="Confirm your password" autocomplete="new-password" eye /><br>
    <DwButton @click.native="$refs.input.validate()">Submit</DwButton>
  </form>`
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithTooltipHelp = Template.bind({})
export const WithValidation = TemplateValidation.bind({})
export const WithoutPasswordValidation = TemplateValidation.bind({})
export const WithEye = TemplateEye.bind({})
export const WithConfirm = TemplateConfirm.bind({})

Simple.args = {
  variant: variants[0],
  placeholder: 'Type your password here',
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  helpTooltip: undefined,
  validatePassword: true
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

WithoutPasswordValidation.args = {
  ...Simple.args,
  validatePassword: false
}

WithEye.args = {
  ...Simple.args
}

WithConfirm.args = {
  confirm: '',
  ...Simple.args
}
