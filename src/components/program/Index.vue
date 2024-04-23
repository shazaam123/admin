<template>
  <div class="container">
    <div class="col s12"><input id="searchbar_toggle" type="checkbox" />
      <div id="searchbar" class="row">
        <div class="col s12 l2">
          <select id="search_col" @change="searchChange()">
            <option value="Program.id" data-type="number">Program Id</option>
            <option value="Program.program_name">Program Program Name</option>
            <option value="Program.description">Program Description</option>
            <option value="Program.requirements">Program Requirements</option>
            <option value="Program.credits">Program Credits</option>
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
            <th :class="getSortClass('Program.id','asc')">
              <router-link :to="getLink('sort','Program.id','asc')">Id</router-link>
            </th>
            <th :class="getSortClass('Program.program_name')">
              <router-link :to="getLink('sort','Program.program_name')">Program Name</router-link>
            </th>
            <th :class="getSortClass('Program.description')">
              <router-link :to="getLink('sort','Program.description')">Description</router-link>
            </th>
            <th :class="getSortClass('Program.requirements') + ' hide-on-small-only'">
              <router-link :to="getLink('sort','Program.requirements')">Requirements</router-link>
            </th>
            <th :class="getSortClass('Program.credits') + ' hide-on-small-only'">
              <router-link :to="getLink('sort','Program.credits')">Credits</router-link>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="program in programs" :key="program">
            <td class="center-align">{{program.id}}</td>
            <td>{{program.program_name}}</td>
            <td>{{program.description}}</td>
            <td class="hide-on-small-only">{{program.requirements}}</td>
            <td class="hide-on-small-only">{{program.credits}}</td>
            <td class="center-align">
              <router-link class="btn-small grey" :to="`/program/${program.id}`" title="View"><i class="mdi mdi-eye"></i></router-link>
              <router-link class="btn-small" :to="`/program/edit/${program.id}`" title="Edit"><i class="mdi mdi-pencil"></i></router-link>
              <router-link class="btn-small red" :to="`/program/delete/${program.id}`" title="Delete"><i class="mdi mdi-close-thick"></i></router-link>
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
      <router-link class="btn-small" to="/program/create">Create</router-link>
    </div>
    <component :is="'style'">#searchbar_toggle_menu { display: inline-flex!important }</component>
  </div>
</template>
<script>
import Service from './Service'
import Util from"../../util"

export default {
  name: 'ProgramIndex',
  data() {
    return {
      programs: [],
      paging: {}
    }
  },
  watch: {
    $route(to) {
    if (to.name == 'program') {
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
        this.programs = response.data.programs
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