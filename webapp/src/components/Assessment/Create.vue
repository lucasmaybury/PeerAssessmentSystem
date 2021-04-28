<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Create Assessment</h2>
        <assessment-form
          @confirm="createAssessment"
          :defaultAssessment="blankAssessment"
          confirmText="Create"
          ref="form"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from './Form.vue';
const { create } = require('../../services/AssessmentService');

export default {
  name: 'CreateAssessment',
  components: {
    AssessmentForm: Form,
  },
  data() {
    return {
      blankAssessment: {
        id: '',
        name: '',
        grade: null,
      },
    };
  },
  methods: {
    async createAssessment(assessment) {
      console.log('creating assessment:');
      console.log(assessment);
      create(assessment)
        .then(() => {
          this.$router.push('/assessment');
          alert('assessment created');
        })
        .catch(err => alert(err.message));
    },
  },
};
</script>
