<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card>
          <h2>Choose group to review</h2>
          <b-form @submit.prevent="submit()" @reset.prevent="group = ''">
            <b-form-group id="group-group">
              <b-form-select
                id="group-input"
                v-model="groupId"
                :options="options"
                required
              />
            </b-form-group>

            <b-form-group id="buttons-group">
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Cancel</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const { getAll } = require('../../services/GroupService');

export default {
  name: 'ChooseGroup',
  data() {
    return {
      groupId: -1,
      options: [],
    };
  },
  methods: {
    async filterGroups() {
      getAll()
        .then(groups =>
          groups.filter(group => {
            let ids = group.users.map(user => user.id);
            return ids.includes(this.$route.params.id);
          })
        )
        .then(groups =>
          groups.map(group => {
            return {
              value: group.id,
              text: group.name,
            };
          })
        )
        .then(groups => (this.options = groups));
    },
    async submit() {
      await this.$router.push(`/response/${this.groupId}/new`);
    },
  },
  mounted() {
    this.filterGroups();
  },
};
</script>
