<template>
  <div class="container">
    <form method="post">
      <div class="row">
        <div class="col m6 l4">
          <label for="faculty_id">Id</label>
          <input readonly id="faculty_id" name="id" :value="faculty.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="faculty_faculty_name">Faculty Name</label>
          <input readonly id="faculty_faculty_name" name="facultyName" :value="faculty.facultyName" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="faculty_email">Email</label>
          <input readonly id="faculty_email" name="email" :value="faculty.email" type="email" required maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="faculty_phone">Phone</label>
          <input readonly id="faculty_phone" name="phone" :value="faculty.phone" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/faculty')">Back</router-link>
          <router-link class="btn-small" :to="`/faculty/edit/${faculty.id}?ref=${encodeURIComponent(getRef('/faculty'))}`">Edit</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'FacultyDetail',
  data() {
    return {
      faculty: {}
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
        this.faculty = response.data.faculty
      })
    }
  }
}
</script>