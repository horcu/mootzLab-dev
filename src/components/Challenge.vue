<template>
  <div id="app" v-model="challenge">
    <draggable class="blocks pull-left" v-model="blocks">
        <div class="block" v-for="block in blocks" :key="block.id">
         <span>{{block.text}}</span>
        </div>
      <div class="block" v-for="block in expected" :key="block.slot">
        <div>[empty]</div>
      </div>
    </draggable>
    <!--<draggable class="blocks pull-left" v-model="expected">-->
    <!---->
    <!--</draggable>-->
  </div>
</template>

<script>

  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import fbpaths from 'src/fbPaths'
  import draggable from 'vuedraggable'

  export default {
      name: 'chall',
    components: {draggable},
      data: function(){
        return {
          challenge: {},
          blocks: {},
          expected: {}
        }
      },
    mounted(){
    },
    firebase: {
      challenge: {
        source: fb.database().ref(fbpaths().challenges()).limitToFirst(1),
        cancelCallback: function () {
        },
        readyCallback: function () {

        },
        asObject: false
      },
      blocks: fb.database().ref(fbpaths().challenges() + '/0/codeBlocks'),
      expected: fb.database().ref(fbpaths().challenges() + '/0/expectedOutput'),
    }
  }
</script>

<style scoped>

 #app{
   position: relative;
   top: 100px;
 }

 .blocks{
   position: relative;
  max-width: 450px;
   margin-left: 50px
 }

  .block{
    position: relative;
    border: 1px dotted #b4b4b4;
    width: auto;
    overflow: auto;
    font-size: 19px;
    padding: 7px;
    margin: 3px;
    border-radius: 6px;
    background-color: ghostwhite;
    font-family: "Comic Sans MS";
  }

 .block:hover{
   cursor: pointer;
 }
</style>
