<template>
  <b-container>
    <b-row>
      <b-col>
        <br />
        <h2>{{ group.assessment.name }}</h2>
        <h3>Give feedback on your group: {{ group.name }}</h3>
        <br />
        <b-form
          @submit.prevent="confirm()"
          @reset.prevent="reset()"
          v-if="ready"
        >
          <b-form-group
            v-for="(user, index) in group.users"
            :key="user.id"
            :id="`score-${user.id}-group`"
            :label="`Rating for ${user.firstName} ${user.lastName}`"
            :label-for="`score-${user.id}-input`"
            label-cols-sm="3"
          >
            <b-form-input
              type="number"
              :id="`score-${user.id}-input`"
              v-model="scores[index].score"
              placeholder="Group Mark"
              step="1"
              min="0"
              required
            />
            <br />
          </b-form-group>

          <b-form-group id="buttons-group">
            <b-button type="submit" variant="primary">Confirm</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const groupService = require('../../services/GroupService');
const responseService = require('../../services/ResponseService');

export default {
  name: 'CreateResponse',
  data() {
    return {
      group: {},
      scores: [],
      ready: false,
    };
  },
  methods: {
    confirm() {
      let data = {
        userId: localStorage.getItem('userId'),
        groupId: this.group.id,
        scores: this.scores,
      };
      responseService
        .create(data)
        .then(() => {
          alert('response recorded');
          this.$router.push('/');
        })
        .catch(err => alert(err.message));
    },
  },
  created() {
    groupService
      .getById(this.$route.params.id)
      .then(group => (this.group = group))
      .catch(() => alert("couldn't fetch group"))
      .then(() => {
        this.scores = this.group.users.map(user => {
          return { recipientId: user.id, score: null };
        });
        this.ready = true;
      });
  },
};
</script>
