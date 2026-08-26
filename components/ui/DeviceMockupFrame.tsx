/* eslint-disable @next/next/no-img-element */
interface DeviceMockupFrameProps {
  type: "web" | "mobile";
  title: string;
  image?: string;
}

/**
 * Browser/phone chrome around a project preview — a real screenshot when
 * `image` is provided, otherwise a CSS-drawn placeholder with the project
 * initial.
 */
export function DeviceMockupFrame({ type, title, image }: DeviceMockupFrameProps) {
  const initial = title.charAt(0);

  if (type === "mobile") {
    return (
      <div className="flex h-full items-center justify-center py-6">
        <div className="flex h-full w-32 flex-col rounded-2xl border border-line bg-background/60 p-1.5">
          <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-line" />
          <div className="schematic-grid relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-line">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="text-2xl font-extrabold text-muted">
                {initial}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line">
      <div className="flex items-center gap-1.5 border-b border-line bg-background/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      <div className="schematic-grid relative flex flex-1 items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <span className="text-3xl font-extrabold text-muted">{initial}</span>
        )}
      </div>
    </div>
  );
}
