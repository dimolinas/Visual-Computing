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

//Model
gltfLoader.load(
    './portal.glb',
    (gltf) => {
        scene.add(gltf.scene);
    }
)

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

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);
  
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

