export function findPlayerNode() {
  return cc.find("Canvas/Player");
}

export const buttonHeight = -222;
export const topHeight = 40;
export const windowWidth = 1354;

export const Barrier = cc.Class({
  extends: cc.Component,

  properties: {
    actionFlag: false,
    moveDuration: 2
  },

  setMoveDuration(value){
    this.moveDuration = value
  },

  onCollisionEnter(other, self) {

  },

  move() {
    //只动一次
    this.actionFlag = true
    var moveAction = cc.moveBy(this.moveDuration, cc.v2(-1500, 0));
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