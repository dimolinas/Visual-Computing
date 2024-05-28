import './style.css';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { Spector } from 'spectorjs';

import * as BufferGeometryUtils from '../three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from '../three/addons/controls/OrbitControls.js';
import { GLTFLoader } from '../three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from '../three/addons/loaders/DRACOLoader.js';

const spector = new Spector();
//spector.displayUI();

const gui = new dat.GUI({
    width: 400
});

// Canvas
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

//scene.background = new THREE.Color("whiteSmoke");
//scene.add(new THREE.AxesHelper(5))

//texture loader
const textureLoader = new THREE.TextureLoader();

//Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

//GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

//Texture
const bakedTexture = textureLoader.load("baked.jpg");
bakedTexture.flipY = false;
bakedTexture.encoding = THREE.sRGBEncoding;

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide});
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5});


gltfLoader.load(
    './portalOptim.glb',
    (gltf) => {
    
        gltf.scene.traverse((child) => {
            console.log(child);
        });

        const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked');
        const portalLightMesh = gltf.scene.children.find(child => child.name === "portalLight");
        const poleLightAMesh = gltf.scene.children.find(child => child.name === "poleLightA");
        const poleLightBMesh = gltf.scene.children.find(child => child.name === "poleLightB");

        bakedMesh.material = bakedMaterial;
        portalLightMesh.material = portalLightMaterial;
        poleLightAMesh.material = poleLightMaterial;
        poleLightBMesh.material = poleLightMaterial;

        scene.add(gltf.scene);
    }
);

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
renderer.outputEncoding = THREE.sRGBEncoding;

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


