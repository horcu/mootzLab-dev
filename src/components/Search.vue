<template>
  <div id="app">
    <div class="pull-left" id="div-input-path">
              <span id="lab-prefix" class="pull-left">
                  <span class="lab-text pull-left text-white">l/</span>
                <input class="pull-left" id="lab-path-input" type="text" placeholder="lab name" value=""/>
                <img v-if="searchResults.length < 1" class="pull-left lg-go-first"  v-on:click="requestInvitation()" src="/static/img/new_lab.png"/>
              </span>
    </div>

    <ul id="results-list">
      <li v-for='item in searchResults' >
        <div id="result-item">
          <span class="lab-info-text pull-left">{{item.name}} : {{item.description}}
         <img v-if="item.userIsInvited" class="pull-right lg-go"  v-on:click="createNewLab()" src="/static/img/enter_lab.png"/>
         <img v-else-if="!item.userIsInvited" class="pull-right lg-go" v-on:click="requestInvitation()" src="/static/img/invite_lab.png"/>
           </span>
        </div>
        <div style="clear: both;"></div>
      </li>
    </ul>

  </div>
</template>

<script>

  import Vue from 'Vue'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import $ from 'jquery'

  export default {
    name: 'search',
    data: function () {
      return {
        searchResults: [],
        labs: {},
        user: fb.auth().currentUser,
        userName: '',
        email: '',
        photo: '',
        userId: ''
      }
    },
    methods: {
      doSearch: function (entry, vm) {
          vm.searchResults =[]
        if (!vm.userName) {
          vm.setUser()
        }
        return new Promise(function (resolve, reject) {
          let results = []
          let labs = vm.labs
          $(labs).each(function (index, item) {
            let currentLabName = item['name']
            if (currentLabName.includes(entry)) {


              //todo check for invitation here
              let invitees = item['invitees']
              $(invitees).each(function (index, it) {
                  if(it.userId === vm.userId){
                    item.isUserInvited = true
                  }
              })

              results.push(item)
            }
          })
          if (results.length > 0) {
            resolve(results)
            return true
          } else {
            reject()
            return false
          }
        })
      },
      parseFoundLabsCallback: function (results, vm) {
        vm.searchResults = []
        vm.searchResults = results
      },
      noSearchResultsCallback: function () {
          let vm = this
        vm.searchResults = []
      },
      isLabPage: function () {
        return this.$route.name === 'lab'
      },
      createNewLab: function () {
        labKey = firebase.database().ref(fbpaths().labs()).push().key
        this.navigateToLab(this.labName, labKey)
      },
      requestInvitation : function () {

      },
      navigateToLab: function (labName, labKey) {

        if (!labName || labName.trim() === '') {
          alert('enter a lab name')
          return false
        }

        let rObj = {name: 'lab', params: {id: labName, labKey: labKey}}

        this.$router.push(rObj,
          function () {
            console.log('navigated to ' + labName)
          }, function () {
            console.log("couldn't navigated to " + labName)
          })
      },
      getLabId: function () {
        let labInput = $('#lab-path-input')
        return labInput.val()
      },
      setUser: function () {
        let vm = this
        vm.user = fb.auth().currentUser;
        if (vm.user) {
          vm.userName = this.user.displayName;
          vm.email = this.user.email;
          vm.photo = this.user.photoURL;
          vm.userId = this.user.uid;
        }
      }
    },
    firebase: {
      labs: {
        source: fb.database().ref(fbpaths().labs()),
        cancelCallback: function () {
        },
        readyCallback: function () {
        },
        asObject: false
      }
    },
    mounted(){
      let vm = this
      if (!vm.user) {
        vm.setUser()
      }
      console.log('set up search text input reactivity')
      let labPathInput = $('#lab-path-input')
      labPathInput.on("change paste keyup", function () {
        let searchText = labPathInput.val()
        vm.searchResults = []

        if (searchText.length < 1) {
          return false
        }
        vm.doSearch(searchText, vm)
          .then(function (results) {
            vm.parseFoundLabsCallback(results, vm)
          })
          .catch(function () {
            vm.noSearchResultsCallback()
          })
      })

      $("#lab-path-input").on('keydown', function (event) {
        if (event.keyCode === 13) {
          navigateToLab('lab')
        }
      });
    },

  }
</script>

<style scoped>

  .lab-info-text{
    width: 100%;

  }

  .lab-text {
    font-style: italic;
    font-family: "Comic Sans MS";
    margin-top: -10px;
  }

  #app {
    position: absolute;
    width: auto;
    height: auto;
    margin-top: 0;
    background-color: #212733
  }

  #result-item{
    border: 1px solid transparent;
    height: auto;
    width: auto;
  }

  #div-input-path {
    position: relative;
    margin-left: 30px;
    height: auto;
    width: 100%;
    margin-top: 0;
    border: 1px solid transparent;
    background-color: transparent;
  }

  #results-list {
    position: relative;
    margin-left: 20px;
    height: auto;
    width: 100%;
    margin-top: calc(20% + 10px);
    border: 1px solid transparent;
    background-color: #212733
  }

  #results-list li {
    background-color: #212733;
    height: 100px;
  }

  #results-list li span {
    color: white;
    font-family: "Comic Sans MS",monospace;
    font-size: 35px;
  }

  #results-list li:hover {
    cursor: pointer;
  }

  .lg-go , .lg-go-first{
    position: absolute;
    margin-top: 0;
    width: 50px;
    height: 50px;

  }

  .lg-go{
    margin-left: 40px;
  }

  #lab-prefix {
    margin-top: 100px;
    text-decoration: none;
    font-size: 60px;
  }

  #lab-path-input {
    position: relative;
    border: 1px solid transparent;
    border-radius: 6px;
    height: 65px;
    background-color: transparent;
    padding: 0;
    padding-left: 20px;
    margin-top: 0px;
    margin-left: 10px;
    font-size: 70px;
    font-style: italic;
    font-family: "Comic Sans MS";
    width: 80%;
  }

</style>
