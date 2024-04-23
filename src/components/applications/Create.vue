<template>
  <div class="container">
    <form method="post" @submit.prevent="create()">
      <div class="row">
        <div class="col m6 l4">
          <label for="applications_id">Id</label>
          <input id="applications_id" name="id" v-model="applications.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="applications_student">Student</label>
          <input id="applications_student" name="student" v-model="applications.student" type="number" />
          <span v-if="errors.student" class="red-text">{{errors.student}}</span>
        </div>
        <div class="col m6 l4">
          <label for="applications_course">Course</label>
          <input id="applications_course" name="course" v-model="applications.course" type="number" />
          <span v-if="errors.course" class="red-text">{{errors.course}}</span>
        </div>
        <div class="col m6 l4">
          <label for="applications_application_date">Application Date</label>
          <input id="applications_application_date" name="application_date" v-model="applications.application_date" data-type="date" autocomplete="off" />
          <span v-if="errors.application_date" class="red-text">{{errors.application_date}}</span>
        </div>
        <div class="col m6 l4">
          <label for="applications_status">Status</label>
          <input id="applications_status" name="status" v-model="applications.status" maxlength="50" />
          <span v-if="errors.status" class="red-text">{{errors.status}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/applications')">Cancel</router-link>
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
  name: 'ApplicationsCreate',
  data() {
    return {
      applications: {},
      errors: {}
    }
  },
  mounted() {
    this.initView(true)
  },
  methods: {
    ...Util,
    create() {
      Service.create(this.applications).then(() => {
        this.$router.push(this.getRef('/applications'))
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