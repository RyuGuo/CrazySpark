// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { buttonHeight, topHeight } from "./config"

cc.Class({
    extends: cc.Component,

    properties: {
        position: 0, //0是下，1是上
        jumpDuration: 0.5,
        injuredAudio: {
            default: null,
            type: cc.AudioClip
        },
        getSomethingAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isAction = false
        this.invincibility = false
        this.node.getChildByName("shield").active = false
        this.node.getChildByName("recovery").active = false
        // 初始化键盘输入监听
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on('touchstart', this.onTouchStart, this);
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off('touchstart', this.onTouchStart, this);
    },

    onTouchStart() {
        if (!this.isAction && this.node.game.gameStatus) {
            this.jumpAction();
        }
    },

    onCollisionEnter: function (other, self) {
        switch (other.node.name) {
            case 'bananna':
                if (other.node.collisionCounter == 0) {
                    other.node.collisionCounter += 1
                    this.node.game.gainScore(10)
                    this.gainEnergy(0.1)
                    this.node.game.removeNodeFormMoveArray(other.node)
                    other.node.getComponent("Bananna").eatBananna()
                    if (this.energy == 1) {
                        this.useSkill(1)
                        this.resetEnergy()
                    }
                }
                break;
            default:
                if (!this.invincibility) {
                    this.gainLife(-1.0 / 4)
                    this.node.getComponent("PlayerAudioControl").onInjuredAudioPlay()
                    //cc.audioEngine.play(this.injuredAudio, false, 1);
                    if (this.life <= 0) {
                        cc.loader.loadRes("猴子失败", cc.SpriteFrame, function (err, spriteFrame) {
                            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        this.node.game.gameOver()
                    }
                    break;
                }

        }
    },

    resetLife() {
        this.life = 1;
        this.node.game.setLifeBar(this.life)
    },

    gainLife(value) {
        this.life += value;
        if (this.life > 1) {
            this.life = 1
        } else if (this.life < 0) {
            this.life = 0
        }
        this.node.game.setLifeBar(this.life)
    },

    resetEnergy() {
        this.energy = 0;
        this.node.game.setEnergyBar(this.energy)
    },

    gainEnergy(value) {
        this.energy += value;
        if (this.energy > 1) {
            this.energy = 1
        } else if (this.energy < 0) {
            this.energy = 0
        }
        this.node.game.setEnergyBar(this.energy)
    },

    useSkill(type) {
        switch (type) {
            case 0:
                this.node.getComponent("PlayerAudioControl").onGetSomethingAudio()
                this.invincibility = true
                var sheid = this.node.getChildByName("shield")
                sheid.active = true
                this.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    this.invincibility = false
                    sheid.active = false
                }, 2);
                break;
            case 1:
                this.node.getComponent("PlayerAudioControl").onRecoveryAudio()
                var recovery = this.node.getChildByName("recovery")
                recovery.active = true
                this.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    recovery.active = false
                }, 1.3);
                this.gainLife(0.2)
                break;
            default:
                break;
        }

    },

    jumpAction() {
        var jump;
        this.isAction = true
        var distans = topHeight + 40 - buttonHeight
        if (this.position == 0) {
            this.position = 1;
            jump = cc.moveBy(this.jumpDuration, cc.v2(0, distans));
        } else {
            this.position = 0;
            jump = cc.moveBy(this.jumpDuration, cc.v2(0, -distans));
        }
        var finished = cc.callFunc(() => {
            this.isAction = false;
        }, this);

        this.node.getComponent("PlayerAudioControl").onJumpAudioPlay()

        var action = cc.sequence(jump, finished)
        this.node.runAction(action);
    },

    start() {

    },

    update(dt) {

    },
});
