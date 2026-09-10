"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

const STORAGE_KEY = "kandi-theme";

export default function ModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
  }, []);

  function toggle() {
    setIsDark((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "light" : "dark",
    );
    window.localStorage.setItem(STORAGE_KEY, isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className={styles.modeToggle}
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle UV mode"
    >
      {isDark ? "UV" : "DAY"}
    </button>
  );
}
