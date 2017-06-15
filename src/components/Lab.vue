<template>
  <div id="lab" class="lab content-wrapper">

    <section class="main-sect">
      <div class="row main-row">
        <!-- Code Box -->
        <div class="code-area">
          <div>
            <div class="box-header with-border head-wrapper">
              <ul class="nav nav-pills no-padding no-margin">
                <li class="e-tab code-tab active">
                  <div id="code-file-dd" class="dropdown">
                    <button class="btn btn-flat" type="button">
                      <a data-toggle="popover" title="Popover Header" data-placement="bottom"
                         data-content="Some content inside the popover">
                        <img width="18px" height="18px" src="/static/img/file.png" alt="file(s)"/>&nbsp; app.cs
                      </a>
                    </button>
                  </div>

                </li>

                <!--stop build-->
                <li data-toggle="tooltip" data-placement="bottom" title="stop">
                  <a> <img id="code-editor-controls-stop" width="15px" height="15px" src="/static/img/stop.png"
                           alt="build"/></a>
                </li>

                <!--build code-->
                <li v-on:click="saveCodeToFirebase(1)" data-toggle=" tooltip
                " data-placement="bottom" title="build">
                  <a> <img id="code-editor-controls-play" width="15px" height="15px"
                           src="/static/img/play-button%20(1).png" alt="build"
                  /></a>

                </li>

                <li class="col-lg-5">
                  <span class="pull-left" id="compiled-msg">

                  <a  v-on:onclick="showErrorPopover()"  data-toggle="tooltip" data-placement="bottom" title="exceptions"  class="ex-tab exception-tab pull-right">
                    <img id="exp-img" width="15px" height="15px" src="/static/img/expand-right.png" alt="exceptions"/>
                  </a>
                      <a id="error-icon-div" v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="expand" class="ex-tab expand-tab pull-right">
                    <img id="err-img" width="15px" height="15px" src="/static/img/warning.png" alt="exception"/>
                  </a>
                    </span>
                </li>

              </ul>
            </div>

            <div>

              <div id="code-tab" class="tab-pane fade in active">
                <div id="editor" class="ace-Katzenmilch">
                </div>
                <div id="comments-tab">
                  <button  class="btn btn-circle btn-sm comment-btn"
                          data-toggle="popover"><img width="15px" height="15px" src="/static/img/heart.png" />
                  </button>

                  <button class="btn btn-circle btn-sm comment-btn"
                          data-toggle="popover"><img width="15px" height="15px" src="/static/img/speech-bubble.png" />
                  </button>

                  <button class="btn btn-circle btn-sm comment-btn"
                          data-toggle="popover"><img width="15px" height="15px" src="/static/img/push-pin.png" />
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--assignment control sidebar-->
    <aside id="sidebar-assignments" class="control-sidebar-assignments">
      <ul class="nav nav-pills no-padding no-margin">

        <li v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="hide"
            class="pull-right">
          <a> <img id="close-assignment-window" width="12px" height="12px" src="/static/img/cancel.png"
                   alt="build"/></a>
        </li>
      </ul>
    </aside>

    <!-- Videos Control Sidebar -->
    <aside id="sidebar-videos" class="control-sidebar-videos control-sidebar-light">
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

    </aside>
  </div>
</template>

