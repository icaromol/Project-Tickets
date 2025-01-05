// Extrai os parâmetros de uma query string e retorna um objeto chave-valor.
export function extractQueryParams(query) {
  return query
    .slice(1) // Remove o caractere inicial "?" da query string.
    .split("&") // Divide a string em pares chave-valor separados por "&".
    .reduce((queryParams, param) => {
      const [key, value] = param.split("="); // Separa a chave e o valor para cada par.

      queryParams[key] = value; // Adiciona a chave e o valor ao objeto acumulador.

      return queryParams; // Retorna o objeto acumulador atualizado.
    }, {});
}

/*
  A função extractQueryParams processa uma query string para transformá-la em um objeto JavaScript.

  Ela remove o "?" inicial, divide os pares chave-valor separados por "&", e usa o método reduce para criar um objeto onde cada chave é associada ao seu respectivo valor.
*/
