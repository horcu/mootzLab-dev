<template>
  <div id="editor-rside" class="hidden">

    <interactive id="inter" class="pull-left"></interactive>

    <div id="editor-rside-right" class="pull-left">
  <!--<input type="text" placeholder="search" />-->
  <!--<img src="/static/img/search.png">-->

    <div class="stack">
      <ul id="stack-list">
        <li class="stack-list-item"> <a><img class="stack-row-tool" src="/static/img/push-pin.png" alt="pin"/></a></li>
        <li class="stack-list-item" v-for="user in streamUsers">
          <div class="stack-row" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave">
            <div class="hidden stack-row-toolbox right">
              <a><img class="stack-row-tool" src="/static/img/envelope.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/webcam.png" alt="pin"/></a>


              <a><img class="stack-row-tool" src="/static/img/cancel.png" alt="pin"/></a>
            </div>

            <ul class="stack-row-toolbox-list">
              <li class="stack-row-toolbox-list-item">
                <div class="stack-row-item-left pull-left">
                  <img class="user-img" :src="user.photo"/>
                </div>
                <div class="stack-row-item-right pull-left">
                  <span class="stack-row-item-right-txt">{{user.bio}}</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="stack-list-item"><a><img class="stack-row-tool" src="/static/img/user.png" alt="pin"/></a></li>
        <li class="stack-list-item" v-for="user in streamUsers">
          <div class="stack-row" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave">
            <div class="hidden stack-row-toolbox pull-right">
              <a><img class="stack-row-tool" src="/static/img/envelope.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/webcam.png" alt="pin"/></a>

              <a><img class="stack-row-tool" src="/static/img/user.png" alt="pin"/></a>
              <a><img class="stack-row-tool" src="/static/img/cancel.png" alt="pin"/></a>
            </div>

            <ul class="stack-row-toolbox-list">
              <li class="stack-row-toolbox-list-item">
                <div class="stack-row-item-left pull-left">
                  <img class="user-img" :src="user.photo"/>
                </div>
                <div class="stack-row-item-right pull-left">
                  <span class="stack-row-item-right-txt">{{user.bio}}</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'Vue'
  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import 'gridstack'
  import _ from 'lodash'
  import interactive from 'src/components/UserInteractive.vue'

  //import {tab, tabset } from 'vueboot';

  export default {
  name : 'user-stream',
    components: {
    interactive
    },
    data: function () {
      return {
        streamUsers: {},
      }
    },
    mounted(){
    },
    watch: {
      streamUsers: {
        handler: function (val, oldVal) {

        },
        deep: true
      }
    },
    methods: {
      mouseOver: function(el){
        let stackRow = el
        let toolbox = stackRow.currentTarget.children[0]
        let vals =''
        if(toolbox.classList.contains('hidden')) {
            toolbox.classList.remove('hidden')
        }
      },
      mouseLeave: function(el){
        let stackRow = el
        let toolbox = stackRow.currentTarget.children[0]
        if(!toolbox.classList.contains('hidden')) {
          toolbox.classList.add('hidden')
        }
      }
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

  .stack-row-toolbox-list-item{
    position: absolute;
    float: none;
    list-style-type: none;
    min-width: 600px;
    height:100%;
    min-height: 100px;
    margin-bottom: 2px;
  }

  .stack-row-tool:hover {
    cursor: pointer;
  }

  .stack-row-item-left .stack-row-item-right {

  }

  .stack-row-item-left {
    position: relative;
    margin-right: 0;
    height: 44px;
    top:0;
    width:70px;
  }


  .stack-row-item-right {
    position: relative;
    height: 44px;
    width: 200px;
    top: 0;
  }

  .stack-row-item-right-txt {
    position: relative;
    height: auto;
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    top: 10px;
    font-family: monospace;
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
    height: 600px;
    right: 0;
    background: whitesmoke url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQ…ga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC);
  }

  #inter{
    position: absolute;
    height: 100%;
    width: 100%;
    left: 70px;
    background: whitesmoke url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAABFFUlEQ…ga9bnBq3fEVltKfO5IaSTmGjjc4J0otcP7QsJUSQM8pEj5/wCuUuC2DWz8AAAAAElFTkSuQmCC);
  }

  #editor-rside-right {
    position: absolute;
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
