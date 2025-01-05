export function updateStatus({ request, response, database }) {
  const { id } = request.params;

  const { company, persona, tone_and_voice, editorial } = request.body;

  console.log(company);

  database.update("tickets", id, {
    status: "closed",
    company,
    persona,
    tone_and_voice,
    editorial,
  });
  return response.writeHead(200).end("Ticket fechado com sucesso.");
}
