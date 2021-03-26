import * as BABYLON from "@babylonjs/core";

// create the canvas html element and attach it to the webpage
var canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.id = "gameCanvas";
document.body.appendChild(canvas);

// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
// CreateScene function that creates and return the scene
var createScene = function () {
    // Create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(canvas, false);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    var mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    sphere.material = mat;

    // Return the created scene
    return scene;
}
// call the createScene function
var scene = createScene();

// Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
// Create a default environment for the scene.
const env = scene.createDefaultEnvironment({
});

// here we add XR support
if (env != null) {
    const xrHelper = scene.createDefaultXRExperienceAsync({
        floorMeshes: [<BABYLON.AbstractMesh>env.ground],
        disableDefaultUI: false
    })
}
else {
    console.log('WebXR environment is unavailable');
}

// run the render loop
engine.runRenderLoop(function () {
    scene.render();
});
// add the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});