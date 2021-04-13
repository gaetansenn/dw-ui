<template>
  <DwModal
    v-model="opened"
    root-path="Dialog"
    :close-button="false"
    :title="title"
    :prevent-close="!cancel"
    @close="onCancel"
  >
    <div v-html="body" />
    <template slot="footer">
      <DwButton
        v-if="submit"
        :focus="opened"
        :loading="ongoing.submit"
        :disabled="ongoing.cancel || ongoing.submit"
        :class="config.button.submit.fixed"
        :variant="config.button.submit.variant"
        block
        @click.native="validate"
      >
        {{ submit }}
      </DwButton>
      <DwButton
        v-if="cancel"
        :variant="config.button.cancel.variant"
        :disabled="ongoing.cancel || ongoing.submit"
        :class="config.button.cancel.fixed"
        block
        :loading="ongoing.cancel"
        @click.native="onCancel"
      >
        {{ cancel }}
      </DwButton>
    </template>
  </DwModal>
</template>

<script>
import config from '../../config.mixin'
import i18n from '../../utils/i18n'

export default {
  configPath: 'Dialog',
  mixins: [i18n, config],
  data () {
    return {
      opened: false,
      ongoing: {
        submit: false,
        cancel: false
      },
      title: '',
      body: '',
      cancel: this.translate('Dialog.cancel'),
      submit: this.translate('Dialog.submit'),
      onClose: null,
      onSubmit: null
    }
  },
  methods: {
    changeOngoing (value, scope = 'submit') {
      this.ongoing[scope] = value
    },
    close () {
      this.opened = false
    },
    async onCancel () {
      if (!this.opened) return

      if (typeof this.onClose === 'function') {
        this.ongoing.cancel = true
        await this.onClose(this)
        this.ongoing.cancel = false
        this.opened = false
      } else this.opened = false
    },
    async validate () {
      if (!this.opened) return

      if (typeof this.onSubmit === 'function') {
        this.ongoing.submit = true
        await this.onSubmit(this)
        this.ongoing.submit = false
        this.opened = false
      } else this.opened = false
    }
  }
}
</script>
