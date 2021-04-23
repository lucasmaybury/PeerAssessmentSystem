<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Create User</h2>
        <user-form @confirm="createUser" confirmText="Create" ref="form" />
      </div>
    </div>
  </div>
</template>

<script>
import Form from './Form.vue';
const userService = require('../../services/UserService');

export default {
  name: 'CreateUser',
  components: {
    UserForm: Form,
  },
  data() {
    return {
      user: {
        id: 'test',
        firstName: 'test',
        lastName: 'user',
        role: 1,
      },
    };
  },
  methods: {
    async createUser(user) {
      console.log('creating user:');
      console.log(user);
      let response = await userService.createUser(user);
      console.log(response);
      if (response.status == 201) {
        alert('user created');
      } else {
        console.error(response['message']);
        alert(response['message']);
      }
    },
  },
};
</script>
