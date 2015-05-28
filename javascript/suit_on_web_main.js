if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
// var modeles_selectbox;
var camera, controls, scene, renderer;

init();
animate();

//===================================================================================================
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}

function init() {
	scene = create_scene_basic();

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) {
	};


	// // model
	// // var loader = new THREE.OBJLoader( manager );
	// modeles_selectbox = document.getElementById("models_selector");
	// modeles_selectbox.addEventListener("change", function(){
	// 	switch(modeles_selectbox.selectedOptions[0].getAttribute("type")){
	// 		case "OBJMTL":
	// 			var loader = new THREE.OBJMTLLoader(manager);
	// 			loader.load( '/assets/models/'+modeles_selectbox.selectedOptions[0].getAttribute("path")+'.obj',
	// 				'/assets/models/'+modeles_selectbox.selectedOptions[0].getAttribute("path")+'.mtl',
	// 				function ( object ) {
	// 					object.scale.x = modeles_selectbox.selectedOptions[0].getAttribute("scale");
	// 					object.scale.y = modeles_selectbox.selectedOptions[0].getAttribute("scale");
	// 					object.scale.z = modeles_selectbox.selectedOptions[0].getAttribute("scale");


	// 					object.name = "model_to_show";

	// 					scene.remove(scene.getObjectByName("model_to_show"));				
	// 					scene.add( object );
	// 				},
	// 				onProgress, onError );
	// 			break;
	// 		case "OBJ":
	// 			break;
	// 		default:
	// 		console.log("undefined way to deal with the modele");
	// 	}		
	// })

	// // THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader(manager) );
	// // I cannot understand why it is here, but I think it is better to keep it here for a while until I figured out whether it is necessary

	// var loader = new THREE.OBJMTLLoader(manager);
	// switch(modeles_selectbox.selectedOptions[0].getAttribute("type")){
	// 	case "OBJMTL":
	// 		var loader = new THREE.OBJMTLLoader(manager);
	// 		loader.load( '/assets/models/'+modeles_selectbox.selectedOptions[0].getAttribute("path")+'.obj',
	// 			'/assets/models/'+modeles_selectbox.selectedOptions[0].getAttribute("path")+'.mtl',
	// 			function ( object ) {
	// 				object.scale.x = modeles_selectbox.selectedOptions[0].getAttribute("scale");
	// 				object.scale.y = modeles_selectbox.selectedOptions[0].getAttribute("scale");
	// 				object.scale.z = modeles_selectbox.selectedOptions[0].getAttribute("scale");
	// 				object.name = "model_to_show";

	// 				scene.remove(scene.getObjectByName("model_to_show"));				
	// 				scene.add( object );
	// 			},
	// 			onProgress, onError );
	// 		break;
	// 	case "OBJ":
	// 		break;
	// 	default:
	// 	console.log("undefined way to deal with the modele");
	// }

	// var loader = new THREE.OBJMTLLoader(manager);
	// 		var loader = new THREE.OBJLoader(manager);
	// 		loader.load( '/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
	// 			function ( object ) {
	// 				object.scale.x = 2;
	// 				object.scale.y = 2;
	// 				object.scale.z = 2;
	// 				object.name = "model_to_show";

	// 				scene.remove(scene.getObjectByName("model_to_show"));				
	// 				scene.add( object );
	// 			},
	// 			onProgress, onError );

	var loader = new THREE.OBJMTLLoader(manager);
	loader.load( '/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
		'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.mtl',
		function ( object ) {
			object.scale.x = 2;
			object.scale.y = 2;
			object.scale.z = 2;
			object.name = "model_to_show";

			scene.remove(scene.getObjectByName("model_to_show"));				
			scene.add( object );
		},
	onProgress, onError );



	// renderer
	canvas_to_render = document.getElementById('canvas_for_three');

	renderer = new THREE.WebGLRenderer( { canvas: canvas_to_render, antialias: true } );

	// renderer.setClearColor( 0x8888ff );
	renderer.setClearColor( 0xcccccc );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight, false);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;



	camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 10000 );
	camera.position.z = 30;
	camera.position.y = 10;

	controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.target = new THREE.Vector3(0,7,0);
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

