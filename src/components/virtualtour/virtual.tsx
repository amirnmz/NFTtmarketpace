import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const VirtualTour: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;

    
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); 
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("path/to/your/panorama.jpg"); 
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    
    const showNFTImage = (url: string, position: THREE.Vector3) => {
      const planeGeometry = new THREE.PlaneGeometry(20, 20);
      const nftTexture = textureLoader.load(url);
      const planeMaterial = new THREE.MeshBasicMaterial({
        map: nftTexture,
        transparent: true,
      });
      const nftPlane = new THREE.Mesh(planeGeometry, planeMaterial);
      nftPlane.position.copy(position);
      scene.add(nftPlane);
    };

    
    const loadNFTs = async () => {
      const sdk = new ThirdwebSDK("polygon"); 
      const walletAddress = "user_wallet_address_here"; 
      const contract = await sdk.getNFTCollection("contract_address_here");
      const nfts = await contract.getOwned(walletAddress);

      nfts.forEach((nft, index) => {
        const position = new THREE.Vector3(
          (index + 1) * 30,
          0,
          100
        );
        showNFTImage(nft.metadata.image as string, position);
      });
    };

    loadNFTs();

    
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    
    const onMouseClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        console.log("Intersected with an object!", intersects[0]);
       
      }
    };

    window.addEventListener("click", onMouseClick);

    
    return () => {
      window.removeEventListener("click", onMouseClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default VirtualTour;
