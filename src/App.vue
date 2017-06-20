<template>
    <div id="main" v-show="isLoggedIn()">

      <div id="labs-list">

            <div class="pull-left" id="div-input-path">
              <span id="lab-prefix" class="pull-left">
                  <span class="pull-left text-white">lab/</span>
                <input class="pull-left" id="lab-path-input" type="text" placeholder="enter lab" value=""/>
                <img id="lg-go" height="128" width="110" class="btn btn-flat pull-right" v-on:click="navigateToLab('lab')"src="/static/img/next_lab.png" />
              </span>
            </div>

        <!--<ul class="list-group">-->
          <!--<li v-for="item in labSessions" class="list-group-item"> {{item.code}}</li>-->
        <!--</ul>-->
      </div>

      <aside class="hidden">
        <div id="users-list" class="col-lg-4">
          <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">Users</h4>
          </a>
          <ul class="list-group">
            <li class="list-group-item list-group-item-success">Mootz</li>
            <li class="list-group-item">kaisa</li>
            <li class="list-group-item">Cohen</li>
            <li class="list-group-item">Horatio</li>
            <li class="list-group-item">Jess</li>
          </ul>
        </div>
      </aside>
    </div>

</template>
<script>

  import $ from 'jquery'
  import firebase from 'firebase';
  import fb from 'src/fb-config'
  import firebaseui from 'firebaseui'
  import fbpaths from 'src/fbPaths'

  export default {
    name: 'app',
    data() {
      return {
        labSessions:{},
        userName:'',
        email:'',
        photo:'',
        uId: ''
      }
    },
    methods: {
      isLoggedIn: function () {
        return true
      },
      navigateToLab: function (labName) {

        if(!labName || labName.trim() === ''){
          alert('enter a lab name')
          return false
        }

        let id = this.getLabId()
        let rObj = { name: labName, params: { id: id }}

        this.$router.push(rObj,
          function () {
            console.log('navigated to ' + labName + '/' + id)
          }, function () {
            console.log("couldn't navigated to " + labName + '/' + id)
          })
      },
      getLabId : function () {
        let labInput = $('#lab-path-input')
        return labInput.val()
      }
    },
    firebase: {
      labSessions: {
        source: fb.database().ref(fbpaths().labs()),
        cancelCallback: function () {
        },
        readyCallback: function () {},
        asObject: false
      }
    },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.userName = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.uId = this.user.uid;
    }
  },
    mounted(){
      $("#lab-path-input").keydown(function(event){
        if(event.keyCode === 13){
          navigateToLab('lab')
        }
      });
    }
  }

</script>
<style>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';
  @import "/static/css/firebaseui.css";

  html{
    color: #898E91;
  }
  body{
    background-color: #212733;
  }

  #main{
    background-color: #212733;
    position: absolute;
    width : 100%;
    height: 100%;

  }


  #labs-list, #users-list{
    position: absolute;
    width: 100%;
    height:100%;
    min-height: 400px;
    margin-top: 10px;
    min-width: 400px;
    background-color: #212733
  }


  #div-input-path{
    position: relative;
    margin-left: 20px;
    height:40%;
    width: 100%;
    margin-top: 50px;
    border: 1px solid transparent;
    background-color: transparent;
  }

  #lg-go{
    position: absolute;
    margin-top: 80px;
    height: 100px;

  }

  #lab-prefix{
    text-decoration: none;
    font-size: 160px;
  }

  #lab-path-input{
    position: relative;
    border: 1px solid transparent;
    border-radius: 6px;
    height:265px;
    background-color: transparent;
    padding:0;
    padding-left: 20px;
    margin-top: 0px;
    margin-left: 10px;
    font-size: 100px;
    font-style: italic;
    font-family: 'Courier New', Monospace;
    width: 60%;
  }

  ::-webkit-input-placeholder {
    font-style: italic;
  }
  :-moz-placeholder {
    font-style: italic;
  }
  ::-moz-placeholder {
    font-style: italic;
  }
  :-ms-input-placeholder {
    font-style: italic;
  }

  #lab-path-input:active,   #lab-path-input:focus {
  border: 1px solid transparent;
    outline: none;
    background-color: transparent;
    color: whitesmoke;
  }

  #sign-in-div{
    margin-top: 60px;
  }

  /* brandico */
  [class*="brandico-"]:before {
    font-family: 'brandico', sans-serif;
  }

  /* entypo */
  [class*="entypo-"]:before {
    font-family: 'entypo', sans-serif;
  }

  /* openwebicons */
  [class*="openwebicons-"]:before {
    font-family: 'OpenWeb Icons', sans-serif;
  }

  /* zocial */
  [class*="zocial-"]:before {
    font-family: 'zocial', sans-serif;
  }

  .form-signin{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }


  .login-input {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .login-input-pass {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


  .signup-input {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .signup-input-confirm {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }



  .create-account {
    text-align: center;
    width: 100%;
    display: block;
  }

  .form-signin .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .btn-center{
    width: 50%;
    text-align: center;
    margin: inherit;
  }

  .social-login-btn {
    margin: 5px;
    width: 20%;
    font-size: 250%;
    padding: 0;
  }

  .social-login-more {
    width: 45%;
  }

  .social-google {
    background-color: #da573b;
    border-color: #be5238;
  }
  .social-google:hover{
    background-color: #be5238;
    border-color: #9b4631;
  }

  .social-twitter {
    background-color: #1daee3;
    border-color: #3997ba;
  }
  .social-twitter:hover {
    background-color: #3997ba;
    border-color: #347b95;
  }

  .social-facebook {
    background-color: #4c699e;
    border-color: #47618d;
  }
  .social-facebook:hover {
    background-color: #47618d;
    border-color: #3c5173;
  }

  .social-linkedin {
    background-color: #4875B4;
    border-color: #466b99;
  }
  .social-linkedin:hover {
    background-color: #466b99;
    border-color: #3b5a7c;
  }

  #editor-controls li.go-lab input{
    margin-top: 5px;
    margin-left: 3px;
    width: 225px;
  }

  #editor-controls li.go-lab input:hover {
  background-color: whitesmoke;
    border: 1px solid transparent;

  }
  #editor-controls li.go-lab a{
    text-decoration: none;
  }
  #editor-controls li.go-lab a:hover{
    cursor: none;
  }


  .main-header a.logo {
    text-decoration: none;
    width: 150px;
  }

  #main-sect {
    position: relative;
    margin-top: 10px;
  }

  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*}/

     */
</style>
