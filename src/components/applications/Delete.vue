<template>
  <div class="container">
    <form method="post" @submit.prevent="this.delete()">
      <div class="row">
        <div class="col m6 l4">
          <label for="applications_id">Id</label>
          <input readonly id="applications_id" name="id" :value="applications.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="applications_student">Student</label>
          <input readonly id="applications_student" name="student" :value="applications.student" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="applications_course">Course</label>
          <input readonly id="applications_course" name="course" :value="applications.course" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="applications_application_date">Application Date</label>
          <input readonly id="applications_application_date" name="application_date" :value="applications.application_date" data-type="date" autocomplete="off" />
        </div>
        <div class="col m6 l4">
          <label for="applications_status">Status</label>
          <input readonly id="applications_status" name="status" :value="applications.status" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/applications')">Cancel</router-link>
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
  name: 'ApplicationsDelete',
  data() {
    return {
      applications: {}
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
      return Service.delete(this.$route.params.id).then(response => {
        this.applications = response.data.applications
      })
    },
    delete() {
      Service.delete(this.$route.params.id, this.applications).then(() => {
        this.$router.push(this.getRef('/applications'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>