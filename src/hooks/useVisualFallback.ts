"use client";

import { useEffect } from "react";

const isOldWindows = () => {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent;
  // Windows 7 (NT 6.1) or Windows 8 (NT 6.2)
  return /Windows NT 6\.[12]/.test(userAgent);
};

const hasGradientSupport = () => {
  if (typeof window === "undefined" || !window.CSS) return true; // Assume support on server or if CSS object is missing
  // Check for CSS.supports() for gradients
  return (
    CSS.supports("background-image", "linear-gradient(to right, red, blue)") ||
    CSS.supports("-webkit-background-image", "-webkit-linear-gradient(to right, red, blue)")
  );
};

export const useVisualFallback = () => {
  useEffect(() => {
    const needsFallback = isOldWindows() || !hasGradientSupport();

    if (needsFallback) {
      document.documentElement.classList.add("no-gradient");
    }
  }, []); // Run only once on mount
};

// Standalone script for flicker prevention in <head>
export const visualFallbackScript = `
(function() {
  try {
    var isOldWindows = /Windows NT 6\\.[12]/.test(navigator.userAgent);
    var hasGradientSupport = window.CSS && (CSS.supports('background-image', 'linear-gradient(to right, red, blue)') || CSS.supports('-webkit-background-image', '-webkit-linear-gradient(to right, red, blue)'));
    
    if (isOldWindows || !hasGradientSupport) {
      document.documentElement.classList.add('no-gradient');
    }
  } catch (e) {
    // Ignore errors in case of very old browsers
  }
})();
`;
