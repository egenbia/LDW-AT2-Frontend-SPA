import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sobre() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre o projeto</CardTitle>
        <CardDescription>AT2 - Laboratório de Desenvolvimento Web</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          Aplicação SPA para gerenciar uma coleção de Funko Pops, consumindo a API REST
          da AT1 (Node, Express, Sequelize e PostgreSQL).
        </p>
        <p>Tecnologias: React, TypeScript, Vite, Tailwind CSS, shadcn/ui e React Router.</p>
      </CardContent>
    </Card>
  );
}