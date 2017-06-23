<template>
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
</template>

<script>

  export default {
      name: 'header',
      data : {

      },
    methods: {}
  }
</script>
<style scoped>

  </style>
