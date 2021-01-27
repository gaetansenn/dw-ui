import Dialog from './Dialog'

export default {
  component: Dialog,
  title: 'Others / Dialog'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    open () {
      this.$dialog({
        title: 'Lorem ipsum dolor sit amet',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget imperdiet tellus',
        onSubmit: () => {
          this.$notification.success({
            title: 'Dialog',
            description: 'Submit button clicked'
          })
        }
      })
    }
  },
  template: '<div class="mt-8"><DwButton @click.native="open">Open dialog</DwButton></div>'
})

export const Default = Template.bind({})

Default.args = {}
