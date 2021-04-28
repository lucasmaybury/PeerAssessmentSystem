<template>
  <b-form @submit.prevent="confirm()" @reset.prevent="reset()">
    <b-form-group
      id="name-group"
      label="Assessment Name"
      label-for="name-input"
    >
      <b-form-input
        type="text"
        id="name-input"
        v-model="assessment.name"
        placeholder="Assessment Name"
        required
      />
    </b-form-group>

    <b-form-group id="groups-group" label="Groups" label-for="groups-input">
      <b-table
        id="groups-input"
        :items="assessment.groups"
        :fields="fields"
        bordered
        small
        hover
      >
        <template #cell(users)="data">
          {{
            data.item.users
              .map(user => `${user.firstName} ${user.lastName}`)
              .join(', ') || 'Empty'
          }}
        </template>
        <template #cell(actions)="data">
          <b-button
            @click="removeFromGroups(data.item)"
            variant="danger"
            size="sm"
            class="float-right"
          >
            Remove
          </b-button>
        </template>
      </b-table>
    </b-form-group>

    <b-form-group
      id="all-groups-group"
      label="All Groups"
      label-for="groups-input"
    >
      <b-table
        id="groups-input"
        :items="filterGroups(allGroups)"
        :fields="fields"
        bordered
        small
        hover
      >
        <template #cell(users)="data">
          {{
            data.item.users
              .map(user => `${user.firstName} ${user.lastName}`)
              .join(', ') || 'Empty'
          }}
        </template>
        <template #cell(actions)="data">
          <b-button
            @click="addToGroups(data.item)"
            variant="primary"
            size="sm"
            class="float-right"
          >
            Add
          </b-button>
        </template>
      </b-table>
    </b-form-group>

    <b-form-group id="buttons-group">
      <b-button type="submit" variant="primary">{{ confirmText }}</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form-group>
  </b-form>
</template>

<script>
const { getAll } = require('../../services/GroupService.js');

export default {
  name: 'AssessmentForm',
  props: {
    defaultAssessment: Object,
    confirmText: {
      type: String,
      required: true,
    },
  },
  watch: {
    defaultAssessment: function() {
      this.reset();
    },
  },
  data() {
    return {
      fields: [
        { key: 'name', label: 'Assessment Name' },
        { key: 'users', label: 'Members' },
        { key: 'actions', label: '' },
      ],
      assessment: {
        name: '',
        groups: [],
      },
      allGroups: [],
    };
  },
  methods: {
    async confirm() {
      this.$emit('confirm', this.assessment);
    },
    async fetchGroups() {},
    filterGroups(users) {
      let ids = this.assessment.groups?.map(group => group.id) ?? [];
      return users.filter(groups => !ids.includes(groups.id));
    },
    async removeFromGroups(toRemove) {
      this.assessment.groups = this.assessment.groups.filter(
        group => group.id !== toRemove.id
      );
    },
    async addToGroups(toAdd) {
      this.assessment.groups.push(JSON.parse(JSON.stringify(toAdd)));
    },
    reset() {
      this.assessment = JSON.parse(JSON.stringify(this.defaultAssessment));
      getAll().then(groups => (this.allGroups = groups));
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
