import defu from 'defu'
import config from '~/dewib/config.js'

export default function () {
  const _config = defu({}, config.ui, {
    CollapseTransition: {
      beforeEnter: 'transition-all ease-in-out duration-200',
      afterEnter: 'transition-all ease-in-out duration-200',
      leave: 'transition-all ease-in-out duration-200',
      afterLeave: 'transition-all ease-in-out duration-200'
    },
    CollapseItem: {
      fixed: 'flex justify-between items-center outline-none select-none border-b border-gray-200 py-3',
      header: {
        title: 'text-lg font-semibold',
        icon: {
          fixed: 'transition transform duration-500 ease-in-out h-5 w-5 ml-2',
          icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>',
          classes: (context) => {
            return context.isActive ? 'rotate-180' : ''
          }
        }
      },
      body: {
        wrapper: 'py-3'
      }
    },
    Button: {
      fixed: 'transition ease-in-out duration-150 inline-flex items-center justify-center',
      wrapper: (context) => {
        return context.block ? 'block w-full' : 'inline-flex'
      },
      size: (props) => {
        return ({
          xs: 'px-2 py-2 text-xs leading-4',
          sm: 'px-3 py-2 text-sm leading-4',
          md: 'px-4 py-2 text-sm leading-5',
          lg: 'px-4 py-2 text-base leading-6',
          xl: 'px-6 py-3 text-base leading-6'
        })[props.size]
      },
      rounded: (props) => {
        return ({
          xs: 'rounded-sm',
          sm: 'rounded',
          md: 'rounded-md',
          lg: 'rounded-lg',
          xl: 'rounded-xl',
          full: 'rounded-full'
        })[props.rounded]
      },
      variants: {
        default: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 border border-transparent',
        select: ''
      },
      variant: (context) => {
        return context.$dewib.ui.config.Button.variants[context.variant]
      }
    },
    Container: {
      fixed: 'container mx-auto px-4 sm:px-6 lg:px-8'
    },
    RichSelect: {
      wrapper: 'relative',
      placeholder: 'Select an option',
      button: {
        fixed: 'form-select inline-flex w-full',
        size: (props) => {
          return ({
            xs: 'pl-3 pr-8 text-xs leading-3',
            sm: 'pl-3 pr-8 text-sm leading-4',
            md: 'pl-3 pr-10 text-base leading-5',
            lg: 'pl-4 pr-10 text-lg leading-6',
            xl: 'pl-4 pr-10 text-xl leading-6'
          })[props.size]
        }
      },
      option: {
        fixed: 'cursor-pointer py-2 hover:bg-gray-200',
        selected: 'font-semibold bg-gray-100',
        size: (props) => {
          return ({
            xs: 'px-3 text-xs',
            sm: 'px-3 text-sm',
            md: 'px-3 text-base',
            lg: 'px-4 text-lg',
            xl: 'px-4 text-xl'
          })[props.size]
        }
      }
    },
    Select: {
      fixed: 'form-select',
      variants: {
        default: ''
      },
      placeholder: 'Select an option', // Can use i18n by using method
      variant: (context) => {
        return context.$dewib.ui.config.Select.variants[context.variant]
      },
      size: (props) => {
        return ({
          xs: 'pl-3 pr-8 text-xs leading-3',
          sm: 'pl-3 pr-8 text-sm leading-4',
          md: 'pl-3 pr-10 text-base leading-5',
          lg: 'pl-4 pr-10 text-lg leading-6',
          xl: 'pl-4 pr-10 text-xl leading-6'
        })[props.size]
      }
    },
    Input: {
      fixed: 'form-input transition duration-150 border ease-in-out disabled:cursor-not-allowed',
      variants: {
        default: 'border-gray-400 disabled:bg-gray-100',
        warning: '',
        danger: ''
      },
      variant: (context) => {
        return context.$dewib.config.Input.variants[context.variant]
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
