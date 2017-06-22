<template>
  <div id="app">


    <div  id="sign-in-div" class="container">

      <div id="firebaseui-auth-container"></div>

    </div>
    <!-- Control Sidebar -->


  </div>
</template>

<script>

  //import App from 'src/App.vue'
  //import Hello from './Hello.vue'
  import $ from 'jquery'
  import Lab from "./Lab.vue";
  import firebase from 'firebase';
  import fb from 'src/fb-config'
  import firebaseui from 'firebaseui'
  import fbpaths from 'src/fbPaths'

  export default {
    name: 'app',
//  template: a => a(Hello),
//  render: r => r(Hello),
    data () {
      return {
        msg: 'Hello'
      }
    },

    methods: {


      un: function () {
        let unTb = $('#username-tb')
        return unTb.val()
      },

    },
    mounted() {
      var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    },
  }
</script>

<style scoped>

  html {
    color: #212733;
  }

  #main {
    background-color: #212733;
    position: absolute;
    width: 100%;
    height: 100%;

  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
