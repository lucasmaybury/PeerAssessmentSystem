<template>
  <div class="container">
    <b-row>
      <b-col>
        <h2>Create Group</h2>
        <group-form
          @confirm="createGroup"
          :defaultGroup="blankGroup"
          confirmText="Create"
          ref="form"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Form from './Form.vue';
const { create } = require('../../services/GroupService');

export default {
  name: 'CreateGroup',
  components: {
    GroupForm: Form,
  },
  data() {
    return {
      blankGroup: {
        id: '',
        name: '',
        grade: null,
      },
    };
  },
  methods: {
    async createGroup(group) {
      console.log('creating group:');
      console.log(group);
      create(group)
        .then(() => {
          this.$router.push('/group');
          alert('group created');
        })
        .catch(err => alert(err.message));
    },
  },
};
</script>
