<template>
  <div class="container">
    <form method="post" @submit.prevent="this.delete()">
      <div class="row">
        <div class="col m6 l4">
          <label for="user_role_user_id">User Id</label>
          <input readonly id="user_role_user_id" name="user_id" :value="userRole.user_id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="user_role_role_id">Role Id</label>
          <input readonly id="user_role_role_id" name="role_id" :value="userRole.role_id" type="number" required />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/userRole')">Cancel</router-link>
          <button class="btn-small red">Delete</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'UserRoleDelete',
  data() {
    return {
      userRole: {}
    }
  },
  mounted() {
    this.get().finally(() => {
      this.initView(true)
    })
  },
  methods: {
    ...Util,
    get() {
      return Service.delete(this.$route.params.userId, this.$route.params.roleId).then(response => {
        this.userRole = response.data.userRole
      })
    },
    delete() {
      Service.delete(this.$route.params.userId, this.$route.params.roleId, this.userRole).then(() => {
        this.$router.push(this.getRef('/userRole'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>