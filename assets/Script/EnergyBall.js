// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { findPlayerNode } from "../Script/config";

cc.Class({
    extends: cc.Component,

    properties: {
        moveDuration: 1,
        recoveryValue: 0.2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.move()
    },

    onCollisionEnter(other, self) {
        var player = findPlayerNode().getComponent("Player")
        player.energyAdd(this.recoveryValue);
    },

    move() {
        var moveAction = cc.moveBy(this.moveDuration, cc.v2(0, -1050));
        var finished = cc.callFunc(() => {
            this.node.y=508;
        }, this);

        var action = cc.sequence(moveAction,finished)
        this.node.runAction(cc.repeatForever(action));
    },

    start () {

    },

    // update (dt) {},
});
