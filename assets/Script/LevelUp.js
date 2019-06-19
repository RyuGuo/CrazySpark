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
        levelUpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    init() {
        cc.audioEngine.play(this.levelUpAudio, false, 1)
        var moveAciton = cc.moveBy(1, cc.v2(0, 50))
        var fadeOutAction = cc.fadeOut(1.5)
        var finish = cc.callFunc(() => {
            this.node.destroy()
        })
        var action = cc.sequence(cc.spawn(fadeOutAction,moveAciton), finish)
        console.log(action)
        this.node.runAction(action)
    }

    // update (dt) {},
});
