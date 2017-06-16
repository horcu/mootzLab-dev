<template>

  <div id="app">
    <div id="main" class="wrapper">
      <header class="main-header box box-widget">

        <!-- Logo -->
        <a href="index.html" class="logo">

          <span class="logo-sm"><b>Mootz</b>LAB</span>
        </a>

        <nav id="headNav" class="navbar navbar-static-top fixed sidebar-collapse" role="navigation">

          <ul v-show="!isLogin()" id="editor-controls" class="nav navbar-nav pull-right">


            <!--settings-->
            <li v-on:click="toggleSettingsNav" data-toggle="control-sidebar" class="e-tab pull-right" data-placement="bottom" title="settings">
              <a>
                <small>settings </small>
                &nbsp<img src="/static/img/gear.png" class="right-btn"></a>
            </li>


            <li  v-on:click="toggleCommentsNav">
              <a data-toggle="tooltip" data-placement="bottom" title="comments" class="pull-right">

                  <small>users</small>
                  &nbsp<img src="/static/img/users.png" alt="about"/>
              </a>
            </li>

            <li v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="labs"
                class="e-tab chalk-tab pull-right active">
              <a>
                <small>labs </small>
                &nbsp
                <img class="text-light-blue" id="c-board-img" src="/static/img/briefcase.png"
                     alt="assignments"/>
              </a>
            </li>

            <li v-on:click="navigateToLab('session')">
             <a>Go</a>
            </li>

            <li class="go-lab">
              <input id="lab-path-input" type="text" class="form-control" placeholder="/lab/" value=""/>
                <!--<router-link v-bind:to="'/lab/'"></router-link>-->
            </li>
          </ul>
          <!--</div>-->
        </nav>

      </header>

      <div v-show="isLogin()" id="sign-in-div" class="container">

        <script id="metamorph-1-start" type="text/x-placeholder"></script><script id="metamorph-21-start" type="text/x-placeholder"></script>

        <div class="container text-center">
          <form class="form-signin" data-ember-action="2">
            <h2 class="form-signin-heading">Sign in</h2>

            <small class="text-muted">Connect [your service] with your favorite social network</small>
            <br><br>


            <p>
              <a class="btn btn-primary social-login-btn social-facebook" href="/auth/facebook"><i class="fa fa-facebook"></i></a>
              <a class="btn btn-primary social-login-btn social-twitter" href="/auth/twitter"><i class="fa fa-twitter"></i></a>
            </p>
            <p>
              <a class="btn btn-primary social-login-btn social-linkedin" href="/auth/linkedin"><i class="fa fa-linkedin"></i></a>
              <a class="btn btn-primary social-login-btn social-google" href="/auth/google"><i class="fa fa-google-plus"></i></a>
            </p>

            <div class="btn-group social-login-more">
              <button type="button" class="btn btn-flat dropdown-toggle btn-block" data-toggle="dropdown">
                More...
              </button>
              <ul class="dropdown-menu text-left " role="menu">
                <li><a href="#"><i class="fa fa-tumblr-sign"></i>   Tumblr</a></li>
                <li><a href="#"><i class="fa fa-github-alt"></i>   Github</a></li>
                <li><a href="#"><i class="fa fa-dropbox"></i>   Dropbox</a></li>
                <li><a href="/auth/amazon"><span class="zocial-amazon"></span>   Amazon</a></li>
                <li><a href="#"><span class="zocial-bitbucket"></span>   Bitbucket</a></li>
                <li><a href="#"><span class="zocial-evernote"></span>   Evernote</a></li>
                <li><a href="#"><span class="zocial-meetup"></span>   Meetup</a></li>
                <li><a href="#"><i class="fa fa-windows"></i>   Windows Live</a></li>
                <li><a href="#"><i class="fa fa-weibo"></i>   Weibo</a></li>
                <li><a href="#"><i class="fa fa-foursquare"></i>   Foursquare</a></li>
                <li><a href="#"><i class="fa fa-stackexchange"></i>   Stack Exchange</a></li>
                <li><a href="#"><i class="fa fa-trello"></i>   Trello</a></li>
                <li><a href="#"><span class="zocial-wordpress"></span>   Wordpress</a></li>
              </ul>
            </div>
            <br><br>


            <small class="text-muted">Or sign in with [your service]</small>
            <br><br>

            <input id="username-tb" class="ember-view ember-text-field form-control login-input" placeholder="Email Address" type="text">
            <input id="pw-tb" class="ember-view ember-text-field form-control login-input-pass" placeholder="Password" type="password">

            <script id="metamorph-22-start" type="text/x-placeholder"></script><script id="metamorph-22-end" type="text/x-placeholder"></script>

            <button v-on:click="navigateToLab('lab')" class="btn btn-lg btn-flat btn-block btn-center" type="submit" data-bindattr-3="3">Sign in</button>
            <br>
            <small class="create-account text-muted">Dont have a [your service] or social network account? <button id="ember363" class="ember-view btn btn-sm btn-default"> Sign Up </button> </small>
          </form>
        </div>
      </div>

    </div>

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

  import App from 'src/App.vue'
  import $ from 'jquery'
  import Lab from "./components/Lab";


  export default {
    components: {Lab},
    name: 'app',
    template: a => a(App),
    render: r => r(App),

    methods: {
      un : function () {
          let unTb = $('#username-tb')
        return unTb.val()
      },
        isLogin: function () {
          console.log('app', 'entering session: ' + this.$route.name)
         return this.$route.name ==='login'
        },
      navigateToLab: function (route) {
            let val  = this.un()

           if(!val || val.trim() === ''){
                alert('enter a username first')
                return false
            }


          let id = this.getLabId()
        let rObj = { name: route, params: { id: id }}

        this.$router.push(rObj,
          function () {
            console.log('navigated to ' + route + '/' + id)
          }, function () {
            console.log("couldn't navigated to " + route + '/' + id)
          })
      },
      getLabId : function () {
          let labInput = $('#lab-path-input')
        return labInput.val()
      },
      toggleAssignmentNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'
        if (_isOpened(sb_asgn)) {
          _resize(sb_asgn, '0', '400')
          _resize('#editor','100%', '400')

          if(!_isOpened(sb_vid)){
            _replaceImage('img#exp-img', '/static/img/expand-left.png' )
          }

        } else {
          _resize(sb_asgn, '40%', '400')
          _resize('#editor','60%', '400')
          _replaceImage('img#exp-img', '/static/img/expand-right.png' )

        }
      },
      toggleCommentsNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'

        if (_isOpened(sb_asgn)){
          _resize(sb_asgn,'0', '300')
        }

        if (_isOpened(sb_vid)){
          _resize(sb_vid,'0', '300')
        }

      },
      toggleSessionsNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'
        if (_isOpened(sb_vid)) {
          _resize(sb_vid, '0', '300')
          _resize('#editor','100%', '300')

          if(!_isOpened(sb_asgn)){
            _replaceImage('img#exp-img', '/static/img/expand-left.png' )
          }

        } else {
          _resize(sb_vid, '40%', '300')
          _resize('#editor','60%', '300')
          _replaceImage('img#exp-img', '/static/img/expand-right.png' )

        }
      },
      toggleSettingsNav: function(e){
        let settBox = $('#sidebar-settings')

        if (_isOpened(settBox)) {
          _resize(settBox, '0', 300)
        }else{
          _resize(settBox, '40%', 300)
        }
      }
    }
  }

  function _isOpened (el) {
    return $(el).css('width') > '5%'
  }
  function _resize (el, howBigVal, speed) {
    $(el).animate({'width': howBigVal}, speed)
  }
  function _moveComments (howMuch, speed) {
    $('#comments-tab').stop().hide(250).animate({'right': howMuch}, speed).show(150)
  }
  function _swapClasses(el, first, second, speed){
    $(el).stop().hide(10).removeClass(first).addClass(second).fadeIn(speed)
  }

  function _replaceImage(el, newSrc){
    $(el).fadeOut(700).stop(500).attr('src', newSrc).fadeIn()
  }

  function addUserWebcam (videos, div) {
      slideIndex++;
      $(videos).slick('slickAdd', div);
  }
  function removeUserWebcam (videos, div) {
    slideIndex--;
    $(videos).slick('slickRemove', div);
  }

</script>
<!-- styling for the component -->
<style>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';

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
    margin-top: 10px;
    width: 225px;
  }

  #editor-controls li.go-lab input:hover {
  background-color: whitesmoke;
    border: 1px solid transparent;

  }

  .main-header a.logo {
    text-decoration: none;
    width: 150px;
  }

  #main-sect {
    position: relative;
    margin-top: 10px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
