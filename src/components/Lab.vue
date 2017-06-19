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
                  <!--<span class="pull-left" id="compiled-msg">-->

                  <a v-on:click="toggleAssignmentNav" data-toggle="tooltip" data-placement="bottom" title="exceptions"
                     class="ex-tab exception-tab pull-right">
                    <img id="exp-img" width="15px" height="15px" src="/static/img/expand-right.png" alt="exceptions"/>
                  </a>
                  <a id="error-icon-div" data-toggle="tooltip"
                     data-placement="bottom" title="expand" class="ex-tab expand-tab pull-right">
                    <img id="err-img" width="15px" height="15px" src="/static/img/warning.png" alt="exception"/>
                  </a>
                  <!--</span>-->
                </li>

              </ul>
            </div>

            <div>

              <div id="code-tab" class="tab-pane fade in active">
                <div id="editor">
                </div>

                <div id="comments-tab" class="hidden">
                  <div id="comments-tab-top-menu">
                    <ul class="list-group">

                      <li class="list-group-item">
                        <a>
                          <img id="make-code-comment" width="18px" height="18px" src="/static/img/speech-bubble.png"/>
                        </a>
                      </li>
                      <li v-on:click="makeSnippetFromSelection()" class="list-group-item">
                        <a>
                          <img id="save-code-snippet" width="18px" height="18px" src="/static/img/push-pin.png"/>
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a>
                          <img id="like-code-section" width="15px" height="15px" src="/static/img/heart.png"/>
                        </a>
                      </li>
                    </ul>
                  </div>
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
      <!--<div class="test slider" data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>-->
      <!--<div><h3>1</h3></div>-->
      <!--<div><h3>2</h3></div>-->
      <!--<div><h3>3</h3></div>-->
      <!--<div><h3>4</h3></div>-->
      <!--<div><h3>5</h3></div>-->
      <!--<div><h3>6</h3></div>-->
      <!--</div>-->
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

    <!-- comments Control Sidebar -->
    <aside id="sidebar-comments" class="control-sidebar-comments control-sidebar-light">
      <div class="chat_window">
        <div class="top_menu pull-right">
          <div class="buttons">
            <div class="button close"></div>
            <div class="button minimize"></div>
            <div class="button maximize">
            </div>
          </div>
          <div class="title"></div>
        </div>
        <ul class="messages"></ul>
        <div id="enter-message" class="hidden bottom_wrapper clearfix">
          <div class="message_input_wrapper">
            <input class="message_input" placeholder="Type your message here..."/>
          </div>
          <div class="send_message">
            <div class="icon">

            </div>
            <div class="text">Send</div>
          </div>
        </div>
      </div>
      <div class="message_template">
        <li class="message">
          <div class="avatar">
            <img id="user-img"/>
          </div>
          <div class="text_wrapper">
            <div class="text"></div>
          </div>
        </li>
      </div>
    </aside>
  </div>
</template>

<script>
  import Vue from 'Vue'
  import App from '../App'
  import firebase from 'firebase'
  import ace from 'jenkins-ace-editor'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import Lab from 'src/components/Lab.vue'
  //import 'slick-carousel'
  import fbpaths from 'src/fbPaths'
  var webrtc

