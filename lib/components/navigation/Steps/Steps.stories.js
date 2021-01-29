import Steps from './Steps'

export default {
  component: Steps,
  title: 'Navigation / Steps'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwSteps v-model="step"><DwStep title="Step 1" @click.native="notify" /><DwStep title="Step 2" to="/" description="To" /><DwStep title="Step 3" :disabled="true" /><DwStep title="Step 4" /></DwSteps>',
  methods: {
    notify () {
      this.$notification.success({
        title: 'Steps',
        description: 'You have clicked on this step'
      })
    }
  }
})

export const Default = Template.bind({})

Default.args = {
  step: 2
}
