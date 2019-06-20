const APIUtil = require('./api_util.js')

class FollowToggle {
  constructor($el) {
    this.userId = $el.data("user-id"); 
    this.followState = $el.data("initial-follow-state");
    this.el = $el; 
    this.render(); 
    this.toggleState = this.toggleState.bind(this);
    this.handleClick(this.el); 
  }

  render() {
    if (this.followState === 'unfollowed') {
      this.el.text("Follow!");
      this.el.prop("disabled", false);
    } else if (this.followState === 'followed') {
      this.el.text("Unfollow!")
      this.el.prop("disabled", false);
    } else if (this.followState === "following") {
      this.el.prop("disabled", true);
      this.el.text("following!");
    } else if (this.followState === "unfollowing") {
      this.el.prop("disabled", true);
      this.el.text("unfollowing!");
    }
  }

  toggleState() {
    if (this.followState === "following") {
      this.followState = "followed"; 
    } else {
      this.followState = "unfollowed"; 
    }
  }

  handleClick(el) {
    const that = this; 
    const id = this.userId; 
    const toggle = this.toggleState; 
    el.click(function(e) {
      e.preventDefault(); 
      if (that.followState === 'unfollowed') {
        that.followState = "following";
        that.render();
        APIUtil.followUser(id).then(() => { 
          toggle();
          that.render();
        }
        );
      } else {
        that.followState = "unfollowing";
        that.render();
        APIUtil.unfollowUser(id).then(() => {
          toggle();
          that.render();
        }
        );
      }

    }); 
  }
}


module.exports = FollowToggle; 