//  require('../../static/ace/mode-csharp')
//  require('../../static/ace/mode-java')
//  require('../../static/ace/mode-javascript')
//  require('../../static/ace/mode-python')
//  require('../../static/ace/mode-golang')

  let roomName = '0'
  let editor

  ace.config.set('basePath', './static/ace/');

  $(function () {
    let commentsSection = $('#sidebar-comments')
    let sendMessageBx = $('#enter-message')
    let labPathInput = $('#lab-path-input')

    //watchInput(labPathInput, handleLabRoute)

    commentsSection.on('mouseover', function () {
      sendMessageBx.stop().delay(750).removeClass('hidden').fadeIn(750)
    }).on('mouseout', function () {
      sendMessageBx.stop().delay(750).addClass('hidden').fadeOut(500)
    })

  })

  export default {
    name: 'lab',
    prop: {
      content: ''
    },
    data: function() {
      return {
        roomName: this.$route.params.id,
        photo: '',
        userId: '',
        userName: fb.auth().currentUser.displayName,
        email: '',
        user: {},
        labs: {},
        liveCode: {},
        challengesArray: {},
        settingsArray: {},
        chalkboardArray: {},
        exceptionsArray: {},
      }
    },
    created() {
      this.user = firebase.auth().currentUser;
      if (this.user) {
        this.userName = this.user.displayName;
        this.email = this.user.email;
        this.photo = this.user.photoURL;
        this.uId = this.user.uid;
      }
    },
    firebase: {
      liveCode: {
        source: fb.database().ref(fbpaths().live()),
        cancelCallback: function () {
        },
        readyCallback: function () {



          //slick carousel init
          // let divs = $('#remote-vids')
          // this.initSlickCarousel($('#remote-vids'));
          // let divs2 = $('#remote-vids')
        },
        asObject: false
      },
//      labs:  {
//            source: fb.database().ref(fbpaths().labs() + roomName + '/' +  userName + '/code/'),
//            cancelCallback: function () {
//            },
//            readyCallback: function (x) {
//            console.log('labs', 'loaded lab from firebase')
//
//              this.syncEditorWithLab()
//
//              console.log('labs', 'synced editor')
//            },
//            asObject: true
//
//      },
      challengesArray: {
        source: fb.database().ref(fbpaths().challenges()),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      chalkboardArray: {
        source: fb.database().ref(fbpaths().chalkboard()),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      exceptionsArray: {
        source: fb.database().ref(fbpaths().exceptions()),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      },
      settingsArray: {
        source: fb.database().ref(fbpaths().settings()),
        cancelCallback: function () {
        },
        readyCallback: function (x) {
        },
        asObject: false
      }
    },
    methods: {
      roomName: function () {
        return this.$route.params.id
      },
      find: function (word, dir) {
        //editor = ace.edit("editor");
        editor.find(word, {
          backwards: dir === 'back',
          wrap: false,
          caseSensitive: false,
          wholeWord: false,
          regExp: false
        });

        return dir === 'back' ? editor.findPrevious() : editor.findNext()
      },
      readOnly: function (val) {
        //  editor = ace.edit("editor");
        editor.setReadOnly(val);
      },
      getLiveCode: function () {
        return this.liveCode[0]
      },
      getSelectedCodeInfo: function () {
        // editor = ace.edit("editor");
      },
      getCurcorPosition: function () {
        //  editor = ace.edit("editor");
        return editor.selection.getCursor();
      },
      makeSnippetFromSelection: function () {
        //  editor = ace.edit("editor");
        let selectedText = editor.session.getTextRange(editor.getSelectionRange());
        alert(selectedText)
        let cursorBox = $('div.ace_cursor')

        cursorBox.animate({
          'background-color': 'green',
          'border': '1px dotted #ebebeb',
          'border-radius': '6px'
        }, 400)
      },
      initEditorEvents: function () {
        // editor = ace.edit("editor");

//        editor.getSession().on('change', function (e) {
//          $('#comments-tab-top-menu').stop().hide()
//        });
//
//        editor.getSession().selection.on('changeSelection', function (e) {
//          // alert('selection made')
//          //this.makeSnippetFromSelection()
//        });
//
//        editor.getSession().selection.on('changeCursor', function (e) {
//          //   alert('cursor changed')
//          $('#comments-tab-top-menu').stop().show()
//
//        });
      },
      saveCodeToFirebase: function (probId) {
        let codeEntry = editor.props.content
        let codeToSubmit = {
          'problem-id': probId,
          'last-updated': new Date().toTimeString(),
          text: codeEntry,
        };

        //todo put safeguard in to ensure that the userName and roomName properties are not undefiined

        let path = `/${vm.roomName}/${vm.userName}/code/`
        this.$firebaseRefs.labs.ref().update(codeToSubmit)
      },
      toggleAssignmentNav: function () {
        App.methods.toggleAssignmentNav()
      },
      toggleSessionsNav: function () {
        App.methods.toggleSessionsNav()
      },
      toggleCommentsNav: function () {
        App.methods.toggleCommentsNav()
      },
      toggleSettingsNav: function () {
        App.methods.toggleSettingsNav()
      },
      getMessageTextFromEntry: function () {
        var $message_input;
        $message_input = $('.message_input');
        return $message_input.val();
      },
      sendMessageToDb: function () {

      },
      initSlickCarousel: function (videos) {
        videos.slick({
          centerMode: true,
          variableWidth: true,
          fade: true,
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
      },
      initWebRtc: function (nick, photo, email, uId) {

        console.log('webrtc', 'building objects')

        let webrtc = new SimpleWebRTC({
          localVideoEl: 'local-vid',
          remoteVideosEl: 'remote-vids',
          autoRequestMedia: false,
          nick: nick
        });

        console.log('webrtc', 'setting up events')

        webrtc.on('connectionReady', function (sessionId) {
          console.log('joining room')

          webrtc.joinRoom(roomName);

          console.log('joined room')
          console.log('adding joined message to stream')
          addMessageToStream('joined :)', nick, photo, email, uId, 'left', sessionId)
          //todo addSessionIdToDb(sessionId)
        })

        webrtc.on('readyToCall', function () {
          addMessageToStream('joined :)', nick, photo, email, uId, 'left', sessionId)
        });

        // a peer video has been added
        webrtc.on('videoAdded', function (video, peer) {

          addMessageToStream('joined :)', peer.nick, photo, email, uId, 'right', sessionId)

//          console.log('video added', peer);
//          console.log('video added', peer.nick);
//
//          let remotes = document.getElementById('remote-vids');
//          if (remotes) {
//
//            let container = document.createElement('div')
//            container.className = 'videoContainer';
//            container.id = 'container_' + webrtc.getDomId(peer);
//            container.appendChild(video);
//
//            let htmlWrapper = '<div class="box-body l-vid-box"><button id="local-vid-popper" type="button" class="btn btn-default btn-circle btn-lg" data-toggle="popover">P</button><div id="panel-local-vid" class="hidden panel panel-default"><div class="panel-body">'
//              + container
//              + '</div>div class="small-box small-box-footer"><button type="button" class="btn btn-box-tool pull-right" data-toggle="tooltip"title="Contacts" data-widget="chat-pane-toggle">'
//              + '<i class="fa fa-comments"></i></button><button type="button" class="btn btn-box-tool pull-right" data-toggle="tooltip" title="video" data-widget="chat-pane-toggle">'
//              + '<i class="fa fa-video-camera"></i></button></div></div></div>';
//
//            // suppress contextmenu
//            video.oncontextmenu = function () {
//              return false;
//            };
//
//            remotes.appendChild(htmlWrapper);
//
//            // show the ice connection state
//            if (peer && peer.pc) {
//              let connstate = document.createElement('div');
//              connstate.className = 'connectionstate';
//              container.appendChild(connstate);
//              peer.pc.on('iceConnectionStateChange', function (event) {
//                switch (peer.pc.iceConnectionState) {
//                  case 'checking':
//                    connstate.innerText = 'Connecting to peer...';
//                    break;
//                  case 'connected':
//                  case 'completed': // on caller side
//                    connstate.innerText = 'Connection established.';
//                    break;
//                  case 'disconnected':
//                    connstate.innerText = 'Disconnected.';
//                    break;
//                  case 'failed':
//                    break;
//                  case 'closed':
//                    connstate.innerText = 'Connection closed.';
//                    break;
//                }
//              });
//            }
          // }
        });

        // a peer has been removed
        webrtc.on('videoRemoved', function (video, peer) {
          console.log('video removed ', peer);
          let remotes = document.getElementById('remote-vids');
          let el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
          if (remotes && el) {
            remotes.removeChild(el);
          }
        });

        //local p2p/ice failure
        webrtc.on('iceFailed', function (peer) {
          let connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
          console.log('local fail', connstate);
          if (connstate) {
            connstate.innerText = 'Connection failed.';
            fileinput.disabled = 'disabled';
          }
        });

        //remote p2p/ice failure
        webrtc.on('connectivityError', function (peer) {
          let connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate');
          console.log('remote fail', connstate);
          if (connstate) {
            connstate.innerText = 'Connection failed.';
            fileinput.disabled = 'disabled';
          }
        });
        console.log('webrtc', 'done setting up events')
      },
      updateUserInfoForLab: function (userId, userName) {
          let vm = this
        let user = {
          userName: userName,
          userId: userId
        }


        let usersRath = fbpaths().labs() + '/' + vm.roomName + '/users/'
        fb.database().ref(usersRath).update(user)
      },
      getTemplateForLanguage: function (langId) {
        let prefix = 'https://cors-anywhere.herokuapp.com/'
        let templatesUrl = 'http://cloudcompiler.esy.es/api/languages/template/' + langId
        let def = $.getJSON(prefix + templatesUrl);

        def.done(function (data, s) {
         // editor.setValue(data.source);
         // editor.clearSelection();
        })
      },
      syncEditorWithLab: function () {
          let vm = this
//        let winSize = $(window).height();
//        if ($('#editor').css('height') < winSize){
//          $(editor).animate({'height': winSize}, 400)
//          editor.resize()
//        }

        let un = vm.userName
        let ref = fb.database().ref(`${fbpaths().labs()}/${vm.roomName}//${un}`)
        ref.on('value', function (snapshot) {
          if (snapshot.key === un) {

            snapshot.forEach(function (childSnapshot) {
              if (childSnapshot.key === 'code') {
                let v = childSnapshot.val()
                console.log('setting editor content')

                let editor = ace.edit('editor')
                 editor.setTheme('ace/theme/ayu-mirage')
                  editor.getSession().setMode("ace/mode/csharp");
                $('#editor').css({'font-size': '16px'})
                editor.getSession().setUseWorker(true);
                editor.setHighlightActiveLine(true);
                editor.getSession().setUseSoftTabs(true);
                editor.setShowPrintMargin(false);

                console.log('editor','logging firebase code text')
                console.log(v.text)
                editor.setValue(v.text);
                editor.clearSelection();

                console.log(editor)
                console.log(ace)

                return true
              }
            });

            addComments()
          }
        })
      },

      addUserWebcam: function (videos, div) {
        slideIndex++;
        $(videos).slick('slickAdd', div);
      },
      removeUserWebcam: function (videos, div) {
        slideIndex--;
        $(videos).slick('slickRemove', div);
      },
      watchInput: function (el, callback) {
        $(el).on('change keydown keyup', function (e) {
          callback(e, el)
        });

      },
      setEditorDisabled: function () {
        editor.setReadOnly(true);
      },
      setEditorEnabled: function () {
        editor.setReadOnly(false);
      }

    },
    components: {

    },
    mounted () {
      this.initEditorEvents()
      this.initWebRtc(this.userName, this.photo, this.email, this.uId)
      this.updateUserInfoForLab(this.uId, this.userName)
      this.syncEditorWithLab()
    }
  }

  function addMessageToStream(text, name, photo, email, uId, side, sessionId) {
    var $messages, message;
    if (text.trim() === '' || name.trim() === '') {
      return;
    }

    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
      text: name + ' ' + text,
      message_side: side,
      photo: photo,
      email: email,
      uId: uId,
      sessionId: sessionId
    });
    message.draw(name);
    return $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
  }

  var Message;
  Message = function (arg) {
    let text = arg.text
    let side = arg.message_side
    let email = arg.email
    let photo = arg.photo
    let uId = arg.uId
    let sessionId = arg.sessionId

    this.draw = function (name, _this) {
      return function () {
        let $message;
        $message = $($('.message_template').clone().html());
        $message.addClass(side).find('.text').html(text);
        $message.find('#user-img').attr('src', photo);
        $('.messages').append($message);
        return setTimeout(function () {
          return $message.addClass('appeared');
        }, 0);
      };
    }(this);
    return this;
  }

  function addComments(comm) {

  }

</script>

<style scoped>
  /*@import "/static/ace/theme-monokai.css";*/
  /*@import "/static/slick/slick.css";*/
  /*@import "/static/slick/slick-theme.css";*/

  .panel-body {
    padding: 0px;
  }

  #user-img {
    border: 1px solid transparent;
    border-radius: 24px
  }

  #comments-tab {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 50%;
    width: 200px;
    height: 50px;
    background-color: whitesmoke;
    min-height: 30px;
    z-index: 1000;
    -webkit-transition: right .3s ease-in-out;
    -o-transition: right .3s ease-in-out;
    transition: right .3s ease-in-out;
  }

  #comments-tab-top-menu ul.list-group li.list-group-item {
    padding: 0;
    margin-left: 15px;
    margin-right: 15px;
  }

  #comments-tab-top-menu ul.list-group li.list-group-item:hover {
    cursor: pointer;
    background-color: #ebebeb;
  }

  .comment-btn {
    border: 1px solid ghostwhite;
    background-color: transparent;
  }

  .comment-btn:hover {
    cursor: pointer;
  }

  .head-wrapper {
    height: 40px;
    padding: 0;
    background-color: whitesmoke;
  }

  #compiled-msg {
    position: relative;
    background-color: whitesmoke;
    height: 40px;
    min-width: 100%;
    width: 100%;
    border: 1px solid transparent;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }

  #compiled-msg a {
    margin-left: 10px;
    position: relative;
    display: block;
    padding: 10px 10px;
    background-color: whitesmoke;
  }

  #compiled-msg a:hover {
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
    /*background-color: whitesmoke;*/
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-top: 60px;
    padding-bottom: 56px;
    min-height: 650px;
    height: 100%;
    width: 100%;
    text-align: left;
    overflow-y: hidden;

  }

  #comments-tab ul li.list-group-item {
    background-color: whitesmoke;
    margin-top: 5px;
    border: 1px solid transparent;
    padding-right: 3px;
    float: left;
  }

  #comments-tab ul li.list-group-item:hover {
    background-color: white;
    border: 1px solid transparent;
  }

  .ex-tab {

    -webkit-transition: right .3s ease-in-out;
    -o-transition: right .3s ease-in-out;
    transition: right .3s ease-in-out;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #edeff2;
    font-family: "Calibri", "Roboto", sans-serif;
  }

  .chat_window {
    position: fixed;
    width: 40%;
    max-width: 800px;
    right: 0;
    top: 50px;
    bottom: 44px;
    /*box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);*/
    background-color: #d4d4d4;
    overflow: hidden;
    border-left: 2px dotted white;
  }

  .top_menu {
    background-color: #d4d4d4;
    width: 100%;
    padding: 20px 0 15px;
    /*box-shadow: 0 1px 30px rgba(0, 0, 0, 0.1);*/
  }

  .top_menu .buttons {
    margin: 3px 0 0 20px;
    position: absolute;
  }

  .top_menu .buttons .button {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    position: relative;
  }

  .top_menu .buttons .button.close {
    background-color: #f5886e;
  }

  .top_menu .buttons .button.minimize {
    background-color: #fdbf68;
  }

  .top_menu .buttons .button.maximize {
    background-color: #a3d063;
  }

  .top_menu .title {
    text-align: center;
    color: #bcbdc0;
    font-size: 20px;
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

  div.avatar {
    margin-right: 20px;
  }

  div.avatar img {
    width: 60px;
    height: 60px;
  }

  .messages .message {
    clear: both;
    overflow: hidden;
    margin-bottom: 20px;
    transition: all 0.5s linear;
    opacity: 0;
  }

  .messages .message.left .avatar {
    background-color: transparent;
    float: left;
  }

  .messages .message.left .text_wrapper {
    background-color: #ebebeb;
    margin-left: 0;
  }

  .messages .message.left .text_wrapper::after, .messages .message.left .text_wrapper::before {
    right: 100%;
    border-right-color: #ebebeb;
  }

  .messages .message.left .text {
    color: #c48843;
  }

  .messages .message.right .avatar {
    background-color: #fdbf68;
    float: right;
  }

  .messages .message.right .text_wrapper {
    background-color: #c7eafc;
    margin-right: 20px;
    float: right;
  }

  .messages .message.right .text_wrapper::after, .messages .message.right .text_wrapper::before {
    left: 100%;
    border-left-color: #c7eafc;
  }

  .messages .message.right .text {
    color: #45829b;
  }

  .messages .message.appeared {
    opacity: 1;
  }

  .messages .message .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    display: inline-block;
  }

  .messages .message .text_wrapper {
    display: inline-block;
    padding: 20px;
    border-radius: 4px;
    width: auto;
    min-width: 100px;
    position: relative;
  }

  .messages .message .text_wrapper::after, .messages .message .text_wrapper:before {
    top: 18px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .messages .message .text_wrapper::after {
    border-width: 13px;
    margin-top: 0px;
  }

  .messages .message .text_wrapper::before {
    border-width: 15px;
    margin-top: -2px;
  }

  .messages .message .text_wrapper .text {
    font-size: 15px;
    font-weight: 200;
  }

  .text, .text_wrapper {
    width: auto;
  }

  .bottom_wrapper {
    position: relative;
    width: 100%;
    background-color: whitesmoke;
    padding: 20px 20px;
    position: absolute;
    bottom: 0;
  }

  .bottom_wrapper .message_input_wrapper {
    display: inline-block;
    height: 50px;
    border-radius: 0;
    border: 1px solid #bcbdc0;
    width: 70%;
    position: relative;
    padding: 0 20px;
  }

  .bottom_wrapper .message_input_wrapper .message_input {
    border: none;
    height: 100%;
    box-sizing: border-box;
    outline-width: 0;
    color: gray;
  }

  .message_input {
    position: relative;
    width: 100%;
    background-color: whitesmoke;
  }

  .bottom_wrapper .send_message {
    width: 100px;
    height: 45px;
    display: inline-block;
    border-radius: 30px;
    background-color: #a3d063;
    border: 2px solid #a3d063;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s linear;
    text-align: center;
    float: right;
  }

  .bottom_wrapper .send_message:hover {
    color: #a3d063;
    background-color: #fff;
  }

  .bottom_wrapper .send_message .text {
    font-size: 18px;
    font-weight: 300;
    display: inline-block;
    line-height: 48px;
  }

  .message_template {
    display: none;
  }

  #enter-message {
    background-color: transparent;
  }

  #editor div.ace_content div.ace_text-layer div.ace_line span.ace_identifier {
    color: orangered;
  }

</style>
