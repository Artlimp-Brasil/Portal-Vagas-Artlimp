import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="container-page py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.2fr_0.9fr]">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-display text-lg font-bold text-white">
              ART LIMP BRASIL
            </div>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Conectando talentos a oportunidades que ajudam a construir o
              futuro da distribuição.
            </p>

            <a
              href="/vagas"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Cadastrar currículo
            </a>
          </div>

          {/* Navegação */}
          <div>
            <div className="mb-3 text-sm font-semibold text-white">
              Navegação
            </div>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/vagas" className="transition hover:text-white">
                  Vagas
                </a>
              </li>
              <li>
                <a href="/" className="transition hover:text-white">
                  Sobre a empresa
                </a>
              </li>
              <li>
                <a
                  href="https://www.artlimpbrasil.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Site
                </a>
              </li>
              <li>
                <a
                  href="https://dicas.artlimpbrasil.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <div className="mb-3 text-sm font-semibold text-white">Contato</div>

            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a
                  href="mailto:rh@artlimpbrasil.com.br"
                  className="break-all transition hover:text-white"
                >
                  rh@artlimpbrasil.com.br
                </a>
              </li>

              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a
                  href="https://wa.me/551938514000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  (19) 3851-4000
                </a>
              </li>

              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  R. Manoel Mendes, 407 - Vila Pinheiros, Mogi Guaçu - SP
                </span>
              </li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div>
            <div className="mb-3 text-sm font-semibold text-white">
              Redes sociais
            </div>

            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <a
                href="https://www.instagram.com/artlimpbrasil"
                target="_blank" 
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-pink-500 transition hover:scale-105 hover:border-pink-500 hover:bg-pink-500 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://www.facebook.com/share/1KrZSquqBz/"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-blue-600 transition hover:scale-105 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/artlimpbrasil/"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-sky-500 transition hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://www.youtube.com/channel/UCjbRDWQ2loBmXAVi59gE4kQ"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-red-500 transition hover:scale-105 hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} ART LIMP BRASIL. Todos os direitos
            reservados.
          </span>

          <span>Construindo o futuro da distribuição.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;