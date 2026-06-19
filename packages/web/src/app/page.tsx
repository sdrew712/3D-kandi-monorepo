"use client";
import React, { useEffect } from "react";
import styles from "../page.module.css";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import Link from "next/link";
import Page from "@/components/Page";

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
    <Page className={styles.authPageBg} title="Home">
      <div className={styles.homeContent}>
        <div className={styles.heroSection}>
          <h1>3D Kandi Patterns</h1>
          <p className={styles.heroText}>
            Design your kandi in 3D and see exactly how it&apos;ll look before
            you assemble a single bead. Spin it around, tweak the colors, make it
            yours.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/new" className={styles.primaryButton}>
              Make Something
            </Link>
            <Link href="/patterns" className={styles.secondaryButton}>
              My Patterns
            </Link>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.feature}>
            <h3>See It in 3D</h3>
            <p>Spin your pattern around before you start assembling — no more guessing how it&apos;ll look</p>
          </div>
          <div className={styles.feature}>
            <h3>Share the Love</h3>
            <p>Drop your patterns with friends or grab inspo from other makers</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
          <div className={styles.feature}>
            <h3>Community Patterns</h3>
            <p>Dig through what other people have made and get inspired</p>
            <span className={styles.comingSoon}>Coming Soon</span>
          </div>
        </div>
      </div>
    </Page>
  );
}
