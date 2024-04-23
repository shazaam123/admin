<template>
  <div class="container">
    <form method="post">
      <div class="row">
        <div class="col m6 l4">
          <label for="program_id">Id</label>
          <input readonly id="program_id" name="id" :value="program.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="program_program_name">Program Name</label>
          <input readonly id="program_program_name" name="program_name" :value="program.program_name" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="program_description">Description</label>
          <input readonly id="program_description" name="description" :value="program.description" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="program_requirements">Requirements</label>
          <input readonly id="program_requirements" name="requirements" :value="program.requirements" maxlength="50" />
        </div>
        <div class="col m6 l4">
          <label for="program_credits">Credits</label>
          <input readonly id="program_credits" name="credits" :value="program.credits" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/program')">Back</router-link>
          <router-link class="btn-small" :to="`/program/edit/${program.id}?ref=${encodeURIComponent(getRef('/program'))}`">Edit</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'ProgramDetail',
  data() {
    return {
      program: {}
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
        this.program = response.data.program
      })
    }
  }
}
</script>