<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Edit User</h2>
        <b-form
          @submit.prevent="createUser()"
          @reset="clearForm()"
          v-model="user"
        >
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
      user: {
        id: 'testuser',
        firstName: 'test',
        lastName: 'user',
        role: 1,
      },
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
