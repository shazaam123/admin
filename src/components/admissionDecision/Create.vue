<template>
  <div class="container">
    <form method="post" @submit.prevent="create()">
      <div class="row">
        <div class="col m6 l4">
          <label for="admission_decision_id">Id</label>
          <input id="admission_decision_id" name="id" v-model="admissionDecision.id" type="number" required />
          <span v-if="errors.id" class="red-text">{{errors.id}}</span>
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_application">Application</label>
          <input id="admission_decision_application" name="application" v-model="admissionDecision.application" type="number" />
          <span v-if="errors.application" class="red-text">{{errors.application}}</span>
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_decision_date">Decision Date</label>
          <input id="admission_decision_decision_date" name="decision_date" v-model="admissionDecision.decision_date" data-type="date" autocomplete="off" />
          <span v-if="errors.decision_date" class="red-text">{{errors.decision_date}}</span>
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_decision">Decision</label>
          <input id="admission_decision_decision" name="decision" v-model="admissionDecision.decision" maxlength="50" />
          <span v-if="errors.decision" class="red-text">{{errors.decision}}</span>
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/admissionDecision')">Cancel</router-link>
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
  name: 'AdmissionDecisionCreate',
  data() {
    return {
      admissionDecision: {},
      errors: {}
    }
  },
  mounted() {
    this.initView(true)
  },
  methods: {
    ...Util,
    create() {
      Service.create(this.admissionDecision).then(() => {
        this.$router.push(this.getRef('/admissionDecision'))
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