"use client";

import { useState } from "react";
import Link from "next/link";


export default function ArquivosPage() {
    const [currentPath] = useState("C:\\DESAFIO_EXTREMO");
    const [quizAnswer, setQuizAnswer] = useState("");
    const [showPrize, setShowPrize] = useState(false);

    // Mission Quiz States
    const [showMissionQuiz, setShowMissionQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [missionCompleted, setMissionCompleted] = useState(false);
    const [quizFailed, setQuizFailed] = useState(false);

    const correctAnswer = "EXTREMO"; // Resposta correta do primeiro quiz

    const missionQuestions = [
        {
            question: "Quantos YouTubers foram convidados para participar do Desafio ao Extremo?",
            options: ["17", "30", "40", "46"],
            correct: 2 // C) 40
        },
        {
            question: "Qual é a distância mínima para os arremessos de faca no desafio?",
            options: ["1 metro", "3 metros", "5 metros", "10 metros"],
            correct: 1 // B) 3 metros
        },
        {
            question: "Quantos arremessos cada participante faz no desafio, e quantos contam para a pontuação final?",
            options: ["6 arremessos, todos contam", "9 arremessos, os 6 melhores contam", "12 arremessos, os 9 melhores contam", "5 arremessos, os 3 melhores contam"],
            correct: 1 // B) 9 arremessos, os 6 melhores contam
        },
        {
            question: "Qual é o nome da faca de arremesso exclusiva criada para o evento?",
            options: ["P2", "F1", "AR1", "Ebenezer Pro"],
            correct: 2 // C) AR1
        },
        {
            question: "O que vem no kit enviado para os participantes (além da faca)?",
            options: ["Apenas o alvo e o paracord", "Expositor de MDF, patches, paracord, alvos (um colorido e um de treinamento), sachê de café e adesivo", "Barraca e mochila", "Botas e luvas de proteção"],
            correct: 1 // B) Expositor de MDF...
        },
        {
            question: "Qual é o site oficial do evento?",
            options: ["BornAoExtremo.com.br", "DesafioAoExtremo.com.br", "Sobrevivencialismo.com", "BushcraftBrasil.com"],
            correct: 1 // B) DesafioAoExtremo.com.br
        },
        {
            question: "Como funciona o cronograma de lançamento dos vídeos?",
            options: ["Todos os vídeos saem no mesmo dia", "Lançamento inicial no domingo às 19h30, depois vídeos na segunda, quarta e sexta, com reações no domingo", "Apenas lives mensais", "Um vídeo por dia durante 40 dias"],
            correct: 1 // B) Lançamento inicial...
        },
        {
            question: "Por que foram incluídos tanto YouTubers grandes quanto pequenos no evento?",
            options: ["Para criar rivalidade e drama", "Para equilibrar e dar chance aos pequenos", "Apenas para preencher vagas", "Para focar só em views altas"],
            correct: 1 // B) Para equilibrar...
        },
        {
            question: "O que acontece nas lives mensais do evento?",
            options: ["Apenas sorteio de facas", "Conversa com participantes, cenas inéditas, comentários sobre pontuação e sorteio de kits para o público", "Treinamento ao vivo de arremessos", "Venda direta das facas Ebenezer"],
            correct: 1 // B) Conversa com participantes...
        }
    ];

    const files = [
        { name: "PARTICIPANTES", type: "DIR", size: "", date: "2025-11-22" },
        { name: "BASTIDORES", type: "DIR", size: "", date: "2025-11-20" },
        { name: "TRILHA_SONORA", type: "DIR", size: "", date: "2025-11-18" },
        { name: "BRIEFING.TXT", type: "FILE", size: "4,521", date: "2025-11-15" },
        { name: "REGRAS.PDF", type: "FILE", size: "128,340", date: "2025-11-10" },
        { name: "CRONOGRAMA.XLS", type: "FILE", size: "45,120", date: "2025-11-08" },
    ];

    const handleQuizSubmit = () => {
        if (quizAnswer.toUpperCase() === correctAnswer) {
            setShowPrize(true);
        } else {
            alert("❌ ACESSO NEGADO! Tente novamente.");
            setQuizAnswer("");
        }
    };

    const handleMissionAnswer = (optionIndex: number) => {
        const isCorrect = optionIndex === missionQuestions[currentQuestion].correct;

        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion < missionQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Final do quiz
            const finalScore = score + (isCorrect ? 1 : 0);
            if (finalScore === missionQuestions.length) {
                setMissionCompleted(true);
            } else {
                setQuizFailed(true);
            }
        }
    };

    const resetMissionQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFailed(false);
        setMissionCompleted(false);
        setShowMissionQuiz(false);
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono p-4 md:p-8 selection:bg-white selection:text-black">

            {/* Glitch Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-10 mix-blend-overlay">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_4px)] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Terminal Header */}
                <div className="border-2 border-white p-4 mb-6">
                    <pre className="text-sm">
                        {`╔═══════════════════════════════════════════════════════════════╗
║  DESAFIO AO EXTREMO - SISTEMA DE ARQUIVOS v1.0              ║
║  Acesso: RESTRITO | Status: MONITORADO | Data: 22/11/2025   ║
╚═══════════════════════════════════════════════════════════════╝`}
                    </pre>
                </div>

                {/* Current Path */}
                <div className="mb-4">
                    <p className="text-sm opacity-60">Diretório Atual:</p>
                    <p className="text-xl font-bold">{currentPath}&gt;_</p>
                </div>

                {/* File Browser */}
                <div className="border-2 border-white p-6">
                    <div className="mb-4 pb-2 border-b border-white/30">
                        <div className="grid grid-cols-4 gap-4 text-sm font-bold">
                            <span>NOME</span>
                            <span>TIPO</span>
                            <span>TAMANHO</span>
                            <span>DATA</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 text-sm hover:bg-white hover:text-black px-2 py-1 transition-colors cursor-pointer group"
                            >
                                <span className="flex items-center gap-2">
                                    {file.type === "DIR" ? "📁" : "📄"}
                                    <span className="group-hover:font-bold">{file.name}</span>
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">
                                    {file.type === "DIR" ? "<DIR>" : "FILE"}
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">
                                    {file.size || "---"}
                                </span>
                                <span className="opacity-60 group-hover:opacity-100">{file.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEGREDO PRÊMIO - Quiz Section */}
                <div className="mt-8 border-2 border-white bg-white/5 p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-white mb-2 tracking-wider">
                            SEGREDO PRÊMIO
                        </h2>
                        <p className="text-sm text-white/80">
                            Responda corretamente para concorrer ao prêmio secreto!
                        </p>
                    </div>

                    {!showPrize ? (
                        <div className="space-y-4">
                            <div className="bg-black/50 border border-white/20 p-4 rounded">
                                <p className="text-white mb-4 text-center font-bold">
                                    PERGUNTA: Complete a frase do canal:
                                </p>
                                <p className="text-white text-center text-lg mb-4">
                                    &quot;Born ao ________&quot;
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                <input
                                    type="text"
                                    value={quizAnswer}
                                    onChange={(e) => setQuizAnswer(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleQuizSubmit()}
                                    placeholder="Digite sua resposta..."
                                    className="px-4 py-2 bg-black border-2 border-white text-white font-mono focus:border-white focus:outline-none w-full md:w-64"
                                />
                                <button
                                    onClick={handleQuizSubmit}
                                    className="px-6 py-2 border-2 border-white bg-white text-black font-bold hover:bg-white/80 transition-colors whitespace-nowrap"
                                >
                                    [VERIFICAR RESPOSTA]
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-pulse">
                            <div className="bg-white/10 border-2 border-white p-6 rounded text-center">
                                <p className="text-2xl font-black text-white mb-4">
                                    ACESSO LIBERADO
                                </p>

                                <button
                                    onClick={() => setShowMissionQuiz(true)}
                                    className="mt-4 px-8 py-4 border-2 border-white bg-white text-black font-black text-xl hover:scale-105 transition-transform tracking-widest"
                                >
                                    ACEITAR MISSÃO
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Command Prompt */}
                <div className="mt-6 border-2 border-white p-4">
                    <p className="text-sm mb-2 opacity-60">Prompt de Comando:</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white">{currentPath}&gt;</span>
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="mt-8 text-center space-y-2">
                    <p className="text-sm opacity-40 animate-pulse">
                        &gt;&gt; Rastreamento de IP em andamento...
                    </p>
                    <p className="text-xs opacity-60">
                        Psiu... você encontrou o easter egg! 😉
                    </p>
                    <p className="text-xs opacity-40">
                        Compartilhe com os amigos e veja quem mais consegue encontrar!
                    </p>

                    <Link
                        href="/"
                        className="inline-block mt-4 px-6 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
                    >
                        [VOLTAR PARA PÁGINA PRINCIPAL]
                    </Link>
                </div>

                {/* Fake System Messages */}
                <div className="mt-8 text-xs opacity-20 space-y-1">
                    <p>&gt; system.log: Acesso detectado de IP 192.168.1.xxx</p>
                    <p>&gt; firewall.exe: Tentativa de bloqueio... FALHOU</p>
                    <p>&gt; security.dll: Alerta enviado para administrador</p>
                    <p>&gt; tracker.sys: Localização... SÃO PAULO, BR</p>
                </div>
            </div>

            {/* Mission Quiz Modal */}
            {showMissionQuiz && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl bg-black border-2 border-white p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={resetMissionQuiz}
                            className="absolute top-4 right-4 text-white hover:text-red-500 font-bold"
                        >
                            [X]
                        </button>

                        {!missionCompleted && !quizFailed ? (
                            <>
                                <div className="mb-6 border-b border-white/30 pb-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <h3 className="text-xl font-bold text-white">MISSÃO EM ANDAMENTO</h3>
                                        <span className="text-sm font-mono">QUESTÃO {currentQuestion + 1}/{missionQuestions.length}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-2">
                                        <div
                                            className="bg-white h-full transition-all duration-300"
                                            style={{ width: `${((currentQuestion + 1) / missionQuestions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-lg md:text-xl font-bold mb-6 leading-relaxed">
                                        {missionQuestions[currentQuestion].question}
                                    </p>

                                    <div className="space-y-3">
                                        {missionQuestions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleMissionAnswer(index)}
                                                className="w-full text-left p-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-200 font-mono text-sm md:text-base group"
                                            >
                                                <span className="inline-block w-8 font-bold group-hover:text-black">
                                                    {String.fromCharCode(65 + index)})
                                                </span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : missionCompleted ? (
                            <div className="text-center py-8 animate-pulse">
                                <h3 className="text-4xl font-black text-white mb-4">MISSÃO CUMPRIDA!</h3>
                                <p className="text-xl mb-8">Você provou ser um verdadeiro especialista.</p>

                                <a
                                    href="https://chat.whatsapp.com/Hie3Kxkz3dT47fndQbCszT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-8 py-4 border-2 border-white bg-white text-black font-black text-xl hover:scale-105 transition-transform tracking-widest"
                                >
                                    ENTRAR NO GRUPO SECRETO
                                </a>

                                <button
                                    onClick={resetMissionQuiz}
                                    className="block mx-auto mt-8 text-sm underline hover:text-gray-300"
                                >
                                    [FECHAR]
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <h3 className="text-3xl font-black text-red-500 mb-4">FALHA NA MISSÃO</h3>
                                <p className="text-xl mb-8">Parabéns, você deve assistir as lives para concorrer a um kit do desafio!</p>
                                <p className="mb-8 font-mono opacity-50">Pontuação: {score}/{missionQuestions.length}</p>
                                <button
                                    onClick={resetMissionQuiz}
                                    className="block mx-auto mt-8 text-sm underline hover:text-gray-300"
                                >
                                    [FECHAR]
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )
            }

        </div >
    );
}
