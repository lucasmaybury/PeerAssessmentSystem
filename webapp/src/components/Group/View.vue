<template>
  <b-card>
    <h3>{{ group.name }}</h3>
    <br />
    <p><b>Grade:</b> {{ group.grade || 'Not yet graded' }}</p>
    <h5>Members:</h5>
    <p v-for="member in group.users" :key="member.id">
      {{ member.firstName }} {{ member.lastName }}
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
