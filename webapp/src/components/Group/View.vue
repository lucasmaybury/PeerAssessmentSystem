<template>
  <b-card>
    <h3>{{ group.name }}</h3>
    <br />
    <p><b>Grade:</b> {{ group.grade || 'Not yet graded' }}</p>
    <h5>Members:</h5>
    <p v-for="member in group.users" :key="member.id">
      {{ member.firstName }} {{ member.lastName }}
    </p>
    <br />
    <h5>Scores Given</h5>
    <b-table
      :items="scoreTable"
      :fields="responseFields"
      thead-class="table-secondary"
      bordered
      small
      fixed
    >
      <template #cell(user)="data">
        <b>{{ group.users[data.index].firstName }}</b>
      </template>
    </b-table>
  </b-card>
</template>

<script>
const { getById } = require('../../services/GroupService');

export default {
  name: 'ViewGroup',
  data() {
    return {
      group: {},
      responseFields: [{ key: 'user', label: 'from/to', variant: 'secondary' }],
      scoreTable: [],
      userIndex: {},
    };
  },
  methods: {
    async setup() {
      this.group = await getById(this.$route.params.id);
      this.group.users.forEach((user, index) => {
        this.userIndex[user.id] = index;
      });
      this.group.users.forEach(user => {
        this.scoreTable.push({});
        this.responseFields.push({
          key: user.id,
          label: `${user.firstName}`,
        });
      });
      this.group.responses.forEach(response => {
        this.scoreTable[this.userIndex[response.userId]][response.recipientId] =
          response.score;
      });
    },
  },
  mounted() {
    this.setup();
  },
};
</script>
