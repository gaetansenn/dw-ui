<template>
  <div>
    <DwInputGroup v-bind="inputGroupProps">
      <div
        v-click-away="{
          exclude: [],
          handler: 'close'
        }"
        :class="[config.wrapper]"
      >
        <div>
          <button ref="button" type="button" :disabled="disabled" :class="[config.button.fixed, config.button.classes, config.button.size]" @click="toggle">
            <slot v-if="loading" name="loading">
              <div :class="config.loading.wrapper">
                <div :class="config.loading.fixed" v-html="config.loading.icon" />
                <div :class="config.loading.label">
                  {{ localLoadingLabel }}
                </div>
              </div>
            </slot>
            <slot v-else name="label" :value="localPlaceholder" :option="localOption ? localOption.original : false">
              <span>{{ localPlaceholder }}</span>
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
                v-for="(option, i) in localOptions"
                :key="i"
                :ref="`option-${i}`"
                :class="[config.option.fixed, config.option.size, { [`${config.option.selected}`]: selectedIndex === i }, option.disabled ? config.option.disabled : config.option.active]"
                @click.stop="toggleOption(option, i)"
              >
                <slot :option="option.original" :selected="selectedIndex === i" name="option">
                  <span>{{ option.label }}</span>
                </slot>
              </li>
            </template>
          </ul>
        </transition>
      </div>
    </DwInputGroup>
  </div>
</template>

<script>
import i18n from '../utils/i18n'
import ClickAway from '../directives/click-away'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localProp from '../utils/localProp'
import DisabledProps from '../disabled.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'
import SelectProps from './Select.props'
import RichSelectProps from './RichSelect.props'

export default {
  configPath: 'RichSelect',
  directives: {
    'click-away': ClickAway
  },
  mixins: [i18n, config, InputMixin, localProp('validation'), localProp('value')],
  props: {
    ...RichSelectProps,
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
    optionsObject () {
      return typeof this.options[0] === 'object'
    },
    optionsWithIndex () {
      return this.optionsObject && !this.valueKey
    },
    /** Label to display during loading */
    localLoadingLabel () {
      return this.loadingLabel || this.translate('RichSelect.loading')
    },
    /** Current option as Object */
    localOption () {
      const _default = { value: this.value || '', label: this.value || '' }

      if (!this.value) return _default

      return this.localOptions.find((localOption) => {
        if (this.valueKey) return localOption.value === this.value
        return localOption.original === this.value
      })
    },
    /**
      * Used to display the current selected item or default placeholder
      */
    localPlaceholder () {
      return (this.localOption && this.localOption.label) ? this.localOption.label : (this.placeholder || this.config.placeholder)
    },
    localOptions () {
      return this.options.map((item, index) => {
        const objectOption = typeof item === 'object'
        const option = { value: objectOption ? item[this.valueKey] : item, label: objectOption ? item[this.labelKey] : item, disabled: item.disabled, original: item }

        return option
      })
    },
    /**
      * Selected active index
      */
    selectedIndex () {
      if (!this.localOption) return -1

      return this.localOptions.findIndex(localOption => localOption === this.localOption)
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localValidation
      }
    }
  },
  watch: {
    localValue: 'onLocalValueChanged'
  },
  methods: {
    onLocalValueChanged (newValue) {
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
      if (item.disabled) return
      if (this.localOption === item) return this.unselectOption()

      return this.selectOption(item, index)
    },
    /**
      * Update current v-model value
      */
    selectOption (item, index) {
      this.index = index

      // Update v-model
      this.$emit('input', item.value || item.original)
      // Send event of v-model change
      this.$emit('change', item.value || item.original)
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
  </div>
</template></div>
