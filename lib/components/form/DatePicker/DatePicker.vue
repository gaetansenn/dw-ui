<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="inline-flex font-semibold">
        <div>{{ currentMonth }}</div>
        <div class="ml-1">
          {{ currentYear }}
        </div>
      </div>
      <div class="inline-flex">
        <button class="transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100" @click="prevMonth">
          <svg
            width="9"
            class="h-4 w-4 inline-flex"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><path fill-rule="evenodd" clip-rule="evenodd" d="M7.54282 0.542969L8.95703 1.95718L3.16414 7.75008L8.95703 13.543L7.54282 14.9572L0.335711 7.75008L7.54282 0.542969Z" fill="currentColor" /></svg>
        </button>
        <button class="transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100" @click="nextMonth">
          <svg
            width="9"
            height="15"
            class="h-4 w-4 inline-flex"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><path fill-rule="evenodd" clip-rule="evenodd" d="M1.45718 14.957L0.0429687 13.5428L5.83586 7.74992L0.0429682 1.95703L1.45718 0.542818L8.66429 7.74992L1.45718 14.957Z" fill="currentcolor" /></svg>
        </button>
      </div>
    </div>
    <div>
      <div class="grid grid-cols-7">
        <div v-for="day in weekDays" :key="day" style="padding-bottom: 100%" class="relative">
          <div class="absolute w-full h-full flex items-center justify-center text-sm">
            {{ day }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-7">
        <button
          v-for="(day, index) in days"
          :key="index"
          :disabled="day.disabled"
          style="padding-bottom: 100%"
          class="border border-gray-100 flex flex-shrink-0 relative disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-200"
          :class="{ 'text-gray-400': !day.current && !day.selected, 'text-white bg-gray-800 hover:bg-gray-800': day.selected, 'text-blue-500': day.today && !day.selected && day.current }"
          @click="selectDate(day.date)"
        >
          <div class="absolute w-full h-full flex items-center justify-center">
            {{ day.date.getDate() }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../../utils/i18n'
import CommonsProps from '../../commons.props'
import SizeProps from '../../size.props'
import InputProps from '../Input.props'
import InputGroupProps from '../InputGroup.props'
import FormProps from '../Form.props'
import DatePickerProps from './DatePicker.props'

export default {
  mixins: [i18n],
  props: {
    ...DatePickerProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  },
  data () {
    const localeValue = this.value ? new Date(this.value) : new Date()

    return {
      localeValue,
      today: this.getBeginingOfDay(new Date()),
      currentDate: this.getBeginingOfDay(localeValue)
    }
  },
  computed: {
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

      return days.map((day) => {
        const date = new Date(currentDate.setDate(currentDate.getDate() + 1))

        return {
          date,
          today: date.getTime() === this.today.getTime(),
          selected: this.localeValue && date.getTime() === this.localeValue.getTime(),
          disabled: this.isDateDisabled(date, this.disabledDates),
          current: date.getMonth() === this.currentDate.getMonth()// Is current month
        }
      })
    }
  },
  methods: {
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
    },
    nextMonth () {
      const month = this.currentDate.getMonth()

      this.currentDate = new Date(this.currentDate.setMonth(month + 1))
      if (this.currentDate.getMonth() !== month + 1 && this.currentDate.getMonth() !== 0) this.currentDate = new Date(this.currentDate.setDate(0))
    },
    selectDate (date) {
      this.localeValue = date

      this.$emit('input', this.localeValue)
    }
  }
}
</script>
