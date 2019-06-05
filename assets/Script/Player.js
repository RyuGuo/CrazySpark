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
        position: 0,
        energy: 1,
        jumpDuration: 0.1,
        energyDecreasingSpeed: 20
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

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
        console.log("touch")
        this.jumpAction();
    },

    onCollisionEnter: function (other, self) {
        console.log("other",other.node)
        //console.log("self",self)
        //var barrier = other.node.getComponent("Barrier")
        //this.energy -= barrier.energyLoss;
        //this.node.game.updateEnergyBar(this.energy);
    },

    resetEnergy(){
        this.energy = 1;
    },

    energyDecrease(value) {
        this.energy -= value;
        if(this.energy < 0){
            this.node.game.resetScore();
            this.energy = 1;
        }
        this.node.game.updateEnergyBar(this.energy);
    },

    energyAdd(value) {
        this.energy += value;
        if(this.energy > 1){
            this.energy = 1;
        }
        this.node.game.updateEnergyBar(this.energy);
    },

    jumpAction() {
        var jump;
        
        if (this.position == 0) {
            this.position = 1;
            jump = cc.moveBy(this.jumpDuration, cc.v2(360, 0));
        } else {
            this.position=0;
            jump = cc.moveBy(this.jumpDuration, cc.v2(-360, 0));
        }
        var finished = cc.callFunc(() => {
            this.node.game.gainScore();
        }, this);//动作完成后会给玩家加分

        var action = cc.sequence(jump,finished)
        this.node.runAction(action);
    },

    start() {

    },

     update (dt) {
         this.energyDecrease(dt*this.energyDecreasingSpeed);
     },
});
