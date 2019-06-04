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
        score: 0,
        scoreAdding: 1,
        lineLeft: {
            default: null,
            type: cc.Node
        },
        lineRight: {
            default: null,
            type: cc.Node
        },
        Player: {
            default: null,
            type: cc.Node
        },
        // keyboardHint: {
        //     default: '',
        //     multiline: true
        // },
        // touchHint: {
        //     default: '',
        //     multiline: true
        // },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        barrier: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Player.game = this  //在Player对象中创建一个game指针，这样可以调用Game.js中的方法
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true; //显示碰撞边框
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gainScore() {
        this.score += this.scoreAdding;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    start () {

    },

    // update (dt) {},
});
