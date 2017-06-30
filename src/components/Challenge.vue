<template>
  <div id="app">
    <div class="grid-stack">
      <div class="grid-stack-item"
           data-gs-x="0" data-gs-y="0"
           data-gs-width="4" data-gs-height="2">
        <div class="grid-stack-item-content">
          <span>item 1</span>
        </div>
      </div>
      <div class="grid-stack-item"
           data-gs-x="4" data-gs-y="0"
           data-gs-width="4" data-gs-height="4">
        <div class="grid-stack-item-content">
          <span>item 2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import $ from 'jquery'
  import 'jquery-ui/jquery-ui'
  import 'gridstack'

  export default {
      name: 'challenge',
    components: {},
      data(){},
    mounted(){
      $(function () {
        let options = {
          cellHeight: 40,
          verticalMargin: 10
        };
        $('.grid-stack').gridstack(options);
      });
    }

  }
</script>

<style scoped>

  @import "/static/gridstack/css/gridstack.css";
</style>
