<template>
  <div>
    <div class="row">
      <div class="col">
        <h2>Add New Entry</h2>
      </div>
    </div>
    <div class="row  mt-1">
      <div class="col-sm">
        <div class="form-group">
          <input
            type="text"
            :class="{
              'form-control': true,
              'border-danger': !domainValid,
            }"
            placeholder="dev"
            v-model="form.domain"
          />
          <small class="form-text text-muted">Must contain only alphanumeric or dot characters.</small>
        </div>
      </div>
      <div class="col-sm">
        <div class="d-flex  align-items-center">
          <input
            type="text"
            :class="{
              'form-control': true,
              'border-danger': !colorValid,
            }"
            placeholder="dev"
            v-model="form.color"
          />
          <div :style="getPreviewStyle(form.color)"></div>
        </div>
        <small class="form-text text-muted">Hex value only. Must be prefixed with a <code>#</code>.</small>
      </div>
    </div>
    <div class="row  mt-1">
      <div class="col">
        <button
          type="button"
          class="btn  btn-primary"
          :disabled="disabled"
          @click="onSubmit"
        >Add New Entry</button>
      </div>
    </div>
  </div>
</template>

<script>
let blueprint = {
    domain: '',
    color: '#e64a27',
};

export default {
    name: 'OptionsForm',
    props: {
        addEntry: {
            required: true,
            type: Function,
        },
    },
    data() {
        return {
            form: Object.assign({}, blueprint),
            alphaNumericRegex: /^[a-z0-9.]+$/i,
            hexColorRegex: /^#[a-z0-9]{6}$/i,
        };
    },
    computed: {
        domainValid() {
            return (
                this.form.domain.length &&
                this.alphaNumericRegex.test(this.form.domain)
            );
        },
        colorValid() {
            return (
                this.form.color.length &&
                this.hexColorRegex.test(this.form.color)
            );
        },
        disabled() {
            return [this.domainValid, this.colorValid].some((v) => !v);
        },
    },
    methods: {
        getPreviewStyle(color) {
            return {
                backgroundColor: color,
                height: '1em',
                fontSize: '25px',
                width: '1em',
                marginLeft: '15px',
            };
        },
        onSubmit() {
            let entry = Object.assign({}, this.blueprint, {
                domain: this.form.domain,
                color: this.form.color,
            });

            this.addEntry(entry);

            this.form = Object.create(blueprint);
        },
    },
};
</script>
