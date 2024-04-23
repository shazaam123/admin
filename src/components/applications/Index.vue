<template>
  <div class="container">
    <div class="col s12"><input id="searchbar_toggle" type="checkbox" />
      <div id="searchbar" class="row">
        <div class="col s12 l2">
          <select id="search_col" @change="searchChange()">
            <option value="Applications.id" data-type="number">Applications Id</option>
            <option value="Applications.student" data-type="number">Applications Student</option>
            <option value="Applications.course" data-type="number">Applications Course</option>
            <option value="Applications.application_date" data-type="date">Applications Application Date</option>
            <option value="Applications.status">Applications Status</option>
          </select>
        </div>
        <div class="col s12 l2">
          <select id="search_oper">
            <option value="c">Contains</option>
            <option value="e">Equals</option>
            <option value="g">&gt;</option>
            <option value="ge">&gt;&#x3D;</option>
            <option value="l">&lt;</option>
            <option value="le">&lt;&#x3D;</option>
          </select>
        </div>
        <div class="col s12 l2">
          <input id="search_word" autocomplete="off" @keyup="search($event)" />
        </div>
        <div class="col s12 l6">
          <button class="btn-small" @click="search()">Search</button>
          <button class="grey btn-small" @click="clearSearch()">Clear</button>
        </div>
      </div>
      <table class="striped highlight">
        <thead>
          <tr>
            <th :class="getSortClass('Applications.id','asc')">
              <router-link :to="getLink('sort','Applications.id','asc')">Id</router-link>
            </th>
            <th :class="getSortClass('Applications.student')">
              <router-link :to="getLink('sort','Applications.student')">Student</router-link>
            </th>
            <th :class="getSortClass('Applications.course')">
              <router-link :to="getLink('sort','Applications.course')">Course</router-link>
            </th>
            <th :class="getSortClass('Applications.application_date') + ' hide-on-small-only'">
              <router-link :to="getLink('sort','Applications.application_date')">Application Date</router-link>
            </th>
            <th :class="getSortClass('Applications.status') + ' hide-on-small-only'">
              <router-link :to="getLink('sort','Applications.status')">Status</router-link>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="applications in applicationses" :key="applications">
            <td class="center-align">{{applications.id}}</td>
            <td class="right-align">{{applications.student}}</td>
            <td class="right-align">{{applications.course}}</td>
            <td class="hide-on-small-only center-align">{{applications.application_date}}</td>
            <td class="hide-on-small-only">{{applications.status}}</td>
            <td class="center-align">
              <router-link class="btn-small grey" :to="`/applications/${applications.id}`" title="View"><i class="mdi mdi-eye"></i></router-link>
              <router-link class="btn-small" :to="`/applications/edit/${applications.id}`" title="Edit"><i class="mdi mdi-pencil"></i></router-link>
              <router-link class="btn-small red" :to="`/applications/delete/${applications.id}`" title="Delete"><i class="mdi mdi-close-thick"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col m3 s6">
          <label>Show
            <select id="page_size" @change="$router.push($event.target.value)">
              <option :value="getLink('size',10)" :selected="paging.size == 10">10</option>
              <option :value="getLink('size',20)" :selected="paging.size == 20">20</option>
              <option :value="getLink('size',30)" :selected="paging.size == 30">30</option>
            </select>
            entries
          </label>
        </div>
        <div class="col m9 s6">
          <div class="right hide-on-small-only">
            <ul class="pagination">
              <li :class="`${paging.current <= 1 ? ' disabled' : ''}`">
                <router-link :to="getLink('page',paging.current-1)">Prev</router-link>
              </li>
              <li v-for="page in paging.last" :key="page" :class="`${paging.current == page ? ' active' : ''}`">
                <router-link :to="getLink('page',page)">{{page}}</router-link>
              </li>
              <li :class="`${paging.current >= paging.last ? ' disabled' : ''}`">
                <router-link :to="getLink('page',paging.current+1)">Next</router-link>
              </li>
            </ul>
          </div>
          <div class="right hide-on-med-and-up">
            <label> Page
              <select id="page_index" @change="$router.push($event.target.value)">
                <option v-for="page in paging.last" :key="page" :value="getLink('page',page)" :selected="paging.current == page">{{page}}</option>
              </select>
            </label> of <span>{{paging.last}}</span>
            <div class="btn-group">
              <router-link :class="` btn-small${paging.current <= 1 ? ' disabled' : ''}`" :to="getLink('page',paging.current-1)"><i class="mdi mdi-chevron-left"></i></router-link>
              <router-link :class="` btn-small${paging.current >= paging.last ? ' disabled' : ''}`" :to="getLink('page',paging.current+1)"><i class="mdi mdi-chevron-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
      <router-link class="btn-small" to="/applications/create">Create</router-link>
    </div>
    <component :is="'style'">#searchbar_toggle_menu { display: inline-flex!important }</component>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'ApplicationsIndex',
  data() {
    return {
      applicationses: [],
      paging: {}
    }
  },
  watch: {
    $route(to) {
    if (to.name == 'applications') {
      this.get()
    }
  }
  },
  mounted() {
    this.initView()
    this.get()
  },
  methods: {
    ...Util,
    get() {
      Service.get().then(response => {
        this.applicationses = response.data.applicationses
        this.paging = {
          current: parseInt(this.$route.query.page) || 1,
          size: parseInt(this.$route.query.size) || 10,
          last: response.data.last
        }
      }).catch((e) => {
        alert(e.response.data.message)
      })
    }
  }
}
</script>