import './style.css';
import * as dat from 'dat.gui';
import * as THREE from 'three';

import * as BufferGeometryUtils from '../three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from '../three/addons/controls/OrbitControls.js';
import { GLTFLoader } from '../three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from '../three/addons/loaders/DRACOLoader.js';

/*
* Base
*/
// Debug
const gui = new dat.GUI({
    width: 400
});


// Canvas
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

scene.background = new THREE.Color("whiteSmoke");
scene.add(new THREE.AxesHelper(5))

//texture loader
const textureLoader = new THREE.TextureLoader();

//Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

//GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 2;
scene.add(camera);



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


