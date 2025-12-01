import { ExternalLink, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductShowcaseProps {
    title: string
    description: string
    price?: string
    imageUrl: string
    productUrl: string
}

export function ProductShowcase({
    title,
    description,
    price,
    imageUrl,
    productUrl
}: ProductShowcaseProps) {
    return (
        <div className="relative group rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto overflow-hidden bg-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    {/* Placeholder for image if actual image fails to load or is not provided */}
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                        {/* In a real scenario, use next/image. For now, using a colored div as placeholder if no image */}
                        <div className="text-center p-6 z-20">
                            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
                            <p className="text-sm">Imagem do Produto</p>
                        </div>
                    </div>
                    {/* If we had a real image, it would go here:
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          */}
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShoppingCart className="w-32 h-32" />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-full mb-4 border border-yellow-500/20">
                            RECOMENDADO
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            {description}
                        </p>

                        {price && (
                            <div className="mb-8">
                                <p className="text-sm text-zinc-500">Valor exclusivo</p>
                                <p className="text-2xl font-bold text-white">{price}</p>
                            </div>
                        )}

                        <a
                            href={productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors group/btn"
                        >
                            Comprar Agora
                            <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>

                        <p className="mt-4 text-xs text-zinc-600 text-center sm:text-left">
                            Compra segura via Mercado Livre
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
