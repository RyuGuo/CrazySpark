// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//import { barrierType } from "./config"

cc.Class({
    extends: cc.Component,

    properties: {
        crashAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onCollisionEnter(other, self) {
        if (other.node.name === 'monkey' && self.node.collisionCounter == 0) {
            this.current = cc.audioEngine.play(this.crashAudio, false, 1);
        }
    },

    start() {

    },

    // update (dt) {},
});
