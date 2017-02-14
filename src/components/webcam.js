var Texture2D = gr.lib.fundamental.Resource.Texture2D;
var LoopManager = gr.lib.fundamental.Components.LoopManagerComponent;
var audioTexture;

gr.registerComponent("WebAudioShaderResource", {
    attributes: {

    },
    $mount: function () {
        this.audioContext = new AudioContext();
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, (stream) => {
                this.inputPoint = this.audioContext.createGain();
                this.audioInput = this.audioContext.createMediaStreamSource(stream);
                this.audioInput.connect(this.inputPoint);
                this.analyserNode = this.audioContext.createAnalyser();
                this.analyserNode.fftSize = 128;
                this.inputPoint.connect(this.analyserNode);
                this._freqData = new Uint8Array(this.analyserNode.frequencyBinCount);
            }, function (e) {
                alert('Error capturing audio.');
            });
        } else alert('getUserMedia not supported in this browser.');
        const loopManager = this.node.getComponent(LoopManager);
        audioTexture = new Texture2D(this.companion.get("gl"));
        audioTexture.magFilter = WebGLRenderingContext.NEAREST;
        loopManager.register(()=>{
            if(this._freqData){
                this.analyserNode.getByteFrequencyData(this._freqData);
                audioTexture.update(0,this.analyserNode.frequencyBinCount/4,1,0,WebGLRenderingContext.RGBA,WebGLRenderingContext.UNSIGNED_BYTE,this._freqData);
            }
        },1000);
    }
});

var UniformResolverRegistry = gr.lib.fundamental.Material.UniformResolverRegistry;

UniformResolverRegistry.add("AUDIO_FFT", (valInfo) => (proxy, args) => {
  proxy.uniformTexture2D(valInfo.name,audioTexture);
});

gr.overrideDeclaration("goml",["WebAudioShaderResource"]);

var webcamTexture,video;
gr.registerComponent("WebcamShaderResource", {
    attributes: {
    },
    $mount: function() {
        var _this = this;
        const loopManager = this.node.getComponent(LoopManager);
        webcamTexture = new Texture2D(this.companion.get("gl"));
        webcamTexture.magFilter = WebGLRenderingContext.NEAREST;
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
        navigator.getUserMedia({ video: true, audio: false },
            (localMediaStream) => {
                var url = (window.URL || window.webkitURL);
                video = document.createElement('video');
                const onStart = function() {
                    video.removeEventListener('canplay',onStart, true);
                    video.play();

                };
                video.addEventListener('canplay', onStart, true);
                video.src = url.createObjectURL(localMediaStream);
            },
            () => {}
        );
        loopManager.register(()=>{
            if(video){
              webcamTexture.update(video);
            }
        },1000);
    }
});

gr.overrideDeclaration("goml",["WebcamShaderResource"]);

UniformResolverRegistry.add("WEBCAM", (valInfo) => (proxy, args) => {
  debugger;
  proxy.uniformTexture2D(valInfo.name,webcamTexture);
});
