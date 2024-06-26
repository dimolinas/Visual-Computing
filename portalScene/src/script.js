import './style.css';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { Spector } from 'spectorjs';

import * as BufferGeometryUtils from '../three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from '../three/addons/controls/OrbitControls.js';

import { GLTFLoader } from '../three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from '../three/addons/loaders/DRACOLoader.js';

import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

const spector = new Spector();
//spector.displayUI();

const debugObject = {};
const gui = new dat.GUI({
    width: 400
});

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

//scene.background = new THREE.Color("whiteSmoke");

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const bakedTexture = textureLoader.load("baked.jpg");
bakedTexture.flipY = false;
bakedTexture.encoding = THREE.sRGBEncoding;

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture, side: THREE.DoubleSide});
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5});

debugObject.portalColorStart = "#ffffff";
debugObject.portalColorEnd = "#e0cde6";

gui.addColor(debugObject, "portalColorStart").onChange(() => {
  portalLightMaterial.uniforms.uColorStart.value.set(
    debugObject.portalColorStart
  );
});

gui.addColor(debugObject, "portalColorEnd").onChange(() => {
  portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd);
});

const portalLightMaterial = new THREE.ShaderMaterial({
    uniforms:{
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
        uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) },
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
    side: THREE.DoubleSide
})


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

const fireFliesGeometry = new THREE.BufferGeometry();
const fireFliesCount = 40;
const positionArray = new Float32Array(fireFliesCount * 3);
const scaleArray = new Float32Array(fireFliesCount);


for(let i = 0; i < fireFliesCount; i++){
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
    positionArray[i * 3 + 1] = Math.random() * 1.5;
    positionArray[i * 3 + 2] = (Math.random()- 0.5) * 4;

    scaleArray[i] = Math.random();
}

fireFliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
fireFliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

const fireFliesMaterial = new THREE.ShaderMaterial({
    uniforms:{
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
        uTime: { value: 0 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

gui.add(fireFliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('firefliesSize');

const fireFlies = new THREE.Points(fireFliesGeometry, fireFliesMaterial);

scene.add(fireFlies);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    fireFliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  });

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);

camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);
  
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

debugObject.clearColor = '#bebea2';
renderer.setClearColor(debugObject.clearColor);

gui.addColor(debugObject, 'clearColor').onChange(() => {
    renderer.setClearColor(debugObject.clearColor);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update Materials
  portalLightMaterial.uniforms.uTime.value = elapsedTime;
  fireFliesMaterial.uniforms.uTime.value = elapsedTime;


  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


