import Image from "next/image";
import type { Metadata } from "next";
import { CountdownTimer } from "@/components/marketing/CountdownTimer";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";
import { ShareButton } from "@/components/marketing/ShareButton";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { ParticipantsCarousel } from "@/components/marketing/ParticipantsCarousel";
import { Footer } from "@/components/ui/Footer";
import { StickyWhatsAppButton } from "@/components/marketing/StickyWhatsAppButton";
import { Sponsors } from "@/components/marketing/Sponsors";
import { SubscribePopup } from "@/components/marketing/SubscribePopup";
import { EventSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Desafio ao Extremo - A Maior Competição de Arremesso de Facas do Brasil",
  description: "9 guerreiros, 1 objetivo: vencer o Desafio ao Extremo. A maior competição de arremesso de facas do YouTube Brasil. Estreia 25 de Janeiro de 2026.",
  openGraph: {
    title: "Desafio ao Extremo - A Maior Competição de Arremesso de Facas",
    description: "9 guerreiros competindo pelo título. Estreia 25/01/2026.",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
      <EventSchema />
      <TacticalMapBackground />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-24 text-center">
        {/* Angled Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-yellow/5 to-transparent -skew-y-2 transform origin-top-left" />

        <div className="relative z-10 flex max-w-6xl flex-col items-center gap-6 w-full">

          {/* 1. Logo do Evento */}
          <div className="relative w-full max-w-4xl aspect-[3/1] flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Desafio ao Extremo"
              width={800}
              height={300}
              priority
              className="object-contain drop-shadow-[0_0_35px_rgba(255,193,7,0.4)]"
            />

            {/* Hidden Easter Egg Button - Knife Area */}
            <a
              href="/arquivos"
              className="absolute top-[45%] right-[8%] w-16 h-16 cursor-default hover:cursor-pointer opacity-0 hover:opacity-5 transition-opacity"
              aria-label="Easter Egg"
              title=""
            />
          </div>

          {/* 2. ESTREIA (em amarelo) */}
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 bg-brand-yellow/50" />
            <h3 className="text-2xl md:text-3xl font-black tracking-[0.3em] text-brand-yellow uppercase font-display">
              ESTREIA
            </h3>
            <div className="h-[2px] w-8 bg-brand-yellow/50" />
          </div>

          {/* 3. Data do Evento */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-brand-yellow" />
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white uppercase font-sans">
              25 DE JANEIRO DE 2026
            </h2>
            <div className="h-[2px] w-12 bg-brand-yellow" />
          </div>

          {/* 4. Contador */}
          <div className="py-6 w-full">
            <CountdownTimer />
          </div>

          {/* 5. GUERREIROS (em amarelo) */}
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 bg-brand-yellow/50" />
            <h3 className="text-2xl md:text-3xl font-black tracking-[0.3em] text-brand-yellow uppercase font-display">
              GUERREIROS
            </h3>
            <div className="h-[2px] w-8 bg-brand-yellow/50" />
          </div>

          {/* 6. Carrossel de Participantes */}
          <ParticipantsCarousel />

          {/* 7. Descrição do Evento */}
          <div className="max-w-4xl mx-auto mt-16 mb-12 px-4">
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-yellow/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-yellow/30" />

              <div className="py-12 px-6 md:px-12 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50">
                <div className="space-y-6 text-center">
                  <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                    Eu desafiei <span className="text-brand-yellow">40 YouTubers</span> para um Desafio <span className="text-brand-yellow font-black">AO EXTREMO</span>.
                    <br />
                    E a pergunta é simples: <span className="text-brand-yellow">quantos tiveram coragem de aceitar?</span>
                  </p>

                  <div className="h-[2px] w-24 bg-brand-yellow/50 mx-auto" />

                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    Pela primeira vez no Brasil, um desafio de arremesso de facas acontece nesse formato.
                    <br />
                    A regra parece fácil: <span className="text-white font-semibold">9 arremessos, a 3 metros de distância, mirando um único alvo</span>.
                    <br />
                    Mas só os <span className="text-brand-yellow font-bold">6 melhores</span> contam para o placar final.
                  </p>

                  <p className="text-2xl md:text-3xl font-black text-brand-yellow uppercase tracking-wider">
                    Fácil? Nem de longe.
                  </p>

                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    Porque aqui entram a <span className="text-white font-semibold">pressão</span>, as <span className="text-white font-semibold">variáveis</span>, a <span className="text-white font-semibold">técnica</span>, o <span className="text-white font-semibold">psicológico</span>, o <span className="text-white font-semibold">inesperado</span>.
                    <br />
                    Cada erro machuca confiança.
                    <br />
                    Cada acerto alimenta a vontade de ir além.
                  </p>

                  <div className="h-[2px] w-24 bg-brand-yellow/50 mx-auto" />

                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    E são <span className="text-brand-yellow font-bold">40 YouTubers</span> — grandes e pequenos — entrando juntos nessa arena digital,
                    <br />
                    trazendo <span className="text-white font-semibold">emoção</span>, <span className="text-white font-semibold">superação</span> e <span className="text-white font-semibold">garra</span> para um evento online que promete ser histórico.
                  </p>

                  <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                      Vai ser <span className="text-brand-yellow">marcante</span>.
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                      Vai ser <span className="text-brand-yellow">certeiro</span>.
                    </p>
                    <p className="text-3xl md:text-4xl font-black text-brand-yellow uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,193,7,0.5)]">
                      Vai ser AO EXTREMO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Botões (Compartilhar + Grupo VIP) */}
          <div className="flex flex-col items-center gap-6 w-full mt-6">
            <div className="flex items-center gap-2 text-brand-yellow/80 text-sm font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-brand-yellow rotate-45" />
              Convocação Oficial
              <span className="w-2 h-2 bg-brand-yellow rotate-45" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShareButton />
              <div className="hidden md:block">
                <WhatsAppButton />
              </div>
            </div>
          </div>

          {/* 8. Patrocinadores */}
          <Sponsors />

        </div>
      </section>

      <StickyWhatsAppButton />
      <SubscribePopup />
      <Footer />
    </div>
  );
}
