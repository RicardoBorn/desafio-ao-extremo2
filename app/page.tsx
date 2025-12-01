import Image from "next/image";
import { CountdownTimer } from "@/components/marketing/CountdownTimer";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";
import { ShareButton } from "@/components/marketing/ShareButton";
import { TacticalMapBackground } from "@/components/ui/TacticalMapBackground";
import { ParticipantsCarousel } from "@/components/marketing/ParticipantsCarousel";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { StickyWhatsAppButton } from "@/components/marketing/StickyWhatsAppButton";
import { Sponsors } from "@/components/marketing/Sponsors";
import { SubscribePopup } from "@/components/marketing/SubscribePopup";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-yellow selection:text-black font-sans overflow-x-hidden">
      <Header />
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

          {/* 7. Botões (Compartilhar + Grupo VIP) */}
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
