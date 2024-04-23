import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/Duck/glTF/Duck.gltf", (gltf) => {
  scene.add(gltf.scene.children[0]);
});

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});
const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.z = -50;

// cube.scale.set(2, 2, 2);
scene.add(mesh1);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  mesh1.rotation.z += 0.01;
  mesh1.rotation.x += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
