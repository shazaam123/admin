<template>
  <div class="container">
    <form method="post" @submit.prevent="edit()">
      <div class="row">
        <div class="col m6 l4">
          <label for="course_course_id">Course Id</label>
          <input readonly id="course_course_id" name="course_id" v-model="course.course_id" type="number" required />
          <span v-if="errors.course_id" class="red-text">{{errors.course_id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="course_course_name">Course Name</label>
          <input id="course_course_name" name="course_name" v-model="course.course_name" maxlength="50" />
          <span v-if="errors.course_name" class="red-text">{{errors.course_name}}</span>
        </div>
        <div class="col m6 l4">
          <label for="course_department">Department</label>
          <input id="course_department" name="department" v-model="course.department" maxlength="50" />
          <span v-if="errors.department" class="red-text">{{errors.department}}</span>
        </div>
        <div class="col m6 l4">
          <label for="course_credits">Credits</label>
          <input id="course_credits" name="credits" v-model="course.credits" type="number" />
          <span v-if="errors.credits" class="red-text">{{errors.credits}}</span>
        </div>
        <div class="col m6 l4">
          <label for="course_program">Program</label>
          <input id="course_program" name="program" v-model="course.program" type="number" />
          <span v-if="errors.program" class="red-text">{{errors.program}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/course')">Cancel</router-link>
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
  name: 'CourseEdit',
  data() {
    return {
      course: {},
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
      return Service.edit(this.$route.params.courseId).then(response => {
        this.course = response.data.course
      })
    },
    edit() {
      Service.edit(this.$route.params.courseId, this.course).then(() => {
        this.$router.push(this.getRef('/course'))
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