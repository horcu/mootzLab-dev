<template>
<router-view>

</router-view>
</template>
<script>

  import $ from 'jquery'
  import firebase from 'firebase';
  import fb from 'src/fb-config'
  import firebaseui from 'firebaseui'
  import fbpaths from 'src/fbPaths'
  import Lab from './components/Lab'
  import Top from './components/Top.vue'
  import Settings from './components/Settings.vue'
  import Users from './components/Users.vue'
  import Search from './components/Search.vue'

  export default {
    components: {Lab, Top, Settings, Users, Search},
    name: 'main',
    data() {
      return {

        user: fb.auth().currentUser,
        userName: '',
        email: '',
        photo: '',
        userId: ''
      }
    },

    methods: {
      isLoggedIn: function () {
        return true
      },
      requestLabInvitation: function () {
        // todo find the lab by its name in the mapping table then send a request
        // todo [with your id, and name??] to the person to add you to the list
      },
      logOut() {
        firebase.auth().signOut();
      },
      isLogin: function () {
        console.log('app', 'entering lab: ' + this.$route.name)
        return this.$route.name === 'auth'
      },

    },

  }

</script>
<style>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';
  @import "/static/css/firebaseui.css";

  html {
    color: #898E91;
  }

  body {
    background-color: #212733;
  }

  #main {
    background-color: #212733;
    position: absolute;
    width: 100%;
    height: 100%;

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

  #lab-path-input:active, #lab-path-input:focus {
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
    color: whitesmoke;
  }

  #sign-in-div {
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

  .form-signin {
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

  .btn-center {
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

  .social-google:hover {
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

  #editor-controls li.go-lab input {
    margin-top: 5px;
    margin-left: 3px;
    width: 225px;
  }

  #editor-controls li.go-lab input:hover {
    background-color: whitesmoke;
    border: 1px solid transparent;

  }

  #editor-controls li.go-lab a {
    text-decoration: none;
  }

  #editor-controls li.go-lab a:hover {
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
