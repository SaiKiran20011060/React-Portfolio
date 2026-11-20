import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import FaceScanner from "../FaceScanner";
import { createJourney, Journey } from "./utils/characterJourney";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = new THREE.Scene();
      let active = true;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      // Cap resolution: on 125–150% scaled screens rendering at full DPR costs
      // ~2x the GPU work for little visible gain.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let journey: Journey | null = null;

      const clock = new THREE.Clock();
      let onResize: (() => void) | null = null;

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera, () => active);

      loadCharacter().then((gltf) => {
        if (gltf && active) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          screenLight = character.getObjectByName("screenlight") || null;
          journey = createJourney(character, camera, renderer.domElement);
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          onResize = () => handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", onResize);
        }
      });

      // Skip rendering while the character is scrolled out of view
      let onScreen = true;
      const io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        clock.getDelta();
      });
      io.observe(renderer.domElement);

      let rafId = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!onScreen) return;
        // Character stays centered, no head rotation
        if (screenLight) {
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        // scroll journey (jump / rope slide / contact) poses after the animation
        if (journey && !journey.update(clock.elapsedTime)) return;
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        active = false;
        progress.cancel();
        cancelAnimationFrame(rafId);
        io.disconnect();
        if (onResize) window.removeEventListener("resize", onResize);
        scene.clear();
        renderer.dispose();
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <FaceScanner />
        </div>
      </div>
    </>
  );
};

export default Scene;
