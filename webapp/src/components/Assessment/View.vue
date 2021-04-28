<template>
  <b-card>
    <h3>{{ assessment.name }}</h3>
    <br />
    <h5>Groups:</h5>
    <b-table
      :items="assessment.groups"
      :fields="['name', 'grade', 'actions']"
      bordered
    >
      <template #cell(actions)="data">
        <b-link :to="`/group/${data.item.id}/view`">
          <b-icon icon="file-text" variant="dark" />
        </b-link>

        <b-link :to="`/group/${data.item.id}/edit`">
          <b-icon icon="pencil-square" variant="dark" />
        </b-link>
      </template>
    </b-table>
  </b-card>
</template>

<script>
const { getById } = require('../../services/AssessmentService');

export default {
  name: 'ViewAssessment',
  data() {
    return {
      assessment: {},
    };
  },
  methods: {
    async getAssessment() {
      getById(this.$route.params.id).then(assessment => {
        this.assessment = assessment;
      });
    },
  },
  mounted() {
    this.getAssessment();
  },
};
</script>
