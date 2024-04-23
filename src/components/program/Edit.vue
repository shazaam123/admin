<template>
  <div class="container">
    <form method="post" @submit.prevent="edit()">
      <div class="row">
        <div class="col m6 l4">
          <label for="program_id">Id</label>
          <input readonly id="program_id" name="id" v-model="program.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="program_program_name">Program Name</label>
          <input id="program_program_name" name="program_name" v-model="program.program_name" maxlength="50" />
          <span v-if="errors.program_name" class="red-text">{{errors.program_name}}</span>
        </div>
        <div class="col m6 l4">
          <label for="program_description">Description</label>
          <input id="program_description" name="description" v-model="program.description" maxlength="50" />
          <span v-if="errors.description" class="red-text">{{errors.description}}</span>
        </div>
        <div class="col m6 l4">
          <label for="program_requirements">Requirements</label>
          <input id="program_requirements" name="requirements" v-model="program.requirements" maxlength="50" />
          <span v-if="errors.requirements" class="red-text">{{errors.requirements}}</span>
        </div>
        <div class="col m6 l4">
          <label for="program_credits">Credits</label>
          <input id="program_credits" name="credits" v-model="program.credits" maxlength="50" />
          <span v-if="errors.credits" class="red-text">{{errors.credits}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/program')">Cancel</router-link>
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
  name: 'ProgramEdit',
  data() {
    return {
      program: {},
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
        this.program = response.data.program
      })
    },
    edit() {
      Service.edit(this.$route.params.id, this.program).then(() => {
        this.$router.push(this.getRef('/program'))
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