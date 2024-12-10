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
    <div id={styles.homePage}>
      <h1>Welcome to my kandi site!</h1>
      <h2>
        To get started,&nbsp;
        <Link href="/new">create a pattern.</Link>
      </h2>
    </div>
  );
}