<!-- styling for the component -->
<!--<script src="lab.js" type="application/javascript" ></script>-->
<script>
  import Vue from 'Vue'
  import App from '../App'
  import ace from 'jenkins-ace-editor';
  import Firebase from 'firebase'
  import $ from 'jquery'

  import { db } from 'src/fb-config'
  import Lab from 'src/components/Lab.vue'
  import 'slick-carousel'

  var fbpaths = {

    // top level paths
    users: 'users/',
    challenges: 'challenges/',
    themes: 'themes/',
    languages: 'languages/',
    live: 'live-code/',
    labs: 'labs/',

    // user specific paths
    chalkboard: getUserSpecificPath('chalkboard/'),
    timeline: getUserSpecificPath('timeline/'),
    info: getUserSpecificPath('info/'),
    exceptions: getUserSpecificPath('exceptions/'),
    settings: getUserSpecificPath('settings/'),
    submissions: getUserSpecificPath('submissions/'),
    lastSavedLanguage: getUserSpecificPath('/last-saved-language/'),
    lastSavedTheme: getUserSpecificPath('/last-saved-theme/'),
    lastChallengeAttempted: getUserSpecificPath('/last-challenge-attempted/')

  }
  const userName = 'disIzPeez'
  let editor;
  let roomName = 'mootz'

  ace.config.set('basePath', 'static/ace/');



  let vids = $('#remote-vids')
  initSlickCarousel(vids);

  $.when(editor !== undefined).then(function () {
    editor.getSession().on('change', function(e) {
      Lab.saveCodeToFirebase(1)
      alert('saving')
    });

    editor.getSession().selection.on('changeSelection', function(e) {
      alert('selection made')
    });

    editor.getSession().selection.on('changeCursor', function(e) {
      alert('cursor changed')
    });
  })


  export default {
    name: 'lab',
    data() {
      return {
        labs: {},
        liveCode: {},
        challengesArray: {},
        settingsArray: {},
        chalkboardArray: {},
        exceptionsArray: {},
      }
    },
    firebase: {
      liveCode: {
        source: db.ref(fbpaths.live),
        cancelCallback: function () {
        },
        readyCallback: function () {
          syncEditorWithLab()
        },
        asObject: false
      },
      labs: {
        source: db.ref(fbpaths.labs),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      challengesArray: {
        source: db.ref(fbpaths.challenges),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      chalkboardArray: {
        source: db.ref(fbpaths.chalkboard),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      exceptionsArray: {
        source: db.ref(fbpaths.exceptions),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      settingsArray: {
        source: db.ref(fbpaths.settings),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      }
    },
    methods: {
      getLiveCode: function () {
        return this.liveCode[0]
      },
      saveCodeToFirebase: function (probId) {
        let codeEntry = editor.getValue()

        let codeToSubmit = {
          'problem-id': probId,
          'last-updated': new Date().toTimeString(),
          text: codeEntry,
        };

        let childTemplate = `/${roomName}/${userName}/code/`
        this.$firebaseRefs.labs.child(childTemplate).update(codeToSubmit)
      },

      toggleAssignmentNav: function () {
        App.methods.toggleAssignmentNav()
      },
      toggleSessionsNav: function () {
        App.methods.toggleSessionsNav()
      }
    }
  }

  function initSlickCarousel (videos) {
    videos.slick({
      centerMode: true,
      variableWidth: true,
      fade : true,
      dots: true,
      infinite: true,
      centerPadding: '60px',
      autoplay: false,
      cssEase: 'linear',
      adaptiveHeight: true,
      speed: 300,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  }

  function getUserSpecificPath (path) {
    return '/users/' + userName + '/' + path
  }

  function syncEditorWithLab () {

    editor = ace.edit("editor");

    let winSize = $(window).height();
    $(editor).animate({'height': winSize}, 400)
    editor.resize()

//    let prefix = 'https://cors-anywhere.herokuapp.com/'
//    let id = 11
//    let templatesUrl = 'http://cloudcompiler.esy.es/api/languages/template/' + id
//    let def =  $.getJSON(prefix + templatesUrl);
//
//
//    def.done(function(data, s){
//      editor.getSession().setMode("ace/mode/csharp");
//      editor.getSession().setUseWorker(true);
//      editor.setTheme('ace/theme/katzenmilch');
//      //editor.getSession().setUseWrapMode(true);
//      editor.setValue(data.source);
//      editor.clearSelection();
//    })

    let ref = db.ref(`${fbpaths.labs}/${roomName}//${userName}`)
    ref.on('value', function (snapshot) {
      if (snapshot.key === userName) {
        let editor = ace.edit("editor")
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.key === 'code') {
            let v = childSnapshot.val()

            editor.getSession().setMode("ace/mode/java");
            $('#editor').animate({'font-size': '14px'}, 200)
            editor.getSession().setUseWorker(true);
            editor.setTheme('ace/theme/ambiance');
            editor.setHighlightActiveLine(true);
            editor.setShowPrintMargin(false);
            editor.setValue(v.text);

            return true
          }
        });

        editor.clearSelection()

        addComments()
      }
    })
  }

  function addComments (comm) {

  }

  function setEditorDisabled () {
    editor.setReadOnly(true);
  }

  function setEditorEnabled () {
    editor.setReadOnly(false);
  }

</script>

<style scoped>
  @import "/static/ace/theme-monokai.css";

  .comment-btn{
    border: 1px solid ghostwhite;
    background-color: whitesmoke;
    margin-left: 5px;
  }

  .comment-btn:hover{
  cursor: pointer;
  }

  .head-wrapper{
    height:40px;
    padding:0;
    background-color: whitesmoke;
  }

  #compiled-msg{
    position: relative;
    background-color: whitesmoke;
    height: 36px;
    min-width: 100%;
    width: 100%;
    border: 1px solid transparent;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    margin-top: 7px;
  }

  #compiled-msg a {
   margin-left: 10px;
    position: relative;
    display: block;
    padding: 10px 10px;
    background-color: whitesmoke;
  }

  #compiled-msg a:hover{
    cursor: pointer;
    text-decoration: none;
    background-color: #eee;

  }

  #code-file-dd {
    margin: 3px;
    margin-top: 5px;
    margin-left: 20px;
    padding: 3px;
  }

  .code-tab {
    background-color: whitesmoke;
  }

  div#code-file-dd a {
    text-decoration: none;

  }

  div#code-file-dd button {
    border: 1px solid #d9d9d9;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }

  div#code-file-dd button:hover {
    border: 1px dotted #b4b4b4;
  }

  #editor {
    position: absolute;
    background-color: whitesmoke;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-top: 60px;
    padding-bottom: 56px;
    min-height: 650px;
    height: 100%;
    width: 55%;
    text-align: left;
    overflow-y: hidden;

    scrollbar-face-color: transparent;
    scrollbar-arrow-color: transparent;
    scrollbar-base-color: transparent;
    scrollbar-track-color: transparent;
  }

  #comments-tab{
    position: relative;
    right: 0;
    top: 0;
    bottom: 0;
    left: 55%;
    width: 35px;
    margin-left: 35px;
    height:100%;
    border-left: 2px dotted #ebebeb;
    background-color: whitesmoke;
    min-height: 600px;
    z-index: 1000;
    -webkit-transition:right .3s ease-in-out;
    -o-transition:right .3s ease-in-out;transition:right .3s ease-in-out;
  }


  .ex-tab{

    -webkit-transition:right .3s ease-in-out;
    -o-transition:right .3s ease-in-out;transition:right .3s ease-in-out;
  }

  /*.ex-tab:nth-last-child(0){*/
    /*margin-right: 60px;*/
  /*}*/


</style>
