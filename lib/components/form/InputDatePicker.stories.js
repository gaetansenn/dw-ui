import config from '../../../lib/utils/config'
import InputDatePicker from './InputDatePicker'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputDatePicker,
  title: 'Form elements / Input DatePicker',
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
  template: '<DwInputDatePicker v-model="value" name="input-datepicker" :initial-date="initialDate" :rounded="rounded" :locale="$i18n.locale" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :placeholder="placeholder" :format="format" :loading="loading" />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputDatePicker v-model="value" ref="input" name="input-datepicker" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" /><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const CustomFormat = Template.bind({})
export const InitialDate = Template.bind({})
export const WithValidation = TemplateValidation.bind({})
export const WithLoading = Template.bind({})

Simple.args = {
  initialDate: undefined,
  loading: false,
  variant: variants[0],
  placeholder: 'Select your date here',
  value: undefined,
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  format: null
}

WithLabel.args = {
  ...Simple.args,
  label: 'Input date'
}

Required.args = {
  ...WithLabel.args,
  required: true
}

WithHelp.args = {
  ...Simple.args,
  help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec massa eros.'
}

WithLoading.args = {
  ...Simple.args,
  loading: true
}

WithValidation.args = {
  ...Simple.args,
  required: true
}
CustomFormat.args = {
  ...Simple.args,
  format: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
}

InitialDate.args = {
  ...Simple.args,
  initialDate: new Date(2018, 8, 22)
}
