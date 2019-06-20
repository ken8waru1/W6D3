const APIUtil = require('./api_util.js')

class UsersSearch {
  constructor($el) {
    this.el = $el;
    this.input = '';
    this.ul = $("ul");

    this.handleInput(); 
  }

  handleInput(val) {
    this.el.keypress(function(val) {
      APIUtil.searchUsers(val, true); 
      console.log("I am pressed!"); 
    })
  }
}

module.exports = UsersSearch;