import defu from 'defu'
import config from '~/dewib/config.js'

const Input = {
  fixed: 'form-input transition duration-150 border ease-in-out disabled:cursor-not-allowed',
  variants: {
    default: 'border-gray-400 disabled:bg-gray-100',
    warning: '',
    danger: ''
  }
}

export default function () {
  const _config = defu({}, config.ui, {
    Input: {
      ...Input,
      variant: (props) => {
        return Input.variants[props.variant]
      },
      size: (props) => {
        return ({
          xs: 'px-2.5 py-1.5 text-xs leading-4',
          sm: 'px-3 py-2 text-sm leading-4',
          md: 'px-4 py-2 text-sm leading-5',
          lg: 'px-4 py-2 text-base leading-6',
          xl: 'px-6 py-3 text-base leading-6'
        })[props.size]
      },
      validation: (props) => {
        if (!props.validation) return ''

        return ({
          error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
        })[props.validation.type]
      }
    },
    InputGroup: {
      fixed: '',
      classes: (props) => {
        if (props.inline) return 'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200'

        return ''
      },
      inline: {
        label: 'sm:mt-px sm:pt-2'
      },
      wrapper: {
        classes: (props) => {
          const classes = []

          if (props.label && !props.inline) classes.push('mt-2')
          if (props.label && props.inline) classes.push('mt-2 sm:mt-0')
          if (props.inline && props.inlineBlock) classes.push('sm:col-span-2')

          return classes.join(' ')
        },
        help: {
          fixed: 'ml-1 mt-2 text-gray-500',
          size: (props) => {
            return ({
              xs: 'text-xs',
              sm: 'text-sm',
              md: 'text-sm',
              lg: 'text-base',
              xl: 'text-base'
            })[props.size]
          }
        },
        validation: (props) => {
          if (!props.validation) return ''

          const size = ({
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]

          const classes = ({
            error: 'text-red-900'
          })[props.validation.type]

          return `${size} ${classes}`
        }
      },
      label: {
        wrapper: 'flex content-center justify-between',
        fixed: 'block text-sm font-light leading-5 text-black',
        classes: (props) => {
          if (props.inline) return 'sm:mt-px sm:pt-2'

          return ''
        },
        size: (props) => {
          return ({
            xs: 'text-sm',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]
        },
        star: 'text-red-400'
      }
    }
  })

  // TODO: To remove if parent component need custom style
  // Apply children config to parent
  // ['InputText'].forEach((parent) => {
  //   if (!_config[parent]) _config[parent] = _config.Input
  // })

  return _config
}
