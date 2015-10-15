/**
 * Created by yangjiajun on 15/10/14.
 */

//微信jssdk
import wx from 'source/lib/weixin/jweixin-1.0.0'

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

        function setWXShare(data) {
            var shareText = {
                title: data.title,
                desc: data.desc,
                link: data.link
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
                        "onMenuShareQQ",
                        "onMenuShareWeibo",
                        "onMenuShareQZone",
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
                });
                wx.ready(function () {
                    //分享给好友 
                    wx.onMenuShareAppMessage({
                        title: shareText.title, // 分享标题 
                        desc: shareText.desc, // 分享描述 
                        link: shareText.link, // 分享链接 
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
                    });
                    //分享到朋友圈 
                    wx.onMenuShareTimeline({
                        title: shareText.title, // 分享标题 
                        desc: shareText.desc, // 分享描述 
                        link: shareText.link, // 分享链接 
                        imgUrl: 'http://7xl1vx.com2.z0.glb.qiniucdn.com/blue_share.jpg', // 分享图标 
                        type: 'link', // 分享类型,music、video或link，不填默认为link 
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空 
                        success: function () {
                            // 用户确认分享后执行的回调函数 
                            console.log("用户分享成功")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数 
                            console.log("用户取消分享后执行的回调函数")
                        }
                    });
                    //分享到QQ
                    wx.onMenuShareQQ({
                        title: shareText.title, // 分享标题
                        desc: shareText.desc, // 分享描述
                        link: shareText.link, // 分享链接
                        imgUrl: 'http://7xl1vx.com2.z0.glb.qiniucdn.com/blue_share.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            console.log("用户分享成功");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log("用户取消分享后执行的回调函数");
                        }
                    });
                    //分享到腾讯微博
                    wx.onMenuShareWeibo({
                        title: shareText.title, // 分享标题
                        desc: shareText.desc, // 分享描述
                        link: shareText.link, // 分享链接
                        imgUrl: 'http://7xl1vx.com2.z0.glb.qiniucdn.com/blue_share.jpg',// 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            console.log("用户分享成功");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log("用户取消分享后执行的回调函数");
                        }
                    });
                    //分享到QQ空间
                    wx.onMenuShareQZone({
                        title: shareText.title, // 分享标题
                        desc: shareText.desc,// 分享描述
                        link: shareText.link, // 分享链接
                        imgUrl: 'http://7xl1vx.com2.z0.glb.qiniucdn.com/blue_share.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            console.log("用户分享成功");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log("用户取消分享后执行的回调函数");
                        }
                    });

                    //weixin.choseImage = function(callback){
                    //    return new Promise(function(resolve,reject){
                    //        wx.chooseImage({
                    //            count: 1, // 默认9
                    //            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    //            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    //            success: function (res) {
                    //                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    //                resolve(localIds);
                    //            },
                    //            fail:function(msg){
                    //                reject(msg)
                    //            }
                    //        });
                    //    })
                    //
                    //}


                })
            });
        }


        return weixin;
    }])