import * as THREE from 'three'
import { FlyControls } from "three/examples/jsm/controls/FlyControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


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
const material = new THREE.MeshPhysicalMaterial({
	color: 0x2f2f2f,
	thickness: 2,
	metalness: 1,
	reflectivity: 0,
	transparent: 0,
});
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

const geometry2 = new THREE.BoxGeometry( 100, 100, 100 );
let cube3 = new THREE.Mesh( geometry2, material );
cube3.rotation.x = 0;
cube3.rotation.y = 0;
cube3.rotation.z = 0;
cube3.position.x = 150;
cube3.position.y = -50;
cube3.position.z = geometry2.parameters.height / 2;
scene.add( cube3 );

// const axesHelper = new THREE.AxesHelper( 500 );
// scene.add( axesHelper );

// const texture_earth = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/minecraft/grass.png' );
const texture_earth = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/egordenisov/js-site/dev/textures/grass.jpg" );
texture_earth.magFilter = THREE.NearestFilter;
texture_earth.anisotropy = 1;
texture_earth.repeat.set(100, 100);
texture_earth.wrapT = THREE.RepeatWrapping;
texture_earth.wrapS = THREE.RepeatWrapping;
const material_earth = new THREE.MeshPhysicalMaterial( {color: "white"} );
let geom_plane = new THREE.PlaneBufferGeometry(10000, 10000)
let plane1 = new THREE.Mesh( geom_plane, material );
scene.add( plane1 );

const light = new THREE.PointLight( 0x0000ff, 3 );
light.position.set( -150, 150, 50 );
light.visible = true;
scene.add( light );

const light_amb = new THREE.AmbientLight( 0xffffff , 5); // soft white light
light_amb.position.set(0 ,0 , 300);
scene.add( light_amb );

const met_tetr = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	roughness: 0,  
	transmission: 1,  
	thickness: 0.5, // Add refraction!
});
const geom_tetr = new THREE.TetrahedronGeometry(100);
let tetr1 = new THREE.Mesh( geom_tetr, met_tetr );
tetr1.position.x = 200;
tetr1.position.y = -50;
tetr1.position.z = 50;
tetr1.rotation.x = Math.PI*(5/6);
tetr1.rotation.y = 0;
tetr1.rotation.z = Math.PI*(5/6);
// scene.add( tetr1 );


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

const g_vs = new THREE.BoxGeometry( 700, 20, 200 );
let cube4 = new THREE.Mesh( g_vs, material );
cube4.rotation.set(0, 0, 0);
cube4.position.set(500, 500, (g_vs.parameters.depth / 2));
scene.add( cube4 );

let cube5 = new THREE.Mesh( g_vs, material );
cube5.rotation.set(0, 0, 0);
cube5.position.set(500, 750, g_vs.parameters.depth / 2);
scene.add( cube5 );

const g_h = new THREE.BoxGeometry( 700, 270, 20 );
let cube6 = new THREE.Mesh( g_h, material );
cube6.rotation.set(0, 0, 0);
cube6.position.set(500, 625, 210);
scene.add( cube6 );

const g_vr = new THREE.BoxGeometry( 20, 270, 220 );
let cube7 = new THREE.Mesh( g_vr, material );
cube7.rotation.set(0, 0, 0);
cube7.position.set(860, 625, g_vr.parameters.depth / 2);
scene.add( cube7 );

const light_g = new THREE.PointLight( 0xff0f0f, 3 );
light_g.position.set( 700, 625, 150 );
light_g.visible = true;
scene.add( light_g );


// const loader = new GLTFLoader();

// loader.load( 'https://github.com/egordenisov/js-site/blob/dev/3d/tesla/source/Cyber.glb?raw=true', function ( gltf ) {
// 	scene.add( gltf.scene );
// }, undefined, function ( error ) {
// 	console.error( error );
// });

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
	const xy_restricts = 1200;
	camera.position.z = 100;
	if ( camera.position.x < -xy_restricts ){
		camera.position.x = -xy_restricts;
	}
	if (camera.position.x > xy_restricts ){
		camera.position.x = xy_restricts;
	}
	if ( camera.position.y < -xy_restricts ){
		camera.position.y = -xy_restricts;
	}
	if (camera.position.y > xy_restricts ){
		camera.position.y = xy_restricts;
	}
	renderer.render( scene, camera );
};

animate();