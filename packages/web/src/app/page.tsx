"use client";
import React, { useEffect } from "react";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import Navigation from "./Navigation";

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

  return <Navigation />;
}
