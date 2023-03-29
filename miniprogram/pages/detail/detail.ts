// import { api } from "../../api/api";
import { request, api } from "../../api/request";
import { mReceipeQuery } from "../../ts/model/detail";
import { arr, arr1, eDifficulty, eIcon, iPrepare } from "../../ts/interface/detail";

Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    prepare: {
      cover: '',
      longTitle: '',
      like: false,
      description: '',
      amount: 0,
    },
    // styleSheet 
    top: 0,
  },
  onLoad() {
    wx.getStorage({
      key: 'menuBtnPos',
      success: res => {
        console.log(res);
        this.setData({
          top: res.data.top
        })
      }
    })
  },
  _animate() {
    let gradient: arr = [],
      prepareList: arr1 = []
    let i = 0
    while (i <= 100) {
      gradient.push({
        backgroundImage: `linear-gradient(0deg,rgba(0,0,0,${1 - i / 100}),rgba(0,0,0,${1 - i / 100}),rgba(0,0,0,${1 - i / 100}), rgba(0,0,0,0))`,
      })
      prepareList.push({
        borderTopRightRadius: `${50 * (1 - i / 100)}px`,
      })
      i++
    }
    wx.createSelectorQuery().select('#scroller').fields({
      scrollOffset: true,
      size: true,
    }, () => {
      this.animate('.avatar', [{
        borderBottomRightRadius: '30%',
        borderColor: 'red',
        height: '400px',
        // transform: 'translateY(-20px)',
        // offset: 0,
      }, {
        borderBottomRightRadius: '25%',
        borderColor: 'blue',
        height: '250px',
        // transform: 'translateY(-20px)',
        // offset: .5,
      }, {
        borderBottomRightRadius: '0%',
        borderColor: 'blue',
        height: '100px',
        // transform: `translateY(-20px)`,
        // offset: 1
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 0,
        endScrollOffset: 485,
      })
      this.animate('.likeBtn', [{
        marginRight: '0px',

      }, {
        marginRight: '100px',
      }], 2000, { scrollSource: '#scroller', timeRange: 2000, startScrollOffset: 50, endScrollOffset: 200 })
      this.animate('.content', [{
        borderBottomLeftRadius: '20%',
        borderColor: 'red',
        marginTop: '-10px',
        background: 'black',
      }, {
        borderBottomLeftRadius: '10%',
        borderColor: 'blue',
        marginTop: '-250px',
        background: 'black',
      }, {
        borderBottomLeftRadius: '0%',
        borderColor: 'blue',
        marginTop: '-450px',
        background: 'opacity',
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 300,
        endScrollOffset: 485,
      })

      this.animate('.gradient', gradient, 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 100,
        endScrollOffset: 400,
      })
      this.animate('.prepare-list', prepareList, 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 200,
        endScrollOffset: 400
      })
      this.animate('.hints', [{
        opacity: '1'
      }, {
        opacity: '0'
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 100,
        endScrollOffset: 200
      })
      // this.animate('.hint-container', [{
      //   height: '65px',
      //   width: '100px'
      // }, {
      //   height: '0px',
      //   width: '0px'
      // }], 2000, {
      //   scrollSource: '#scroller',
      //   timeRange: 2000,
      //   startScrollOffset: 0,
      //   endScrollOffset: 200
      // })
      // this.animate('.search_icon', [{
      //   right: '0',
      //   transform: 'scale(1)',
      // }, {
      //   right: (wx.getSystemInfoSync().windowWidth * .5 - 20) + 'px',
      //   transform: 'scale(.6)',
      // }], 1000, {
      //   scrollSource: '#scroller',
      //   timeRange: 1000,
      //   startScrollOffset: 140,
      //   endScrollOffset: 252,
      // })
    }).exec()
  },
  async onReady() {
    this._animate();
    const detail: mReceipeQuery = await request(api.recipeQuery, {
      "queryOption": {
        "parseDetail": true,
        "parseProcedure": false
      },
      "recipeId": 1
    }, "POST")
    console.log(detail)
    // handle data
    const data: iPrepare = {
      ...this.data.prepare,
      ...detail.data,
      hints: [{ icon: eIcon.time, name: detail.data.timeTaken }, {
        icon: eIcon.salver, name: eDifficulty[detail.data.difficulty]
      }],
      attention: ['肉丝不需要过油炸，所以尽量选用稍微带一点肥肉的五花肉。', '鱼香汁要提前兑好。', '这里的鱼香肉丝，咱们采用的是家庭做法，不过油;味道自然会比传统做法稍逊一点。但是做出来的味道，清淡健康。']
    }
    this.setData({
      prepare: data
    })
  },
  tapLike() {
    this.setData({
      prepare: {
        ...this.data.prepare,
        like: !this.data.prepare.like
      }

    })
  },

})
