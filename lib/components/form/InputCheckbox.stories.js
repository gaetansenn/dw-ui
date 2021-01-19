import InputCheckbox from './InputCheckbox'

export default {
  component: InputCheckbox,
  title: 'Form elements / Input Checkbox',
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
  template: '<DwInputCheckbox v-model="value" name="input-checkbox" :disabled="disabled" :size="size" :required="required" label="My checkbox" />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputCheckbox v-model="value" ref="input" name="input-checkbox" label="Input checkbox" :variant="variant" :size="size" :required="required" required /><br><DwButton @click.native="$refs.input.validate()" class="mt-2">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const Disabled = Template.bind({})
export const WithValidation = TemplateValidation.bind({})

Simple.args = {
  value: '',
  required: false
}

Disabled.args = {
  ...Simple.args,
  disabled: true
}

WithValidation.args = {
  ...Simple.args,
  value: false
}
