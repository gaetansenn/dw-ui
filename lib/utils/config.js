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
      fixed: 'text-gray-700 cursor-pointer',
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
    trailing: {
      fixed: 'absolute inset-y-0 right-0 flex items-center',
      classes: (context) => {
        return context.isLeading ? 'pl-4' : 'pr-4'
      }
    }
  }

  const Card = {
    fixed: 'transition-shadow ease-in-out duration-75 rounded shadow-md bg-white border border-c04 hover:shadow-lg',
    content: {
      fixed: 'p-5',
      classes: ''
    },
    header: {
      fixed: 'p-5 font-semibold',
      classes: (context) => {
        const classes = []

        if ((context.collapse && context.opened) || (!context.collapse && context.header)) classes.push('border-b border-gray-200')

        if (context.collapse || context.arrow) classes.push('flex items-center justify-between cursor-pointer')

        return classes.join(' ')
      },
      icon: {
        fixed: 'transition transform duration-500 ease-in-out h-5 w-5 ml-3',
        icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>',
        classes: (context) => {
          return context.opened ? 'rotate-180' : ''
        }
      }
    },
    footer: {
      fixed: 'p-5',
      classes: ''
    }
  }

  const Transitions = {
    Fade: {
      enter: {
        fixed: 'ease-out duration-300',
        from: 'opacity-0',
        to: 'opacity-100'
      },
      leave: {
        fixed: 'ease-in duration-200',
        from: 'opacity-100',
        to: 'opacity-0'
      }
    }
  }

  const defaultConfig = {
    Input,
    Card,
    Transitions,
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
    DatePicker: {
      days: {
        wrapper: 'grid grid-cols-7',
        button: 'border border-gray-100 flex flex-shrink-0 relative disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-200 pb-full',
        day: 'absolute w-full h-full flex items-center justify-center',
        anotherMonth: 'text-gray-400',
        selected: 'text-white bg-gray-800 hover:bg-gray-800',
        today: 'text-blue-500'
      },
      weekDays: {
        wrapper: 'grid grid-cols-7',
        day: {
          wrapper: 'relative pb-full',
          fixed: 'absolute w-full h-full flex items-center justify-center text-sm'
        }
      },
      header: {
        fixed: 'flex justify-between items-center',
        date: 'inline-flex font-semibold space-x-1',
        navigation: {
          fixed: 'inline-flex',
          button: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100',
          icon: {
            fixed: 'w-4 h-4',
            left: '<svg class="w-full h-full" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.54282 0.542969L8.95703 1.95718L3.16414 7.75008L8.95703 13.543L7.54282 14.9572L0.335711 7.75008L7.54282 0.542969Z" fill="currentColor" /></svg>',
            right: '<svg class="w-full h-full" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.45718 14.957L0.0429687 13.5428L5.83586 7.74992L0.0429682 1.95703L1.45718 0.542818L8.66429 7.74992L1.45718 14.957Z" fill="currentcolor" /></svg>'
          }
        }
      }
    },
    Modal: {
      overlay: {
        // TODO: Handle dynamic injection
        transition: Transitions.Fade,
        fixed: 'fixed inset-0 z-dw-modal overflow-y-auto'
      },
      backdrop: {
        wrapper: 'fixed inset-0 transition-opacity',
        fixed: 'absolute inset-0 bg-black opacity-75'
      },
      wrapper: 'flex items-center justify-center p-4 min-h-screen',
      Card: {
        fixed: 'sm:rounded shadow-md bg-white border border-c04'
      },
      modal: {
        wrapper: 'transform transition-all overflow-hidden sm:w-full sm:max-w-lg',
        transition: {
          enter: {
            fixed: 'ease-out duration-300',
            from: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
            to: 'opacity-100 translate-y-0 sm:scale-100'
          },
          leave: {
            fixed: 'ease-in duration-200',
            from: 'opacity-100 translate-y-0 sm:scale-100',
            to: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          }
        }
      }
    },
    InputDatePicker: {
      DatePicker: {
        fixed: 'absolute w-64 bg-white shadow-lg border border-gray-100 mt-2 p-2'
      },
      icon: {
        icon: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>'
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
    TruncateText: {
      fixed: 'text-center',
      action: 'underline mt-2 text-center cursor-pointer',
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
          icon: '<svg fill="none" viewBox="0 0 24 24" class="w-full h-full" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>',
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
      fixed: 'block transition ease-in-out duration-150 items-center justify-center border disabled:cursor-not-allowed',
      classes: (context) => {
        return (context.block) ? 'flex w-full' : 'inline-flex'
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
      },
      loading: {
        fixed: 'ml-3',
        size: (props) => {
          return ({
            xs: 'h-4 w-4',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-6 w-6'
          })[props.size]
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>'
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
      loading: {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',
        fixed: 'w-5 h-5'
      },
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
      options: 'absolute z-50 bg-white shadow mt-1 rounded text-sm overflow-y-auto min-w-full',
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
        RichSelect: {
          loading: 'Loading'
        },
        InputDatePicker: {
          valid: 'Please provide a valid date'
        },
        InputPassword: {
          confirm: 'The password confirmation is not the same',
          valid: 'Votre mot de passe doit comporter 8 caractères et inclure une majuscule, une minuscule et un chiffre.'
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
        RichSelect: {
          loading: 'Chargement en cours'
        },
        InputDatePicker: {
          valid: 'Veuillez indiquer une date valide'
        },
        InputPassword: {
          confirm: 'Les mots de passes doivent être identiques',
          valid: 'Your password must be 8 characters long and include one upper case, one lower case and one number.'
        },
        InputDate: {
          valid: 'Veuillez indiquer une date valide'
        },
        Input: {
          required: 'Ce champ est requis'
        },
        InputEmail: {
          confirm: 'Les adresses emails doivent être identiques',
          valid: 'Veuillez entrer une adresse mail valide'
        }
      }
    },
    Notification: {
      // Set as false if you don't need this plugin
      // TODO: Check if we can use @nuxtjs/components to automatically detect usage of $nofication
      plugin: 'others/notification',
      wrapper: 'max-w-sm w-full bg-white shadow-lg pointer-events-auto',
      fixed: 'shadow-xs overflow-hidden p-4 flex items-center',
      body: {
        fixed: 'ml-3 w-0 flex-1 pt-1',
        title: 'leading-5 font-semibold text-black font-zilla text-lg',
        description: 'mt-1 text-sm leading-5 text-black'
      },
      type: {
        fixed: 'flex-shrink-0',
        classes (content) {
          switch (content.type) {
            case 'success': return 'text-green-400'
            case 'info': return 'text-orange-400'
            case 'error': return 'text-red-400'
          }
        },
        icon (content) {
          switch (content.type) {
            case 'success': return '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
            case 'info': return '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>'
            case 'error': return '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
          }
        }
      },
      close: {
        fixed: 'ml-4 flex-shrink-0 text-gray-400 hover:outline-none hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150',
        icon: '<svg class="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>'
      }
    },
    NotificationWrapper: {
      fixed: 'fixed z-dw-notification inset-0 flex flex-col items-center justify-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end sm:justify-start',
      transition: {
        enter: {
          fixed: 'transform ease-out duration-500 transition',
          from: 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
          to: 'translate-y-0 opacity-100 sm:translate-x-0'
        },
        leave: {
          fixed: 'transition ease-in duration-100',
          from: 'opacity-100',
          to: 'opacity-0'
        }
      }
    },
    build: {}
  };

  // TODO: Wrap with global dynamic config injection
  // Inject default Input config if exist
  ['InputText', 'InputEmail', 'InputPassword', 'InputRadio', 'InputDate', 'InputDatePicker'].forEach((type) => {
    if (!config.ui[type])
      config.ui[type] = {
        Input: defu({}, defaultConfig[type]?.Input || {}, config.ui.Input, Input)
      }
    else if (!config.ui[type].Input)
      config.ui[type].Input = defu({}, defaultConfig[type]?.Input || {}, config.ui.Input, Input)
    else if (config.ui[type].Input)
      config.ui[type].Input = defu({}, defaultConfig[type]?.Input || {}, config.ui[type].Input, config.ui.Input, Input)
  });

  // Inject default Card config if exist
  ['Modal'].forEach((type) => {
    if (!config.ui[type])
      config.ui[type] = {
        Card: defu({}, defaultConfig[type]?.Card || {}, config.ui.Card, Card)
      }
    else if (!config.ui[type].Card)
      config.ui[type].Card = defu({}, defaultConfig[type]?.Card || {}, config.ui.Card, Card)
    else if (config.ui[type].Card)
      config.ui[type].Card = defu({}, defaultConfig[type]?.Card || {}, config.ui[type].Card, config.ui.Input, Card)
  })

  const _config = defu({}, config.ui, defaultConfig)

  return _config
}
