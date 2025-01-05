export function update({ request, response, database }) {
  const { id } = request.params;

  // Verifique se o ID foi recebido
  if (!id) {
    return response.writeHead(400).end("ID do ticket é obrigatório.");
  }

  // Dados do corpo da requisição
  const { company_name, website, root, goals } = request.body || {};

  // Verifique se ao menos um campo foi enviado para atualização
  if (!company_name && !website && !root && !goals) {
    return response
      .writeHead(400)
      .end("Nenhum campo enviado para atualização.");
  }

  // Atualize no banco de dados
  const updated = database.update("tickets", id, {
    company_name,
    website,
    root,
    goals,
    updated_at: new Date(),
  });

  if (!updated) {
    return response.writeHead(404).end("Ticket não encontrado.");
  }

  return response.writeHead(200).end("Ticket atualizado com sucesso.");
}
