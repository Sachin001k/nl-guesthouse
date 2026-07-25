import PhotoFrame from "./PhotoFrame";

const GALLERY_ITEMS: {
  label: string;
  variant: "maroon" | "gold" | "teal";
  span: string;
}[] = [
  { label: "Hall Entrance", variant: "gold", span: "sm:col-span-2 sm:row-span-2" },
  { label: "Stage Decor", variant: "maroon", span: "" },
  { label: "Dining Area", variant: "teal", span: "" },
  { label: "Guest House Room", variant: "gold", span: "" },
  { label: "Courtyard", variant: "maroon", span: "sm:col-span-2" },
  { label: "Night Lighting", variant: "teal", span: "" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-paper-deep/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
            A Closer Look
          </p>
          <h2 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
            Gallery
          </h2>
          <div className="ornament-rule mx-auto mt-5 w-32" />
        </div>

        <div className="mt-14 grid sm:grid-cols-3 auto-rows-[180px] gap-4">
          {GALLERY_ITEMS.map((item) => (
            <PhotoFrame
              key={item.label}
              label={item.label}
              variant={item.variant}
              className={`h-full ${item.span}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
