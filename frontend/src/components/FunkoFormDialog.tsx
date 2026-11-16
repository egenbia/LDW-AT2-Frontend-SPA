import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FunkoPop, FunkoPopInput } from "@/types/funkopop";

interface FormState {
  personagem: string;
  casa: string;
  numeroColecao: string;
  preco: string;
  emEstoque: boolean;
}

const emptyForm: FormState = {
  personagem: "",
  casa: "",
  numeroColecao: "",
  preco: "",
  emEstoque: true,
};

interface FunkoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  funko: FunkoPop | null; // null = cadastro, objeto = edição
  onSubmit: (data: FunkoPopInput) => Promise<boolean>;
}

export default function FunkoFormDialog({
  open,
  onOpenChange,
  funko,
  onSubmit,
}: FunkoFormDialogProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    if (funko) {
      setForm({
        personagem: funko.personagem,
        casa: funko.casa,
        numeroColecao: String(funko.numeroColecao),
        preco: String(funko.preco),
        emEstoque: funko.emEstoque,
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, funko]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSaving(true);
    const ok = await onSubmit({
      personagem: form.personagem.trim(),
      casa: form.casa.trim(),
      numeroColecao: Number(form.numeroColecao),
      preco: Number(form.preco),
      emEstoque: form.emEstoque,
    });
    setSaving(false);
    if (ok) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {funko ? "Editar Funko Pop" : "Novo Funko Pop"}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do Funko Pop e salve.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personagem">Personagem</Label>
            <Input
              id="personagem"
              name="personagem"
              value={form.personagem}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="casa">Casa</Label>
            <Input
              id="casa"
              name="casa"
              value={form.casa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numeroColecao">Nº da coleção</Label>
              <Input
                id="numeroColecao"
                name="numeroColecao"
                type="number"
                min="0"
                value={form.numeroColecao}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={form.preco}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="emEstoque"
              name="emEstoque"
              type="checkbox"
              checked={form.emEstoque}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <Label htmlFor="emEstoque">Em estoque</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
