<template>
  <div>
    <div :class="config.header.fixed">
      <div :class="config.header.date">
        <div>{{ currentMonth }}</div>
        <div>
          {{ currentYear }}
        </div>
      </div>
      <div :class="config.header.navigation.fixed">
        <button type="button" :class="config.header.navigation.button" :disabled="loading" @click.stop="prevMonth">
          <div :class="config.header.navigation.icon.fixed" v-html="config.header.navigation.icon.left" />
        </button>
        <button type="button" :class="config.header.navigation.button" :disabled="loading" @click.stop="nextMonth">
          <div :class="config.header.navigation.icon.fixed" v-html="config.header.navigation.icon.right" />
        </button>
      </div>
    </div>
    <slot v-if="loading" name="loading">
      <div :class="config.loading.wrapper">
        <div :class="config.loading.fixed" v-html="config.loading.icon" />
        <div :class="config.loading.label">
          {{ localLoadingLabel }}
        </div>
      </div>
    </slot>
    <div v-else>
      <div :class="config.weekDays.wrapper">
        <div v-for="day in weekDays" :key="day" :class="config.weekDays.day.wrapper">
          <div :class="config.weekDays.day.fixed">
            {{ day }}
          </div>
        </div>
      </div>
      <div :class="config.days.wrapper">
        <button
          v-for="(day, index) in days"
          :key="index"
          :disabled="day.disabled"
          :class="[config.days.button, { [config.days.anotherMonth]: !day.current && !day.selected, [config.days.selected]: day.selected, [config.days.today]: day.today && !day.selected && day.current }]"
          @click="selectDate(day.date)"
        >
          <div :class="[config.days.day]">
            {{ day.date.getDate() }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../../utils/i18n'
import config from '../../config.mixin'
import DatePickerProps from './DatePicker.props'

export default {
  configPath: 'DatePicker',
  mixins: [config, i18n],
  props: {
    ...DatePickerProps
  },
  data () {
    let localValue = this.value ? new Date(this.value) : undefined
    const initialDate = this.initialDate ? new Date(this.initialDate) : false

    // If date is invalid set date to today
    if (localValue && localValue.toString() === 'Invalid Date') localValue = new Date()

    return {
      localValue,
      today: this.getBeginingOfDay(new Date()),
      currentDate: this.getBeginingOfDay(initialDate || localValue || new Date())
    }
  },
  computed: {
    /** Label to display during loading */
    localLoadingLabel () {
      return this.loadingLabel || this.translate('DatePicker.loading')
    },
    firstDayOfCurrentMonth () {
      return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
    },
    currentMonth () {
      const month = this.currentDate.toLocaleString(this.locale, { month: 'long' }).toLowerCase()

      return month.substring(0, 1).toUpperCase() + month.substring(1)
    },
    currentYear () {
      return this.currentDate.toLocaleString(this.locale, { year: 'numeric' })
    },
    weekDays () {
      const date = new Date(2020, 10, 29 - this.weekStart)

      return Array.from(Array(7).keys()).map(() => {
        const day = date.toLocaleString(this.locale, { weekday: 'long' }).substring(0, 3).toLowerCase()

        date.setDate(date.getDate() + 1)

        return day.substring(0, 1).toUpperCase() + day.substring(1)
      })
    },
    days () {
      const currentDate = new Date(this.firstDayOfCurrentMonth)
      const daysMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate()
      const firstDayWeekOfMonthIndex = this.firstDayOfCurrentMonth.getDay()
      const decIndex = (firstDayWeekOfMonthIndex < this.weekStart) ? 7 - (this.weekStart - firstDayWeekOfMonthIndex) : firstDayWeekOfMonthIndex - this.weekStart
      const days = Array.from(Array(daysMonth + decIndex > 35 ? 42 : 35))

      // we set a index 0
      currentDate.setDate(currentDate.getDate() - (decIndex + 1))

      const currentValue = this.localValue ? new Date(this.localValue.getFullYear(), this.localValue.getMonth(), this.localValue.getDate()) : false

      return days.map((day) => {
        const date = new Date(currentDate.setDate(currentDate.getDate() + 1))

        return {
          date,
          today: date.getTime() === this.today.getTime(),
          selected: currentValue && date.getTime() === currentValue.getTime(),
          disabled: this.isDateDisabled(date, this.disabledDates),
          current: date.getMonth() === this.currentDate.getMonth()// Is current month
        }
      })
    }
  },
  watch: {
    value: 'onValueChanged'
  },
  methods: {
    onValueChanged (newValue) {
      this.localValue = newValue
    },
    // Return begining of day of specific date
    getBeginingOfDay (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    },
    isDateDisabled (date, disabledDates) {
      let i = 0
      let disabled = false

      while (i < disabledDates.length && !disabled) {
        // Compare as date string
        if (typeof disabledDates[i] === 'string') disabled = date.getTime() === this.getBeginingOfDay(new Date(disabledDates[i])).getTime()
        else if (typeof disabledDates[i] === 'function') disabled = disabledDates[i](date)
        else disabled = date.getTime() === this.getBeginingOfDay(disabledDates[i]).getTime()

        i++
      }

      return disabled
    },
    prevMonth () {
      const month = this.currentDate.getMonth()

      this.currentDate = new Date(this.currentDate.setMonth(month - 1))
      if (this.currentDate.getMonth() !== month - 1 && (this.currentDate.getMonth() !== 11 || (month === 11 && this.currentDate.getDate() === 1))) this.currentDate = new Date(this.currentDate.setDate(0))

      this.$emit('prev-month')
    },
    nextMonth () {
      const month = this.currentDate.getMonth()

      this.currentDate = new Date(this.currentDate.setMonth(month + 1))
      if (this.currentDate.getMonth() !== month + 1 && this.currentDate.getMonth() !== 0) this.currentDate = new Date(this.currentDate.setDate(0))

      this.$emit('next-month')
    },
    selectDate (date) {
      this.localValue = date

      this.$emit('input', this.localValue)
    }
  }
}
</script>
