<template>
  <b-form @submit.prevent="confirm()" @reset="reset()">
    <b-form-group
      id="username-group"
      label="Username"
      label-for="username-input"
    >
      <b-form-input
        type="text"
        id="username-input"
        v-model="values.id"
        placeholder="Username"
        :readonly="readOnlyId"
        inline
        required
      />
    </b-form-group>

    <b-form-group
      id="firstName-group"
      label="First Name"
      label-for="firstname-input"
    >
      <b-form-input
        type="text"
        id="firstName-input"
        v-model="values.firstName"
        placeholder="First Name"
        required
      />
    </b-form-group>

    <b-form-group
      id="lastname-group"
      label="Last Name"
      label-for="lastName-input"
    >
      <b-form-input
        type="text"
        id="lastName-input"
        v-model="values.lastName"
        placeholder="Last Name"
        required
      />
    </b-form-group>

    <b-form-group id="role-group" label="Role" label-for="lastName-input">
      <b-form-input
        type="number"
        id="role-input"
        v-model="values.role"
        required
      />
    </b-form-group>

    <b-form-group id="buttons-group">
      <b-button type="submit" variant="primary"> {{ confirmText }} </b-button>
      <b-button type="reset" variant="danger"> Reset </b-button>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    defaultValues: Object,
    readOnlyId: Boolean,
    confirmText: {
      type: String,
      required: true,
    },
  },
  watch: {
    defaultValues: function(val) {
      this.values = val;
    },
  },
  data() {
    return {
      values: {},
    };
  },
  methods: {
    async confirm() {
      this.$emit('confirm', this.values);
    },
    reset() {
      this.values = this.defaultValues;
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
