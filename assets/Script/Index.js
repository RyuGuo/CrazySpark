// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Global from "Global";
import { skillType, levelExp } from "./config"

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
        },
        helpBoard: {
            default: null,
            type: cc.Node
        },
        aboutBoard: {
            default:null,
            type: cc.Node
        },
        skillBoard: {
            default: null,
            type: cc.Node
        },
        skillInvincibleButton: {
            default: null,
            type: cc.Button
        },
        skillRecoveryButton: {
            default: null,
            type: cc.Button
        },
        levelUpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("获取视图的大小", cc.winSize)

        this.helpBoard.active = false;
        this.aboutBoard.active = false;
        this.skillBoard.active = false;

        this.playButton.node.on('click', this.onPlayButtonCallBack, this);
        this.helpButton.node.on('click', this.onHelpButtonCallBack, this);
        this.settingButton.node.on('click', this.onSettingButtonCallBack, this);
        this.exitButton.node.on('click', this.onExitButtonCallBack, this);
        this.skillInvincibleButton.node.on('click', this.onSkillInvincibleButtonCallBack, this);
        this.skillRecoveryButton.node.on('click', this.onSkillRecoveryButtonCallBack, this);
    },

    onDisable() {
        this.playButton.node.off('click', this.onPlayButtonCallBack, this);
        this.helpButton.node.off('click', this.onHelpButtonCallBack, this);
        this.settingButton.node.off('click', this.onSettingButtonCallBack, this);
        this.exitButton.node.off('click', this.onExitButtonCallBack, this);
        this.skillInvincibleButton.node.off('click', this.onSkillInvincibleButtonCallBack, this);
        this.skillRecoveryButton.node.off('click', this.onSkillRecoveryButtonCallBack, this);
    },

    updateExp() {
        var skill;
        var skillupindex = -1;
        for (skill in Global.skillExp) {
            var i
            for (i = 1; i < levelExp.length; i++) {
                if (Global.skillExp[skill].exp < levelExp[i]) {
                    if (Global.skillExp[skill].lv < i) {
                        //升级
                        skillupindex = skill
                    }
                    Global.skillExp[skill].lv = i
                    break;
                }
            }
            if (i == levelExp.length) {
                if (Global.skillExp[skill].lv < i) {
                    //升级
                    uskillupindexp = skill
                    
                }
                Global.skillExp[skill].lv = i
            }
        }
        var invincity = cc.find("Canvas/skillBoard/invincity")
        var recovery = cc.find("Canvas/skillBoard/recovery")

        let nodelist = [invincity, recovery]
        nodelist.forEach((listitem, index) => {
            listitem.getChildByName("lv").getComponent(cc.Label).string = "Lv " + Global.skillExp[index].lv
            listitem.getChildByName("exp").getComponent(cc.Label).string = "Exp " + Global.skillExp[index].exp + "/" + levelExp[Global.skillExp[index].lv]
            listitem.getChildByName("levelup").active = false
        });


        if (skillupindex != -1) {
            cc.audioEngine.play(this.levelUpAudio, false, 1)
            var levelupNode = nodelist[skillupindex].getChildByName("levelup")
            levelupNode.active = true
            var moveAciton = cc.moveBy(1, 0,50)
            var fadeOutAction = cc.fadeOut(1.5)
            var finish = cc.callFunc(() => {
                levelupNode.active = false
            })
            var action = cc.sequence(cc.spawn(moveAciton,fadeOutAction), finish)
            levelupNode.runAction(action)
        }

    },

    onPlayButtonCallBack() {
        //cc.director.resume() /* 结束暂停状态 */
        this.skillBoard.active = true
        this.updateExp()
    },

    onSkillInvincibleButtonCallBack() {
        Global.skillChoose = skillType.invincableShield;
        cc.director.loadScene("game")
        cc.director.resume() /* 结束暂停状态 */
    },

    onSkillRecoveryButtonCallBack() {
        Global.skillChoose = skillType.recoveryLife;
        console.log(Global.skillChoose)
        cc.director.loadScene("game")
        cc.director.resume() /* 结束暂停状态 */
    },

    onHelpButtonCallBack() {
        this.helpBoard.active = true;
        this.helpBoard.getComponent("LabelBoard").onLoad()
    },

    onSettingButtonCallBack() {
        this.aboutBoard.active = true;
        this.aboutBoard.getComponent("LabelBoard").onLoad()
    },

    onExitButtonCallBack() {
        cc.director.end();
    },

    start() {

    },

    // update (dt) {},
});
