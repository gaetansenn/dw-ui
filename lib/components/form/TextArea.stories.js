import TextArea from './TextArea'

export default {
  component: TextArea,
  title: 'Form elements / TextArea',
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
  template: '<DwTextArea v-model="value" name="text-area" :rounded="rounded" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :disabled="disabled" :placeholder="placeholder" :maxlength="maxlength" remaining />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<DwForm :submit="onSubmit" :form="form">
    <DwTextArea v-model="form.value" name="value" :rounded="rounded" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :disabled="disabled" :placeholder="placeholder" />
    <DwButton type="submit" class="mt-5">Submit</DwButton>
  </DwForm>`,
  methods: {
    onSubmit () {
      this.$notification.success({
        title: 'Form',
        description: 'Form is valid 🎉'
      })
    }
  }
})

export const Simple = Template.bind({})
export const Remaining = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithError = Template.bind({})
export const WithValidation = TemplateValidation.bind({})
export const Disabled = Template.bind({})

Simple.args = {
  placeholder: 'Type your text here',
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  disabled: false,
  maxlength: undefined
}

Remaining.args = {
  ...Simple.args,
  maxlength: 100
}

WithLabel.args = {
  ...Simple.args,
  label: 'Textarea'
}

Required.args = {
  ...WithLabel.args,
  required: true
}

Disabled.args = {
  ...WithLabel.args,
  disabled: true
}

WithHelp.args = {
  ...Simple.args,
  help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec massa eros.'
}

WithError.args = {
  ...Simple.args,
  validation: {
    type: 'error',
    description: 'Lorem ipsum dolor sit amet'
  }
}

WithValidation.args = {
  ...Simple.args,
  label: 'Textarea validation',
  required: true,
  form: {
    value: undefined
  }
}
