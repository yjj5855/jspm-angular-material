/**
 * Created by yangjiajun on 15/9/30.
 */

import FaceTemplate from './face-template.html!text'

export default angular.module('chat')
    .directive('face',['$rootScope',function($rootScope){
        return {
            restrict: 'AE',
            replace: false,
            transclude:true,
            scope:{
            },
            template: function (element,attrs) {
                return FaceTemplate;
            },
            link : function(scope, element, attrs){
                scope.face_list = [

                    {name:'[blush]',img:'ee_1.png'},
                    {name:'[relieved]',img:'ee_2.png'},
                    {name:'[heart_eyes]',img:'ee_3.png'},
                    {name:'[hushed]',img:'ee_4.png'},
                    {name:'[kissing_closed_eyes]',img:'ee_5.png'},
                    {name:'[stuck_out_tongue_winking_eye]',img:'ee_6.png'},
                    {name:'[stuck_out_tongue_closed_eyes]',img:'ee_7.png'},
                    {name:'[sleepy]',img:'ee_8.png'},
                    {name:'[sob]',img:'ee_9.png'},
                    {name:'[joy]',img:'ee_10.png'},
                    {name:'[grin]',img:'ee_11.png'},
                    {name:'[smiley]',img:'ee_12.png'},
                    {name:'[sweat]',img:'ee_13.png'},
                    {name:'[confounded]',img:'ee_14.png'},
                    {name:'[kissing_heart]',img:'ee_15.png'},
                    {name:'[angry]',img:'ee_16.png'},
                    {name:'[flushed]',img:'ee_17.png'},
                    {name:'[mask]',img:'ee_18.png'},
                    {name:'[astonished]',img:'ee_19.png'},
                    {name:'[rage]',img:'ee_20.png'},
                    {name:'[zzz]',img:'ee_21.png'},
                    {name:'[iphone]',img:'ee_22.png'},
                    {name:'[beers]',img:'ee_23.png'},
                    {name:'[punch]',img:'ee_24.png'},
                    {name:'[ok_hand]',img:'ee_25.png'},
                    {name:'[+1]',img:'ee_26.png'},
                    {name:'[thumbsdown]',img:'ee_27.png'},
                    {name:'[clap]',img:'ee_28.png'},
                    {name:'[pray]',img:'ee_29.png'},
                    {name:'[broken_heart]',img:'ee_30.png'},
                    {name:'[rose]',img:'ee_31.png'},
                    {name:'[bikini]',img:'ee_32.png'},
                    {name:'[dress]',img:'ee_33.png'},
                    {name:'[womans_hat]',img:'ee_34.png'},
                    {name:'[shirt]',img:'ee_35.png'},
                    {name:'[high_heel]',img:'ee_36.png'},
                    {name:'[boot]',img:'ee_37.png'},
                    {name:'[boy]',img:'ee_38.png'},
                    {name:'[girl]',img:'ee_39.png'},
                    {name:'[man]',img:'ee_40.png'},
                    {name:'[woman]',img:'ee_41.png'},
                    {name:'[skull]',img:'ee_42.png'},
                    {name:'[fire]',img:'ee_43.png'}

                ];
                scope.click_face = click_face;


                function click_face(face_name){
                    scope.$emit('face_inputting',face_name);
                }
            }
        }
    }])