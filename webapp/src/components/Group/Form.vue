<template>
  <b-form @submit.prevent="confirm()" @reset.prevent="reset()">
    <b-form-group id="name-group" label="Group Name" label-for="name-input">
      <b-form-input
        type="text"
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

    <b-form-group id="members-group" label="Members" label-for="members-input">
      <b-table :items="group.users" :fields="fields" bordered small hover>
        <template #cell(actions)="data">
          <b-button
            @click="removeFromMembers(data.item)"
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
      id="all-users-group"
      label="All Students"
      label-for="members-input"
    >
      <b-table
        :items="filterUsers(allUsers)"
        :fields="fields"
        bordered
        small
        hover
      >
        <template #cell(actions)="data">
          <b-button
            @click="addToMembers(data.item)"
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
const { getAll } = require('../../services/UserService');

export default {
  name: 'GroupForm',
  props: {
    defaultGroup: Object,
    confirmText: {
      type: String,
      required: true,
    },
  },
  watch: {
    defaultGroup: function() {
      this.reset();
    },
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'Username' },
        'firstName',
        'lastName',
        { key: 'actions', label: '' },
      ],
      group: {
        id: '',
        name: '',
        grade: null,
        users: [],
      },
      allUsers: [],
    };
  },
  methods: {
    async confirm() {
      this.$emit('confirm', this.group);
    },
    async fetchUsers() {},
    filterUsers(users) {
      let ids = this.group.users?.map(user => user.id) ?? [];
      return users.filter(user => !ids.includes(user.id));
    },
    async removeFromMembers(userToRemove) {
      this.group.users = this.group.users.filter(
        user => user.id !== userToRemove.id
      );
    },
    async addToMembers(userToAdd) {
      this.group.users.push(JSON.parse(JSON.stringify(userToAdd)));
    },
    reset() {
      this.group = JSON.parse(JSON.stringify(this.defaultGroup));
      getAll().then(users => (this.allUsers = users));
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
