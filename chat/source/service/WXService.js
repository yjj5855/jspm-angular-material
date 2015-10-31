/**
 * Created by yangjiajun on 15/10/14.
 */

//微信jssdk
import wx from 'source/lib/weixin/jweixin-1.0.0'
//import 'source/lib/tarsocial/tarsocial-monitor-v1002'

export default angular.module('WX',[])
    .config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.headers.common = {
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    }])
    .service('wxService',['$rootScope','apiConfig','$http',function($rootScope,apiConfig,$http){

        var weixin = {};
        weixin.init = setWXShare;

        function setWXShare(data,wxUserInfo) {
            //var userInfo = wxUserInfo;
            //tar.config({
            //    tar_token:"ULAn%2FVv0R65JjlmzK6Di7FaCHYQg8oA",   //必填，监测系统分配给此次监测活动的token
            //    tar_tid: "101527"    //必填，监测系统分配给此次监测活动的id
            //},[userInfo]);

            var shareText = {
                title: data.title,
                desc: data.desc,
                link: data.link,
                shareLink:data.shareLink
            };

            function loadWXTicket(shareText, callback) {
                $http({
                    url:apiConfig.base_host+'wechat/callback/sign',
                    params:{link: shareText.link},
                    method:'GET'
                }).success(function(data,header,config,status){
                    callback(data.data);
                }).error(function(data,header,config,status){
                    console.log('error');
                });
            }

            loadWXTicket(shareText, function (ticket) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 
                    appId: ticket.appid, // 必填，公众号的唯一标识 
                    timestamp: ticket.timestamp, // 必填，生成签名的时间戳 
                    nonceStr: ticket.noncestr, // 必填，生成签名的随机串 
                    signature: ticket.signature,// 必填，签名，见附录1 
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "previewImage",
                        "getLocation"
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
                });
                // 要显示的菜单项，所有menu项见附录3
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:appMessage',
                        'menuItem:share:timeline',
                        'menuItem:favorite'
                    ]
                });
                // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:share:facebook',
                        'menuItem:share:QZone',
                        'menuItem:copyUrl',
                        'menuItem:originPage',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari'
                    ]
                });
                wx.ready(function () {

                    var shareData64 = {
                        title: shareText.title, // 分享标题 
                        desc: shareText.desc, // 分享描述 
                        link: shareText.shareLink, // 分享链接 
                        imgUrl: 'http://7xl1vx.com2.z0.glb.qiniucdn.com/blue_share.jpg', // 分享图标 
                        type: 'link', // 分享类型,music、video或link，不填默认为link 
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空 
                        success: function () {
                            // 用户确认分享后执行的回调函数 
                            console.log("用户分享成功");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数 
                            console.log("用户取消分享后执行的回调函数");
                        }
                    };

                    //分享给好友 
                    wx.onMenuShareAppMessage(shareData64);
                    //分享到朋友圈 
                    wx.onMenuShareTimeline(shareData64);

                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            var speed = res.speed; // 速度，以米/每秒计
                            var accuracy = res.accuracy; // 位置精度

                            weixin.latitude = latitude+':'+longitude;
                            console.log(weixin.latitude);
                        }
                    });

                    weixin.previewImage = function(imgUrl){
                        wx.previewImage({
                            current: imgUrl, // 当前显示图片的http链接
                            urls: [imgUrl] // 需要预览的图片http链接列表
                        });
                    }
                    
                })
            });
        }


        return weixin;
    }])