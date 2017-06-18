/**
 * Created by ray on 6/17/17.
 */

function fbpaths() {

  return {
    // top level paths
    users: function () {
     return  'users/'
    },
    challenges: function () {
      return 'challenges/'
    } ,
    themes: function () {
      return 'themes/'
    } ,
    languages: function () {
      return  'languages/'
    },
    live: function () {
      return 'live-code/'
    },
    labs: function () {
      return 'labs/'
    } ,

    // user specific paths
    chalkboard: function () {
      return this.getUserSpecificPath('chalkboard/')
    },
    timeline: function () {
      this.getUserSpecificPath('timeline/')
    },
    info: function () {
      this.getUserSpecificPath('info/')
    },
    exceptions: function () {
      this.getUserSpecificPath('exceptions/')
    },
    settings: function () {
      this.getUserSpecificPath('settings/')
    },
    submissions: function () {
      this.getUserSpecificPath('submissions/')
    },
    lastSavedLanguage: function () {
      this.getUserSpecificPath('/last-saved-language/')
    },
    lastSavedTheme: function () {
      this.getUserSpecificPath('/last-saved-theme/')
    },
    lastChallengeAttempted: function () {
      this.getUserSpecificPath('/last-challenge-attempted/')
    },

    //other functions
    getUserSpecificPath: function (path) {
      return '/users/' + this.userName + '/' + path
    },
  }
}
export default fbpaths
