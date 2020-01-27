# keycash-backend-challenge-patricia
API CRUD que realiza operações para o registro de imóveis. 

# Descrição:
Desenvolvida uma API em node com typescript que realiza inclusões, edições, buscas e exclusões de imóveis.

# Pré-requisito:
Instalação do NodeJS em sua máquina.

Instalação do MySQL para criação do banco local.

Instalação do Postman para execução das APIs.


# 1. Após o clone do projeto, entrar no diretório 'keycash-backend-challenge-patricia/database_script' e executar o script para criação da estrutura da base de dados.


# 2. Dentro do diretório raiz 'keycash-backend-challenge-patricia', criar o arquivo ".env" com os dados da base de dados, usuário e senha. Exemplo:
NODE_ENV=development
PORT=30780
HOST_CHALLENGE=localhost
DATABASE_CHALLENGE=keycash_challenge
USER_CHALLENGE=root
PASSWORD_CHALLENGE=123456
DIALECT=mysql
DATABASE_PORT_CHALLENGE=3306

Observação: verificar os campos "USER_CHALLENGE" e "PASSWORD_CHALLENGE" de acordo com as configurações locais do MySql.


# 3. Em seguida, entrar no diretório 'keycash-backend-challenge-patricia' e executar os seguintes comandos:

npm install

npm run compile

npm run start:dev

Observação: se tudo estiver ok, as seguintes mensagens serão exibidas: 
Connected to keycash-challenge database...
Listening on port: 30780.


# 4. Para executar as chamadas das APIs, ir no diretório 'keycash-backend-challenge-patricia/postman' e realizar o import da collection do postman.


# 5. O MER da base de dados esta localizada no diretório 'keycash-backend-challenge-patricia/database_diagram'.

