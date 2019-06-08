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
        energyBar: {
            default: null,
            type: cc.ProgressBar
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        barrier: {
            default: null,
            type: cc.Prefab
        },
        shield: {
            default: null,
            type: cc.Prefab
        },
        energyBall: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Player.game = this  //在Player对象中创建一个game指针，这样可以调用Game.js中的方法
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true; //显示碰撞边框
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    spawnNewBarrier() {
        var newBarrier = cc.instantiate(this.barrier);
        this.node.addChild(newBarrier);

        var randX = (Math.round(Math.random())*2-1) * 180;
        var Y = 508
        
        newBarrier.setPosition(cc.v2(randX, Y));
        var Barrier = newBarrier.getComponent("Barrier")
        Barrier.energyLoss = Math.random() * 0.5;
    },

    spawnNewEnergyBall() {
        var newEnergyBall = cc.instantiate(this.energyBall);
        this.node.addChild(newEnergyBall);

        var X = 0
        var Y = 508
        
        newEnergyBall.setPosition(cc.v2(X, Y));
        var EnergyBall = newEnergyBall.getComponent("EnergyBall")
        EnergyBall.recoveryValue = Math.random() * 0.5;
    },

    spawnNewShield() {
        var newShield = cc.instantiate(this.shield);
        this.node.addChild(newShield);

        console.log(this.node)

        var X = 0
        var Y = 508
        
        newShield.setPosition(cc.v2(X, Y));
        var Shield = newShield.getComponent("Shield")
        Shield.invincibleTime = Math.random() * 0.5 +2;
    },

    resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    resetEnergyBar() {
        this.energyBar.progress = 1;
    },

    updateEnergyBar(progress) {
        this.energyBar.progress = progress;
    },

    gainScore() {
        this.score += this.scoreAdding;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    gameOver(){
        console.log("游戏结束")

        cc.director.loadScene('game');
    },

    start() {
        this.Player.getComponent("Player").resetEnergy()
        this.resetEnergyBar()
        this.schedule(() => {
            console.log("加载一个Barrier")
            this.spawnNewBarrier()
        }, 1)

        this.schedule(()=>{
            var rand = Math.round(Math.random());

            if(rand === 0){
                console.log("加载一个能量球")
                this.spawnNewEnergyBall()
            }
            else{
                console.log("加载一个护盾")
                this.spawnNewShield()
            }
        }, 5)
    },

    // update (dt) {},
});
