import Modal from './Modal'

export default {
  component: Modal,
  title: 'Others / Modal'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwModal v-model="value">{{ message }}</DwModal><DwButton @click.native="value = !value">Open me</DwButton></div>'
})

export const Default = Template.bind({})

Default.args = {
  value: false,
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollisLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra elit sit amet fermentum mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin arcu nisl, sagittis a mattis ut, eleifend sed mauris. Aenean ut dui hendrerit, rhoncus justo in, euismod orci. Fusce ut nunc vel urna pellentesque faucibus quis eu lorem. Nulla faucibus semper fermentum. Cras justo urna, pulvinar et laoreet et, mattis nec sapien. Nunc nisl elit, accumsan quis lobortis ut, finibus id ante. Sed egestas mi a eros dignissim, id varius est lobortis. Proin tristique et risus vitae semper.'
}
