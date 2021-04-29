<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card>
          <h2>Login</h2>
          <b-form @submit.prevent="login()" @reset.prevent="loginUsername = ''">
            <b-form-group
              id="name-group"
              label="Username"
              label-for="name-input"
            >
              <b-form-input
                type="text"
                id="username-input"
                v-model="loginUsername"
                placeholder="Username"
                required
              />
            </b-form-group>

            <b-form-group id="buttons-group">
              <b-button type="submit" variant="primary">Login</b-button>
              <b-button type="reset" variant="danger">Cancel</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const { getAll } = require('./../services/UserService');

export default {
  name: 'Login',
  data() {
    return {
      loginUsername: '',
    };
  },
  methods: {
    async login() {
      let allUsernames = await getAll().then(users =>
        users.map(user => user.id)
      );
      if (allUsernames.includes(this.loginUsername)) {
        localStorage.userId = this.loginUsername;
        await this.$router.push(`/response/${this.loginUsername}`);
      } else {
        alert('invalid username');
      }
    },
  },
};
</script>
