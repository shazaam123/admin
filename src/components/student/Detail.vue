<template>
  <div class="container">
    <form method="post">
      <div class="row">
        <div class="col m6 l4">
          <label for="student_id">Id</label>
          <input readonly id="student_id" name="id" :value="student.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="student_first_name">First Name</label>
          <input readonly id="student_first_name" name="first_name" :value="student.first_name" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="student_last_name">Last Name</label>
          <input readonly id="student_last_name" name="last_name" :value="student.last_name" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="student_email">Email</label>
          <input readonly id="student_email" name="email" :value="student.email" type="email" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="student_date_of_birth">Date Of Birth</label>
          <input readonly id="student_date_of_birth" name="date_of_birth" :value="student.date_of_birth" data-type="date" autocomplete="off" />
        </div>
        <div class="col m6 l4">
          <label for="student_phone">Phone</label>
          <input readonly id="student_phone" name="phone" :value="student.phone" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/student')">Back</router-link>
          <router-link class="btn-small" :to="`/student/edit/${student.id}?ref=${encodeURIComponent(getRef('/student'))}`">Edit</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'StudentDetail',
  data() {
    return {
      student: {}
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
      return Service.get(this.$route.params.id).then(response => {
        this.student = response.data.student
      })
    }
  }
}
</script>