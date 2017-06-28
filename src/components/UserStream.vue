<template>
  <div id="editor-rside" class="hidden">
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

    <!--<div id="slick-box">-->

    <!--<slick ref="slick" :options="slickOptions">-->
    <!--<a v-for="user in streamUsers"  class="message" data-toggle="popover" :title="user.uname" data-placement="bottom" :data-content="user.bio">-->
    <!--<img class="user-img" :src="user.photo"  />-->
    <!--</a>-->
    <!--</slick>-->
<div style="width: 100%; position: relative; margin-bottom: 30px; margin-left: 100px ">
  <input type="text" placeholder="search" />
  <img src="/static/img/search.png">
</div>
    <div class="stack">
      <ul id="stack-list">
        <li class="stack-list-item" v-for="user in streamUsers">
          <div class="stack-row">
            <div class=" hidden stack-row-toolbox pull-left">
              <a><img class="stack-row-tool" src="/static/img/envelope.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/webcam.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/push-pin.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/user.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/cancel.png" alt="pin"/></a>
            </div>
            <div class="stack-row-item-left pull-right">
              <span class="stack-row-item-left-txt">{{user.bio}}</span>
            </div>
            <div class="stack-row-item-right pull-right">
              <img class="user-img" :src="user.photo"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--</div>-->
  </div>
</template>

<script>

  import Vue from 'Vue'
  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import 'gridstack'
  //import Slick from 'vue-slick'

  //import {tab, tabset } from 'vueboot';

  export default {
    components: {
      //Slick
    },
    data: function () {
      return {
        streamUsers: {},
      }
    },
    mounted(){
      let options = {
        cellHeight: 80,
        verticalMargin: 5
      };
      $('.grid-stack').gridstack(options);
    },
    methods: {
//      slick_next() {
//        this.$refs.slick.next();
//      },
//      slick_prev() {
//        this.$refs.slick.prev();
//      },
//      slick_reInit() {
//        // Helpful if you have to deal with v-for to update dynamic lists
//        this.$refs.slick.reSlick();
//      },
    },
    firebase: {
      streamUsers: {
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
  /*@import '/static/css/gridstack.min.css';*/

  .stack {
    margin-right: 10px;
  }



  #stack-list {
    position: absolute;
    width: 100%;
    height: auto;

  }

  .stack-list-item {
    position: relative;
    list-style-type: none;
    margin-bottom: 2px;

  }

  .stack-row {
    position: relative;
    width: 100%;
    height: 44px;
    border: 1px dotted transparent;
  }
  .stack-row:hover {
    cursor: pointer;
    background-color: ghostwhite;
    border: 1px solid #dfdfdf;
    border-radius: 20px;
  }

  .stack-row-toolbox {
    position: absolute;
    right: 5px;

  }

  .stack-row-tool {
    margin-right: 10px;
    height: 10px;
    width: 10px;
  }

  .stack-row-tool:hover {
    cursor: pointer;
  }

  .stack-row-item-left .stack-row-item-right {

  }

  .stack-row-item-left {
    position: relative;
    width: 80%;
    height: 44px;
  }


  .stack-row-item-right {
    position: relative;
    width: 20%;
    height: 44px;
  }

  .stack-row-item-left-txt {
    position: relative;
    height: auto;
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    margin-top: 10px;
    font-family: Comic Sans MS, monospace;
  }

  img.user-img {
    position: relative;
    width: 44px;
    height: 44px;
    margin-right: 1px;
    border: 1px solid #efefef;
    border-radius: 22px;
    right: 0;
  }

  .slick-prev, .slick-next {
    background: none;
  }

  .slick-dir {
    margin-top: 16px;
  }

  #slick-box {
    position: relative;
    width: 100%;
  }

  #slick-box a img:hover {
    cursor: pointer;
  }

  li.message {
    float: none;
    list-style-type: none;
  }

  #editor-rside {
    position: fixed;
    height: 100%;
    right: 0;
    min-height: 50px;
    width: 25%;
    min-width: 50px;
    margin-bottom: 70px;
    z-index: 2000;
    background: whitesmoke url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQ…ga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC);
  }

  .nav-tabs > li.active > a, li.message > a:hover, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover, .nav-tabs > li.active, .nav-tabs > li:focus, .nav-tabs > li:hover {
    background: none;
    border: none;
  }

  .users-info-tab {
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

  .message-block {
    position: relative;
    display: block;
    width: auto;
    min-width: 300px;
  }

  div.avatar:hover, .message-block {
    cursor: pointer;
  }

  .grid-stack-item {
  }

  img.user-img:hover {
    cursor: pointer;
  }

  .ace_editor {
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
