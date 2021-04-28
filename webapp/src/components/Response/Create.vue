<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>{{ group.assessment }}</h2>
        <h2>Give feedback on your group</h2>
        <b-form @submit.prevent="confirm()" @reset.prevent="reset()">
          <b-form-group
            id="name-group"
            label="Group Name"
            label-for="name-input"
          >
            <b-form-input
              type="num"
              id="name-input"
              v-model="group.name"
              placeholder="Group Name"
              required
            />
          </b-form-group>

          <b-form-group id="grade-group" label="Grade" label-for="grade-input">
            <b-form-input
              type="number"
              id="grade-input"
              v-model="group.grade"
              placeholder="Group Mark"
              step="0.1"
              min="0.0"
              max="1000.0"
            />
          </b-form-group>

          <b-form-group id="buttons-group">
            <b-button type="submit" variant="primary">Confirm</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const groupService = require('../../services/GroupService');

export default {
  name: 'CreateResponse',
  data() {
    return {
      group: {},
      blankResponse: {
        id: '',
        name: '',
        grade: null,
      },
    };
  },
  methods: {},
  mounted() {
    groupService
      .getById(this.$route.params.id)
      .then(group => (this.group = group));
  },
};
</script>
