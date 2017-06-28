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

    <div id="slick-box">

    <slick ref="slick" :options="slickOptions">
      <a v-for="user in streamUsers"  class="message" data-toggle="popover" :title="user.uname" data-placement="bottom" :data-content="user.bio">
        <img class="user-img" :src="user.photo"  />
      </a>
    </slick>


    </div>
    </div>
</template>

<script>

  import Vue from 'Vue'
  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import Slick from 'vue-slick'

  //import {tab, tabset } from 'vueboot';

  export default {
      components:{
        Slick
      },
      data: function(){
          return {
            streamUsers: {},
            slickOptions: {
                slidesToShow: 1,
                // Any other options that can be got from plugin documentation

              }
          }
      },
    mounted(){
    },
    methods: {
      slick_next() {
        this.$refs.slick.next();
      },
      slick_prev() {
        this.$refs.slick.prev();
      },
      slick_reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$refs.slick.reSlick();
      },
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
  @import '../../node_modules/slick-carousel/slick/slick.css';
  .slick-dir{
    margin-top: 16px;
  }

#slick-box{
  position: relative;
  width: 100%;
}

#slick-box a img:hover{
  cursor: pointer;
}

  li.message{
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

  img.user-img{
    width: 60px;
    height: 60px;
    margin: 3px;
    float: right;
    border: 1px dotted wheat;
    border-radius: 4px;
  }

  img.user-img:hover{
    cursor: pointer;
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
