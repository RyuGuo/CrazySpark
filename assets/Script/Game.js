// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { buttonHeight, topHeight, windowWidth, barrierType } from "./config"
import { rnd } from "./utils"

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
        fencePrefab: {
            default: null,
            type: cc.Prefab
        },
        snakePrefab: {
            default: null,
            type: cc.Prefab
        },
        lassoPrefab: {
            default: null,
            type: cc.Prefab
        },
        steeltrapPrefab: {
            default: null,
            type: cc.Prefab
        },
        webPrefab: {
            default: null,
            type: cc.Prefab
        },
        groundholePrefab: {
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
        this.Player.zIndex = 20
        this.pauseBoardNode.zIndex = 99

        this.Player.game = this  //在Player对象中创建一个game指针，这样可以调用Game.js中的方法
        this.pauseBoardNode.game = this

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

    spawnNewBarrier(prefab, Xposition, Yposition) {
        var newPrefabNode = cc.instantiate(prefab);
        this.node.addChild(newPrefabNode);
        var X = windowWidth / 2 + 100
        var Y = buttonHeight
        newPrefabNode.setPosition(cc.v2(Xposition, Yposition));
        newPrefabNode.zIndex = this.rattan1 + 1;
        this.gameMoveNodeArray.push(newPrefabNode);
    },

    resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gainScore(value) {
        this.score += value;
        this.scoreDisplay.string = 'Score: ' + (parseInt(this.score)).toString();
    },

    gameOver() {
        console.log("游戏结束")
        this.pauseButton.node.active = false
        this.pauseBoardNode.active = true
        //防止多次点击后失效
        this.pauseBoardNode.getComponent("PauseBoard").onLoad()
        this.gameStatus = false
        cc.director.pause()
    },

    start() {
        //在start初始化节点，onLoad中不可以关于节点的初始化
        this.speed = 200
    },

    update(dt) {
        this.scrollLeftMove(dt, this.speed)

        this.barrierTimer += dt * this.speed;
        this.speed += dt * 20;
        //this.gameTimer += dt;
        this.gainScore(this.speed * dt / 10)

        if (this.barrierTimer > 400) {
            var s = rnd(1, 6)
            switch (s) {
                case barrierType.fence:
                    console.log("加载一个Fence")
                    this.spawnNewBarrier(this.fencePrefab, windowWidth / 2 + 100, buttonHeight)
                    break;
                case barrierType.snake:
                    console.log("加载一个Snake")
                    this.spawnNewBarrier(this.snakePrefab, windowWidth / 2 + 100, topHeight - 17.1)
                    break;
                case barrierType.groundhole:
                    console.log("加载一个groundhole")
                    this.spawnNewBarrier(this.groundholePrefab, windowWidth / 2 + 100, buttonHeight-20)
                    break;
                case barrierType.lasso:
                    console.log("加载一个lasso")
                    this.spawnNewBarrier(this.lassoPrefab, windowWidth / 2 + 100, topHeight - 17.1)
                    break;
                case barrierType.steeltrap:
                    console.log("加载一个steeltrap")
                    this.spawnNewBarrier(this.steeltrapPrefab, windowWidth / 2 + 100, buttonHeight)
                    break;
                case barrierType.web:
                    console.log("加载一个web")
                    this.spawnNewBarrier(this.webPrefab, windowWidth / 2 + 100, topHeight - 17.1)
                    break;
                default:
                    break;
            }
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

        this.rattan1.x -= dt * speed
        this.rattan2.x -= dt * speed
        if (this.rattan1.x < -windowWidth) {
            this.rattan1.x = windowWidth + this.rattan2.x
        }
        if (this.rattan2.x < -windowWidth) {
            this.rattan2.x = windowWidth + this.rattan1.x
        }

        var i
        for (i = 0; i < this.gameMoveNodeArray.length; i++) {
            this.gameMoveNodeArray[i].x -= dt * speed;
            if (this.gameMoveNodeArray[i].x < -windowWidth / 2 - 100) {
                this.gameMoveNodeArray[i].destroy()
                this.gameMoveNodeArray.splice(i, 1);
                console.log("删除节点", this.gameMoveNodeArray[i])
                i--;
            }
        }
    }
});
