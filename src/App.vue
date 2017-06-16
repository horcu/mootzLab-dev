<template>

  <div id="app">
    <div id="main" class="wrapper">
      <header class="main-header box box-widget">

        <!-- Logo -->
        <a href="index.html" class="logo">
          <!--&lt;!&ndash; mini logo for sidebar mini 50x50 pixels &ndash;&gt;-->
          <!--<span class="logo-mini"><b>M</b>L</span>-->

          <!-- logo for regular state and mobile devices -->
          <span class="logo-sm"><b>Mootz</b>LAB</span>
        </a>

        <!-- Header Navbar: style can be found in header.less -->
        <nav id="headNav" class="navbar navbar-static-top fixed sidebar-collapse" role="navigation">

          <!--&lt;!&ndash; Sidebar toggle button&ndash;&gt;-->
          <!--<span class="sr-only">Toggle navigation</span>-->

          <!--<a data-toggle="popover" data-placement="bottom" title="options" data-content="Settings will go here">-->
          <!--<img id="options-img" class="sidebar-toggle" src="/static/img/options.png" alt="options"/>-->
          <!--</a>-->

          <ul id="editor-controls" class="nav navbar-nav pull-right">


            <!--settings-->
            <li v-on:click="toggleSettingsNav" data-toggle="control-sidebar" class="e-tab pull-right" data-placement="bottom" title="settings">
              <a>
                <small>settings </small>
                &nbsp<img src="/static/img/gear.png" class="right-btn"></a>
            </li>

            <!--inbox-->
            <li v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="Assignements"
                class="e-tab chalk-tab pull-right">
              <a>
                <small>docs </small>
                &nbsp
                <img class="text-light-blue" id="c-board-img" src="/static/img/briefcase.png"
                     alt="assignments"/>
              </a>
            </li>

            <li v-on:click="toggleSessionsNav" data-toggle="tooltip" data-placement="bottom" title="sessions"
                class="pull-right sessions-ta active">
              <a>
                <small>users</small>
                &nbsp
                <img id="rtc-session" src="/static/img/webcam.png" alt="lab sessions"/>
              </a>
            </li>

            <li  v-on:click="toggleCommentsNav">
              <a data-toggle="tooltip" data-placement="bottom" title="comments" class="pull-right">

                  <small>comments</small>
                  &nbsp<img src="/static/img/users.png" alt="about"/>
              </a>
            </li>
            <li class="go-lab">
              <input type="text" class="form-control" placeholder="/lab/" value=""/>
                <!--<router-link v-bind:to="'/lab/'"></router-link>-->
            </li>

          </ul>
          <!--</div>-->
        </nav>

      </header>
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


  export default {
    name: 'app',
   data: function() {
      return {
      }
   },
    template: a => a(App),
    render: r => r(App),
    methods: {
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
          _resize(sb_asgn,'0', '400')
        }

        if (_isOpened(sb_vid)){
          _resize(sb_vid,'0', '400')
        }

      },
      toggleSessionsNav: function (e) {
        let sb_asgn = '#sidebar-assignments'
        let sb_vid = '#sidebar-videos'
        if (_isOpened(sb_vid)) {
          _resize(sb_vid, '0', '400')
          _resize('#editor','100%', '400')

          if(!_isOpened(sb_asgn)){
            _replaceImage('img#exp-img', '/static/img/expand-left.png' )
          }

        } else {
          _resize(sb_vid, '40%', '400')
          _resize('#editor','60%', '400')
          _replaceImage('img#exp-img', '/static/img/expand-right.png' )

        }
      },
      toggleSettingsNav: function(e){
        let settBox = $('#sidebar-settings')

        if (_isOpened(settBox)) {
          _resize(settBox, '0', 400)
        }else{
          _resize(settBox, '40%', 400)
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

  #editor-controls li.go-lab input{
    margin-top: 10px;
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
