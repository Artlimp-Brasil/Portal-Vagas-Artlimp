import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-soft">
        <div className="container-page py-24 text-center max-w-xl">
          <div className="font-display text-7xl md:text-9xl font-bold text-primary/20">404</div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold">Página não encontrada</h1>
          <p className="mt-3 text-muted-foreground">
            A página que você procura não existe, ou a vaga pode não estar mais disponível.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-primary shadow-glow">
              <Link to="/"><Home className="h-4 w-4 mr-2" /> Ir para início</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/vagas"><ArrowLeft className="h-4 w-4 mr-2" /> Ver vagas</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
