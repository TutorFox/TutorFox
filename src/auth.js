let auth = {
  login (user, pass, cb) {
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(user, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  },

  getToken () {
    return localStorage.token;
  },

  logout (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false);
  },
  
  loggedIn () {
    return !!localStorage.token;
  },

  onChange () {}

}
function pretendRequest (user, pass, cb) {
  setTimeout(() => {
    if(user === 'm012345' && pass === 'qwerty') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false });
    }
  }, 100);
}

export default auth
