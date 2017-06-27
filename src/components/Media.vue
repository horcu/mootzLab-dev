<template>
  <!-- Videos Control Sidebar -->
  <div id="sidebar-videos" class="hidden control-sidebar-videos">
    <ul class="nav nav-pills no-padding no-margin">
      <li v-on:click="toggleSessionsNav" data-toggle="tooltip" data-placement="bottom" title="hide"
          class="pull-right">
        <a> <img id="close-videos-window" width="12px" height="12px" src="/static/img/cancel.png"
                 alt="build"/></a>
      </li>
    </ul>

    <div id="video-section">

      <div class="box-body l-vid-box">

        <div id="panel-local-vid" class="hidden panel panel-default">
          <div class="panel-body">
            <div class="hidden" id="local-vid"></div>
          </div>
          <!--video section footer with icons-->
          <div class="small-box small-box-footer">
            <button type="button" class="btn btn-box-tool pull-right" data-toggle="tooltip"
                    title="Contacts" data-widget="chat-pane-toggle">
              <i class="fa fa-comments"></i>
            </button>
            <button type="button" class="btn btn-box-tool pull-right" data-toggle="tooltip"
                    title="video" data-widget="chat-pane-toggle">
              <i class="fa fa-video-camera"></i>
            </button>
          </div>
        </div>

      </div>

      <div id="remote-vids">

      </div>

    </div>

  </div>
</template>
