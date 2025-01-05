export function index({ request, response, database }) {
  const { status } = request.query;

  const filters = status ? { status } : null; // Verifica se o status existe e se sim retorna ele como filtro.
  const tickets = database.select("tickets", filters); // Repassa o filtro.

  return response.end(JSON.stringify(tickets));
}

/*
Nomeclatura comum dos controllers:
CREATE - criar
INDEX - listar
UPDATE - atualizar
REMOVE - remover
SHOW - para exibir um único registro
*/
