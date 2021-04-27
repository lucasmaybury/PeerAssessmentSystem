<template>
  <b-form @submit.prevent="confirm()" @reset.prevent="reset()">
    <b-form-group id="name-group" label="Group Name" label-for="name-input">
      <b-form-input
        type="text"
        id="name-input"
        v-model="values.name"
        placeholder="Group Name"
        required
      />
    </b-form-group>

    <b-form-group id="grade-group" label="Grade Name" label-for="grade-input">
      <b-form-input
        type="number"
        id="grade-input"
        v-model="values.grade"
        placeholder="Group Mark"
        step="0.1"
        min="0.0"
        max="1000.0"
      />
    </b-form-group>

    <b-form-group id="buttons-group">
      <b-button type="submit" variant="primary">{{ confirmText }}</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'GroupForm',
  props: {
    defaultValues: Object,
    confirmText: {
      type: String,
      required: true,
    },
  },
  watch: {
    defaultValues: function(val) {
      this.defaultValues = val;
      this.reset();
    },
  },
  data() {
    return {
      values: {
        id: '',
        name: '',
        grade: null,
      },
    };
  },
  methods: {
    async confirm() {
      this.$emit('confirm', this.values);
    },
    reset() {
      this.values.id = this.defaultValues.id;
      this.values.name = this.defaultValues.name;
      this.values.grade = this.defaultValues.grade;
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
