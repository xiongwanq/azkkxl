//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    markers: [{   //设置导航标记点
      latitude: 36.409464,
      longitude: 94.922781,
    }],
  },
  onLoad:function(e) {
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })
  },
  navigate() {  //使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
      latitude: this.data.markers[0].latitude,  //要去的纬度-地址
      longitude: this.data.markers[0].longitude,  //要去的经度-地址
    })
  },
  CopyInfo(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.info,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.modal
    })
  },
  hideAbout(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['cloud://azkkxl-3.617a-azkkxl-3-1300045206/miniPhoto/公众号二维码.png'],
      current: 'cloud://azkkxl-3.617a-azkkxl-3-1300045206/miniPhoto/公众号二维码.png' 
    })
  },
})