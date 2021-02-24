import ScrollWrapper from './ScrollWrapper'

export default {
  component: ScrollWrapper,
  title: 'Others / ScrollWrapper'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div class="max-w-xs mx-auto">
    <DwScrollWrapper>
      <template #default="{ scrollTo, scrollToIndex }">
        <DwTag v-for="(tag, index) in tags" :key="index" class="flex-shrink-0 cursor-pointer" @click.native="scrollToIndex(index)">{{ tag }}</DwTag>
      </template>
    </DwScrollWrapper></div>`
})

const TemplateSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<div class="max-w-xs mx-auto">
    <DwScrollWrapper>
      <template #prev="{ prev }">
        <div class="absolute inset-y-0 flex items-center justify-center cursor-pointer left-0" @click="prev">
          <div class="relative w-8 h-8 bg-white shadow-lg hover:shadow-xl rounded-full p-1">
            <div class="absolute inset-0 flex items-center justify-center leading-none text-sm -ml-1">😎</div>
          </div>
        </div>
      </template>
      <template #default="{ scrollTo, scrollToIndex }">
        <DwTag v-for="(tag, index) in tags" :key="index" class="flex-shrink-0 cursor-pointer" @click.native="scrollToIndex(index)">{{ tag }}</DwTag>
      </template>
    </DwScrollWrapper></div>`
})

export const Default = Template.bind({})
export const CustomSlot = TemplateSlot.bind({})

Default.args = {
  tags: ['dewib', 'ui', 'tags component', 'scrollable', 'vertical']
}

CustomSlot.args = {
  ...Default.args
}
