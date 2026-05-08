import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, Target, Eye, Heart, Award, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero-warehouse.jpg";
import teamImg from "@/assets/team-collab.jpg";
import fleetImg from "@/assets/fleet.jpg";
import storeImg from "@/assets/store.jpg";
import meetingImg from "@/assets/meeting.jpg";
import TestimonialsCarousel from "@/components/TestimonialSCarousel";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/vagas?q=${encodeURIComponent(q)}` : "/vagas");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
          <div className="absolute inset-0 opacity-25">
            <img src={heroImg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary-deep/70 to-transparent" />
          <div className="container-page relative py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-widest border border-primary-foreground/20">
                <Award className="h-3.5 w-3.5" /> Trabalhe Conosco
              </span>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]">
                Construa sua carreira em uma referência <span className="text-primary-glow">nacional</span>.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed">
                Há mais de 30 anos, a ART LIMP BRASIL move o mercado de distribuição com inovação,
                ética e profissionalismo. Faça parte do nosso time.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-12 px-8 bg-primary-foreground text-primary-deep hover:bg-primary-foreground/90 font-semibold">
                  <Link to="/vagas">
                    Ver vagas disponíveis
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <a href="#quem-somos">Conhecer a empresa</a>
                </Button>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
                {[
                  { v: "+30", l: "anos de história" },
                  { v: "156", l: "cidades atendidas" },
                  { v: "5", l: "frentes de atuação" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary-glow">{s.v}</div>
                    <div className="text-xs md:text-sm text-primary-foreground/70 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="py-20 md:py-28">
          <div className="container-page">
            <SectionTitle
              eyebrow="Nosso ambiente"
              title="Onde a sua história pode acontecer"
              description="Conheça os bastidores da Artlimp Brasil: estrutura moderna, time engajado e operação que abraça o Brasil."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[520px]">
              <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-card group">
                <img src={teamImg} alt="Time da Artlimp Brasil em colaboração" loading="lazy" width={1280} height={896}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card group">
                <img src={fleetImg} alt="Frota de distribuição" loading="lazy" width={1280} height={896}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card group">
                <img src={storeImg} alt="Loja física especializada" loading="lazy" width={1280} height={896}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-card group">
                <img src={meetingImg} alt="Reunião com cliente" loading="lazy" width={1280} height={896}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </section>

        {/* QUEM SOMOS */}
        <section id="quem-somos" className="py-20 md:py-28 bg-gradient-soft">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle
                eyebrow="Quem somos"
                title="Mais de 30 anos moldando o futuro da distribuição."
                description="Fundada em 1992, a Artlimp Brasil é referência nacional em distribuição de produtos de limpeza, descartáveis, embalagens, dispensers e químicos. Atuamos em cinco frentes — E-commerce, Televendas, Licitação, Comodato e Loja Física — sempre com dedicação, inovação e compromisso com a qualidade."
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, t: "Liderança consolidada", d: "Entre as melhores distribuidoras do segmento." },
                  { icon: Users, t: "Times capacitados", d: "Profissionais bem treinados em todas as áreas." },
                ].map((item) => (
                  <div key={item.t} className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <item.icon className="h-6 w-6 text-primary mb-3" />
                    <div className="font-semibold">{item.t}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl rounded-3xl" />
              <img
                src={heroImg}
                alt="Centro de distribuição ART LIMP"
                loading="lazy"
                width={1920}
                height={1080}
                className="relative rounded-3xl shadow-elevated w-full"
              />
            </div>
          </div>
        </section>

        {/* MISSÃO VISÃO VALORES */}
        <section className="py-20 md:py-28">
          <div className="container-page">
            <SectionTitle
              eyebrow="Nosso propósito"
              title="Missão, Visão e Valores"
              description="O que nos guia todos os dias na construção de relacionamentos fortes e duradouros."
              align="center"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Missão",
                  text: "Contribuir diariamente para o sucesso dos nossos clientes, oferecendo com máxima eficiência uma linha completa de produtos que atendam às suas necessidades. Apresentar, de forma ágil, eficiente e inovadora, novas soluções em limpeza profissional para o segmento institucional, promovendo ambientes mais seguros e econômicos por meio da padronização dos processos de higienização.",
                },
                {
                  icon: Eye,
                  title: "Visão",
                  text: "Ampliar continuamente nossa infraestrutura e aprimorar nossos processos para acompanhar o crescimento da demanda. Com uma equipe capacitada e bem treinada, oferecer as melhores soluções aos clientes, assegurando entregas ágeis e eficientes. Fortalecer relacionamentos sólidos e duradouros, mantendo elevados padrões de ética e qualidade, e consolidando nossa posição entre as principais distribuidoras do segmento.",
                },
                {
                  icon: Heart,
                  title: "Valores",
                  text: "Integridade nas relações e decisões, atuando com ética e transparência; valorização do trabalho em equipe, promovendo colaboração e respeito; foco na satisfação do cliente, buscando superar expectativas; compromisso com resultados consistentes e sustentáveis; dedicação à melhoria contínua em processos e desempenho; e incentivo à inovação, sempre em busca de soluções mais eficientes e modernas.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
      <TestimonialsCarousel />

        {/* CTA BUSCA */}
        <section className="py-20 md:py-28 bg-gradient-hero text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="container-page relative">
            <div className="max-w-2xl mx-auto text-scenter">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">Carreiras</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
                Encontre sua próxima oportunidade.
              </h2>
              <p className="mt-4 text-primary-foreground/80 md:text-lg">
                Busque por cargo, área ou cidade — e dê o próximo passo na sua carreira com a gente.
              </p>
              <form onSubmit={onSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cargo, área ou localidade..."
                    className="h-12 pl-11 bg-card text-foreground border-0 rounded-full"
                  />
                </div>
                <Button type="submit" className="h-12 px-7 rounded-full bg-primary-foreground text-primary-deep hover:bg-primary-foreground/90 font-semibold">
                  Buscar vagas
                </Button>
              </form>
              <div className="mt-8">
                <Link to="/vagas" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Ver todas as vagas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
