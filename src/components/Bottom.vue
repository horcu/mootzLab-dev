<template>

  <footer  class="main-footer">
    <ul class="nav navbar-nav pull-left">
      <li>
        <div id="code-file-dd" class="dropdown">
          <img width="18px" height="18px" src="/static/img/gear.png" alt="file(s)"/>&nbsp; options
        </div>
      </li>
    </ul>
  </footer>
</template>

<script>

  export default {
    name:'bottom',
  }
</script>

<style scoped>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';

  .main-footer {
    position: fixed;
    bottom: 0;
    margin-bottom: 0;
    width: 100%;
    height: 45px;
    min-height: 45px;
    z-index: 1000;
    background-color: #ebebeb;
  }

  .main-footer ul li {
    list-style-type: none;
  }

</style>
