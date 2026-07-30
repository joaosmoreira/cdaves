export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground/70">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-sm opacity-90 md:text-base">{text}</p>}
      </div>
    </section>
  );
}
