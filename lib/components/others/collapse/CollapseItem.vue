<template>
  <div v-if="config" :class="{ 'is-active': isActive, 'is-disabled': disabled }">
    <div
      :aria-expanded="isActive"
      role="tab"
    >
      <div
        :id="`dw-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        :class="[{'focusing': focusing, 'is-active': isActive }, config.fixed]"
        role="button"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot
          name="title"
          :active="isActive"
          :title="title"
        >
          <div :class="config.header.title">
            {{ title }}
          </div>
          <!-- eslint-disable-next-line -->
          <div v-if="!noIcon" :class="[config.header.icon.fixed, config.header.icon.classes]" v-html="config.header.icon.icon" />
        </slot>
      </div>
      <dw-collapse-transition>
        <div
          v-show="isActive"
          :id="`dw-collapse-content-${id}`"
          :aria-hidden="!isActive"
          :aria-labelledby="`dw-collapse-head-${id}`"
          role="tabpanel"
        >
          <div :class="config.body.wrapper">
            <slot :active="isActive" />
          </div>
        </div>
      </dw-collapse-transition>
    </div>
  </div>
</template>

<script>
import config from '../../config.mixin'
import CollapseItemProps from './CollapseItem.props'

export default {
  configPath: 'CollapseItem',
  name: 'DwCollapseItem',
  mixins: [config],
  inject: ['collapse'],
  props: {
    ...CollapseItemProps
  },
  data () {
    return {
      focusing: false,
      isClick: false,
      id: this._uid
    }
  },
  computed: {
    isActive () {
      return this.collapse && this.collapse.activeNames.includes(this.name)
    }
  },
  methods: {
    handleFocus () {
      setTimeout(() => {
        if (!this.isClick)
          this.focusing = true
        else
          this.isClick = false
      }, 50)
    },
    handleHeaderClick () {
      if (this.disabled) return

      this.$parent.$emit('item-click', this)
      this.focusing = false
      this.isClick = true
    },
    handleEnterClick () {
      this.$parent.$emit('item-click', this)
    }
  }
}
</script>
