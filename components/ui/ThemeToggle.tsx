"use client";

/**
 * Flips the `data-theme` attribute on <html> and remembers the choice.
 *
 * Deliberately holds no React state: both icons are rendered and CSS hides
 * one based on the attribute (see globals.css). That way the button's markup
 * is identical on the server and the client, so the theme the inline script
 * in layout.tsx applies before paint can never disagree with a hydrated
 * render.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage: the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить тему"
      title="Переключить тему"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {/* Shown in dark mode — click for light. */}
      <svg
        className="icon-dark"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M8 1.5v1.75M8 12.75v1.75M1.5 8h1.75M12.75 8h1.75M3.4 3.4l1.24 1.24M11.36 11.36l1.24 1.24M12.6 3.4l-1.24 1.24M4.64 11.36L3.4 12.6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>

      {/* Shown in light mode — click for dark. */}
      <svg
        className="icon-light"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M13.5 9.8A5.9 5.9 0 0 1 6.2 2.5a5.9 5.9 0 1 0 7.3 7.3Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
