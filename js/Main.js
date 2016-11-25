/* * * * * * * * * * * * * * * *
 * Window info
 * * * * * * * * * * * * * * * */
const WIDTH     = window.innerWidth;
const HEIGHT    = window.innerHeight;
const container = document.querySelector('#cont');

const centralX = WIDTH / 2;
const centralY = HEIGHT / 2;

var mouseX;
var mouseY;
var deadZone = 64;

var lastMouseX;
var lastMouseY;

var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;

/* * * * * * * * * * * * * * * *
 * Setup WebGL stuff
 * * * * * * * * * * * * * * * */
const VIEW_ANGLE = 45;
const ASPECT     = WIDTH / HEIGHT;
const NEAR       = 0.1;
const FAR        = 10000;

const renderer = new THREE.WebGLRenderer();
const camera   = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
);

const scene      = new THREE.Scene();
scene.background = new THREE.Color( 0x202020 );
scene.add(camera);

// start rendering
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapType    = THREE.PCFSoftShadowMap;

// attach to container
container.appendChild(renderer.domElement);

/* * * * * * * * * * * * * * * *
 * Lighting Stuff
 * * * * * * * * * * * * * * * */
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 300;
pointLight.position.z = 145;
pointLight.rotation   = 20 * (Math.PI / 180);
pointLight.castShadow = true;
pointLight.shadowDarkness = 0.5;
scene.add(pointLight);

/* * * * * * * * * * * * * * * *
 * World Objects
 * * * * * * * * * * * * * * * */
const RADIUS    = 50;
const SEGMENTS  = 16;
const RINGS     = 16;

const object_1 = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),  // Mesh
    new THREE.MeshLambertMaterial({color: 0xA52A2A})    // shader
);

object_1.castShadow     = true;
object_1.receiveShadow  = true;
object_1.position.y     = 46;
object_1.position.z     = -300;
scene.add(object_1);

const object_2 = new THREE.Mesh(
    new THREE.CubeGeometry(48, 48, 48),  // Mesh
    new THREE.MeshLambertMaterial({color: 0xA52A2A})    // shader
);

object_2.castShadow     = true;
object_2.receiveShadow  = true;
object_2.position.x    -= 200;
object_2.position.y     = 40;
object_2.position.z     = -500;
scene.add(object_2);

const object_3 = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),  // Mesh
    new THREE.MeshLambertMaterial({color: 0xA52A2A})    // shader
);

object_3.castShadow     = true;
object_3.receiveShadow  = true
object_3.position.x    += 200;
object_3.position.y     = 40;
object_3.position.z     = -500;
scene.add(object_3);

const floor = new THREE.Mesh ( 
    new THREE.PlaneGeometry(WIDTH * 2, WIDTH * 2, 50, 50), 
    // Wireframe and Fill
    new THREE.MeshLambertMaterial( { color: 0xAAAAAA, side: THREE.DoubleSide})
);

floor.receiveShadow = true;
floor.position.y    = -20;
floor.rotation.x    = 90 * (Math.PI / 180);
scene.add(floor);

/* * * * * * * * * * * * * * * *
 * Handle Input
 * * * * * * * * * * * * * * * */
function updateMouseInput (event) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    
    mouseX = event.clientX
    mouseY = event.clientY
}

function updateKeyDown (event) {
    switch (event.keyCode) {
        case 87: wDown = true; break;
        case 65: aDown = true; break;
        case 83: sDown = true; break;
        case 68: dDown = true; break;
    }
}

function updateKeyUp (event) {
    switch (event.keyCode) {
        case 87: wDown = false; break;
        case 65: aDown = false; break;
        case 83: sDown = false; break;
        case 68: dDown = false; break;
    } 
}

/* * * * * * * * * * * * * * * *
 * ON UPDATE
 * * * * * * * * * * * * * * * */
function update () {
    // timer
    var date = new Date();
    var tick = date.getSeconds();
    
    // check input
    if (wDown) { camera.translateZ(-4); }
    if (aDown) { camera.translateX(-4); }
    if (sDown) { camera.translateZ(4);  }
    if (dDown) { camera.translateX(4);  }
    
    if (mouseX > centralX + deadZone) { camera.rotation.y -= 0.0075;}
    if (mouseX < centralX - deadZone) { camera.rotation.y += 0.0075;}
    //if (mouseY > centralY + deadZone) { camera.rotation.x -= 0.0075;}
    //if (mouseY < centralY - deadZone) { camera.rotation.x += 0.0075;}
    
    // Draw the scene
    renderer.render(scene, camera); 

    // see you again soon
    requestAnimationFrame(update);
}

// Entry Point
requestAnimationFrame(update);