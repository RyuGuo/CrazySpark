// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { buttonHeight,topHeight } from "./config"

cc.Class({
    extends: cc.Component,

    properties: {
        position: 0, //0是下，1是上
        //energy: 1,
        jumpDuration: 0.2,
        //invincibility: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isAction = false
        // 初始化键盘输入监听
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on('touchstart', this.onTouchStart, this);
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off('touchstart', this.onTouchStart, this);
    },

    onTouchStart() {
        if(!this.isAction && this.node.game.gameStatus){
            this.jumpAction();
        }
    },

    onCollisionEnter: function (other, self) {
        this.node.game.gameOver()
    },

    jumpAction() {
        var jump;
        this.isAction = true
        var distans = topHeight-buttonHeight
        if (this.position == 0) {
            this.position = 1;
            jump = cc.moveBy(this.jumpDuration, cc.v2(0,distans));
        } else {
            this.position=0;
            jump = cc.moveBy(this.jumpDuration, cc.v2(0,-distans));
        }
        var finished = cc.callFunc(() => {
            this.isAction = false;
        }, this);

        var action = cc.sequence(jump,finished)
        this.node.runAction(action);
    },

    start() {

    },

     update (dt) {
         
     },
});
