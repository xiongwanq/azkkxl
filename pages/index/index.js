 /* introduce.js */
const app = getApp()
wx.cloud.init()

Page({
  data: {
    src: '',
    tabArr:{
      tabCurrentIndex:0
    },
    TabCur: 0,
    articleInfos: [],
    linkUrl:'',
    clientHeight:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (e) {
    console.log("onLoad")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
     mask: true,
    })
    this.getArticleInfo(this)
    wx.hideLoading()
    console.log('start')
    wx.getSystemInfo({
       success:(res)=> {
         that.setData({
           clientHeight: (res.windowHeight-100)*2
         });
         console.log(this.data.clientHeight)
       }
     })
     wx.showShareMenu({
       withShareTicket:true,
       menus:['shareAppMessage','shareTimeline']
     })
  },
  tabSelect:function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      'tabArr.tabCurrentIndex':e.currentTarget.dataset.id,
    })
  },
  swiperChange:function(e){
    this.setData({
      'tabArr.tabCurrentIndex':e.detail.current,
    })
  },
  getArticleInfo(that) {
    console.log("getArticleInfo");
    let articleInfo = [];
    wx.cloud.database().collection("tbl_article").orderBy('_id','asc').get({
      success(res) {
        console.log("请求成功", res.data)
        let dataList = res.data;
        for (let i = 0; i < dataList.length; i++) {
          articleInfo.push({"coverImgUrl":dataList[i].coverImgUrl,"title":dataList[i].title,"id":dataList[i]._id,"type":dataList[i].type,"linkUrl":dataList[i].linkUrl})
        }
        console.log(articleInfo)
        that.setData({
          articleInfos: articleInfo,
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  toWxLink: function(e) {
    console.log("toWxLink")
    this.setData({
      linkUrl:e.currentTarget.dataset.link,
    })
    console.log(e.currentTarget.dataset.link)
    wx.navigateTo({
      url: '../wxlink/wxlink?linkUrl='+this.data.linkUrl
    })
  },
  /**
  * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
  */
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },tabSelect:function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      'tabArr.tabCurrentIndex':e.currentTarget.dataset.id,
    })
  },
  swiperChange:function(e){
    this.setData({
      'tabArr.tabCurrentIndex':e.detail.current,
    })
  },
  getArticleInfo(that) {
    console.log("getArticleInfo");
    let articleInfo = [];
    wx.cloud.database().collection("tbl_article").orderBy('_id','asc').get({
      success(res) {
        console.log("请求成功", res.data)
        let dataList = res.data;
        for (let i = 0; i < dataList.length; i++) {
          articleInfo.push({"coverImgUrl":dataList[i].coverImgUrl,"title":dataList[i].title,"id":dataList[i]._id,"type":dataList[i].type,"linkUrl":dataList[i].linkUrl})
        }
        console.log(articleInfo)
        that.setData({
          articleInfos: articleInfo,
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  toWxLink: function(e) {
    console.log("toWxLink")
    this.setData({
      linkUrl:e.currentTarget.dataset.link,
    })
    console.log(e.currentTarget.dataset.link)
    wx.navigateTo({
      url: '../wxlink/wxlink?linkUrl='+this.data.linkUrl
    })
  },
  /**
  * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
  */
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
})
