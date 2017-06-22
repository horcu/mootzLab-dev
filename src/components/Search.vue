<template>
  <div id="labs-list">
    <div class="pull-left" id="div-input-path">
              <span id="lab-prefix" class="pull-left">
                  <span class="pull-left text-white">lab/</span>
                <input class="pull-left" id="lab-path-input" type="text" placeholder="enter lab" value=""/>
                <img id="lg-go" height="128" width="110" class="btn btn-flat pull-right"
                     v-on:click="createNewLab()" src="/static/img/next_lab.png"/>
              </span>
    </div>

    <ul id="results-list" class="list-group">
      <li v-for="item in searchResults" class="list-group-item"> {{item.name}} <span>{{item.description}}</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data: function () {
     return {
       userName : '',
       email: '',
       photo: '',
       userId: ''
     }
    },
    methods: {},
  created() {
    let vm = this
    vm.user = fb.auth().currentUser;
    if (vm.user) {
      vm.userName = this.user.displayName;
      vm.email = this.user.email;
      vm.photo = this.user.photoURL;
      vm.userId = this.user.uid;
    }
  },
    mounted(){
      let vm = this
      vm.user = fb.auth().currentUser;
      if (vm.user) {
        vm.userName = this.user.displayName;
        vm.email = this.user.email;
        vm.photo = this.user.photoURL;
        vm.userId = this.user.uid;
      }
    },

  }
</script>

<style scoped>

</style>
