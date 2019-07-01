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
  0,50,200,350,800,1500,3000,5500,99999999
]
