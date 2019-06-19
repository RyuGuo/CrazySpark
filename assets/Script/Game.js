// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {
    buttonHeight, topHeight, windowWidth, barrierType
} from "./config"
import { rnd, spawnNewNode } from "./utils"

cc.Class({
    extends: cc.Component,

    properties: {
        initSpeed: 300,
        difficult: 1000,
        speedup:   10,
        bonusDuration: 200,
        bgShiftDuration: 15,
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
        gameOverAudio: {
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
        banannaPrefab: {
            default: null,
            type: cc.Prefab
        },
        littleSnakePrefab: {
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
        background3: {
            default: null,
            type: cc.Node
        },
        background4: {
            default: null,
            type: cc.Node
        },
        background5: {
            default: null,
            type: cc.Node
        },
        background6: {
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
        },
        meterBoardPrefab: {
            default:null,
            type: cc.Prefab
        },
        lifeBar: {
            default: null,
            type: cc.ProgressBar
        },
        energyBar: {
            default: null,
            type: cc.ProgressBar
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bgTimer = 0
        this.gameTimer = 0
        this.barrierTimer = 0
        this.banannaTimer = 0
        this.meterTimer = 0
        this.gameStatus = false     //true代表游戏运行，游戏开始等待猴子出场
        this.gameMoveNodeArray = []  //需要根据屏幕移动的节点数组
        this.Player.zIndex = 20
        this.pauseBoardNode.zIndex = 70
        this.gameOverNode.zIndex = 71

        this.Player.game = this  //在Player对象中创建一个game指针，这样可以调用Game.js中的方法
        this.pauseBoardNode.game = this

        this.resetScore()

        var playerScript = this.Player.getComponent("Player")
        playerScript.resetLife()
        playerScript.resetEnergy()
        //this.initBanannaPrefabPool()
        this.gameOverNode.active = false
        this.pauseBoardNode.active = false
        this.pauseButton.node.on('click', this.onPauseButtonCallBack, this);

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true; //显示碰撞边框
    },

    // initBanannaPrefabPool() {
    //     if (this.banannaPrefabPool) {
    //         return;
    //     }
    //     this.banannaPrefabPool = new cc.NodePool();
    //     let initCount = 5;
    //     for (let i = 0; i < initCount; ++i) {
    //         let bananna = cc.instantiate(this.banannaPrefab); // 创建节点
    //         this.banannaPrefabPool.put(bananna); // 通过 put 接口放入对象池
    //     }
    // },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.pauseButton.node.off('click', this.onPauseButtonCallBack, this);
    },

    onPauseButtonCallBack() {
        //console.log(this.pauseButton)
        this.pauseButton.node.active = false
        this.pauseBoardNode.active = true
        //防止多次点击后失效
        let pauseBoardNode = this.pauseBoardNode.getComponent("PauseBoard")
        pauseBoardNode.onLoad()
        pauseBoardNode.buttonDisplayMode(0)
        this.gameStatus = false
        cc.director.pause()
    },

    spawnNewBarrier(prefab, Xposition, Yposition) {
        var newPrefabNode = spawnNewNode(this.node, prefab, Xposition, Yposition)
        newPrefabNode.zIndex = this.rattan1 + 1;
        this.gameMoveNodeArray.push(newPrefabNode);
        return newPrefabNode
    },

    // getBanannaFromPrefabPool() {
    //     let X = windowWidth / 2 + 100
    //     let Y = (rnd(0, 1) === 0) ? topHeight + 30 : buttonHeight
    //     let bananna = getNodeFromPrefabPool(this.node, this.banannaPrefabPool, this.banannaPrefab, X, Y)
    //     bananna.zIndex = this.rattan1 + 1;
    //     bananna.game = this
    //     this.gameMoveNodeArray.push(bananna);
    //     return bananna;
    // },

    resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gainScore(value) {
        this.score += value;
        this.scoreDisplay.string = 'Score: ' + (parseInt(this.score)).toString();
    },

    setLifeBar(value){
        this.lifeBar.progress = value;
    },

    setEnergyBar(value){
        this.energyBar.progress = value
    },

    removeNodeFormMoveArray(node) {
        var i;
        for (i = 0; i < this.gameMoveNodeArray.length; i++) {
            if (this.gameMoveNodeArray[i].x === node.x && this.gameMoveNodeArray[i].y === node.y) {
                //console.log("移除",node)
                this.gameMoveNodeArray.splice(i,1)
                break;
            }
        }
    },

    gameOver() {
        console.log("游戏结束")
        this.pauseButton.node.active = false
        this.pauseBoardNode.active = true
        this.gameOverNode.active = true
        cc.audioEngine.play(this.gameOverAudio, false, 1);
        //防止多次点击后失效
        let pauseNodeScript = this.pauseBoardNode.getComponent("PauseBoard")
        pauseNodeScript.onLoad()
        pauseNodeScript.buttonDisplayMode(1)
        this.gameStatus = false
        cc.director.pause()
    },

    spawnRandomBarrier() {
        var s = rnd(1, 7)
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
                this.spawnNewBarrier(this.groundholePrefab, windowWidth / 2 + 100, buttonHeight - 20)
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
                let newWebNode = this.spawnNewBarrier(this.webPrefab, windowWidth / 2 + 100, buttonHeight + 40)
                newWebNode.getComponent("EmitBarrier").emit()
                break;
            case barrierType.littlesnake:
                console.log("加载一个little snake")
                let newLittleSnakeNode = this.spawnNewBarrier(this.littleSnakePrefab, windowWidth / 2 + 100, topHeight)
                newLittleSnakeNode.getComponent("EmitBarrier").emit()
            default:
                break;
        }
    },

    start() {
        //在start初始化节点，onLoad中不可以关于节点的初始化
        this.metercount = 0
        this.speed = this.initSpeed
        //猴子出场
        this.Player.x = -740;
        var moveAction = cc.moveTo(1.5, cc.v2(-460, this.Player.y));
        var finish = cc.callFunc(() => {
            this.gameStatus = true;
        })
        var action = cc.sequence(moveAction, finish)
        this.Player.runAction(action)
    },

    update(dt) {
        this.bgTimer += dt
        this.rattanScroll(dt,this.speed)
        this.moveNodeScroll(dt,this.speed)

        if(this.bgTimer >= this.bgShiftDuration) {
            if(this.background5.x < -2*windowWidth) {
                this.background5.x = windowWidth
                this.background1.x = 0
                this.background2.x = windowWidth
            }
            
            if(this.background6.x >= -windowWidth && this.background6.x <= 0) {
                this.background3.x = windowWidth
                this.background4.x = 2*windowWidth
                this.scrollLeftMove(dt,this.speed)
                this.scroll2transit(dt,this.speed)
            }
            else {
                if(this.background4.x == 2*windowWidth) {
                    //this.background1.x = 0
                    //this.background2.x = windowWidth
                    this.background5.x = windowWidth
                    this.background6.x = windowWidth
                    this.bgTimer = 0
                }
                else{
                this.scroll2LeftMove(dt,this.speed)
                this.scroll2transit(dt,this.speed)
                }
            }
        }
        if(this.bgTimer <= this.bgShiftDuration+1)
            this.scrollLeftMove(dt, this.speed)
        if(this.bgTimer > this.bgShiftDuration+1 && this.bgTimer <this.bgShiftDuration*2){
                this.scrollLeftMove(dt,this.speed)
                //this.scrolltransit(dt,this.speed)
                if(this.background5.x == 0 || this.background5.x >= -windowWidth) {
                    this.scrolltransit(dt,this.speed)
                    this.scroll2LeftMove(dt,this.speed)
                }
                else{
                    this.scroll2LeftMove(dt,this.speed)
                }
        }
       
        this.barrierTimer += dt * this.speed;
        this.banannaTimer += dt * this.speed;

        this.speed += dt * this.speedup;
        this.gainScore(this.speed * dt / 20)

        if (this.barrierTimer > this.difficult) {
            this.spawnRandomBarrier()
            this.barrierTimer = 0
            this.banannaTimer = 0
        } else if (this.banannaTimer > this.bonusDuration) {
            this.spawnNewBarrier(this.banannaPrefab,windowWidth / 2 + 100, (rnd(0, 1) === 0) ? topHeight : buttonHeight)
            this.banannaTimer = 0
        }
    },

    scrollLeftMove(dt, speed) {
        //屏幕背景1移动
        this.background1.x -= dt * speed
        this.background2.x -= dt * speed
        if (this.background1.x < -windowWidth) {
            this.background1.x = windowWidth + this.background2.x
        }
        if (this.background2.x < -windowWidth) {
            this.background2.x = windowWidth + this.background1.x
        }
    },

    scroll2LeftMove(dt, speed) {
        //屏幕背景2移动
        this.background3.x -= dt * speed
        this.background4.x -= dt * speed
        if (this.background3.x < -windowWidth) {
            this.background3.x = windowWidth + this.background4.x
        }
        if (this.background4.x < -windowWidth) {
            this.background4.x = windowWidth + this.background3.x
        }
    },

    scrolltransit(dt,speed){
        //屏幕过渡背景移动
        this.background5.x -= dt*speed
    },
    scroll2transit(dt,speed){
        //屏幕过渡背景移动
        this.background6.x -= dt*speed
    },

    rattanScroll(dt,speed) {
        this.rattan1.x -= dt * speed
        this.rattan2.x -= dt * speed
        if (this.rattan1.x < -windowWidth) {
            this.rattan1.x = windowWidth + this.rattan2.x
        }
        if (this.rattan2.x < -windowWidth) {
            this.rattan2.x = windowWidth + this.rattan1.x
        }
    },

    moveNodeScroll(dt,speed){
        var i
        for (i = 0; i < this.gameMoveNodeArray.length; i++) {
            this.gameMoveNodeArray[i].x -= dt * speed;
            if (this.gameMoveNodeArray[i].x < -windowWidth / 2 - 100) {
                console.log("删除节点", this.gameMoveNodeArray[i])
                this.gameMoveNodeArray[i].destroy()
                this.gameMoveNodeArray.splice(i,1)
                i--;
            }
        }
    }
});
