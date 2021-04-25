<template>
  <b-card>
    <p v-for="[key, value] of Object.entries(this.user)" :key="key">
      {{ key }}: {{ value }}
    </p>
  </b-card>
</template>

<script>
const userService = require('../../services/UserService');

export default {
  name: 'ViewUser',
  data() {
    return {
      user: {},
      values: [],
    };
  },
  methods: {
    async getUser() {
      userService.getUserByUsername(this.$route.params.id).then(user => {
        this.user = user;
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
