<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form method="post" @submit.prevent="edit()">
          <div class="row">
            <div class="mb-3 col-md-6 col-lg-4">
              <label class="form-label" for="user_account_name">Name</label>
              <input id="user_account_name" name="name" class="form-control form-control-sm" v-model="userAccount.name" required maxlength="50" />
              <span v-if="errors.name" class="text-danger">{{errors.name}}</span>
            </div>
            <div class="mb-3 col-md-6 col-lg-4">
              <label class="form-label" for="user_account_email">Email</label>
              <input id="user_account_email" name="email" class="form-control form-control-sm" v-model="userAccount.email" type="email" required maxlength="50" />
              <span v-if="errors.email" class="text-danger">{{errors.email}}</span>
            </div>
            <div class="mb-3 col-md-6 col-lg-4">
              <label class="form-label" for="user_account_password">Password</label>
              <input id="user_account_password" name="password" class="form-control form-control-sm" v-model="userAccount.password" type="password" placeholder="New password" maxlength="100" />
              <span v-if="errors.password" class="text-danger">{{errors.password}}</span>
            </div>
            <div class="mb-3 col-md-6 col-lg-4">
              <label class="form-label" for="user_account_password2">Confirm password</label>
              <input data-match="user_account_password" id="user_account_password2" name="password2" class="form-control form-control-sm" type="password" placeholder="New password" maxlength="100" />
              <span v-if="errors.password" class="text-danger">{{errors.password}}</span>
            </div>
            <div class="col-12">
              <button class="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import http from '../http'
import Util from"../util"

export default {
  name: 'Profile',
  data() {
    return {
      userAccount: {},
      errors: {}
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
      return http.get('/profile').then(response => {
        this.userAccount = response.data.userAccount
      })
    },
    edit() {
      if (!this.validateForm()) {
        return
      }
      http.post('/updateProfile', this.userAccount).then(() => {
        this.$router.push('/home')
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