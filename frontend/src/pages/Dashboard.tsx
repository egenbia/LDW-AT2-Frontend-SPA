import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FunkoFormDialog from "@/components/FunkoFormDialog";
import { funkoApi } from "@/services/api";
import type { FunkoPop, FunkoPopInput } from "@/types/funkopop";

const formatBRL = (valor: number | string): string =>
  Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Dashboard() {
  const [funkos, setFunkos] = useState<FunkoPop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<FunkoPop | null>(null);
  const [toDelete, setToDelete] = useState<FunkoPop | null>(null);

  const carregar = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await funkoApi.listar();
      setFunkos(data);
    } catch (error) {
      toast.error("Não foi possível carregar os Funko Pops.", {
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const abrirNovo = (): void => {
    setEditing(null);
    setFormOpen(true);
  };

  const abrirEdicao = (funko: FunkoPop): void => {
    setEditing(funko);
    setFormOpen(true);
  };

  const salvar = async (data: FunkoPopInput): Promise<boolean> => {
    try {
      if (editing) {
        const atualizado = await funkoApi.atualizar(editing.id, data);
        setFunkos((prev) => prev.map((f) => (f.id === atualizado.id ? atualizado : f)));
        toast.success("Funko Pop atualizado com sucesso!");
      } else {
        const criado = await funkoApi.criar(data);
        setFunkos((prev) => [...prev, criado]);
        toast.success("Funko Pop cadastrado com sucesso!");
      }
      return true;
    } catch (error) {
      toast.error("Erro ao salvar o Funko Pop.", {
        description: (error as Error).message,
      });
      return false;
    }
  };

  const confirmarExclusao = async (): Promise<void> => {
    if (!toDelete) return;
    try {
      await funkoApi.remover(toDelete.id);
      setFunkos((prev) => prev.filter((f) => f.id !== toDelete.id));
      toast.success("Funko Pop excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir o Funko Pop.", {
        description: (error as Error).message,
      });
    } finally {
      setToDelete(null);
    }
  };

  const total = funkos.length;
  const emEstoque = funkos.filter((f) => f.emEstoque).length;
  const valorTotal = funkos.reduce((soma, f) => soma + Number(f.preco), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={abrirNovo}>+ Novo Funko Pop</Button>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total de registros</CardDescription>
            <CardTitle className="text-3xl">{total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Em estoque</CardDescription>
            <CardTitle className="text-3xl">{emEstoque}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Valor total</CardDescription>
            <CardTitle className="text-3xl">{formatBRL(valorTotal)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Listagem */}
      <Card>
        <CardHeader>
          <CardTitle>Coleção</CardTitle>
          <CardDescription>Todos os Funko Pops cadastrados.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : funkos.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              <p className="text-lg font-medium">Nenhum Funko Pop cadastrado ainda 😢</p>
              <p className="text-sm">Clique em "Novo Funko Pop" para começar sua coleção.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personagem</TableHead>
                  <TableHead>Casa</TableHead>
                  <TableHead>Nº</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funkos.map((funko) => (
                  <TableRow key={funko.id}>
                    <TableCell className="font-medium">{funko.personagem}</TableCell>
                    <TableCell>{funko.casa}</TableCell>
                    <TableCell>{funko.numeroColecao}</TableCell>
                    <TableCell>{formatBRL(funko.preco)}</TableCell>
                    <TableCell>
                      {funko.emEstoque ? (
                        <Badge>Em estoque</Badge>
                      ) : (
                        <Badge variant="secondary">Esgotado</Badge>
                      )}
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button size="sm" variant="outline" onClick={() => abrirEdicao(funko)}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setToDelete(funko)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal de cadastro/edição */}
      <FunkoFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        funko={editing}
        onSubmit={salvar}
      />

      {/* Modal de confirmação de exclusão */}
      <Dialog open={toDelete !== null} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Funko Pop</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <strong>{toDelete?.personagem}</strong>? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmarExclusao}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}