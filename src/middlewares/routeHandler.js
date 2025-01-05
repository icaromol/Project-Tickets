import { routes } from "../routes/index.js";
import { Database } from "../database/database.js"; // Importa a classe Database com letra maiúscula.
import { extractQueryParams } from "../utils/extractQueryParams.js";

const database = new Database(); // Cria uma instância da classe Database.

// Manipula a rota recebida na requisição HTTP.
export function routeHandler(request, response) {
  // Localiza a rota correspondente na lista de rotas, verificando método e correspondência via Regex no path.
  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url);
  });

  // Se a rota correspondente for encontrada, extrai parâmetros e chama o controlador.
  if (route) {
    const routeParams = request.url.match(route.path); // Captura os parâmetros correspondentes à rota.

    const { query, ...params } = routeParams.groups; // Extrai a query string capturada, se presente.

    request.params = params;

    request.query = query ? extractQueryParams(query) : {}; // Se existe ele retorna a query, se não, retorna um objeto vazio.

    return route.controller({ request, response, database }); // Executa o controlador associado à rota.
  }

  // Se nenhuma rota for encontrada, retorna uma resposta 404 (Not Found).
  return response.writeHead(404).end();
}

/*
  A função routeHandler gerencia a correspondência entre uma requisição HTTP e uma rota definida. Ela utiliza Regex para validar e capturar parâmetros dinâmicos no caminho da URL e, se houver uma correspondência, executa o controlador associado à rota, fornecendo os parâmetros e uma instância do banco de dados. Caso nenhuma rota seja encontrada, retorna uma resposta 404 para o cliente. Essa função é essencial para um roteamento eficiente e flexível em servidores que lidam com rotas dinâmicas.
*/
