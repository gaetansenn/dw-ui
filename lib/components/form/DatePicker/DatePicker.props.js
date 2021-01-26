export default {
  value: {
    type: [String, Date],
    default: undefined
  },
  /** Current locale */
  locale: {
    type: String,
    default: 'default'
  },
  /** First day of the week displayed in the calendar */
  weekStart: {
    type: Number,
    default: 0
  },
  /**
   * Disabled dates
   * Accept array values as String, Date, Function
   * ['2012-12-23', new Date(), function (date) { date.getMonth() === 2 }]
   * */
  disabledDates: {
    type: Array,
    default () {
      return []
    }
  }
}
