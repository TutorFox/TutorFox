let auth = {
  login (user, pass, cb) {
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    sendRequest(user, pass, (res) => {
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
function sendRequest (user, pass, cb) {
  $.post({
    url: '/login',
    data: {user: user, password: pass},
    success: function (data, textStatus) {
      if(textStatus === "success") {
        cb({
          authenticated: true,
          token: obj.token
        });
      } else {
        cb({ authenticated: false });
      }
    },
    error: function (xhr, status, err) {
      cb({authenticated: false });
    }
  });
}

export default auth
