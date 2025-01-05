import fs from "node:fs/promises";

// Define o caminho.
const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  // Privado para que esteja disponível somente dentro desta classe.
  #database = {};

  // O construtor é executado sempre que a classe é instanciada.
  constructor() {
    fs.readFile(DATABASE_PATH, "utf8") // Leitura do arquivo.
      .then((data) => {
        // Se encontrou dados.
        this.#database = JSON.parse(data); // Transforma texto em JSON e atualiza o conteúdo de #database
      }) // Se der certo ele executa isso.
      .catch(() => {
        this.#persist();
      }); // Se o arquivo não existir ou estiver vazio, por exemplo, chama o catch.
  }

  // Método para salvar os arquivos e não manter apenas no cachê.
  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database)); // Chama a própria database formatada em string e cria o arquivo db.json.
  }

  insert(table, data) {
    // Verifica se existe uma tabela dentro do database.
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data); // Se existir, chama o método push.
    } else {
      this.#database[table] = [data]; // Se não existir, cria do zero.
    }

    this.#persist(); // Salva o arquivo com os dados que acabamos de adicionar.
  }

  // Método para selecionar a tabela que será usado no método GET em tickets.js
  select(table, filters) {
    let data = this.#database[table] ?? [];

    // Percorre cada linha para verificar se existe um filtro. Se filtro positivo, retorna.
    if (filters) {
      data = data.filter((row) => {
        return Object.entries(filters).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        }); // O entries separa a chave e o valor.
      });
    }
    return data;
  }

  // Método para atualizar (update)
  update(table, id, data) {
    const rowIndex = this.#database[table]?.findIndex(
      (row) => row.id === String(id)
    );

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      };

      this.#persist();
      return true;
    }
    return false;
  }
}
