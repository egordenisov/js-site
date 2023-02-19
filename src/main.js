import * as THREE from 'three'
import { FlyControls } from "three/examples/jsm/controls/FlyControls"


let clock = new THREE.Clock();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 20000 );

const sceneElm = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( sceneElm.offsetWidth, window.innerHeight );

let bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
console.log( bgColor );
renderer.setClearColor( bgColor );

sceneElm.appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif' );

const geometry = new THREE.BoxGeometry( 200, 200, 200 );
const material = new THREE.MeshBasicMaterial( { map: texture} );
let cube1 = new THREE.Mesh( geometry, material );
cube1.rotation.x = 0;
cube1.rotation.y = 0;
cube1.rotation.z = Math.PI/2;
cube1.position.x = 150;
cube1.position.y = 150;
cube1.position.z = geometry.parameters.height / 2;
scene.add( cube1 );

let cube2 = new THREE.Mesh( geometry, material );
cube2.rotation.x = 0;
cube2.rotation.y = 0;
cube2.rotation.z = 0;
cube2.position.x = -150;
cube2.position.y = -150;
cube2.position.z = geometry.parameters.height / 2;
scene.add( cube2 );

// const axesHelper = new THREE.AxesHelper( 500 );
// scene.add( axesHelper );

// const texture_earth = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/minecraft/grass.png' );
const texture_earth = new THREE.TextureLoader().load( "./neon.jpg" );
texture_earth.magFilter = THREE.NearestFilter;
texture_earth.anisotropy = 32
texture_earth.repeat.set(100, 100)
texture_earth.wrapT = THREE.RepeatWrapping
texture_earth.wrapS = THREE.RepeatWrapping
const material_earth = new THREE.MeshBasicMaterial( {map: texture_earth} );
let geom_plane = new THREE.PlaneBufferGeometry(10000, 10000)
let plane1 = new THREE.Mesh( geom_plane, material_earth );
scene.add( plane1 );



camera.position.set( 400, 0, 100 );
camera.rotation.x = Math.PI/2;
camera.rotation.y = Math.PI/2;
camera.rotation.z = 0;


let controls = new FlyControls( camera, renderer.domElement );

controls.movementSpeed = 1000;
controls.domElement = renderer.domElement;
controls.rollSpeed = Math.PI / 4;
controls.autoForward = false;
controls.dragToLook = true;



// const controls = new ArcballControls( camera, renderer.domElement, scene );

// controls.addEventListener( 'change', function () {

// 	renderer.render( scene, camera );

// } );

// let controls = new FirstPersonControls( camera, renderer.domElement );
// controls.movementSpeed = 1000;
// controls.lookSpeed = 0.05;
// controls.lookVertical = true;
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.rotateSpeed = 1;
// controls.zoomSpeed = 1;
// controls.keyPanSpeed = 1;
// controls.enabled = true;
// controls.enablePan = true;
// controls.update();

function animate() {
	requestAnimationFrame( animate );

	// cube1.rotation.x += 0.01;
	// cube1.rotation.y += 0.01;

	// cube2.rotation.x -= 0.01;
	// cube2.rotation.y += 0.01;

	controls.update( clock.getDelta() );
	// if ( camera.position.z < 20 ){
	// 	camera.position.z = 20;
	// }
	// if (camera.position.z > 1000 ){
	// 	camera.position.z = 1000;
	// }
	camera.position.z = 100;
	if ( camera.position.x < -1000 ){
		camera.position.x = -1000;
	}
	if (camera.position.x > 1000 ){
		camera.position.x = 1000;
	}
	if ( camera.position.y < -1000 ){
		camera.position.y = -1000;
	}
	if (camera.position.y > 1000 ){
		camera.position.y = 1000;
	}
	renderer.render( scene, camera );
};

animate();