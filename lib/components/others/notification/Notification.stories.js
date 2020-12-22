import Notification from './Notification'

export default {
  component: Notification,
  title: 'Others / Notification'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    success () {
      this.$notification.success({
        title: 'Notification',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget imperdiet tellus'
      })
    },
    info () {
      this.$notification.info({
        title: 'Notification',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget imperdiet tellus'
      })
    },
    error () {
      this.$notification.error({
        title: 'Notification',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget imperdiet tellus'
      })
    }
  },
  template: '<div class="flex flex-col"><DwButton @click.native="success">Success</DwButton><DwButton @click.native="info">Info</DwButton><DwButton @click.native="error">Error</DwButton></div>'
})

export const Default = Template.bind({})

Default.args = {
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin arcu nisl, sagittis a mattis ut, eleifend sed mauris. Aenean ut dui hendrerit, rhoncus justo in, euismod orci. Fusce ut nunc vel urna pellentesque faucibus quis eu lorem. Nulla faucibus semper fermentum. Cras justo urna, pulvinar et laoreet et, mattis nec sapien. Nunc nisl elit, accumsan quis lobortis ut, finibus id ante. Sed egestas mi a eros dignissim, id varius est lobortis. Proin tristique et risus vitae semper.'
}
