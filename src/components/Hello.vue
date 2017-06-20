<template>
  <div id="app">

    <!--<div id="main">-->
      <header class="main-header box box-widget">

        <!-- Logo -->
        <a href="index.html" class="logo">

          <span class="logo-sm"><b>Mootz</b>LAB</span>
        </a>

        <nav id="headNav" class="navbar navbar-static-top fixed sidebar-collapse" role="navigation">

          <ul v-show="!isLogin()" id="editor-controls" class="nav navbar-nav pull-left">

            <li class="pull-left">
              <a>
               <strong> {{$route.params.id}}</strong>
              </a>
            </li>


            <!--stop build-->
            <li v-show="isLabPage()" data-toggle="tooltip" data-placement="bottom" title="stop" class="pull-left">
              <a> <img id="code-editor-controls-stop" width="15px" height="15px" src="/static/img/stop.png"
                       alt="build"/></a>
            </li>

            <!--build code-->
            <li v-show="isLabPage()" class="pull-left" v-on:click="saveCode('', '', '0')"
                data-toggle=" tooltip
                " data-placement="bottom" title="build">
              <a> <img id="code-editor-controls-play" width="15px" height="15px"
                       src="/static/img/play-button%20(1).png" alt="build"
              /></a>

            </li>

          </ul>

          <ul v-show="!isLogin()"  class="nav navbar-nav pull-right">


            <!--<li v-show="isLabPage()" class="pull-left">-->
              <!--<a>share &nbsp <img src="/static/img/share.png"/></a>-->

            <!--</li>-->

            <li v-show="!isLabPage() && !isLogin()" v-on:click="logOut()" class="pull-right">
              <a class="pull-right">log out</a>
            </li>

            <li v-show="isLabPage()" v-on:click="toggleSettingsNav" data-toggle="control-sidebar"
                class="e-tab pull-right" data-placement="bottom" title="settings">
              <a>
                <small>settings </small>
                &nbsp<img src="/static/img/gear.png" class="right-btn"></a>
            </li>


            <!--<li v-show="isLabPage()" v-on:click="toggleCommentsNav">-->
              <!--<a data-toggle="tooltip" data-placement="bottom" title="comments" class="pull-right">-->

                <!--<small>users</small>-->
                <!--&nbsp<img src="/static/img/users.png" alt="about"/>-->
              <!--</a>-->
            <!--</li>-->

            <!--<li v-show="isLabPage()" v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom"-->
                <!--title="labs"-->
                <!--class="e-tab chalk-tab pull-right active">-->
              <!--<a>-->
                <!--<small>labs </small>-->
                <!--&nbsp-->
                <!--<img class="text-light-blue" id="c-board-img" src="/static/img/briefcase.png"-->
                     <!--alt="assignments"/>-->
              <!--</a>-->
            <!--</li>-->

          </ul>
          <!--</div>-->
        </nav>

      </header>

      <div v-show="isLogin()" id="sign-in-div" class="container">

        <div id="firebaseui-auth-container"></div>


        <!--<script id="metamorph-1-start" type="text/x-placeholder"></script>-->
        <!--<script id="metamorph-21-start" type="text/x-placeholder"></script>-->

        <!--<div class="container text-center">-->
        <!--<form class="form-signin" data-ember-action="2">-->
        <!--<h2 class="form-signin-heading">Sign in</h2>-->

        <!--<small class="text-muted">Connect [your service] with your favorite social network</small>-->
        <!--<br><br>-->


        <!--<p>-->
        <!--<a class="btn btn-primary social-login-btn social-facebook" href="/auth/facebook"><i class="fa fa-facebook"></i></a>-->
        <!--<a class="btn btn-primary social-login-btn social-twitter" href="/auth/twitter"><i class="fa fa-twitter"></i></a>-->
        <!--</p>-->
        <!--<p>-->
        <!--<a class="btn btn-primary social-login-btn social-linkedin" href="/auth/linkedin"><i class="fa fa-linkedin"></i></a>-->
        <!--<a class="btn btn-primary social-login-btn social-google" href="/auth/google"><i class="fa fa-google-plus"></i></a>-->
        <!--</p>-->

        <!--<div class="btn-group social-login-more">-->
        <!--<button type="button" class="btn btn-flat dropdown-toggle btn-block" data-toggle="dropdown">-->
        <!--More...-->
        <!--</button>-->
        <!--<ul class="dropdown-menu text-left " role="menu">-->
        <!--<li><a href="#"><i class="fa fa-tumblr-sign"></i>   Tumblr</a></li>-->
        <!--<li><a href="#"><i class="fa fa-github-alt"></i>   Github</a></li>-->
        <!--<li><a href="#"><i class="fa fa-dropbox"></i>   Dropbox</a></li>-->
        <!--<li><a href="/auth/amazon"><span class="zocial-amazon"></span>   Amazon</a></li>-->
        <!--<li><a href="#"><span class="zocial-bitbucket"></span>   Bitbucket</a></li>-->
        <!--<li><a href="#"><span class="zocial-evernote"></span>   Evernote</a></li>-->
        <!--<li><a href="#"><span class="zocial-meetup"></span>   Meetup</a></li>-->
        <!--<li><a href="#"><i class="fa fa-windows"></i>   Windows Live</a></li>-->
        <!--<li><a href="#"><i class="fa fa-weibo"></i>   Weibo</a></li>-->
        <!--<li><a href="#"><i class="fa fa-foursquare"></i>   Foursquare</a></li>-->
        <!--<li><a href="#"><i class="fa fa-stackexchange"></i>   Stack Exchange</a></li>-->
        <!--<li><a href="#"><i class="fa fa-trello"></i>   Trello</a></li>-->
        <!--<li><a href="#"><span class="zocial-wordpress"></span>   Wordpress</a></li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<br><br>-->


        <!--<small class="text-muted">Or sign in with [your service]</small>-->
        <!--<br><br>-->

        <!--<input id="username-tb" class="ember-view ember-text-field form-control login-input" placeholder="Email Address" type="text">-->
        <!--<input id="pw-tb" class="ember-view ember-text-field form-control login-input-pass" placeholder="Password" type="password">-->

        <!--<script id="metamorph-22-start" type="text/x-placeholder"></script><script id="metamorph-22-end" type="text/x-placeholder"></script>-->

        <!--<button v-on:click="navigateToLab('lab')" class="btn btn-lg btn-flat btn-block btn-center" type="submit" data-bindattr-3="3">Sign in</button>-->
        <!--<br>-->
        <!--<small class="create-account text-muted">Dont have a [your service] or social network account? <button id="ember363" class="ember-view btn btn-sm btn-default"> Sign Up </button> </small>-->
        <!--</form>-->
        <!--</div>-->
      </div>

    <!--</div>-->

    <router-view>

    </router-view>

    <!-- Control Sidebar -->
    <aside id="sidebar-settings" class="control-sidebar-settings control-sidebar control-sidebar-light">
      <ul class="nav nav-pills no-padding no-margin">
        <li v-on:click="toggleCommentsNav" data-toggle="tooltip" data-placement="bottom" title="hide"
            class="pull-right disabled">
          <a> <img id="close-comments-window" width="12px" height="12px" src="/static/img/cancel.png"
                   alt="build"/></a>
        </li>
      </ul>
      <!--&lt;!&ndash; Create the tabs &ndash;&gt;-->
      <!--<ul class="nav nav-tabs nav-justified control-sidebar-tabs">-->
      <!--<li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>-->
      <!--<li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>-->
      <!--</ul>-->
      <!--&lt;!&ndash; Tab panes &ndash;&gt;-->
      <!--<div class="tab-content">-->
      <!--&lt;!&ndash; Home tab content &ndash;&gt;-->
      <!--<div class="tab-pane" id="control-sidebar-home-tab">-->
      <!--<h3 class="control-sidebar-heading">Recent Activity</h3>-->
      <!--<ul class="control-sidebar-menu">-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<i class="menu-icon fa fa-birthday-cake bg-red"></i>-->

      <!--<div class="menu-info">-->
      <!--<h4 class="control-sidebar-subheading">Langdon's Birthday</h4>-->

      <!--<p>Will be 23 on April 24th</p>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<i class="menu-icon fa fa-user bg-yellow"></i>-->

      <!--<div class="menu-info">-->
      <!--<h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>-->

      <!--<p>New phone +1(800)555-1234</p>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<i class="menu-icon fa fa-envelope-o bg-light-blue"></i>-->

      <!--<div class="menu-info">-->
      <!--<h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>-->

      <!--<p>nora@example.com</p>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<i class="menu-icon fa fa-file-code-o bg-green"></i>-->

      <!--<div class="menu-info">-->
      <!--<h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>-->

      <!--<p>Execution time 5 seconds</p>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--</ul>-->
      <!--&lt;!&ndash; /.control-sidebar-menu &ndash;&gt;-->

      <!--<h3 class="control-sidebar-heading">Tasks Progress</h3>-->
      <!--<ul class="control-sidebar-menu">-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<h4 class="control-sidebar-subheading">-->
      <!--Custom Template Design-->
      <!--<span class="label label-danger pull-right">70%</span>-->
      <!--</h4>-->

      <!--<div class="progress progress-xxs">-->
      <!--<div class="progress-bar progress-bar-danger" style="width: 70%"></div>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<h4 class="control-sidebar-subheading">-->
      <!--Update Resume-->
      <!--<span class="label label-success pull-right">95%</span>-->
      <!--</h4>-->

      <!--<div class="progress progress-xxs">-->
      <!--<div class="progress-bar progress-bar-success" style="width: 95%"></div>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<h4 class="control-sidebar-subheading">-->
      <!--Laravel Integration-->
      <!--<span class="label label-warning pull-right">50%</span>-->
      <!--</h4>-->

      <!--<div class="progress progress-xxs">-->
      <!--<div class="progress-bar progress-bar-warning" style="width: 50%"></div>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--<li>-->
      <!--<a href="javascript::;">-->
      <!--<h4 class="control-sidebar-subheading">-->
      <!--Back End Framework-->
      <!--<span class="label label-primary pull-right">68%</span>-->
      <!--</h4>-->

      <!--<div class="progress progress-xxs">-->
      <!--<div class="progress-bar progress-bar-primary" style="width: 68%"></div>-->
      <!--</div>-->
      <!--</a>-->
      <!--</li>-->
      <!--</ul>-->
      <!--&lt;!&ndash; /.control-sidebar-menu &ndash;&gt;-->

      <!--</div>-->
      <!--&lt;!&ndash; /.tab-pane &ndash;&gt;-->
      <!--&lt;!&ndash; Stats tab content &ndash;&gt;-->
      <!--<div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>-->
      <!--&lt;!&ndash; /.tab-pane &ndash;&gt;-->
      <!--&lt;!&ndash; Settings tab content &ndash;&gt;-->
      <!--<div class="tab-pane" id="control-sidebar-settings-tab">-->
      <!--<form method="post">-->
      <!--<h3 class="control-sidebar-heading">General Settings</h3>-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Report panel usage-->
      <!--<input type="checkbox" class="pull-right" checked>-->
      <!--</label>-->

      <!--<p>-->
      <!--Some information about this general settings option-->
      <!--</p>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Allow mail redirect-->
      <!--<input type="checkbox" class="pull-right" checked>-->
      <!--</label>-->

      <!--<p>-->
      <!--Other sets of options are available-->
      <!--</p>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Expose author name in posts-->
      <!--<input type="checkbox" class="pull-right" checked>-->
      <!--</label>-->

      <!--<p>-->
      <!--Allow the user to show his name in blog posts-->
      <!--</p>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->

      <!--<h3 class="control-sidebar-heading">Chat Settings</h3>-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Show me as online-->
      <!--<input type="checkbox" class="pull-right" checked>-->
      <!--</label>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Turn off notifications-->
      <!--<input type="checkbox" class="pull-right">-->
      <!--</label>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->

      <!--<div class="form-group">-->
      <!--<label class="control-sidebar-subheading">-->
      <!--Delete chat history-->
      <!--<a href="javascript::;" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>-->
      <!--</label>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.form-group &ndash;&gt;-->
      <!--</form>-->
      <!--</div>-->
      <!--&lt;!&ndash; /.tab-pane &ndash;&gt;-->
      <!--</div>-->
    </aside>

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
        saveCode(labName, userName, probId){
            Lab.methods.saveCodeToFirebase(labName, userName, probId)
        },
      logOut() {
        firebase.auth().signOut();
      },
      un: function () {
        let unTb = $('#username-tb')
        return unTb.val()
      },
      isLogin: function () {
        console.log('app', 'entering lab: ' + this.$route.name)
        return this.$route.name === 'auth'
      },
      isLabPage: function () {
        return this.$route.name === 'lab'
      },
      _isOpened: function (el) {
        return $(el).css('width') > '5%'
      },
      _resize: function (el, howBigVal, speed) {
        $(el).animate({'width': howBigVal}, speed)
      },
      _moveComments: function (howMuch, speed) {
        $('#comments-tab').stop().hide(250).animate({'right': howMuch}, speed).show(150)
      },
      _swapClasses: function (el, first, second, speed) {
        $(el).stop().hide(10).removeClass(first).addClass(second).fadeIn(speed)
      },
      _replaceImage: function (el, newSrc) {
        $(el).fadeOut(700).stop(500).attr('src', newSrc).fadeIn()
      },
      toggleAssignmentNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'
        if (this._isOpened(sb_asgn)) {
          this._resize(sb_asgn, '0', '400')
          this._resize('#editor', '100%', '400')

          if (!this._isOpened(sb_vid)) {
            this._replaceImage('img#exp-img', '/static/img/expand-left.png')
          }

        } else {
          this._resize(sb_asgn, '40%', '400')
          this._resize('#editor', '60%', '400')
          this._replaceImage('img#exp-img', '/static/img/expand-right.png')

        }
      },
      toggleCommentsNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'

        if (this._isOpened(sb_asgn)) {
          this._resize(sb_asgn, '0', '300')
        }

        if (this._isOpened(sb_vid)) {
          this._resize(sb_vid, '0', '300')
        }

      },
      toggleSessionsNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'
        if (this._isOpened(sb_vid)) {
          this._resize(sb_vid, '0', '300')
          this._resize('#editor', '100%', '300')

          if (!this._isOpened(sb_asgn)) {
            this._replaceImage('img#exp-img', '/static/img/expand-left.png')
          }

        } else {
          this._resize(sb_vid, '40%', '300')
          this._resize('#editor', '60%', '300')
          this._replaceImage('img#exp-img', '/static/img/expand-right.png')

        }
      },
      toggleSettingsNav: function (e) {
        let settBox = $('#sidebar-settings')

        if (this._isOpened(settBox)) {
          this._resize(settBox, '0', 300)
        } else {
          this._resize(settBox, '40%', 300)
        }
      }
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
