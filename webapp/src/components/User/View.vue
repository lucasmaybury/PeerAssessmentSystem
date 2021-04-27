<template>
  <b-card>
    <p v-for="[key, value] of Object.entries(this.user)" :key="key">
      {{ key }}: {{ value }}
    </p>
  </b-card>
</template>

<script>
const { getById } = require('../../services/UserService');

export default {
  name: 'ViewUser',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async getUser() {
      getById(this.$route.params.id).then(user => {
        this.user = user;
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
