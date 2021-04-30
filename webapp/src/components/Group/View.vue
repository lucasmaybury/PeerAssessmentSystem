<template>
  <b-card>
    <h2>{{ group.name }}</h2>
    <br />
    <p><b>Grade:</b> {{ group.grade || 'Not yet graded' }}</p>
    <h4>Members:</h4>
    <p v-for="member in group.users" :key="member.id">
      {{ member.firstName }} {{ member.lastName }}
    </p>
    <br />
    <h4>Scores Given</h4>
    <b-form inline>
      <b-form-group
        id="percentageView-group"
        label-for="percentageView-check-button"
        label="Percentage View"
      >
        <b-form-checkbox
          v-model="percentageView"
          id="percentageView-check-button"
          switch
        />
      </b-form-group>
    </b-form>

    <br />
    <b-table
      :items="scoreTable"
      :fields="responseFields"
      thead-class="table-secondary"
      bordered
      small
      fixed
    >
      <template #cell()="data">
        <span>
          {{
            data.value
              ? `${(Math.round(data.value.normalised * 100) / 100) *
                  (percentageView ? 100 / group.users.length : 1)}${
                  percentageView ? '%' : ''
                }`
              : '-'
          }}
        </span>
        <span class="text-muted">{{
          data.value ? ` (${data.value.actual})` : ''
        }}</span>
      </template>
      <template #cell(user)="data">
        <b>{{ group.users[data.index].firstName }}</b>
      </template>
    </b-table>
    <br />
    <p v-if="percentageView">
      Shown are scores as a percentage of the sum of all scores given,
      effectively gives a percentage of effort that a rating student attributes
      the receiving student to have given to the team
    </p>
    <p v-else>
      Shown are scores normalised to the mean of their given scores, effectively
      gives a multiplier for each receiving student of the effort the rating
      student attributes to them eg. Alice giving Bob a normalised score of 1.2
      means Alice perceives Bob to have performed 20% above the average of the
      group.Actual given scores are in brackets
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
      responseFields: [{ key: 'user', label: 'from/to', variant: 'secondary' }],
      scoreTable: [],
      userIndex: {},
      percentageView: false,
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
        this.scoreTable[this.userIndex[response.userId]][
          response.recipientId
        ] = { normalised: null, actual: response.score };
      });
      this.scoreTable.forEach(row => {
        let total =
          Object.values(row).reduce((total, num) => total + num.actual, 0) /
          Object.keys(row).length;
        Object.values(row).forEach(cell => {
          cell.normalised = cell.normalised = cell.actual / total;
        });
        row.total = total;
      });
    },
  },
  mounted() {
    this.setup();
  },
};
</script>
