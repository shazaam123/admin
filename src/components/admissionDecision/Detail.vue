<template>
  <div class="container">
    <form method="post">
      <div class="row">
        <div class="col m6 l4">
          <label for="admission_decision_id">Id</label>
          <input readonly id="admission_decision_id" name="id" :value="admissionDecision.id" type="number" required />
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_application">Application</label>
          <input readonly id="admission_decision_application" name="application" :value="admissionDecision.application" type="number" />
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_decision_date">Decision Date</label>
          <input readonly id="admission_decision_decision_date" name="decision_date" :value="admissionDecision.decision_date" data-type="date" autocomplete="off" />
        </div>
        <div class="col m6 l4">
          <label for="admission_decision_decision">Decision</label>
          <input readonly id="admission_decision_decision" name="decision" :value="admissionDecision.decision" maxlength="50" />
        </div>
        <div class="col s12">
          <router-link class="btn-small grey" :to="getRef('/admissionDecision')">Back</router-link>
          <router-link class="btn-small" :to="`/admissionDecision/edit/${admissionDecision.id}?ref=${encodeURIComponent(getRef('/admissionDecision'))}`">Edit</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'AdmissionDecisionDetail',
  data() {
    return {
      admissionDecision: {}
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
        this.admissionDecision = response.data.admissionDecision
      })
    }
  }
}
</script>