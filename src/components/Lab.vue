<template>
  <div id="app" class="lab content-wrapper">

    <section class="main-sect">
      <div class="row main-row">

        <div class="tab-content">
          <div class="tab-pane active" id="ab">
            <div class="code-area">

              <div id="code-area-header-box">
                <div id="lab-problem-tools" class="pull-left">
                  <!--<ul class="nav navbar-nav pull-left">-->
                    <!--<li data-toggle="tooltip" data-placement="bottom" title="switch" class="pull-left">-->
                      <!--<a>-->
                        <!--<img id="code-editor-controls-stop" width="15px" height="15px" src="/static/img/change.png"-->
                             <!--alt="build"/>-->
                      <!--</a>-->
                    <!--</li>-->

                    <!--&lt;!&ndash;save code&ndash;&gt;-->

                  <!--</ul>-->
                </div>
                <div id="code-tab">
                  <!--<div id="editor">-->
                  <!--</div>-->
                  <editor id="editor" v-model="codeContent" @init="editorInit();" theme="chrome"
                          lang="javascript">

                  </editor>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <stream></stream>

    </section>

    <!--<alert type="danger">-->
    <!--<strong>{{errAlertText}}</strong>-->
    <!--</alert>-->
  </div>
</template>

<script>
  import Vue from 'Vue'
  import App from '../App'
  import stream from 'src/components/UserStream.vue'

  import firebase from 'firebase'
  import $ from 'jquery'
  import fb from 'src/fb-config'
  import Lab from 'src/components/Lab.vue'
  import fbpaths from 'src/fbPaths'

  let webrtc = null
  let editor = null

  export default {
    name: 'lab',
    components: {
      editor: require('vue2-ace-editor'),
      stream
    },
    prop: {
      content: ''
    },
    data: function () {
      return {

        codeContent: 'type your code here...',
        errAlert: false,
        errAlertText: '',
        labName: '',
        labId: '',
        photo: '',
        userId: '',
        userName: '',
        email: '',
        user: {},
        streamUsers: {},
        currentLab: {},
        currentLabUsers: {},
        allLabs: {},
        liveCode: {},
        challengesArray: {},
        settingsArray: {},
        chalkboardArray: {},
        exceptionsArray: {},
      }
    },
    created() {
      let vm = this
      vm.firebase = function () {
        return {
          currentLab: {
            source: fb.database().ref(fbpaths().labs() + vm.labId),
            cancelCallback: function () {
            },
            readyCallback: function () {
            },
            asObject: true
          },
          currentLabUsers: {
            source: fb.database().ref(fbpaths() + vm.labId + '/users'),
            cancelCallback: function () {
            },
            readyCallback: function () {
            },
            asObject: false
          },
          allLabs: {
            source: fb.database().ref(fbpaths().labs()),
            cancelCallback: function () {
            },
            readyCallback: function () {
            },
            asObject: false
          },
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
        }
      },
        vm.setUser()
      vm.labName = this.$route.params.id
      vm.labId = this.$route.params.labKey
      vm.probId = 0

    },
    mounted () {
      let vm = this
      vm.initMessageEntry()
      vm
      if (!vm.user && vm.userName) {
        vm.setUser()
      }

      editor = ace.edit('editor')
      vm.initEditor()
      vm.initEditorEvents(this)
      vm.initEditorRightSideEvents(this)
      vm.initWebRtc()
      vm.updateUserPresenceInLab()
      vm.subscribeToUsersChange(fbpaths().currentLabUsers(this.labId))
      vm.syncEditorWithUsersLastCodeEntry()

      vm.colorEditor()
    },
    methods: {

      editorInit: function () {

        require('../../node_modules/brace/mode/csharp');
        require('../../node_modules/brace/mode/python');
        require('../../node_modules/brace/mode/golang');
        require('../../node_modules/brace/mode/javascript');
        require('../../node_modules/brace/mode/less');
        require('../../node_modules/brace/theme/katzenmilch');
        require('../../node_modules/brace/theme/idle_fingers');
        require('../../node_modules/brace/theme/chaos');
        require('../../static/ace/theme-ambiance.css');
        require('../../static/ace/theme-mirage');
      },
      showAlert: function () {
        this.errAlert = true
      },
      colorEditor: function () {

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
      setUser: function () {
        let vm = this
        vm.user = fb.auth().currentUser;
        if (vm.user) {
          vm.userName = this.user.displayName;
          vm.email = this.user.email;
          vm.photo = this.user.photoURL;
          vm.userId = this.user.uid;
          vm.labName = this.$route.params.labName
          vm.labId = this.$route.params.labId
        }
      },
      initMessageEntry: function () {
        let commentsSection = $('#sidebar-comments')
        let sendMessageBx = $('#enter-message')
        commentsSection.on('mouseover', function () {
          sendMessageBx.stop().delay(750).removeClass('hidden').fadeIn(750)
        }).on('mouseout', function () {
          sendMessageBx.stop().delay(750).addClass('hidden').fadeOut(500)
        })
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
      subscribeToUsersChange: function (path) {
        let vm = this
        let ref = fb.database().ref(path)

        ref.on('value', function (snapshot) {
          if (snapshot == 'users') {
            let value = snapshot.val()
            if (value.userId === vm.userId) {

            }
          }
        })
      },
      initEditorRightSideEvents: function () {

        $('div.avatar').on('mouseover',
          function () {
            let el = this
            el.animate({right: '0'})
          }).on('mouseout', function () {
          el.animate({right: '20'})
        })
      },
      initEditorEvents: function () {
        let vm = this
        editor.getSession().on('change', function (e) {
          updateUserLabStream(' is coding....', vm.userId, 'coding')
        });

        editor.getSession().selection.on('changeSelection', function (e) {
        });

        editor.getSession().selection.on('changeCursor', function (e) {
        });
      },
      getVm: function () {
        return this
      },
      saveCodeToFirebase: function () {
        let vm = this
        if (!vm.labId) {
          vm.labId = vm.$route.params.labId
        }

        if (!vm.userName) {
          vm.userName = vm.user.userName
        }
        let codeEntry = editor.getSession().getValue()
        let codeToSubmit = {
          'problem-id': vm.probId || 0,
          'last-updated': new Date().toTimeString(),
          text: codeEntry,
        };

        let codeEntryPath = fbpaths().currentLabUserCodeEntries(vm.labId, vm.userName, vm.probId)
        // console.log('saving code :', fb.database().ref())
        fb.database().ref().child(codeEntryPath).update(codeToSubmit)
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
      initWebRtc: function () {
        let vm = this
        let createdTime = new Date().toTimeString()
        console.log('webrtc', 'building objects')

        let webrtc = new SimpleWebRTC({
          localVideoEl: 'local-vid',
          remoteVideosEl: 'remote-vids',
          autoRequestMedia: false,
          nick: vm.userName
        });

        console.log('webrtc', 'setting up events')

        webrtc.on('connectionReady', function (sessionId) {
          console.log('joining room')

          webrtc.joinRoom(vm.labName);

          console.log('joined room')
          console.log('adding joined message to stream')
          addMessageToLabStream('is in the lab', vm.userName, vm.photo, vm.email, vm.userId, 'left', sessionId)

//          if (vm.userIsLabCreator()) {
//            vm.addSessionIdToDb(sessionId, createdTime, vm.userId)
//          }
        })

        webrtc.on('createdPeer', function (peer) {
          console.log('connection created')

          //todo get the users information from the users object associated with this
          //todo lab then use it to fill out the signature of the below method

          // addMessageToLabStream('is in the lab', peer.nick, photo, email, userId, 'left', sessionId)
        })

        webrtc.on('readyToCall', function () {
          addMessageToLabStream('is in the lab', vm.userName, vm.photo, vm.email, vm.userId, 'left', sessionId)
        });

        // a peer video has been added
        webrtc.on('videoAdded', function (video, peer) {

          //todo go get the user data from the db
          addMessageToLabStream('is in the lab', peer.nick, '', '', '', 'right', 0)

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
      addSessionIdToDb: function (sessionId, createdTime, creator) {
        let vm = this
        let info = {
          sessionId: sessionId || 'no auth',
          created: createdTime,
          created_by: creator || 'anon',
          ended: false
        }
        let labInfoPath = fbpaths().currentLabSession(vm.labName)
        fb.database().ref(labInfoPath).push(info)
      },
      updateUserPresenceInLab: function () {
        let vm = this

        if (!vm.labId) {
          vm.labId = this.$route.params.labId
        }
        if (vm.userId) {
          let usersPath = fbpaths().currentLabUsers(vm.labId)
          fb.database().ref(usersPath + '/' + vm.userId).set(true)
        }
      },
      userIsLabCreator: function () {
        //todo
        return true
      },
      getTemplateForLanguage: function (langId) {
        let prefix = 'https://cors-anywhere.herokuapp.com/'
        let templatesUrl = 'http://cloudcompiler.esy.es/api/languages/template/' + langId
        return $.getJSON(prefix + templatesUrl);

      },
      initEditor: function () {
        let ed = $('.ace_editor')
        let hgt = calculateWindowHeight()
        let wd = 68%
          ed.css('height', hgt - 90)
        ed.css('width', wd)
        ed.css({'font-size': '16px'})
        ed.css({'font-family': 'monospace'})

        let rside = $('#editor-rside')
        let rwd =
          rside.css('height', hgt - 90)
        rside.css('width', '30%')


        ace.config.set('basePath', '/static/ace/');
        editor.getSession().setUseWorker(true);

        //editor.setTheme('monokai')
        //editor.getSession().setMode("javascript");

        editor.setHighlightActiveLine(false);
        editor.getSession().setUseSoftTabs(true);
        editor.setShowPrintMargin(false);

        let container = $('#code-tab')

        container.append(rside)
        $(rside).removeClass('hidden')
        console.log('editor', 'editor created and styled')

      },
      syncEditorWithUsersLastCodeEntry: function () {
        let vm = this
        if (!vm.labId) {
          vm.labId = this.$route.params.labName
        }

        if (!vm.probId) {
          vm.probId = '0'
        }
        if (!vm.userName) {
          vm.setUser()
        }

        let ref = fb.database().ref(fbpaths().currentLabUserCodeEntries(vm.labId, vm.userName, vm.probId))
        ref.on('value', function (snapshot) {
          if (snapshot && snapshot.key && snapshot.key === vm.probId) {
            snapshot.forEach(function (childSnapshot) {
              if (childSnapshot && childSnapshot.key && childSnapshot.key === 'text') {
                let v = childSnapshot.val()

                // editor = editor || ace.edit('editor')
                console.log('setting editor content')
                vm.codeContent = v
                // editor.setValue(v);
                editor.clearSelection();
                console.log(editor)
                console.log(ace)
                return true
              }
            });
            // updateUserLabStream(userId, message, type)
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

  }

  function calculateWindowHeight () {
    return $(window).height()
  }

  function addMessageToLabStream (text, name, photo, email, uId, side, sessionId) {
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
        $message.attr('id', uId)
        $message.addClass(side).find('.text').html(text);
        $message.find('.user-img').attr('src', photo);
        $('#editor-rside').append($message);
        return setTimeout(function () {
          $message.addClass('appeared');
          setTimeout(function () {
            $message.stop().find('div.message-block').stop().animate({right: '-20'})
            return $message.stop().find('div.text_wrapper').stop().addClass('hidden');
          }, 4000);
        }, 0);
      };
    }(this);

    return this;
  }

  //todo  type determines size, color, animation etc...
  function updateUserLabStream (txt, uId, type) {
    var $messages, message;
    if (txt.trim() === '' || txt.trim() === '') {
      return;
    }

    $('.message_input').val('');
    $messages = $('#editor-rside');
    message = $messages.find('#' + uId)

    setTimeout(function () {
      message.find('.text').html(txt)
      message.stop().find('div.avatar').stop().animate({right: '0'})
      return message.stop().find('div.text_wrapper').stop().removeClass('hidden');
    }, 1000);

    setTimeout(function () {
      message.stop().find('div.message-box').stop().animate({right: '20'})
      return message.stop().find('div.text_wrapper').stop().addClass('hidden');
    }, 4000);
  }

</script>

<style scoped>
  @import '/static/bootstrap/css/bootstrap.min.css';
  @import '/static/bootstrap/css/bootstrap-theme.css';
  @import '/static/css/skins/_all-skins.css';
  @import '/static/css/skins/skin-green-light.css';
  @import '/static/css/peez.css';

  * {
    box-sizing: border-box;
  }

  .ace_content, #editor-rside {
    height: 100%;
    position: absolute;
    padding: 10px;
  }

  .ace_content {
    width: 75%;
    z-index: 1999;
  }

  #editor-rside {
    z-index: 2000;
  }

  .active {
    display: block;
  }

  .list-group {
    width: 100%;
  }

  .list-group-item {
    height: 50px;
  }

  #lab-problem-tools {
    position: absolute;
    margin-top: 5px;
    width: 100px;
    margin-left: calc(65% - 105px);
    height: auto;
    z-index: 10001;
    padding-left: 7px;
    background-color: transparent;
  }

  .ace-ambiance {
    color: #E6E1DC;
    background-color: #212733;
  }

  .control-sidebar-videos, .control-sidebar-assignments, .control-sidebar-settings, .control-sidebar-comments {
    position: fixed;
    width: 0; /* 0 width - change this with JavaScript */
    height: 100%;
    padding-top: 50px;
    /*border-left: 2px dotted #ffffff;*/
    background-color: #212733;
    -webkit-transition: right .2s ease-in-out;
    -o-transition: right .2s ease-in-out;
    z-index: 2; /* Stay on top */
    top: 0;
    right: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }

  .control-sidebar-settings {
    z-index: 3;
    background-color: whitesmoke;
  }

  .control-sidebar-comments {
    width: 40%; /* 0 width - change this with JavaScript */
    z-index: 1;
    background-color: #212733;
  }

  #lab {
    margin-top: 0px;
  }

  .panel-body {
    padding: 0px;
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

  .comment-btn {
    border: 1px solid ghostwhite;
    background-color: transparent;
  }

  .comment-btn:hover {
    cursor: pointer;
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

  }

  .main-sect, .main-row {
    padding-top: 0;
    height: 100%;
  }

  .code-area {
    position: relative;
    background-color: #212733;
  }

  #code-area-header-box {
    background: transparent;
    height: auto;
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

  .ace_editor {
    position: fixed;
    background-color: whitesmoke;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin-top: 50px;
    margin-bottom: 0;
    padding-top: 30px;
    padding-bottom: 0;
    height: 400px;
    width: 400px;
    min-width: 800px;
    text-align: left;
    overflow-y: hidden;
  }

  .ace_keyword {
    color: #cda869;
  }

  .ace_identifier {
  }

  .ace_paren {
    color: #24C2C7;
  }

  .ace_punctuation.ace_operator {
    color: #fa8d6a;
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
    width: 35%;
    right: 0;
    top: 50px;
    bottom: 44px;
    /*box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);*/
    background-color: #212733;
    overflow: hidden;
    border-left: 1px dotted #222b33;
  }

  .top_menu {
    background-color: transparent;
    width: 120px;
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
    font-size: 16px;
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
    border: 1px solid transparent;
    background-color: transparent;
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
    width: 80%;
    padding-left: 20px;
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


</style>
