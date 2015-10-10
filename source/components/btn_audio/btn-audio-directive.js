/**
 * Created by yangjiajun on 15/10/8.
 *
 */

//语音
import 'source/lib/Recorderjs/recorder'
import 'source/lib/Recorderjs/recorderWorker'

export default angular.module('chat')
    .directive('cmAudioBtn',['$rootScope',function($rootScope){
        var audio_context;

        function startUserMedia(stream) {
            var input = audio_context.createMediaStreamSource(stream);
            console.log('Media stream created.');
            // Uncomment if you want the audio to feedback directly
            //input.connect(audio_context.destination);
            //__log('Input connected to audio context destination.');

            $rootScope.recorder = new Recorder(input);
            console.log('Recorder initialised.');
        }

        return {
            restrict: 'AE',
            replace: true,
            scope:{
                ngModel:'='
            },
            link : function($scope,element,attrs){

                element.on('click',function(){
                    console.log($scope.ngModel);
                    $scope.ngModel = !$scope.ngModel;
                    $rootScope.$apply($scope.ngModel);
                    if(angular.isUndefined($rootScope.recorder)){
                        try {
                            // webkit shim
                            window.AudioContext = window.AudioContext || window.webkitAudioContext;
                            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                            window.URL = window.URL || window.webkitURL;

                            audio_context = new AudioContext;
                            console.log('Audio context set up.');
                            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
                        } catch (e) {
                            alert('No web audio support in this browser!');
                        }

                        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
                            $scope.status = false;
                            alert('未找到在线的音频输入设备: ' + e);
                        });
                    }
                })


            }
        }
    }])
    .directive('cmAudioInputBtn',['$rootScope',function($rootScope){
        return {
            restrict: 'E',
            replace: false,
            scope:true,
            link : function($scope,element,attrs){
                $scope.startRecording = startRecording;
                $scope.stopRecording = stopRecording;

                element.on('mousedown',function(){
                    startRecording()
                    console.log('正在录音。。。')
                })

                element.on('mouseup',function(){
                    stopRecording()
                    console.log('结束录音。。。')
                })

                function startRecording(button){
                    $rootScope.recorder && $rootScope.recorder.record();
                }

                function stopRecording(button) {
                    $rootScope.recorder && $rootScope.recorder.stop();
                    // create WAV download link using audio data blob
                    var audioUrl = createDownloadLink();


                    $rootScope.recorder.clear();
                }

                function createDownloadLink() {
                    $rootScope.recorder && $rootScope.recorder.exportWAV(function(blob) {
                        var audioUrl = URL.createObjectURL(blob);
                        $scope.$emit('audio_inputting',audioUrl);
                        console.log('完成录音。。。')
                    });
                }
            }
        }
    }]);