"use client";

import { useSyncExternalStore } from "react";

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;

  const inIframe = window.self !== window.top;
  const hasDraftCookie =
    document.cookie.includes("__prerender_bypass") ||
    document.cookie.includes("__next_preview_data");
  const url = new URL(window.location.href);
  const previewParam = url.searchParams.has("preview") || url.searchParams.has("draft");

  return inIframe || hasDraftCookie || previewParam;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("focus", callback);
  return () => window.removeEventListener("focus", callback);
}

export function usePreviewMode(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
