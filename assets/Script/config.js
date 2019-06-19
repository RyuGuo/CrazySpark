export function findPlayerNode() {
  return cc.find("Canvas/Player");
}

export const buttonHeight = -222;
export const topHeight = 40;
export const windowWidth = 1354;
export const rattanCenterPadding = 556;

export const barrierType = {
  'fence': 1,
  'groundhole': 2,
  'lasso': 3,
  'steeltrap': 4,
  'web': 5,
  'snake': 6,
  'littlesnake': 7
}

export const skillType = {
  invincableShield: 0,
  recoveryLife: 1
}

export const levelExp = [
  0,100,250,500,1000,2000,5000,10000,99999999
]
