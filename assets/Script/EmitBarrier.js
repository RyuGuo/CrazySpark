// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { buttonHeight } from "./config"

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    emit() {
        var emitAction = cc.moveBy(this.speed, cc.v2(-1400, 0));
        this.node.runAction(emitAction);
    },

    start() {

    },

    // update (dt) {},
});
