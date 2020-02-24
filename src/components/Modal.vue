<template>
    <div class="modal fade show" :class="{active : show}" ref="modalSuccess">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button" @click="closeModal">{{ btnTitle }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      title: [String, Number],
      message: String,
      btnTitle: String,
      show: Boolean
    },
    methods: {

      closeModal() {
        this.$emit('closeModal')
      }
    }
  }
</script>
