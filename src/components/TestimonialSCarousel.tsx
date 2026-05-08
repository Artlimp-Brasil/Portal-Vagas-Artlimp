import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import marliImg from "@/assets/depoimentos/marli.png";
import marcoImg from "@/assets/depoimentos/marco.png";
import ritaImg from "@/assets/depoimentos/rita.png";
import fabianaImg from "@/assets/depoimentos/fabiana.png";
import silvanoImg from "@/assets/depoimentos/silvano.png";
import joyceImg from "@/assets/depoimentos/joyce.png";




const testimonials = [
    {
        name: "Marli",
        role: "Limpeza",
        quote:
            "Aqui eu me sinto respeitada, acolhida e valorizada pelo trabalho que faço todos os dias.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 0,
        thumbnail: marliImg,
    },
    {
        name: "Marco",
        role: "Gestor de Projetos",
        quote:
            "Tenho espaço para contribuir com ideias, participar de decisões e crescer junto com a empresa.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 149,
        thumbnail: marcoImg
    },
    {
        name: "Rita",
        role: "Gerente Geral",
        quote:
            "O que mais valorizo aqui é ver pessoas crescendo, assumindo responsabilidades e construindo uma história com a empresa.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 237,
        thumbnail: ritaImg
    },
    {
        name: "Fabiana",
        role: "Televendas",
        quote:
            "Aqui encontrei oportunidades para aprender, evoluir profissionalmente e conquistar novos resultados.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 415,
        thumbnail: fabianaImg
    },
    {
        name: "Silvano",
        role: "Integração de Sistemas",
        quote:
            "A empresa me desafia a buscar soluções melhores e evoluir constantemente no meu trabalho.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 517,
        thumbnail: silvanoImg
    },
    {
        name: "Joyce",
        role: "Conferência de Expedição",
        quote:
            "Fazer parte desse time me ensinou a trabalhar com responsabilidade, atenção e orgulho pelo que entregamos.",
        videoUrl: "https://www.youtube.com/watch?v=9ncBDaYAJCk",
        startTime: 675,
        thumbnail: joyceImg
    },
];

export default function TestimonialsCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const hasDraggedRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState<null | {
        name: string;
        videoUrl: string;
        startTime: number;
    }>(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const getYoutubeEmbedUrl = (videoUrl: string, startTime: number) => {
        const url = new URL(videoUrl);
        const videoId = url.searchParams.get("v");

        return `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`;
    };

    const scroll = (direction: "left" | "right") => {
        carouselRef.current?.scrollBy({
            left: direction === "left" ? -420 : 420,
            behavior: "smooth",
        });
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!carouselRef.current) return;

        hasDraggedRef.current = false;
        setIsDragging(true);
        setStartX(event.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !carouselRef.current) return;

        event.preventDefault();

        const x = event.pageX - carouselRef.current.offsetLeft;
        const walk = x - startX;

        if (Math.abs(walk) > 8) {
            hasDraggedRef.current = true;
        }

        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <>
            <section className="py-20 md:py-28 bg-gradient-soft overflow-hidden">
                <div className="container-page">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                Nosso time
                            </span>

                            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
                                Histórias de quem constrói a Artlimp Brasil todos os dias
                            </h2>

                            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg leading-relaxed">
                                Conheça relatos reais de colaboradores que fazem parte da nossa
                                rotina, cultura e crescimento.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => scroll("left")}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-105"
                                aria-label="Voltar depoimentos"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => scroll("right")}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-105"
                                aria-label="Avançar depoimentos"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        className={`mt-12 flex gap-6 overflow-x-auto ${!isDragging ? "scroll-smooth" : ""} pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging
                                ? "cursor-grabbing select-none"
                                : "cursor-grab snap-x snap-mandatory"
                            }`}                           
                    >
                    {testimonials.map((item) => (
                        <article
                            key={item.name}
                            onClick={() => {
                                if (hasDraggedRef.current) return;

                                setIsVideoLoading(true);
                                setSelectedVideo({
                                    name: item.name,
                                    videoUrl: item.videoUrl,
                                    startTime: item.startTime,
                                });
                            }}
                            className="relative h-[560px] min-w-[310px] cursor-pointer overflow-hidden rounded-2xl bg-primary-deep shadow-card snap-start sm:min-w-[380px] lg:min-w-[420px]"
                        >
                            <img
                                src={item.thumbnail}
                                alt={`Depoimento de ${item.name}`}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/95" />
                            <button
                                type="button"
                                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary-deep transition hover:scale-105 hover:bg-white"
                                aria-label={`Assistir depoimento de ${item.name}`}
                            >
                                <Play className="ml-0.5 h-5 w-5 fill-current" />
                            </button>

                            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                                <p className="text-lg font-semibold leading-relaxed">
                                    “{item.quote}”
                                </p>

                                <div className="mt-8">
                                    <h3 className="font-display text-lg font-bold">
                                        {item.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/80">{item.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section >
        {
            selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedVideo(null);
                            setIsVideoLoading(false);
                        }}
                        className="absolute right-6 top-6 z-10 text-white transition hover:scale-110"
                        aria-label="Fechar vídeo"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
                            onClick={(event) => event.stopPropagation()}
                        >
                            {isVideoLoading && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
                                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <p className="mt-4 text-sm text-white/70">
                                        Carregando depoimento...
                                    </p>
                                </div>
                            )}

                            <div className="aspect-video">
                                <iframe
                                    src={getYoutubeEmbedUrl(
                                        selectedVideo.videoUrl,
                                        selectedVideo.startTime
                                    )}
                                    title={`Depoimento de ${selectedVideo.name}`}
                                    className="h-full w-full"
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    onLoad={() => setIsVideoLoading(false)}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )
}
        </>
    )
}