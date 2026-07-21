import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Header = () => {
  const linkBase = "text-base font-medium transition-colors hover:text-primary";
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://www.artlimpbrasil.com.br/pub/media/logo/stores/1/logo-artlimp.png"
            alt="Artlimp Brasil"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />

          <div className="leading-tight">
            <div className="font-display font-bold text-primary text-[18px] md:text-[20px]">
              Artlimp Brasil
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Carreiras
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <RouterNavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? "text-primary" : "text-foreground/70"}`}
          >
            Trabalhe Conosco
          </RouterNavLink>
          <RouterNavLink
            to="/vagas"
            className={({ isActive }) => `${linkBase} ${isActive ? "text-primary" : "text-foreground/70"}`}
          >
            Vagas
          </RouterNavLink>
        </nav>

      </div>
    </header>
  );
};

export default Header;
