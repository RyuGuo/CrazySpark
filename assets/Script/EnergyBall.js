// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { findPlayerNode,GameItem } from "../Script/config";

cc.Class({
    extends: GameItem,

    properties: {
        recoveryValue: 0.2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.move()
    },

    onCollisionEnter(other, self) {
        var player = findPlayerNode().getComponent("Player")
        player.energyGet(this.recoveryValue);
        this.node.destroy()
    },

    start () {

    },

    // update (dt) {},
});
