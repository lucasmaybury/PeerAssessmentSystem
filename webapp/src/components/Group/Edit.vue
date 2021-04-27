<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Edit Group</h2>
        <group-form
          @confirm="updateGroup"
          :defaultValues="currentGroup"
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
const { update, getById } = require('../../services/GroupService');

export default {
  name: 'EditGroup',
  components: {
    GroupForm: Form,
  },
  data() {
    return {
      currentGroup: {},
    };
  },
  methods: {
    async updateGroup(group) {
      console.log('updating group:');
      console.log(group);
      update(group)
        .then(() => this.getGroup())
        .then(() => {
          alert('group updated');
          this.$refs['form'].reset();
        })
        .catch(err => alert(err.message));
    },
    getGroup() {
      return getById(this.$route.params.id)
        .then(group => {
          this.currentGroup = group;
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.getGroup();
  },
};
</script>
