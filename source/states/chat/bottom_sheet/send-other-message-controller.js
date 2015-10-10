/**
 * Created by yangjiajun on 15/9/30.
 */


export default angular.module('chat')
    .controller('SendOtherMessageCtrl',['$scope','$mdBottomSheet','$rootScope',function($scope, $mdBottomSheet,$rootScope) {
        $scope.items = [
            { name: '表情', type: 1 , icon: 'emoticon' },
            { name: '图片', type: 3 , icon: 'file-image-box' },
            //{ name: '语音', type: 2 , icon: 'microphone' }
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            switch (clickedItem.type){
                case 2:
                    //语音

                    break;
                case 3:
                    //图片
                    //console.log(document.getElementById("img_input").click)
                    //document.getElementById("img_input").click();
                    break;
                default :
                    break;
            }
            //$mdBottomSheet.hide(clickedItem);
        };



        var audio_context;

        $scope.startRecording = startRecording;
        $scope.stopRecording = stopRecording;


        function startUserMedia(stream) {
            var input = audio_context.createMediaStreamSource(stream);
            console.log('Media stream created.');
            // Uncomment if you want the audio to feedback directly
            //input.connect(audio_context.destination);
            //__log('Input connected to audio context destination.');

            $rootScope.recorder = new Recorder(input);
            console.log('Recorder initialised.');
        }

        function startRecording(button){
            $rootScope.recorder && $rootScope.recorder.record();
        }

        function stopRecording(button) {
            $rootScope.recorder && $rootScope.recorder.stop();
            // create WAV download link using audio data blob
            createDownloadLink();

            $rootScope.recorder.clear();
        }

        function createDownloadLink() {
            $rootScope.recorder && $rootScope.recorder.exportWAV(function(blob) {
                var audioUrl = URL.createObjectURL(blob);

                console.log(audioUrl);
                document.getElementById("recordingslist").innerHTML = '<audio controls src="'+audioUrl+'"></audio>'
                //$rootScope.aduioUrl = new Date().getTime() + '.wav';

            });
        }

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
                alert('No web audio support in this browser!浏览器不支持语音输入!');
            }

            navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
                alert('未找到在线的音频输入设备!');
            });
        }

    }])