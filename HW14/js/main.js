let cat; 
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background for contrast
scene.background = new THREE.Color(0x222222);

// Add ambient light
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

// Add directional light for shadows and shine
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);



// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-5, -1.5, 0); 
scene.add(cube);



const loader = new GLTFLoader();
loader.load(
  'models/fluffy_cat.glb',
  (gltf) => {
    cat = gltf.scene;
    cat.scale.set(2, 2, 2);
    cat.position.set(2, -0.75, -1);
    scene.add(cat);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

// Create a 2D star shape
function createStarShape(radius = 1, points = 5) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;

  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.4;
    const angle = i * step;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

// Create 3D geometry by extruding the shape
const starShape = createStarShape(0.5, 5);
const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffd700, metalness: 0.5 });
const star = new THREE.Mesh(starGeometry, starMaterial);

star.position.set(-.5, 1, 0); 
scene.add(star);


const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); 
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.3, roughness: 0.6 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(5, 1.5, 0); 
scene.add(sphere);

// Animate
function animate() {
  requestAnimationFrame(animate);
  star.rotation.x += 0.02;
  star.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.y += 0.02;
  sphere.rotation.x += 0.02;

  if (cat) {
    cat.rotation.y += 0.01; 
  }

  renderer.render(scene, camera);
}
animate();
