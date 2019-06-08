export function findPlayerNode() {
  return cc.find("Canvas/Player");
}

export const GameItem = cc.Class({
  extends: cc.Component,

  properties: {
    actionFlag: false,
    moveDuration: 5
  },

  setMoveDuration(value){
    this.moveDuration = value
  },

  onCollisionEnter(other, self) {
  },

  move() {
    //只动一次
    this.actionFlag = true
    var moveAction = cc.moveBy(this.moveDuration, cc.v2(0, -1050));
    var finished = cc.callFunc(() => {
      this.actionFlag = false
      this.node.destroy()
    }, this);

    var action = cc.sequence(moveAction, finished)
    this.node.runAction(action);
  },
  
  start(){

  }
})