# Portal de Vagas Art Limp Brasil

Portal de vagas desenvolvido em React para centralizar as oportunidades disponíveis da Art Limp Brasil, apresentar informações institucionais da empresa e permitir que candidatos realizem candidatura diretamente pelo formulário integrado à Notion API.

## Tecnologias utilizadas

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- shadcn/ui
- Lucide React
- Notion API

## Funcionalidades

- Página inicial institucional
- Seção com fotos da empresa
- Apresentação de quem somos, missão, visão e valores
- Listagem de vagas disponíveis
- Filtros por área, localidade e modelo de trabalho
- Página interna para cada vaga
- Layout especial para vagas comerciais externas
- Formulário de candidatura
- Integração do formulário com banco de dados no Notion
- Validação de campos obrigatórios
- Mensagem de sucesso após candidatura

## Estrutura do projeto

```txt
src/
  components/
    Header.tsx
    Footer.tsx
    JobCard.tsx
    JobFilters.tsx
    ApplicationForm.tsx
    jobs/
      ExternalSalesJobDetail.tsx
      ExternalSalesCoreJobDetail.tsx

  data/
    jobs.json
    jobs.ts

  pages/
    Home.tsx
    Vagas.tsx
    VagaDetalhe.tsx
    NotFound.tsx

  types/
    job.ts

  services/
    notion.ts

  App.tsx
  main.tsx