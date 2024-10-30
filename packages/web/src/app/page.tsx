"use client";
import React, { useEffect } from "react";
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

  return <Links />;
}

function Links() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pattern">Pattern</Link>
        </li>
      </ul>
    </nav>
  );
}
