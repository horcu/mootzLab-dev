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
                    <button class="btn" type="button">
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

                <li class="pull-left">
                  <span id="compiled-msg"></span>
                </li>

                <li data-toggle="tooltip" style="margin-right: 20px" data-placement="bottom" title="exceptions"
                    class="ex-tab exception-tab pull-right">
                  <a>
                    <img id="err-img" width="15px" height="15px" src="/static/img/warning.png" alt="exceptions"/>

                  </a>
                </li>

                <li data-toggle="tooltip" data-placement="bottom" title="expand"
                    class="ex-tab expand-tab pull-right">
                  <a>
                    <img id="err-img" width="15px" height="15px" src="/static/img/expand.png" alt="expand"/>

                  </a>
                </li>

              </ul>
            </div>

            <div>

              <div id="code-tab" class="tab-pane fade in active">
                <div id="editor" class="ace-Katzenmilch">
                </div>
              </div>
              <div id="comments-tab">

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

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

  $.when(editor !== undefined).then(function () {
    editor.getSession().on('change', function(e) {
      this.saveCodeToFirebase(1)
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
      }
    }
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
            editor.getSession().setUseWorker(true);
            editor.setTheme('ace/theme/ambiance');
            //editor.getSession().setUseWrapMode(true);
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

  .head-wrapper{
    height:40px;
    padding:0;
    background-color: whitesmoke;
  }

  #compiled-msg{
    position: relative;
    background-color: #f9f9f9;
    height: 36px;
    min-width: 455px;
    border: 1px solid transparent;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    margin-top: 5px;
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
    margin-top: 50px;
    padding-bottom: 56px;
    min-height: 650px;
    height: 100%;
    width: 100%;
    text-align: left;
    overflow-y: hidden;
    scrollbar-face-color: transparent;
    scrollbar-arrow-color: transparent;
    scrollbar-base-color: transparent;
    scrollbar-track-color: transparent;
  }

  #comments-tab{
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 35px;
    height:100%;
    background-color: #f9f9f9;
    min-height: 600px;
    z-index: 1;
    -webkit-transition:right .3s ease-in-out;
    -o-transition:right .3s ease-in-out;transition:right .3s ease-in-out;
  }


  .ex-tab{

    -webkit-transition:right .3s ease-in-out;
    -o-transition:right .3s ease-in-out;transition:right .3s ease-in-out;
  }

  .ex-tab:nth-last-child(1){
    margin-right: 10px;
  }


</style>
