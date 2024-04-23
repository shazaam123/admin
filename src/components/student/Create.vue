<template>
  <div class="container">
    <form method="post" @submit.prevent="create()">
      <div class="row">
        <div class="col m6 l4">
          <label for="student_id">Id</label>
          <input id="student_id" name="id" v-model="student.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="student_first_name">First Name</label>
          <input id="student_first_name" name="first_name" v-model="student.first_name" maxlength="50" />
          <span v-if="errors.first_name" class="red-text">{{errors.first_name}}</span>
        </div>
        <div class="col m6 l4">
          <label for="student_last_name">Last Name</label>
          <input id="student_last_name" name="last_name" v-model="student.last_name" maxlength="50" />
          <span v-if="errors.last_name" class="red-text">{{errors.last_name}}</span>
        </div>
        <div class="col m6 l4">
          <label for="student_email">Email</label>
          <input id="student_email" name="email" v-model="student.email" type="email" maxlength="50" />
          <span v-if="errors.email" class="red-text">{{errors.email}}</span>
        </div>
        <div class="col m6 l4">
          <label for="student_date_of_birth">Date Of Birth</label>
          <input id="student_date_of_birth" name="date_of_birth" v-model="student.date_of_birth" data-type="date" autocomplete="off" />
          <span v-if="errors.date_of_birth" class="red-text">{{errors.date_of_birth}}</span>
        </div>
        <div class="col m6 l4">
          <label for="student_phone">Phone</label>
          <input id="student_phone" name="phone" v-model="student.phone" maxlength="50" />
          <span v-if="errors.phone" class="red-text">{{errors.phone}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/student')">Cancel</router-link>
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
  name: 'StudentCreate',
  data() {
    return {
      student: {},
      errors: {}
    }
  },
  mounted() {
    this.initView(true)
  },
  methods: {
    ...Util,
    create() {
      Service.create(this.student).then(() => {
        this.$router.push(this.getRef('/student'))
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