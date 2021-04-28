<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Edit Assessment</h2>
        <assessment-form
          @confirm="updateAssessment"
          :defaultAssessment="currentAssessment"
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
const { update, getById } = require('../../services/AssessmentService');

export default {
  name: 'EditAssessment',
  components: {
    AssessmentForm: Form,
  },
  data() {
    return {
      currentAssessment: {},
    };
  },
  methods: {
    async updateAssessment(assessment) {
      console.log('updating assessment:');
      console.log(assessment);
      update(assessment)
        .then(() => this.getAssessment())
        .then(() => {
          alert('assessment updated');
          this.$refs['form'].reset();
        })
        .catch(err => alert(err.message));
    },
    getAssessment() {
      return getById(this.$route.params.id)
        .then(assessment => (this.currentAssessment = assessment))
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.getAssessment();
  },
};
</script>
