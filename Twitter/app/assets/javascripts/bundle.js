/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'JSON'
    });
  }, 


  searchUsers: (queryVal, success) => {
    return $.ajax({
      method: 'GET', 
      url: `/users/search?query=${queryval}`, 
      dataType: 'JSON', 
      success: function(data) {
        return data; 
      }
    }); 
  }
};


module.exports = APIUtil;



/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

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

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js"); 
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")

$(() => {
  $("button.follow-toggle").each(function(idx, el) {
    new FollowToggle($(el)); 
  });

  $("nav.users-search").each(function(idx, el) {
    new UsersSearch($(el));
  });
}); 

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map