<template>
  <div id="editor-rside" class="tabbable hidden">
    <!--<div class="message_template">-->
      <!--<li v-for="user in streamUsers" class="message">-->
        <!--<div class="message-block">-->
          <!--<div class="avatar pull-right">-->
            <!--<img class="user-img" :src="user.photo"/>-->
          <!--</div>-->
          <!--<div class="text_wrapper pull-right">-->
            <!--<div class="text"></div>-->
          <!--</div>-->
        <!--</div>-->

      <!--</li>-->
    <!--</div>-->

    <ul class="users-ul">
      <li v-for="user in streamUsers"  class="message">
        <a  data-toggle="popover" title="user.uname" data-content="user.bio">
          <img class="user-img" width="40" height="40" :src="user.photo"/>
      </a>
      </li>
    </ul>

    <!--<div  class="tab-content">-->
      <!--<div v-for="user in streamUsers" class="tab-pane users-info-tab" :id="user.userId">-->
        <!--<p>{{user.bio}}</p>-->
      <!--</div>-->
    <!--</div>-->

    </div>
</template>

<script>

  import Vue from 'Vue'
  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import {tab, tabset } from 'vueboot';

  export default {
      components:{
        tabset,
        tab
      },
      data: function(){
          return {
            streamUsers: {}
          }
      },
    mounted(){
      $('[data-toggle="popover"]').popover();
    },
    methods: {

    },
    firebase :{
      streamUsers : {
    source: fb.database().ref(fbpaths().users()),
      cancelCallback: function () {
    },
    readyCallback: function () {
    },
    asObject: false
  },
    }

  }
</script>

<style scoped>

  #editor-rside {
    position: fixed;
    height: 100%;
    right: 0;
    min-height: 50px;
    width: auto;
    min-width: 50px;
    margin-top: 10px;
    margin-bottom: 70px;
    background-color: transparent;
  }

  users-ul{
    z-index: 2000;
  }

  .message {
    text-decoration: none;
    background: none;
  }

  .nav-tabs>li.active>a,li.message>a:hover, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover ,.nav-tabs>li.active, .nav-tabs>li:focus, .nav-tabs>li:hover{
    background: none;
    border: none;
  }

 .users-info-tab{
   position: fixed;
   height: 100%;
   min-width: 20%;
   right: 0px;
   margin-right: 65px;
   border: 1px dotted whitesmoke;
   -webkit-border-radius: 6px;
   -moz-border-radius: 6px;
   border-radius: 6px;
 }

  .nav-tabs {
    float: right;
    border-bottom: 0;
    z-index: 1050;
  }

  .nav-tabs li {
    float: none;
    margin: 0;
    z-index: 1050;
  }


  .tab-content {
    margin-left: 45px;
  }

  .tab-pane {
    display: none;
    background-color: #fff;
    padding: 1.6rem;
    overflow-y: auto;
  }


  li.message {
    list-style-type: none;
  }

  .message_template li {
    list-style-type: none;
  }
  .messages {
    position: absolute;
    list-style: none;
    padding: 20px 10px 0 10px;
    height: auto;
    overflow: hidden;
    bottom: 0;
    margin-bottom: 80px;
  }

  div.avatar img {
    width: 50px;
    height: 50px;
  }

  .message-block{
    position: relative;
    display: block;
    width: auto;
    min-width: 300px;
  }

  div.avatar:hover , .message-block{
    cursor: pointer;
  }
  .user-img {
    border: 1px solid whitesmoke;
    border-radius: 24px;
    float: right;
  }

  .ace_editor{
    background: whitesmoke url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQ…ga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC);

  }

  .ace-ambiance .ace_keyword {
    color: #cda869;
  }

  .ace-ambiance .ace_identifier {
  }

  .ace-ambiance .ace_paren {
    color: #24C2C7;
  }

  .ace-ambiance .ace_punctuation.ace_operator {
    color: #fa8d6a;
  }
</style>
