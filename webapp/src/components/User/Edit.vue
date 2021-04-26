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
      let response = await userService.updateUser(user);
      console.log(response);
      if (response.ok) {
        alert('user updated');
        this.$refs.form.reset();
      } else {
        console.error(response['message']);
        alert(response['message']);
      }
    },
  },
  async mounted() {
    this.currentUser = await userService.getUserByUsername(
      this.$route.params.id
    );
    // .then(user => (this.currentUser = user));
  },
};
</script>
