import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const sceneElm = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sceneElm.offsetWidth, window.innerHeight );

let bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
console.log( bgColor );
renderer.setClearColor( bgColor );

sceneElm.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube1 = new THREE.Mesh( geometry, material );
cube1.position.x = 1;
cube1.position.y = 1;
scene.add( cube1 );

const cube2 = new THREE.Mesh( geometry, material );
cube2.position.x = -1;
cube2.position.y = -1;
scene.add( cube2 );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube1.rotation.x += 0.01;
	cube1.rotation.y += 0.01;

	cube2.rotation.x -= 0.01;
	cube2.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();