import defu from 'defu'

import { set, get } from '~dewib/dw-ui/components/utils/object'
import config from '~/dewib/config.js'

function mergeClasses (parentConfig, parentPath, childPath, defaultConfig, config) {
  if (!config[parentPath]) {
    config[parentPath] = {}
    set(config[parentPath], childPath, defu({}, get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
  } else if (!get(config[parentPath], childPath)) set(config[parentPath], childPath, defu({}, get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
  else if (get(config[parentPath], childPath)) set(config[parentPath], childPath, defu({}, get(config[parentPath], childPath, {}), get(defaultConfig[parentPath], childPath, {}), config[childPath], parentConfig))
}

export default function () {
  const rounded = (context) => {
    return ({
      xs: 'rounded-sm',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    })[context.rounded]
  }

  const Input = {
    wrapper: 'relative',
    fixed: 'form-input transition duration-150 border ease-in-out disabled:cursor-not-allowed w-full placeholder-gray-500',
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
        error: 'border-red-600 text-red-600 placeholder-red-500 focus:border-red-600 focus:shadow-outline-red'
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
    },
    rounded,
    help: {
      icon: '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>'
    }
  }

  const Card = {
    fixed: 'transition-shadow ease-in-out duration-75 rounded shadow-md bg-white border border-gray-100 hover:shadow-lg',
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
    },
    Collapse: {
      beforeEnter: 'transition-all ease-in-out duration-200',
      afterEnter: 'transition-all ease-in-out duration-200',
      leave: 'transition-all ease-in-out duration-200',
      afterLeave: 'transition-all ease-in-out duration-200'
    }
  }

  const Modal = {
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
      fixed: 'sm:rounded shadow-md bg-white border border-gray-200 inline-flex flex-col',
      header: {
        fixed: 'mx-5 mt-5 relative'
      }
    },
    modal: {
      wrapper: 'transform transition-all overflow-hidden sm:w-full sm:max-w-lg flex justify-center',
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
      },
      // Config for default slot injected with title props
      header: {
        fixed: 'font-semibold text-2xl sm:text-3xl leading-none text-left mr-8',
        icon: {
          fixed: 'absolute h-6 w-6 flex-shrink-0 text-black hover:text-gray-700 cursor-pointer right-0 top-0 mt-1',
          icon: '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>'
        }
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
          fixed: 'text-left ml-1 mt-2 text-gray-600',
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
        validation: {
          fixed: 'text-left ml-1 mt-2',
          classes: (props) => {
            if (!props.validation) return ''

            const size = ({
              xs: 'text-xs',
              sm: 'text-sm',
              md: 'text-sm',
              lg: 'text-base',
              xl: 'text-base'
            })[props.size]

            const classes = ({
              error: 'text-red-500'
            })[props.validation.type]

            return `${size} ${classes}`
          }
        }
      },
      label: {
        wrapper: 'flex content-center justify-between',
        fixed: 'block leading-5 text-gray-800',
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
          fixed: 'inline-flex -mr-2',
          button: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100',
          icon: {
            fixed: 'w-4 h-4',
            left: '<svg class="w-full h-full" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.54282 0.542969L8.95703 1.95718L3.16414 7.75008L8.95703 13.543L7.54282 14.9572L0.335711 7.75008L7.54282 0.542969Z" fill="currentColor" /></svg>',
            right: '<svg class="w-full h-full" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.45718 14.957L0.0429687 13.5428L5.83586 7.74992L0.0429682 1.95703L1.45718 0.542818L8.66429 7.74992L1.45718 14.957Z" fill="currentcolor" /></svg>'
          }
        }
      }
    },
    Modal,
    InputDatePicker: {
      DatePicker: {
        fixed: 'absolute w-64 bg-white shadow-lg border border-gray-100 mt-2 p-2 z-10'
      },
      icon: {
        icon: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>'
      }
    },
    InputRadio: {
      fixed: 'inline-flex items-start',
      label: {
        fixed: 'pl-2',
        star: 'text-red-500',
        size: (props) => {
          return ({
            xs: 'text-sm',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]
        },
        validation: (props) => {
          if (!props.localValidation) return ''

          return ({
            error: 'text-red-600'
          })[props.localValidation.type]
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
        wrapper: 'relative leading-5',
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
      fixed: 'inline-flex items-start',
      label: {
        fixed: 'pl-2',
        star: 'text-red-500',
        size: (props) => {
          return ({
            xs: 'text-sm',
            sm: 'text-sm',
            md: 'text-sm',
            lg: 'text-base',
            xl: 'text-base'
          })[props.size]
        },
        validation: (props) => {
          if (!props.localValidation) return ''

          return ({
            error: 'text-red-600'
          })[props.localValidation.type]
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
        wrapper: 'relative leading-5',
        fixed: 'form-checkbox',
        variants: {
          default: 'border-gray-400 disabled:bg-gray-400',
          warning: '',
          danger: ''
        },
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
        show: '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>',
        hide: '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"></path><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path></svg>'
      },
      validate: false // Override regex password validation
    },
    TruncateText: {
      wrapper: '',
      fixed: 'text-center',
      action: 'underline mt-2 text-center cursor-pointer'
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
      fixed: 'transition ease-in-out duration-150 items-center justify-center border disabled:cursor-not-allowed focus:outline-none focus:shadow-outline',
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
      rounded,
      variants: {
        default: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 border-bg-blue-600'
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
      wrapper: 'inline-flex flex-wrap text-sm',
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
        wrapper: 'flex items-center',
        label: 'text-sm ml-2',
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
        fixed: 'py-2 flex w-full',
        selected: 'font-semibold bg-gray-100',
        disabled: 'cursor-not-allowed bg-white text-gray-300',
        active: 'cursor-pointer hover:bg-gray-200',
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
      wrapper: 'relative',
      fixed: 'border appearance-none focus:outline-none focus:shadow-outline w-full disabled:text-gray-500',
      variants: {
        default: ''
      },
      placeholder: 'Select an option', // Can use i18n by using method
      variant: (context) => {
        return context.$dewib.ui.config.Select.variants[context.variant]
      },
      size: (props) => {
        return ({
          xs: 'py-2 pl-3 pr-8 text-xs leading-4',
          sm: 'py-2 pl-3 pr-8 text-sm leading-4',
          md: 'py-2 pl-3 pr-8 text-base leading-5',
          lg: 'py-2 pl-4 pr-10 text-lg leading-6',
          xl: 'py-3 pl-4 pr-10 text-xl leading-6'
        })[props.size]
      },
      rounded,
      icon: {
        fixed: 'pointer-events-none absolute inset-y-0 right-0 flex items-center',
        icon: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>',
        size (context) {
          return ({
            xs: 'px-1',
            sm: 'px-2',
            md: 'px-2',
            lg: 'px-3',
            xl: 'px-3'
          })[context.size]
        },
        classes (context) {
          if (context.disabled) return 'text-gray-500'
        }
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
          valid: 'Your password must be 8 characters long and include at least one number, one letter and one special character.'
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
        },
        Dialog: {
          submit: 'Submit',
          cancel: 'Cancel'
        },
        TruncateText: {
          seeMore: 'See more',
          seeLess: 'See less'
        },
        Modal: {
          modal: {
            header: {
              icon: {
                ariaLabel: 'Close'
              }
            }
          }
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
          valid: 'Votre mot de passe doit comporter 8 caractères et inclure au moins un chiffre, une lettre et un caractère special.'
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
        },
        Dialog: {
          submit: 'Valider',
          cancel: 'Annuler'
        },
        TruncateText: {
          seeMore: 'Voir plus',
          seeLess: 'Voir moins'
        },
        Modal: {
          modal: {
            header: {
              icon: {
                ariaLabel: 'Fermer'
              }
            }
          }
        }
      }
    },
    Dialog: {
      // Set as false if you don't need this plugin
      plugin: 'others/dialog',
      wrapper: 'text-center sm:mt-0 sm:ml-4 sm:text-left',
      Modal: {
        Card: {
          content: {
            fixed: 'p-5 text-sm text-gray-600'
          },
          footer: {
            fixed: 'p-5 pt-0 sm:flex sm:flex-row-reverse'
          }
        }
      },
      button: {
        submit: {
          fixed: 'sm:ml-3 sm:w-auto',
          variant: false
        },
        cancel: {
          fixed: 'mt-3 sm:mt-0 sm:w-auto',
          variant: 'white'
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
        fixed: 'ml-3 w-0 flex-1',
        title: 'leading-5 font-semibold text-black font-zilla text-lg',
        description (content) {
          const classes = 'text-sm leading-5 text-black'

          return content.title ? `mt-1 ${classes}` : classes
        }
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
    ItemQuantity: {
      wrapper: 'inline-flex font-zilla leading-none items-center select-none p-2 border border-gray-300 rounded-full',
      fixed: 'px-3 font-bold min-w-12 text-center',
      remove: {
        fixed: 'border border-black rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:shadow-outline h-6 w-6',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>'
      },
      add: {
        fixed: 'border border-black rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:shadow-outline h-6 w-6',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>'
      }
    },
    Steps: {
      fixed: 'inline-flex w-full justify-between relative'
    },
    Step: {
      fixed: 'inline-flex flex-col items-center w-full',
      classes (context) {
        if (context.disabled) return 'cursor-not-allowed'
        if (context.clickEvent || context.is === 'nuxt-link') return 'cursor-pointer'
      },
      number: {
        wrapper: 'flex items-center',
        fixed: 'border-6 rounded-full p-4 relative inline-flex self-center bg-white z-10',
        classes (context) {
          return context.steps.value > context.index ? 'border-gray-600 text-gray-600' : 'border-gray-400 text-gray-400'
        },
        content: 'absolute inset-0 flex items-center justify-center font-semibold'
      },
      line: {
        fixed: 'absolute h-3/2',
        style (context) {
          return `width: calc(100% / ${context.size})`
        },
        classes (context) {
          return `${context.steps.value - 1 > context.index ? 'bg-gray-600' : 'bg-gray-400'}`
        }
      },
      title: {
        fixed: 'flex items-center text-sm mt-1',
        classes: ''
      },
      description: {
        fixed: 'flex items-center text-xs',
        classes: ''
      }
    },
    TabsNav: {
      fixed: 'grid relative mb-5',
      classes: '',
      style (context) {
        return `grid-template-columns: repeat(${context.tabs.length}, minmax(0, 1fr))`
      }
    },
    TabsNavItem: {
      fixed: 'col-span-1 pb-2 text-center relative',
      wrapper: {
        fixed: 'cursor-pointer font-zilla text-xl',
        classes (context) {
          if (context.active) return 'font-semibold'
        }
      },
      border: {
        fixed: 'absolute border-b-2 inset-x-0 transition-all duration-500 ease-in-out z-10 bottom-0',
        classes (context) {
          return context.active ? 'border-black' : 'border-gray-400'
        }
      }
    },
    Toggle: {
      wrapper: {
        fixed: 'relative rounded-full w-16 h-8 block cursor-pointer focus:outline-none focus:shadow-outline transition-colors ease-in duration-100',
        classes (context) {
          return context.checked ? 'bg-blue-500' : 'bg-gray-200'
        }
      },
      input: 'hidden',
      toggle: {
        wrapper: 'absolute w-full h-full px-2 py-1',
        fixed: 'bg-white w-1/2 h-full rounded-full transform transition-transform ease-in duration-100 translate-x-0 shadow',
        classes (context) {
          if (context.checked) return 'translate-x-full'
        }
      }
    },
    ScrollWrapper: {
      wrapper: 'relative',
      navigation: {
        prev: {
          wrapper: 'absolute inset-y-0 flex items-center justify-center cursor-pointer',
          fixed: 'relative w-6 h-6 bg-white shadow-lg hover:shadow-xl rounded-full p-1',
          icon: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>'
        },
        next: {
          wrapper: 'absolute inset-y-0 flex items-center justify-center cursor-pointer right-0',
          fixed: 'relative w-6 h-6 bg-white shadow-lg hover:shadow-xl rounded-full p-1',
          icon: '<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>'
        }
      },
      fixed: 'inline-flex w-full space-x-5 overflow-x-scroll dw-no-scrollbar'
    },
    Tag: {
      fixed: '',
      variants: {
        default: 'bg-black text-white'
      },
      variant: (context) => {
        return context.config.variants[context.variant]
      },
      rounded,
      size: (props) => {
        return ({
          xs: 'px-2 py-2 text-xs leading-4',
          sm: 'px-3 py-2 text-sm leading-4',
          md: 'px-4 py-2 text-sm leading-5',
          lg: 'px-4 py-2 text-base leading-6',
          xl: 'px-6 py-3 text-base leading-6'
        })[props.size]
      }
    },
    Tooltip: {
      wrapper: 'relative',
      content: {
        overlay: 'z-10 absolute',
        wrapper: 'relative',
        body: 'p-2 bg-white text-black rounded text-xs shadow min-w-32',
        arrow: {
          fixed: 'absolute transform rotate-45 bg-white z-10',
          shadow: 'absolute transform rotate-45 bg-white -z-1 shadow',
          // Arrow size in px
          size: 10
        }
      }
    },
    Rate: {
      wrapper: 'inline-flex',
      fixed: 'mr-1 text-orange-600',
      classes (context) {
        if (!context.readonly) return 'cursor-pointer'
      },
      icon: {
        full: '<svg class="w-full h-full" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>',
        half: '<svg class="w-full h-full" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 536 512" ><path fill="currentColor" d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z" class=""></path></svg>',
        empty: '<svg class="w-full h-full" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" class=""></path></svg>'
      },
      size: (props) => {
        return ({
          xs: 'h-2 w-2',
          sm: 'h-3 w-3',
          md: 'h-4 w-4',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6'
        })[props.size]
      }
    },
    build: {}
  }

  const newConfig = Object.assign({}, config.ui);

  ['InputText', 'InputEmail', 'InputPassword', 'InputRadio', 'InputDate', 'InputDatePicker', 'InputCheckbox'].forEach(parentPath => mergeClasses(Input, parentPath, 'Input', defaultConfig, newConfig))
  mergeClasses(Card, 'Modal', 'Card', defaultConfig, newConfig)
  mergeClasses(Modal, 'Dialog', 'Modal', defaultConfig, newConfig)

  const _config = defu({}, newConfig, defaultConfig)

  return _config
}
