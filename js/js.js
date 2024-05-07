
'use strict';
/*
 * 解决在低分辨率下首页内容过高导致滚动条出现，影响主题背景图片不全屏的问题
 * 解决方式：对于屏幕分辨率高度低于845px显示器，改变首页的内容为6块区域。
 */
var deviceVal;
(function () {
  //当浏览器窗口被调整大小时触发
  window.onresize = function () {
    ShowHideElement("i-link-box", "linkList-item", 845);
  }
  window.onload = function () {
    ShowHideElement("i-link-box", "linkList-item", 845);
  }
  function ShowHideElement(Element1, Element2, Vaule) {
    var Person = document.getElementsByClassName(Element1);
    var BoxHeight = document.getElementsByClassName(Element2);
    var WindowHeight = window.innerHeight || document.body.clientHeight;
    //遍历获取到的元素
    for (var i = 6; i < Person.length; i++) {
      if (WindowHeight <= Vaule && deviceVal === "pc") {
        Person[i].style.display = "none";
        BoxHeight[0].style.marginTop = "5px";
      } else {
        Person[i].style.display = "block";
        BoxHeight[0].style.marginTop = "0px";
      }
    }
  }
  window.ShowHideElement = ShowHideElement;
}());

//下面别动
function myApi() {

  this.mouseScroll = {

    inte: function (obj, value) {
      this.OBJ = obj;
      this.addscroll(obj);
      var outH = obj.outerHeight(),
        oScrollcontent = obj.children(':first'),
        contentH = oScrollcontent.outerHeight(),
        oYscrollinnerH = outH / contentH * outH,
        oYscrollouter = obj.find('#Yscrollouter'),
        oYscrollinner = obj.find('#Yscrollinner');

      obj.css({ 'position': 'relative', 'overflow': 'hidden' });
      oScrollcontent.css('position', 'absolute');

      if (contentH > outH) {
        this.mousehover(obj, oYscrollouter, oYscrollinner);
        this.mousewheel(obj, value, oScrollcontent, oYscrollinner, outH, contentH, oYscrollinnerH);
        this.mousemoved(obj, oScrollcontent, oYscrollouter, oYscrollinner, outH, contentH, oYscrollinnerH);
      };
    },

    addscroll: function (obj, value) {
      obj.append('<div id="Yscrollouter"><div id="Yscrollinner"></div></div>');
      $('#Yscrollinner').css('cursor', 'pointer');
    },

    mousehover: function (obj, outer, inner) {

      obj.hover(function () {
        outer.fadeIn(400);
      }, function () {
        outer.fadeOut(400);
      });

      inner.hover(function () {
        $('body').css({
          '-moz-user-select': 'none',
          '-webkit-user-select': 'none',
          '-ms-user-select': 'none',
          '-khtml-user-select': 'none',
          'user-select': 'none',
        });
      }, function () {
        $('body').css({
          '-moz-user-select': 'auto',
          '-webkit-user-select': 'auto',
          '-ms-user-select': 'auto',
          '-khtml-user-select': 'auto',
          'user-select': 'auto',
        });
      });

    },
    mousewheel: function (obj, value, O, inner, H1, H2, H3) {

      var oScrollcontentVal = value / (H1 - H3) * (H2 - H1);

      inner.height(H3);  //滚动条高度

      obj.on('mousewheel', function (event, delta) {  //绑定滚轮事件

        event.preventDefault();  //阻止浏览器默认为行

        var delta = event.originalEvent.wheelDelta;
        var oYscrollinnerTop = inner.position().top;

        var oScrollcontentTop = O.position().top;

        if (delta > 0) {
          if (oYscrollinnerTop - value < 0) {
            inner.css('top', 0);
            O.css('top', 0);
          } else {
            inner.css('top', oYscrollinnerTop - value);
            O.css('top', oScrollcontentTop + oScrollcontentVal);
          }
        } else {
          if (oYscrollinnerTop + value > H1 - H3) {
            inner.css('top', H1 - H3);
            O.css('top', H1 - H2);
          } else {
            inner.css('top', oYscrollinnerTop + value);
            O.css('top', oScrollcontentTop - oScrollcontentVal);
          }
        };
      });

    },

    mousemoved: function (obj, O, outer, inner, H1, H2, H3) {
      inner.on('mousedown', function (event) {   //绑定鼠标事件

        var clientY = event.clientY,
          oYscrollinnerTop = inner.position().top,
          oScrollcontentTop = O.position().top,

          moveY = 0;

        $(document).on('mousemove', function (event) {
          moveY = event.clientY - clientY;
          var oScrollcontentMove = moveY / (H1 - H3) * (H2 - H1);

          if (oYscrollinnerTop + moveY < 0) {
            inner.css('top', 0);
            O.css('top', 0);
          } else if (oYscrollinnerTop + moveY > H1 - H3) {
            inner.css('top', H1 - H3);
            O.css('top', H1 - H2);
          } else {
            inner.css('top', oYscrollinnerTop + moveY);
            O.css('top', oScrollcontentTop - oScrollcontentMove);
          }
        });

        $(document).on('mouseup', function (event) {
          $(document).off('mousemove');
        })

      })
    }

  }
}
function createDiv() {
  var div = document.createElement("div");
  div.className = "col-sm-6 col-md-4 mb-3 dh";

  return div;
}
function createRow() {

  let row = document.createElement("div");
  row.className = "row";

  return row;
}

