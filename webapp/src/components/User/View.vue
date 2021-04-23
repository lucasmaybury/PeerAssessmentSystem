<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Create User</h2>
        <b-form @submit.prevent="createUser()" @reset="clearForm()">
          <b-form-group
            id="username-group"
            label="Username"
            label-for="username-input"
          >
            <b-form-input
              type="text"
              id="username-input"
              v-model="id"
              placeholder="Username"
              inline
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
              v-model="firstName"
              placeholder="First Name"
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
              v-model="lastName"
              placeholder="Last Name"
            />
          </b-form-group>

          <b-form-group id="role-group" label="Role" label-for="lastName-input">
            <b-form-input type="number" id="role-input" v-model="role" />
          </b-form-group>

          <b-form-group id="buttons-group">
            <b-button type="submit" variant="primary"> Create </b-button>
            <b-button type="reset" variant="danger"> Reset </b-button>
          </b-form-group>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
const userService = require('../../services/UserService');

export default {
  name: 'CreateUser',
  data() {
    return {
      id: 'testuser',
      firstName: 'test',
      lastName: 'user',
      role: 1,
    };
  },
  methods: {
    async createUser() {
      const user = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
      };
      let response = await userService.createUser(user);
      let message = await response.text();
      console.log(message);
      this.clearForm();
    },
    clearForm() {
      this.id = '';
      this.firstName = '';
      this.lastName = '';
      this.role = null;
    },
  },
};
</script>
