import { eDifficulty } from "../../ts/interface/detail";
import { eDishType } from "../../ts/interface/iDishBlock";

/**
 * Component: 展示菜谱图片与信息的block
 * methods:
 * @argument dishType {eDishType} 块样式 1最受欢迎/2推荐/3分类列表
 * @argument rank {number | undefined} 排名
 * @argument dishName {string} 菜品名称
 * @argument dishTime {string | undefined} 菜品耗时
 * @argument dishDifficulty {eDifficulty} 菜品难度
*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dishType: Number,
    rank: Number,
    dishName: String,
    dishTime: String,
    dishDifficulty: Number,

    dataIdx: Number,
    duration: Number,
    transformIdx: Number,
    contact: Object,

  },

  /**
   * 组件的初始数据
   */
  data: {
    color: 'lightgray'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showNext(e: any) {
      console.log(e);
      this.triggerEvent('showNext', true)
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({
        color: ['#FF842B', '#FDB008', '#C0E148', '#B0B0B0'][this.properties.dataIdx <= 2 ? this.data.dataIdx : 4]
      })
    }
  }
})