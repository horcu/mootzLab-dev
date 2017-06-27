<template>
  <header class="main-header box box-widget with-border">
  <!-- Logo -->
  <a href="/l" class="logo">
  <span><b>Mootz</b>LAB</span>
  </a>

  <nav id="headNav" class="navbar navbar-static-top fixed" role="navigation">

  <ul class="top-nav nav navbar-nav">

  <li  class="pull-left">
  <a>share &nbsp <img src="/static/img/share.png"/></a>
  </li>

  <li  v-on:click="logOut()" class="pull-right">
  <a class="pull-right">log out</a>
  </li>

  <li  v-on:click="toggleSettingsNav" data-toggle="control-sidebar"
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
</template>

<script>

  import Lab from '../components/Lab'
  export default {
    name: 'top',
    components:{Lab},
    methods: {
      saveCode(labName, userName, probId){
        Lab.methods.saveCodeToFirebase()
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
    }
  }
</script>

<style scoped>

  .top-nav{
    width: 100%;
  }
  .main-header {
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 0 ;
  }
</style>
