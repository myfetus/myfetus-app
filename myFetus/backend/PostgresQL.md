# Inicialização PostgresQL

## Instalador

. [Windows](https://www.postgresql.org/download/windows/) e siga o instalador e adicione o pgAdmin 4;
. Linux - Use o package manager da sua versão.

# Configuração do Banco de Dados PostgreSQL com pgAdmin 4

##  1. Adicionando um novo servidor no pgAdmin 4

1. Abra o **pgAdmin 4**.
2. Clique em **Add New Server**.
3. Na aba **General**:
   - Preencha o campo **Name** com um nome para o servidor (ex: `myServer`).
4. Na aba **Connection**:
   - **Host name/address**: `localhost`   
   - **Password**: `<sua senha>`  
   - Marque a opção **Save Password** se desejar.

> ⚠️ Certifique-se de que o PostgreSQL esteja em execução antes de continuar.

---

## 📁 2. Arquivo `.env` no projeto

No diretório raiz do projeto (`myFetus`), crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
PG_USER=myuser
PG_HOST=localhost
PG_DATABASE=mydatabase
PG_PASSWORD=mypassword
PG_PORT=5432