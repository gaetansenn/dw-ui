<template>
  <div :class="{ 'is-active': isActive, 'is-disabled': disabled }">
    <div
      :aria-expanded="isActive"
      role="tab"
    >
      <div
        :id="`tw-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        :class="{ 'focusing': focusing, 'is-active': isActive }"
        class="flex justify-between items-center outline-none select-none border-b border-gray-200 py-3"
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
          <div class="text-lg font-semibold">
            {{ title }}
          </div>
          <svg
            v-if="!noIcon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="{ 'rotate-180': isActive }"
            class="transition-transform transform duration-500 ease-in-out h-5 w-5 ml-2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </slot>
      </div>
      <dw-collapse-transition>
        <div
          v-show="isActive"
          :id="`tw-collapse-content-${id}`"
          :aria-hidden="!isActive"
          :aria-labelledby="`tw-collapse-head-${id}`"
          role="tabpanel"
        >
          <div class="py-3">
            <slot :active="isActive" />
          </div>
        </div>
      </dw-collapse-transition>
    </div>
  </div>
</template>

<script>
import CollapseItemProps from './CollapseItem.props'

export default {
  name: 'DwCollapseItem',
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
