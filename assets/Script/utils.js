export function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

export function spawnNewNode(parentNode,prefab, Xposition, Yposition) {
    var newPrefabNode = cc.instantiate(prefab);
    parentNode.addChild(newPrefabNode)
    newPrefabNode.setPosition(cc.v2(Xposition, Yposition));
    newPrefabNode.collisionCounter = 0
    return newPrefabNode
}

export function getNodeFromPrefabPool(parentNode,prefabPool,prefab,Xposition, Yposition) {
    let node = null;
    if (prefabPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        node = prefabPool.get();
    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        node = cc.instantiate(prefab);
    }
    parentNode.addChild(node);
    node.setPosition(cc.v2(Xposition, Yposition));
    return node
}