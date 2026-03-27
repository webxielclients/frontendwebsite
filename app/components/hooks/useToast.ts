import { useCallback } from "react";

type ToastType = "success" | "error";

export function useToast() {
  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const existing = document.getElementById("wl-toast");
    existing?.remove();

    const el = document.createElement("div");
    el.id = "wl-toast";
    el.className = `wl-toast wl-toast-${type}`;
    el.innerHTML = `
      <div class="wl-toast-text">
        <strong>${title}</strong>
        ${message ? `<span>${message}</span>` : ""}
      </div>
      <button class="wl-toast-x">✕</button>
    `;

    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("wl-toast-show"));

    const timer = setTimeout(() => dismiss(el), 4000);
    el.querySelector(".wl-toast-x")!.addEventListener("click", () => {
      clearTimeout(timer);
      dismiss(el);
    });
  }, []);

  return { toast };
}

function dismiss(el: HTMLElement) {
  el.classList.remove("wl-toast-show");
  el.addEventListener("transitionend", () => el.remove(), { once: true });
}