<template>
  <DwInputGroup v-bind="inputGroupProps">
    <div
      v-click-away="{
        exclude: [],
        handler: 'close'
      }"
      :class="[config.wrapper]"
    >
      <div>
        <button ref="button" :disabled="disabled" :class="[config.button.fixed, config.button.classes, config.button.size]" @click="toggle">
          <slot name="singleLabel">
            <span>{{ localePlaceholder }}</span>
          </slot>
        </button>
      </div>
      <transition
        enter-class="transform opacity-0 scale-95"
        enter-active-class="transition ease-out duration-100"
        enter-to-class="transform opacity-100 scale-100"
        leave-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-to-class="transform opacity-0 scale-95"
      >
        <!-- Replace style attribute with tailwind plugin to overide default theme or wait for tailwind 2.0 upgrade -->
        <ul
          v-if="opened"
          ref="options"
          :class="[config.options]"
          style="max-height: 15rem;"
        >
          <template>
            <li
              v-for="(option, i) in localeOptions"
              :key="option[valueKey]"
              :ref="`option-${i}`"
              :class="[config.option.fixed, config.option.size, { [`${config.option.selected}`]: selectedIndex === i }]"
              @click.stop="toggleOption(option, i)"
            >
              <slot :option="option" :selected="selectedIndex === i" name="option">
                <span>{{ option[valueKey] }}</span>
              </slot>
            </li>
          </template>
        </ul>
      </transition>
    </div>
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import ClickAway from '../directives/click-away'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import DisabledProps from '../disabled.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'
import SelectProps from './Select.props'

export default {
  configPath: 'RichSelect',
  directives: {
    'click-away': ClickAway
  },
  mixins: [i18n, config, InputMixin, localeProp('validation'), localeProp('value')],
  props: {
    ...SelectProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps,
    ...DisabledProps
  },
  data () {
    return {
      opened: false,
      index: 0
    }
  },
  computed: {
    /** Current option as Object */
    localeOption () {
      const _default = { [this.valueKey]: this.value || '', [this.labelKey]: this.value || '' }

      if (!this.value) return _default

      if (typeof this.value === 'string')
        return this.localeOptions.find((option) => {
          if (typeof option === 'string') return option === this.value

          return option[this.valueKey] === this.value
        })

      return this.value
    },
    /**
     * Used to display the current selected item or default placeholder
     */
    localePlaceholder () {
      return (this.localeOption && this.localeOption[this.valueKey]) ? this.localeOption[this.labelKey] : (this.placeholder || this.config.placeholder)
    },
    localeOptions () {
      return this.options.map((item) => {
        if (typeof item === 'string') return { [this.valueKey]: item, [this.labelKey]: item }
        return item
      })
    },
    /**
     * Selected active index
     */
    selectedIndex () {
      if (!this.localeOption) return -1

      return this.localeOptions.findIndex(option => option[this.valueKey] === this.localeOption[this.valueKey])
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation
      }
    }
  },
  watch: {
    localeValue: 'onLocaleValueChanged'
  },
  methods: {
    onLocaleValueChanged (newValue) {
      this.$emit('input', newValue)
    },
    /**
     * Click on select to open or close
     */
    toggle () {
      if (this.disabled) return

      if (this.opened) return this.close()

      this.open()
    },
    close () {
      this.$emit('close')
      this.opened = false
    },
    open () {
      this.$emit('open')
      this.opened = true
    },
    toggleOption (item, index) {
      if (!item[this.valueKey]) return
      if (this.localeOption && item[this.valueKey] === this.localeOption[this.valueKey]) return this.unselectOption()

      return this.selectOption(item, index)
    },
    /**
     * Update current v-model value
     */
    selectOption (item, index) {
      this.index = index
      // Update v-model
      this.$emit('input', item[this.valueKey])
      // Send event of v-model change
      this.$emit('change', item[this.valueKey])
      this.close()
    },
    unselectOption () {
      // Avoid unselect if required
      if (this.required) return this.close()

      this.index = 0
      // We clean the current selected item
      this.$emit('input', null)
      // Send event of v-model change
      this.$emit('change', null)
      this.close()
    }
  }
}
</script>
