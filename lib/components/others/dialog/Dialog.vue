<template>
  <DwModal
    v-model="opened"
    root-path="Dialog"
    :close-button="false"
    :title="title"
    @close="onCancel"
  >
    <div v-html="body" />
    <template slot="footer">
      <DwButton
        :focus="opened"
        :loading="ongoing"
        :disabled="ongoing"
        :class="config.button.submit.fixed"
        :variant="config.button.submit.variant"
        block
        @click.native="validate"
      >
        {{ submit }}
      </DwButton>
      <DwButton :variant="config.button.cancel.variant" :disabled="ongoing" :class="config.button.cancel.fixed" block @click.native="onCancel">
        {{ cancel }}
      </DwButton>
    </template>
  </DwModal>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'Dialog',
  mixins: [config],
  data () {
    return {
      opened: false,
      // Submit button loading
      ongoing: false,
      title: '',
      body: '',
      cancel: 'cancel', // this._i18n.t('commons.actions.cancel'),
      submit: 'submit', // this._i18n.t('commons.actions.submit'),
      onClose: null,
      onSubmit: null
    }
  },
  methods: {
    changeOngoing (value) {
      this.ongoing = value
    },
    close () {
      this.opened = false
    },
    onCancel () {
      if (!this.opened) return

      if (typeof this.onClose === 'function') this.onClose()
      else this.opened = false
    },
    validate () {
      if (!this.opened) return

      this.opened = false
      if (typeof this.onSubmit === 'function') this.onSubmit()
    }
  }
}
</script>
