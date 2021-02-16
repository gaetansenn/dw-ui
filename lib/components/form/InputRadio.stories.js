import InputRadio from './InputRadio'

export default {
  component: InputRadio,
  title: 'Form elements / Input Radio',
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputRadio v-model="value" name="input-text" :disabled="disabled" :size="size" label="Input radio" />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputRadio v-model="value" ref="input" name="input-radio" label="Input radio" :size="size" required /><br><DwButton @click.native="$refs.input.validate()" class="mt-2">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const Disabled = Template.bind({})
export const WithValidation = TemplateValidation.bind({})

Simple.args = {
  value: '',
  required: false,
  disabled: false
}

Disabled.args = {
  ...Simple.args,
  disabled: true
}

WithValidation.args = {
  ...Simple.args
}
