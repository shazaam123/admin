<template>
  <div class="container">
    <form method="post" @submit.prevent="create()">
      <div class="row">
        <div class="col m6 l4">
          <label for="user_role_user_id">User Id</label>
          <input id="user_role_user_id" name="user_id" v-model="userRole.user_id" type="number" required />
          <span v-if="errors.user_id" class="red-text">{{errors.user_id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="user_role_role_id">Role Id</label>
          <input id="user_role_role_id" name="role_id" v-model="userRole.role_id" type="number" required />
          <span v-if="errors.role_id" class="red-text">{{errors.role_id}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/userRole')">Cancel</router-link>
          <button class="btn-small">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'UserRoleCreate',
  data() {
    return {
      userRole: {},
      errors: {}
    }
  },
  mounted() {
    this.initView(true)
  },
  methods: {
    ...Util,
    create() {
      Service.create(this.userRole).then(() => {
        this.$router.push(this.getRef('/userRole'))
      }).catch((e) => {
        if (e.response.data.errors) {
          this.errors = e.response.data.errors
        }
        else {
          alert(e.response.data.message)
        }
      })
    }
  }
}
</script>