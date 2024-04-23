<template>
  <div class="container">
    <form method="post" @submit.prevent="edit()">
      <div class="row">
        <div class="col m6 l4">
          <label for="enrollment_id">Id</label>
          <input readonly id="enrollment_id" name="id" v-model="enrollment.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="enrollment_student">Student</label>
          <input id="enrollment_student" name="student" v-model="enrollment.student" type="number" />
          <span v-if="errors.student" class="red-text">{{errors.student}}</span>
        </div>
        <div class="col m6 l4">
          <label for="enrollment_course">Course</label>
          <input id="enrollment_course" name="course" v-model="enrollment.course" type="number" />
          <span v-if="errors.course" class="red-text">{{errors.course}}</span>
        </div>
        <div class="col m6 l4">
          <label for="enrollment_enrollment_date">Enrollment Date</label>
          <input id="enrollment_enrollment_date" name="enrollment_date" v-model="enrollment.enrollment_date" data-type="date" autocomplete="off" />
          <span v-if="errors.enrollment_date" class="red-text">{{errors.enrollment_date}}</span>
        </div>
        <div class="col m6 l4">
          <label for="enrollment_grade">Grade</label>
          <input id="enrollment_grade" name="grade" v-model="enrollment.grade" maxlength="50" />
          <span v-if="errors.grade" class="red-text">{{errors.grade}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/enrollment')">Cancel</router-link>
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
  name: 'EnrollmentEdit',
  data() {
    return {
      enrollment: {},
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
      return Service.edit(this.$route.params.id).then(response => {
        this.enrollment = response.data.enrollment
      })
    },
    edit() {
      Service.edit(this.$route.params.id, this.enrollment).then(() => {
        this.$router.push(this.getRef('/enrollment'))
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