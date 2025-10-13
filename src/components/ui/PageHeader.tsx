import Image, { StaticImageData } from "next/image";

type Props = { title: string; subtitle?: string; image: string | StaticImageData; eyebrow?: string };

export default function PageHeader({ title, subtitle, image, eyebrow }: Props) {
  return (
    <div className="relative h-[300px] sm:h-[360px] md:h-[420px] grid place-items-center text-center overflow-hidden">
      <Image src={typeof image === 'string' ? encodeURI(image) : image} alt="" fill priority className="object-cover brightness-75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      <div className="relative z-10 px-6">
        {eyebrow && <div className="text-white/80 text-xs uppercase tracking-widest mb-2">{eyebrow}</div>}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 sm:mt-4 text-white/90 max-w-3xl mx-auto text-base sm:text-lg">{subtitle}</p>}
      </div>
    </div>
  );
}


