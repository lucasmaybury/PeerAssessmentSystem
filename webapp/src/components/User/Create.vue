<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Create User</h2>
        <user-form
          @confirm="createUser"
          :defaultValues="blankUser"
          confirmText="Create"
          ref="form"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from './Form.vue';
const { create } = require('../../services/UserService');

export default {
  name: 'CreateUser',
  components: {
    UserForm: Form,
  },
  data() {
    return {
      blankUser: {
        id: '',
        firstName: '',
        lastName: '',
        role: null,
      },
    };
  },
  methods: {
    async createUser(user) {
      create(user)
        .then(() => {
          this.$router.push('/user');
          alert('user created');
        })
        .catch(err => alert(err.message));
    },
  },
};
</script>
