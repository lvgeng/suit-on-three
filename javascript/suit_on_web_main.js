if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, controls, scene, renderer;

init();
render();

//===================================================================================================
function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function init() {

	scene = new THREE.Scene();
	// scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
	// world
	var geometry = new THREE.BoxGeometry( 20,20,20 );
	var material =  new THREE.MeshLambertMaterial( { color:0x999999, shading: THREE.FlatShading } );

	for ( var i = 0; i < 500; i ++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = ( Math.random() - 0.5 ) * 1000;
		mesh.position.y = ( Math.random() - 0.5 ) * 1000;
		mesh.position.z = ( Math.random() - 0.5 ) * 1000;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
		scene.add( mesh );
	}
	// lights

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1.5, 2 ).normalize();
	scene.add( light );

	light = new THREE.DirectionalLight( 0x0044aa );
	light.position.set( -1, -1.5, -1.9 );
	scene.add( light );

	light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );

	// renderer
	container_to_render = document.getElementById("container_for_three");
	canvas_to_render = document.getElementById('canvas_for_three');

	renderer = new THREE.WebGLRenderer( { canvas: canvas_to_render, antialias: true } );

	renderer.setClearColor( 0x8888ff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight, false);

	camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 10000 );
	camera.position.z = 500;

	controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.damping = 0.2;
	controls.addEventListener( 'change', render );

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}


function onWindowResize() {

	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight ,false);
	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	camera.updateProjectionMatrix();

	render();
}

function render() {

	renderer.render( scene, camera );
}