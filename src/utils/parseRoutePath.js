// Esta função processa um caminho de rota e transforma parâmetros dinâmicos em expressões regulares que podem ser usadas para capturar e validar valores dinâmicos de URLs.

// A função recebe como entrada o caminho da rota.
export function parseRoutePath(path) {
  // Define uma expressão regular para identificar parâmetros dinâmicos na rota.
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  // Substitui os parâmetros dinâmicos encontrados na rota pelo padrão de captura regex.
  const params = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)" // Substituição do parâmetro dinâmico com uma regex nomeada.
  );

  // Cria uma expressão regular final que também inclui suporte para query strings opcionais.
  const pathRegex = new RegExp(
    `^${params}(?<query>\\?(.*))?$` // Adiciona suporte para uma query string opcional, capturada no grupo "query".
  );

  // Retorna a expressão regular gerada para que possa ser usada para validação e captura de parâmetros na rota.
  return pathRegex;
}

/*  A função parseRoutePath transforma uma rota com parâmetros dinâmicos em uma expressão regular. Ela permite capturar valores associados aos parâmetros da rota.

Isso também adiciona suporte para query strings opcionais, possibilitando o processamento de URLs completas.

Essa abordagem é essencial para servidores que precisam lidar com rotas dinâmicas e extrair valores para manipulação ou lógica posterior.
 */
