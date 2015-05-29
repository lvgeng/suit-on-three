function create_scene_basic() {

	scene = new THREE.Scene();
	// scene.fog = new THREE.Fog( 0xcce0ff, 50, 500 );

	var light = new THREE.AmbientLight( 0xffffff);
	light.name = "ambientlight";
	scene.add( light );
	
	// light = new THREE.DirectionalLight( 0xdfebff, 1.00 );
	// light.position.set( 50, 200, 100 );
	// light.position.multiplyScalar( 1.0 );

	// light.castShadow = true;
	// light.shadowCameraVisible = true;

	// light.shadowMapWidth = 1024;
	// light.shadowMapHeight = 1024;

	// var d = 300;

	// light.shadowCameraLeft = -d;
	// light.shadowCameraRight = d;
	// light.shadowCameraTop = d;
	// light.shadowCameraBottom = -d;

	// light.shadowCameraFar = 1000;
	// light.shadowDarkness = 0.5;

	// scene.add( light );
//======================================================================================================
	// Grid

	var line_material = new THREE.LineBasicMaterial( { color: 0x999999 } ),
	geometry = new THREE.Geometry(),
	floor = 0, step = 10;

	for ( var i = 0; i <= 20; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( - 100, floor, i * step - 100 ) );
		geometry.vertices.push( new THREE.Vector3(   100, floor, i * step - 100 ) );

		geometry.vertices.push( new THREE.Vector3( i * step - 100, floor, -100 ) );
		geometry.vertices.push( new THREE.Vector3( i * step - 100, floor,  100 ) );
	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
	scene.add( line );

//===================================================================
	//white ground
	// var groundMaterial = new THREE.MeshPhongMaterial({
	// 	color: 0xeeeeee,
	// 	shading: THREE.SmoothShading,
	// });
	// ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(128, 128), groundMaterial);

	// ground.receiveShadow = true;
	// ground.rotation.x = -Math.PI / 2;
	// scene.add(ground);
//====================================================================
	//texture-ground

	// var groundTexture = THREE.ImageUtils.loadTexture( "/assets/textures/grasslight-big.jpg" );
	// groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	// groundTexture.repeat.set( 25, 25 );
	// groundTexture.anisotropy = 16;
	// var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );
	// var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 200, 200 ), groundMaterial );
	// mesh.position.y = 0;
	// mesh.rotation.x = - Math.PI / 2;
	// mesh.receiveShadow = true;
	// mesh.name = "ground";
	// scene.add( mesh );

	return scene;
}