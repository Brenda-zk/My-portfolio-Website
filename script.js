// Scroll Effect for Smooth Navigation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Step 1: Set Up the Scene
  const container = document.getElementById("three-js-container"); // Select the container for the 3D scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement); // Attach the canvas to the container

  // Step 2: Add Stars to Create a Space Effect
  function createStar() {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    star.position.set(
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000
    );
    scene.add(star);
  }

  // Add multiple stars
  Array(500).fill().forEach(createStar);

  // Step 3: Add Rotating Planets
  function createPlanet(size, positionX, positionZ, color) {
    const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.position.x = positionX;
    planet.position.z = positionZ;
    scene.add(planet);

    return planet;
  }

  // Create multiple planets
  const planet1 = createPlanet(5, 0, -30, 0x0077be); // Blue planet
  const planet2 = createPlanet(3, 15, -50, 0xff5733); // Orange planet
  const planet3 = createPlanet(4, -20, -40, 0x33ff57); // Green planet

  // Step 4: Add Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Handle Mouse Movement
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Step 5: Animate the Scene
  function animate() {
    requestAnimationFrame(animate);

    // Camera movement based on mouse
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;

    // Planets rotation
    planet1.rotation.y += 0.005;
    planet2.rotation.y += 0.008;
    planet3.rotation.y += 0.003;

    renderer.render(scene, camera);
  }
  animate();
});

