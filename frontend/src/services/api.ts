import type { FunkoPop, FunkoPopInput } from "@/types/funkopop";

const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    let mensagem = `Erro ${response.status} ao comunicar com a API.`;
    try {
      const data: { mensagem?: string } = await response.json();
      if (data.mensagem) mensagem = data.mensagem;
    } catch {
      // resposta sem JSON: mantém a mensagem padrão
    }
    throw new Error(mensagem);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const funkoApi = {
  listar: () => request<FunkoPop[]>("/recursos"),

  criar: (data: FunkoPopInput) =>
    request<FunkoPop>("/recursos", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: number, data: FunkoPopInput) =>
    request<FunkoPop>(`/recursos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remover: (id: number) =>
    request<void>(`/recursos/${id}`, { method: "DELETE" }),
};