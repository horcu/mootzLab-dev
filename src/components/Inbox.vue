<template>
  <!--assignment control sidebar-->
  <aside id="sidebar-assignments" class="hidden control-sidebar-assignments">
    <ul class="nav nav-pills no-padding no-margin">

      <li v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="hide"
          class="pull-right">
        <a> <img id="close-assignment-window" width="12px" height="12px" src="/static/img/cancel.png"
                 alt="build"/></a>
      </li>
    </ul>

  </aside>

</template>
