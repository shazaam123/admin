<template>
  <div class="container">
    <form method="post">
      <div class="row">
        <div class="col m6 l4">
          <label for="course_course_id">Course Id</label>
          <input readonly id="course_course_id" name="course_id" :value="course.course_id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="course_course_name">Course Name</label>
          <input readonly id="course_course_name" name="course_name" :value="course.course_name" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="course_department">Department</label>
          <input readonly id="course_department" name="department" :value="course.department" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="course_credits">Credits</label>
          <input readonly id="course_credits" name="credits" :value="course.credits" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="course_program">Program</label>
          <input readonly id="course_program" name="program" :value="course.program" type="number" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/course')">Back</router-link>
          <router-link class="btn-small" :to="`/course/edit/${course.course_id}?ref=${encodeURIComponent(getRef('/course'))}`">Edit</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'CourseDetail',
  data() {
    return {
      course: {}
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
      return Service.get(this.$route.params.courseId).then(response => {
        this.course = response.data.course
      })
    }
  }
}
</script>