import { api, request } from "../../api/request"
import { arr, arr1, eDifficulty, eIcon, iPrepare } from "../../ts/interface/detail"
import { mReceipeQuery } from "../../ts/model/detail"

// components/detail/detail.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contact: Object,
    show: Boolean,
    overlay: Boolean,
    duration: Number,
    position: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    prepare: {
      cover: '',
      longTitle: '',
      like: false,
      description: '',
      amount: 0,
      recipeDetails: [{}],
    },
    // styleSheet 
    top: 0,
    scrollTop: 0,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showPrev() {
      // this.setData({
      //   show: false
      // });
      //close page
      this.triggerEvent('showPrev', false)
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
          height: '400px',
          // transform: 'translateY(-20px)',
          // offset: 0,
        }, {
          height: '250px',
          // transform: 'translateY(-20px)',
          // offset: .5,
        }, {
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
      }).exec()
    },
    async getRecipe(recipeId: string) {
      const detail: mReceipeQuery = await request(api.recipeQuery, {
        "queryOption": {
          "parseDetail": true,
          "parseProcedure": false
        },
        recipeId
      }, "POST");
      console.log(detail);
      
      this.setData({
        prepare: {
          ...this.data.prepare,
          recipeDetails: detail.data.recipeDetails
        }
      })
    },
    onBeforeEnter(res: any) {
      wx.getStorage({
        key: 'menuBtnPos',
        success: res => {
          console.log(res);
          this.setData({
            top: res.data.top
          })
        }
      })
      console.log(res)
    },
    async onEnter(res: any) {
      this.getRecipe(this.properties.contact.id);
      this._animate();
      const data: iPrepare = {
        ...this.data.prepare,
        ...this.properties.contact,
        hints: [{
          icon: eIcon.time, name: this.properties.contact.timeTaken
        },
        {
          icon: eIcon.salver, name: eDifficulty[this.properties.contact.difficulty]
        }],
        attention: ['肉丝不需要过油炸，所以尽量选用稍微带一点肥肉的五花肉。', '鱼香汁要提前兑好。', '这里的鱼香肉丝，咱们采用的是家庭做法，不过油;味道自然会比传统做法稍逊一点。但是做出来的味道，清淡健康。']
      }
      console.log(data);

      this.setData({

        prepare: { ...this.data.prepare, ...data }
      })
      console.log('data', this.data.prepare)
    },
    onAfterEnter(res: any) {
      console.log(res)
    },
    onBeforeLeave(res: any) {
      console.log(res)
    },
    onLeave(res: any) {
      this.triggerEvent('showPrev', false)
      this.setData({
        scrollTop: 0
      })
    },
    onAfterLeave(res: any) {
      console.log(res)
    },
  },
  observers: {
    'contact': (contact) => {

      console.log('change:', contact);
    },
    'show': show => {
      console.log('show', show);

    }
    // 'show':function(show){
    //   this.setData({show})
    // }
  }
})
