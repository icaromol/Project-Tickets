import { randomUUID } from "node:crypto";

export function create({ request, response, database }) {
  const {
    // Dados gerais do ticket
    company_name,
    website,
    root,
    goals,
  } = request.body;

  const ticket = {
    id: randomUUID(),
    // Dados gerais do ticket
    company_name,
    website,
    root,
    goals,
    // Status padrão do ticket.
    status: "open",
    // Campos de data e hora.
    created_at: new Date(),
    updated_at: new Date(),
  };

  database.insert("tickets", ticket);

  return response
    .writeHead(201)
    .end(JSON.stringify({ message: "Dados salvos com sucesso", data: ticket }));
}
