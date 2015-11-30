// generate unique id
function uid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// generate THREE.js scene from json
function genScene(json) {
    var obj = new THREE.Object3D();
    for (var id in json) {
        var mat = new THREE.MeshLambertMaterial();
        var geom = new THREE.Geometry();
        switch (json[id].geometry) {
            case 'sphere':
                geom = new THREE.SphereGeometry(1, 32, 32);
                break;
            case 'cube':
                geom = new THREE.BoxGeometry(1,1,1);
                break;
        }
        var mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(json[id].translate[0],json[id].translate[1],json[id].translate[2])
        mesh.rotation.set(json[id].rotate[0],json[id].rotate[1],json[id].rotate[2])
        mesh.scale.set(json[id].scale[0],json[id].scale[1],json[id].scale[2])
        obj.add(mesh);
    }
    return obj;
}