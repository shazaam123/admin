<template>
  <div class="container">
    <form method="post" @submit.prevent="edit()">
      <div class="row">
        <div class="col m6 l4">
          <label for="faculty_id">Id</label>
          <input readonly id="faculty_id" name="id" v-model="faculty.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="faculty_faculty_name">Faculty Name</label>
          <input id="faculty_faculty_name" name="facultyName" v-model="faculty.facultyName" maxlength="50" />
          <span v-if="errors.facultyName" class="red-text">{{errors.facultyName}}</span>
        </div>
        <div class="col m6 l4">
          <label for="faculty_email">Email</label>
          <input id="faculty_email" name="email" v-model="faculty.email" type="email" required maxlength="50" />
          <span v-if="errors.email" class="red-text">{{errors.email}}</span>
        </div>
        <div class="col m6 l4">
          <label for="faculty_phone">Phone</label>
          <input id="faculty_phone" name="phone" v-model="faculty.phone" maxlength="50" />
          <span v-if="errors.phone" class="red-text">{{errors.phone}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/faculty')">Cancel</router-link>
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
  name: 'FacultyEdit',
  data() {
    return {
      faculty: {},
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
        this.faculty = response.data.faculty
      })
    },
    edit() {
      Service.edit(this.$route.params.id, this.faculty).then(() => {
        this.$router.push(this.getRef('/faculty'))
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