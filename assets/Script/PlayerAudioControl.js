// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        injuredAudio: {
            default: null,
            type: cc.AudioClip
        },
        getSomethingAudio: {
            default: null,
            type: cc.AudioClip
        },
        recoveryAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onJumpAudioPlay(){
        this.current = cc.audioEngine.play(this.jumpAudio, false, 1);
    },

    onInjuredAudioPlay(){
        this.current = cc.audioEngine.play(this.injuredAudio, false, 1);
    },

    onGetSomethingAudio() {
        this.current = cc.audioEngine.play(this.getSomethingAudio, false, 1);
    },

    onRecoveryAudio(){
        this.current = cc.audioEngine.play(this.recoveryAudio, false, 1);
    },

    start () {

    },

    // update (dt) {},
});
