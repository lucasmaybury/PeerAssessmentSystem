<template>
  <b-card>
    <p v-for="[key, value] of Object.entries(this.group)" :key="key">
      {{ key }}: {{ value }}
    </p>
  </b-card>
</template>

<script>
const { getById } = require('../../services/GroupService');

export default {
  name: 'ViewGroup',
  data() {
    return {
      group: {},
    };
  },
  methods: {
    async getGroup() {
      getById(this.$route.params.id).then(group => {
        this.group = group;
      });
    },
  },
  mounted() {
    this.getGroup();
  },
};
</script>