function createNavBlock(info) {
  let lines = []
  {
    for (let link of info.urls) {

      lines.push(
        `<div class="col-xs-4 mb-2 sqdiv"><a href="${link.url}" target="_blank" class="squrl">${link.name}</a></div>`
      );
    }
  }
  return `<div class="col-xs-12"><strong class="sqname" >${info.title}</strong></div>
              ${lines.join("\n")}
           `
}
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'phone';
  } else {
    return 'pc';
  }
}
// 在这里修改id，和速度
$(function () {
  window.onscroll = function () {
    //回到顶部
    var sllTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (sllTop > 240) {
      $('#get-top').css('display', 'block')
    } else {
      $('#get-top').css('display', 'none')
    }
  }
  $('#get-top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
  })
  // 显示/隐藏二级菜单
  $(".left-menu-btn").hover(function () {
    $('#tow-nav').fadeIn(200);
  }, function () {
    $("#tow-nav").hover(function () {
      $('#tow-nav').fadeIn(0);
    }, function () {
      $('#tow-nav').fadeOut(0)
    });
    $('#tow-nav').fadeOut(0)
  })


  const navContent = $("#bookmarks");
  $.get("data.json", function (json) {
    if (json) {
      let num = 0;
      for (let group of json) {
        var div = createDiv();
        let line = createRow();
        if (group.title) {
          line.innerHTML += createNavBlock(group)
        }
        div.append(line);
        navContent.append(div);
      }
    }
  })

  // 默认搜索引擎记录
  var searchTypeStore = {
    set: function (type) {
      localStorage.setItem('SearchType', type);
    },
    get: function () {
      return localStorage.getItem('SearchType') || 'bing';
    },
  };

  var $searchMethods = $('#search_methods');
  var $searchLogo = $('#search_logo');
  var initSearchType = searchTypeStore.get();
  $searchLogo.addClass(initSearchType).data('type', initSearchType);

  var search_types = [
    { url: 'https://www.baidu.com/s?wd=', type: 'baidu' },
    { url: 'https://quickso.eu.org/search', type: 'quickso' },
    { url: 'https://kaifa.baidu.com/searchPage?wd=', type: 'develop' },
    { url: 'https://www.sogou.com/web?query=', type: 'sogou' },
    { url: 'https://cn.bing.com/search?q=', type: 'bing' },
    { url: 'https://www.so.com/s?q=', type: 'so' },
    { url: 'https://www.google.com/search?q=', type: 'google' },
    { url: 'http://www.cilimao.cc/search?word=', type: 'cili' },
    { url: 'http://neets.cc/search?key=', type: 'yingyin' },
    { url: 'http://www.panduoduo.net/s/name/', type: 'wangpan' },
  ];
  $searchLogo.on('click', function () {
    $searchMethods.show();
  });

  // 搜索引擎切换
  $searchMethods.on('click', 'li', function () {
    var type = $(this).data('type');
    searchTypeStore.set(type);
    $searchLogo.removeClass()
      .data('type', type)
      .addClass(type + ' search-logo');
    $searchMethods.hide();
    $('#search_keyword').focus();
  });
  $searchMethods.on('mouseleave', function () {
    $searchMethods.hide();
  });

  var EVENT_CLEAR_KEYWORD = 'clearKeyword';
  var EVENT_SEARCH = 'search';
  // 关键词搜索输入
  $('#search_keyword').on('keyup', function (event) {
    var keyword = $(this).val();
    if (event.which == 13) {
      if ($('#search_result .active').length > 0) {
        keyword = $('#search_result .active').eq(0).text();
      }
      openSearch(keyword)
      return;
    }
    // TODO 上下键选择待选答案
    var bl = moveChange(event);
    if (bl) {
      keywordChange(keyword);
    }
  }).on('blur', function () {

    // 解决失焦和点击事件冲突问题
    setTimeout(function () {
      $('#search_result').hide();
    }, 100)
  }).on('focus', function () {
    var keyword = $(this).val();
    keywordChange(keyword);
  });

  function moveChange(e) {
    var k = e.keyCode || e.which;
    var bl = true;
    switch (k) {
      case 38:
        rowMove('top');
        bl = false;
        break;
      case 40:
        rowMove('down');
        bl = false;
        break;
    }
    return bl;
  }
  function rowMove(move) {
    var search_result = $('#search_result');
    var hove_li = null;
    search_result.find('.result-item').each(function () {
      if ($(this).hasClass('active')) {
        hove_li = $(this).index();
      }
    });
    if (move == 'top') {
      if (hove_li == null) {
        hove_li = search_result.find('.result-item').length - 1;
      } else {
        hove_li--;
      }
    } else if (move == 'down') {
      if (hove_li == null) {
        hove_li = 0;
      } else {
        hove_li == search_result.find('.result-item').length - 1 ? (hove_li = 0) : (hove_li++);
      }
    }
    search_result.find('.active').removeClass('active');
    search_result.find('.result-item').eq(hove_li).addClass('active');
    $('#search_keyword').val(search_result.find('.result-item').eq(hove_li).addClass('active').text());
  }

  function keywordChange(keyword) {
    if (keyword === '') {
      $(document).trigger(EVENT_CLEAR_KEYWORD);
    } else {
      $(document).trigger(EVENT_SEARCH, keyword);
      $('#clear_keyword').show();
    }
  }

  // 清空输入框
  $('#clear_keyword').on('click', function () {
    $('#search_keyword').val('');
    $('#search_keyword').focus();
    $(document).trigger(EVENT_CLEAR_KEYWORD);
  });

  // 点击高亮显示
  $('#search_keyword').on('focus', function () {
    $('.search-left').css(
      {
        "border-style": "solid",
        "border-color": "rgba(24, 144, 255, 1)",
        "box-shadow": "0px 0px 2px 1px rgba(145, 213, 255, 0.96)",
      }
    );
  }).on('blur', function () {
    $('.search-left').prop('style', '');
  });
  // 搜索
  $('#search_submit').on('click', function () {
    var keyword = $('#search_keyword').val();
    var type = getSeachType();
    var baseUrl = search_types.find(function (item) {
      return item.type === type;
    });
    if (baseUrl && keyword) {
      window.open(baseUrl.url + keyword);
    }
  });

  $(document).on(EVENT_CLEAR_KEYWORD, function () {
    $('#clear_keyword').hide();
    $('#search_result').hide();
  });
  $(document).on(EVENT_SEARCH, function (e, keyword) {
    getSearchResult(keyword);
  });
  $('ul#search_result').on('click', 'li', function () {
    var word = $(this).text();
    $('#search_keyword').val(word);
    openSearch(word);
    $('#search_result').hide();
  });


  // 获取搜索引擎类型
  function getSeachType() {
    return $('#search_logo').data('type');
  }

  // google 搜索结果
  function searchResultGoogle(data) {
    var result = data[1];
    result = result.map(function (item) {
      return item[0];
    });
    renderSearchResult(result);
  }

  // 百度 搜索结果
  function searchResultBaidu(data) {
    if (data === undefined) {
      return;
    }
    var result = data.s;
    renderSearchResult(result);
  }

  // 渲染搜索结果
  function renderSearchResult(array) {
    var $result = $('#search_result');
    $result.empty().hide();
    if (!array || array.length <= 0) {
      return;
    }
    for (var i = 0; i < array.length; i++) {
      var $li = $('<li class=\'result-item\'></li>');
      $li.text(array[i]);
      $result.append($li);
    }
    $result.show();



  }

  window.searchResultGoogle = searchResultGoogle;
  window.searchResultBaidu = searchResultBaidu;

  var search_suggest = {
    baidu: {
      url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
      data: function (keyword) {
        return {
          wd: keyword,
          cb: 'window.searchResultBaidu',
        };
      },
    },
    google: {
      url: 'http://suggestqueries.google.com/complete/search',
      data: function (keyword) {
        return {
          q: keyword,
          jsonp: 'window.searchResultGoogle',
          client: 'youtube',
        };
      },
    },
    wangpan: {
      url: 'http://unionsug.baidu.com/su',
      data: function (keyword) {
        return {
          wd: keyword,
          cb: 'window.searchResultBaidu',
        };
      },
    }

  };

  function getSearchResult(keyword) {
    var searchType = getSeachType();
    var suggest = search_suggest[searchType];
    if (!suggest) {
      suggest = search_suggest.baidu;
    }
    $.ajax({
      url: suggest.url,
      dataType: 'jsonp',
      data: suggest.data(keyword),
    });
  }

  function openSearch(keyword) {
    var type = getSeachType();
    var baseUrl = search_types.find(function (item) {
      return item.type === type;
    });
    if (baseUrl && keyword) {
      window.open(baseUrl.url + keyword);
    }
  }

  //判断用户使用的设备
  deviceVal = browserRedirect();
  if (deviceVal == 'phone') {
    $('#menu').css({ 'overflow': 'hidden', 'overflow-y': 'scroll' })
    return;
  }
  var api1 = new myApi();
  api1.mouseScroll.inte($('#menu'), 30);
})
