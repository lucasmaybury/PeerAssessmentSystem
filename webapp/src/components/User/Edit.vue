<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Edit User</h2>
        <user-form
          @confirm="updateUser"
          :defaultValues="currentUser"
          confirmText="Update"
          ref="form"
          :readOnlyId="true"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from './Form.vue';
const userService = require('../../services/UserService');

export default {
  name: 'EditUser',
  components: {
    UserForm: Form,
  },
  data() {
    return {
      currentUser: {},
    };
  },
  methods: {
    async updateUser(user) {
      console.log('updating user:');
      console.log(user);
      userService
        .updateUser(user)
        .then(() => this.getUser())
        .then(() => {
          alert('user updated');
          this.$refs['form'].reset();
        })
        .catch(err => alert(err.message));
    },
    getUser() {
      return userService
        .getUserByUsername(this.$route.params.id)
        .then(user => {
          this.currentUser = user;
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
