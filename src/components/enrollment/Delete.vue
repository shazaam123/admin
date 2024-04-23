<template>
  <div class="container">
    <form method="post" @submit.prevent="this.delete()">
      <div class="row">
        <div class="col m6 l4">
          <label for="enrollment_id">Id</label>
          <input readonly id="enrollment_id" name="id" :value="enrollment.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="enrollment_student">Student</label>
          <input readonly id="enrollment_student" name="student" :value="enrollment.student" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="enrollment_course">Course</label>
          <input readonly id="enrollment_course" name="course" :value="enrollment.course" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="enrollment_enrollment_date">Enrollment Date</label>
          <input readonly id="enrollment_enrollment_date" name="enrollment_date" :value="enrollment.enrollment_date" data-type="date" autocomplete="off" />
        </div>
        <div class="col m6 l4">
          <label for="enrollment_grade">Grade</label>
          <input readonly id="enrollment_grade" name="grade" :value="enrollment.grade" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/enrollment')">Cancel</router-link>
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
  name: 'EnrollmentDelete',
  data() {
    return {
      enrollment: {}
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
        this.enrollment = response.data.enrollment
      })
    },
    delete() {
      Service.delete(this.$route.params.id, this.enrollment).then(() => {
        this.$router.push(this.getRef('/enrollment'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>