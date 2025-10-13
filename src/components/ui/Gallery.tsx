import Image from 'next/image'
import Reveal from './Reveal'

export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <Reveal key={src} delay={idx * 0.05}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-dasza-gray/40 shadow-sm">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        </Reveal>
      ))}
    </div>
  )
}


