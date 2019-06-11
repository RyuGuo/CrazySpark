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
        playButton: {
            default: null,
            type: cc.Button
        },
        helpButton: {
            default: null,
            type: cc.Button
        },
        settingButton: {
            default: null,
            type: cc.Button
        },
        exitButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("获取视图的大小",cc.winSize)
        this.playButton.node.on('click', this.onPlayButtonCallBack, this);
        this.helpButton.node.on('click', this.onHelpButtonCallBack, this);
        this.settingButton.node.on('click', this.onSettingButtonCallBack, this);
        this.exitButton.node.on('click', this.onExitButtonCallBack, this);

    },

    onDisable(){
        this.playButton.node.on('click', this.onPlayButtonCallBack, this);
        this.helpButton.node.on('click', this.onHelpButtonCallBack, this);
        this.settingButton.node.on('click', this.onSettingButtonCallBack, this);
        this.exitButton.node.on('click', this.onExitButtonCallBack, this);
    },

    onPlayButtonCallBack(){
        cc.director.loadScene("game")
        cc.director.resume() /* 结束暂停状态 */
    },

    onHelpButtonCallBack(){

    },

    onSettingButtonCallBack(){


    },

    onExitButtonCallBack(){
        cc.director.end();
    },

    start () {

    },

    // update (dt) {},
});
