import defu from 'defu'
import config from '~/dewib/config.js'

export default function () {
  const Input = {
    fixed: 'form-input transition duration-150 border ease-in-out disabled:cursor-not-allowed w-full',
    variants: {
      default: 'border-gray-400 disabled:bg-gray-100',
      warning: '',
      danger: ''
    },
    variant: (context) => {
      return context.config.Input.variants[context.variant]
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
    },
    icon: {
      classes: (context) => {
        return [
          ({
            true: 'pl-10'
          })[context.isLeading],
          ({
            true: 'pr-10'
          })[context.isTrailing]
        ].join(' ')
      },
      size: (props) => {
        return ({
          xs: 'h-2 w-2',
          sm: 'h-4 w-4',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-5 w-5'
        })[props.size]
      }
    },
    trailing: 'absolute inset-y-0 right-0 flex items-center'
  }

  const defaultConfig = {
    Input,
    InputGroupRadio: {
      fixed: 'flex space-x-4'
    },
    InputGroupCheckbox: {
      fixed: 'flex space-x-4'
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
    },
    InputRadio: {
      fixed: 'inline-flex',
      label: {
        fixed: 'pl-2',
        size: (props) => {
          return ({
            xs: 'text-sm',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]
        }
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
      Input: {
        fixed: 'form-radio',
        size: (props) => {
          return ({
            xs: 'text-xs leading-4',
            sm: 'text-sm leading-4',
            md: 'text-sm leading-5',
            lg: 'text-base leading-6',
            xl: 'text-base leading-6'
          })[props.size]
        }
      }
    },
    InputCheckbox: {
      fixed: 'inline-flex',
      label: {
        fixed: 'pl-2',
        size: (props) => {
          return ({
            xs: 'text-sm',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]
        }
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
      Input: {
        fixed: 'form-checkbox',
        size: (props) => {
          return ({
            xs: 'text-xs leading-4',
            sm: 'text-sm leading-4',
            md: 'text-sm leading-5',
            lg: 'text-base leading-6',
            xl: 'text-base leading-6'
          })[props.size]
        }
      }
    },
    InputPassword: {
      icon: {
        fixed: 'text-gray-700',
        show: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>',
        hide: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>'
      },
      validate: false // Override regex password validation
    },
    Card: {
      fixed: 'transition-shadow ease-in-out duration-75 rounded shadow-md bg-white border border-c04 p-5 hover:shadow-lg'
    },
    TruncateText: {
      fixed: 'text-center',
      action: 'underline mt-2 text-center',
      seeLess: 'See less',
      seeMore: 'See more'
    },
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
      fixed: 'transition ease-in-out duration-150 inline-flex items-center justify-center border w-full',
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
        default: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 border-bg-blue-600',
        select: ''
      },
      variant: (context) => {
        return context.config.variants[context.variant]
      }
    },
    Container: {
      fixed: 'container mx-auto px-4 sm:px-6 lg:px-8'
    },
    Breadcrumb: {
      fixed: 'inline-flex flex-wrap text-sm',
      item: {
        class: 'text-gray-500',
        active: 'text-gray-800 font-semibold',
        separator: 'px-1'
      },
      separator: '>'
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
      options: 'absolute z-50 bg-white shadow mt-1 rounded text-sm overflow-y-auto',
      option: {
        fixed: 'cursor-pointer py-2 hover:bg-gray-200 flex w-full',
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
    i18n: {
      en: {
        InputPassword: {
          confirm: 'The password confirmation is not the same',
          valid: 'Please provide a valid password'
        },
        InputDate: {
          valid: 'Please provide a valid date'
        },
        Input: {
          required: 'This field is required'
        },
        InputEmail: {
          confirm: 'The email confirmation is not the same',
          valid: 'Please provide a valid email address'
        }
      },
      fr: {
        InputPassword: {
          confirm: 'Les mots de passes doivent être identiques',
          valid: 'Veuillez entrer un mot de passe valide'
        },
        InputDate: {
          valid: 'Veuillez entrer une date valide'
        },
        Input: {
          required: 'Ce champ est requis'
        },
        InputEmail: {
          confirm: 'Les adresses emails doivent être identiques',
          valid: 'Veuillez entrer une adresse mail valide'
        }
      }
    }
  };

  // Inject default Input config if exist
  ['InputText', 'InputEmail', 'InputPassword', 'InputRadio'].forEach((type) => {
    if (!config.ui[type])
      config.ui[type] = {
        Input: defu({}, defaultConfig[type]?.Input || {}, config.ui.Input, Input)
      }
    else if (!config.ui[type].Input)
      config.ui[type].Input = defu({}, defaultConfig[type]?.Input || {}, config.ui.Input, Input)
    else if (config.ui[type].Input)
      config.ui[type].Input = defu({}, defaultConfig[type]?.Input || {}, config.ui[type].Input, config.ui.Input, Input)
  })

  const _config = defu({}, config.ui, defaultConfig)

  return _config
}
