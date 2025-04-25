"use client";
import React, { useEffect } from "react";
import styles from "../page.module.css";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    if (!WebGL.isWebGLAvailable()) {
      const warning = WebGL.getWebGLErrorMessage();
      warning.id = "webgl-error-message";
      if (document.getElementById("webgl-error-message") === null) {
        document.body.appendChild(warning);
      }
    }
  }, []);

  return <HomeContent />;
}

function HomeContent() {
  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <h1>3D Kandi Patterns</h1>
        <p className={styles.heroText}>
          Create and share your cool bead patterns in 3D! Whether you're a
          raver, crafter, or just love making pretty things, this is the place
          for you.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/new" className={styles.primaryButton}>
            Start Making
          </Link>
          <Link href="/patterns" className={styles.secondaryButton}>
            My Patterns
          </Link>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <div className={styles.feature}>
          <h3>3D Design</h3>
          <p>See how your patterns will look before you make them</p>
        </div>
        <div className={styles.feature}>
          <h3>Easy Sharing</h3>
          <p>Share your patterns with friends and get inspired by others</p>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
        <div className={styles.feature}>
          <h3>Pattern Library</h3>
          <p>Browse tons of cool patterns from the community</p>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
