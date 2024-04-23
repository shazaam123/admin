<template>
  <div class="container">
    <form method="post" @submit.prevent="this.delete()">
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
          <router-link class="btn-small grey" :to="getRef('/faculty')">Cancel</router-link>
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
  name: 'FacultyDelete',
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
      return Service.delete(this.$route.params.id).then(response => {
        this.faculty = response.data.faculty
      })
    },
    delete() {
      Service.delete(this.$route.params.id, this.faculty).then(() => {
        this.$router.push(this.getRef('/faculty'))
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>