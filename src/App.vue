<template>
  <div class="container">
    <div v-show="isLoggedIn()" class="row">

      <div id="labs-list">
        <ul>
          <li class="go-lab">
            <div id="div-input-path"><span><a>/lab/<input id="lab-path-input" type="text" placeholder="name" value=""/></a></span>
              <span class="btn btn-flat" v-on:click="navigateToLab('lab')">Go</span>
            </div>
          </li>
        </ul>
        <ul class="list-group">
          <li class="list-group-item list-group-item-success"><span class="badge">14</span> Lab mootz - [default]</li>
          <li class="list-group-item">Lab frenz</li>
          <li class="list-group-item"><span class="badge">14</span>Horcu</li>
          <li class="list-group-item">ray</li>
          <li class="list-group-item">remy</li>
        </ul>
      </div>
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

  import App from 'src/App.vue'
  import $ from 'jquery'
  import firebase from 'firebase';
  import fbConfig from 'src/fb-config'
  import firebaseui from 'firebaseui'

  export default {
    name: 'app',
    template: a => a(App),
    render: r => r(App),

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
    }
  }

</script>
<!-- styling for the component -->
<style>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';
  @import "/static/css/firebaseui.css";

  #labs-list, #users-list{
    position: relative;
    margin-top: 100px;
    width: auto;
    min-width: 400px;
  }


  #div-input-path{
    margin-left: 2px;
  }

  #lab-path-input{
    position: relative;
    border: 1px solid ghostwhite;
    border-radius: 6px;
    height:40px;
    background-color: #ebebeb;
    padding:0;
    margin-top: -4px;
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
