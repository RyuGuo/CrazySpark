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
        continueButton: {
            default: null,
            type: cc.Button
        },
        resumeButton: {
            default: null,
            type: cc.Button
        },
        gobackButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //console.log(this)
        this.continueButton.node.active = true
        this.continueButton.node.on('click', this.onContinueButtonCallBack, this);
        this.resumeButton.node.on('click', this.onResumeButtonCallBack, this);
        this.gobackButton.node.on('click', this.onGobackButtonnCallBack, this);
    },

    onDisable(){
        this.continueButton.node.off('click', this.onContinueButtonCallBack, this);
        this.resumeButton.node.off('click', this.onResumeButtonCallBack, this);
        this.gobackButton.node.off('click', this.onGobackButtonnCallBack, this);
    },

    onContinueButtonCallBack() {
        this.node.game.pauseButton.node.active = true
        this.node.game.gameStatus = true
        this.node.active = false /* 会触发onDisable使按钮失效 */
        cc.director.resume()
    },

    onResumeButtonCallBack(){
        cc.director.loadScene('game')
        cc.director.resume() /* 结束暂停状态 */
    },
    onGobackButtonnCallBack(){
        cc.director.loadScene("index")
    },

    start () {
        
    },


    // update (dt) {},
});
