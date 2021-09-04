import config from '../../../lib/utils/config'
import InputText from './InputText'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputText,
  title: 'Form elements / Input Text',
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
  template: '<DwInputText v-model="value" name="input-text" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :help-tooltip="helpTooltip" :validation="validation" :disabled="disabled" :placeholder="placeholder" />'
})

const TemplateIcons = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputText v-model="value" name="input-text" :rounded="rounded" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :placeholder="placeholder" :leading="leading" :trailing="trailing" />'
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithTooltipHelp = Template.bind({})
export const WithError = Template.bind({})
export const Disabled = Template.bind({})
export const LeftIcon = TemplateIcons.bind({})
export const RightIcon = TemplateIcons.bind({})
export const BothSideIcon = TemplateIcons.bind({})

Simple.args = {
  variant: variants[0],
  placeholder: 'Type your text here',
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  disabled: false,
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

Disabled.args = {
  ...WithLabel.args,
  disabled: true
}

WithHelp.args = {
  ...Simple.args,
  help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec massa eros.'
}

WithTooltipHelp.args = {
  ...Simple.args,
  helpTooltip: 'Lorem ipsum dolor sit amet'
}

WithError.args = {
  ...Simple.args,
  validation: {
    type: 'error',
    description: 'Lorem ipsum dolor sit amet'
  }
}

LeftIcon.args = {
  ...Simple.args,
  leading: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>',
  trailing: null
}

RightIcon.args = {
  ...Simple.args,
  leading: null,
  trailing: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>'
}

BothSideIcon.args = {
  ...Simple.args,
  leading: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>',
  trailing: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>'
}
