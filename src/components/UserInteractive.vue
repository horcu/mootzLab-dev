<template>
  <div id="editor-interactive">
    <slick ref="slick" :options="slickOptions">
      <a v-for="user in streamUsersInteractive"  class="message" data-toggle="popover" :title="user.uname" data-placement="bottom" :data-content="user.bio">
        <img class=user-interactive" :src="user.photo"  />
      </a>
    </slick>
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
  import Slick from 'vue-slick'

  //import {tab, tabset } from 'vueboot';

  export default {
    name:'user-interactive',
    components: {
      Slick
    },
    data: function () {
      return {
        streamUsersInteractive: {},
        slickOptions: {
          slidesToShow: 3,
          // Any other options that can be got from plugin documentation
        },
      }
    },
    mounted(){
      let options = {
        cellHeight: 80,
        verticalMargin: 5
      };
      $('.grid-stack').gridstack(options);
    },
    watch: {
      streamUsersInteractive: {
        handler: function (val, oldVal) {

        },
        deep: true
      }
    },
    created(){
let vm = this
      vm.firebase =  function() {
        return {
          streamUsersInteractive: {
            source: getInteractiveUsers(),
            cancelCallback: function () {
            },
            readyCallback: function () {

            },
            asObject: false
          },
        }
      }
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
      getInteractiveUsers: function(){
        return this.$root.$firebaseRefs.streamUsers
      }
    },
  }
</script>

<style scoped>


  img.user-interactive {
    position: relative;
    width: 55px;
    height: 5px;
  }
</style>
