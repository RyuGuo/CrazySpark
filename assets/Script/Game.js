// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { buttonHeight, topHeight, windowWidth,rattanCenterPadding } from "./config"

cc.Class({
    extends: cc.Component,

    properties: {
        Player: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        pauseBoardNode: {
            default: null,
            type: cc.Node
        } ,
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
        fencePrefab: {
            default: null,
            type: cc.Prefab
        },
        background1: {
            default: null,
            type: cc.Node
        },
        background2: {
            default: null,
            type: cc.Node
        },
        rattan1: {
            default: null,
            type: cc.Node
        },
        rattan2: {
            default: null,
            type: cc.Node
        },
        rattan3: {
            default: null,
            type: cc.Node
        },
        rattan4: {
            default: null,
            type: cc.Node
        },
        pauseButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameTimer = 0
        this.barrierTimer = 0
        this.difficult = 1
        this.gameStatus = true     //true代表游戏运行
        this.gameMoveNodeArray = []  //需要根据屏幕移动的节点数组
        this.rattans = [this.rattan1,this.rattan2,this.rattan3,this.rattan4]

        console.log(this.rattans)
        
        this.Player.game = this  //在Player对象中创建一个game指针，这样可以调用Game.js中的方法
        this.pauseBoardNode.game =this

        this.resetScore()
        this.pauseBoardNode.active = false
        this.pauseButton.node.on('click', this.onPauseButtonCallBack, this);

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true; //显示碰撞边框
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.pauseButton.node.off('click', this.onPauseButtonCallBack, this);
    },

    onPauseButtonCallBack() {
        console.log(this.pauseButton)
        this.pauseButton.node.active = false
        this.pauseBoardNode.active = true
        //防止多次点击后失效
        this.pauseBoardNode.getComponent("PauseBoard").onLoad()
        this.gameStatus = false
        cc.director.pause()
    },

    spawnNewFence() {
        var newFence = cc.instantiate(this.fencePrefab);
        this.node.addChild(newFence);

        var X = windowWidth / 2 + 100
        var Y = buttonHeight

        newFence.setPosition(cc.v2(X, Y));

        this.gameMoveNodeArray.push(newFence);
    },

    resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gainScore(value) {
        this.score += value;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gameOver() {
        console.log("游戏结束")
        cc.director.loadScene('game');
    },

    start() {
        //在start初始化节点，onLoad中不可以关于节点的初始化
        
    },

    update(dt) {
        this.scrollLeftMove(dt, 200)

        this.barrierTimer += dt;
        this.gameTimer += dt;

        if (this.barrierTimer > 2) {
            console.log("加载一个Fence")
            this.spawnNewFence()
            this.barrierTimer = 0
        }
    },

    scrollLeftMove(dt, speed) {
        //屏幕背景移动
        this.background1.x -= dt * speed
        this.background2.x -= dt * speed
        if (this.background1.x < -windowWidth) {
            this.background1.x = windowWidth + this.background2.x
        }
        if (this.background2.x < -windowWidth) {
            this.background2.x = windowWidth + this.background1.x
        }

        var i;
        for(i=0;i<4;i++){
            this.rattans[i].x -= dt * speed;
            if (this.rattans[i].x < -996) {
                this.rattans[i].x = 996
            }
        }

        for (i = 0; i < this.gameMoveNodeArray.length; i++) {
            this.gameMoveNodeArray[i].x -= dt * speed;
            if (this.gameMoveNodeArray[i].x < -windowWidth / 2 - 100) {
                console.log("删除节点", this.gameMoveNodeArray[i])
                this.gameMoveNodeArray[i].destroy()
                this.gameMoveNodeArray.splice(i, 1);
            }
        }
    }
});
