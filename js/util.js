var _objloader = new THREE.OBJLoader();

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
        if (json[id].material.split('.').pop() == "jpg" || json[id].material.split('.').pop() == "png") {
            mat.map = THREE.ImageUtils.loadTexture(json[id].material);
            mat.needsUpdate = true;
        } else {
            mat.color.set(json[id].material);
            mat.needsUpdate = true;
        }
        var geom = new THREE.Geometry();
        if (json[id].geometry.split('.').pop() == "obj") {
            // obj file
            _objloader.load(json[id].geometry, function(mesh) {
                // var material = new THREE.MeshLambertMaterial();
                // var mesh = new THREE.Mesh(geometry, material);
                mesh.rotation.set(json[id].rotate[0],json[id].rotate[1],json[id].rotate[2])
                mesh.position.set(json[id].translate[0],json[id].translate[1],json[id].translate[2])
                mesh.scale.set(json[id].scale[0],json[id].scale[1],json[id].scale[2])
                obj.add(mesh);
            } );
            
        } else {
            // default shapes
            switch (json[id].geometry) {
                case 'sphere':
                    geom = new THREE.SphereGeometry(1, 32, 32);
                    break;
                case 'cube':
                    geom = new THREE.BoxGeometry(1,1,1);
                    break;
                case 'plane':
                    geom = new THREE.PlaneGeometry(1,1);
                    break;
            }
            var mesh = new THREE.Mesh(geom, mat);
            mesh.rotation.set(json[id].rotate[0],json[id].rotate[1],json[id].rotate[2])
            mesh.position.set(json[id].translate[0],json[id].translate[1],json[id].translate[2])
            mesh.scale.set(json[id].scale[0],json[id].scale[1],json[id].scale[2])
            obj.add(mesh);   
        }
    }        
    return obj;
}