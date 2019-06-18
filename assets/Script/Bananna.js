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
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    eatBananna(){
        var moveAction = cc.moveTo(0.5,cc.v2(-480,270));
        var rotation = cc.rotateBy(0.5,360);
        var scale = cc.scaleTo(0.5,0.02);
        var finish = cc.callFunc(()=>{
            //this.node.game.banannaPrefabPool.put(this.node)
            //this.node.game.removeNodeFormMoveArray(this.node)
            //console.log(this.node.x,this.node.y)
            this.node.destroy()
        })
        var spawnaction = cc.spawn(moveAction,rotation,scale)
        var action = cc.sequence(spawnaction,finish);
        this.node.runAction(action)
    },

    start () {

    },

    // update (dt) {},
});
