# PG Soft Games API - Emulação e Controle

Este projeto é uma API de emulação para jogos da PG Soft (Fortune Tiger, Fortune Ox, etc.), permitindo o controle de probabilidades, bônus e RTP (Return to Player) através de um painel de banco de dados.

## 🚀 Funcionalidades

- **Emulação de Jogos:** Suporte para os principais títulos da PG Soft.
- **Controle de Probabilidades:** Ajuste de ganhos e bônus por Agente ou por Usuário.
- **Sistema de Influencer:** Modo especial para contas de demonstração/influencers.
- **Logs de Debug:** Rastreamento completo de requisições e erros.
- **Arquitetura Escalável:** Baseado em Node.js, Express, Redis e MySQL.

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina ou VPS:

- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- [MySQL](https://www.mysql.com/) ou MariaDB
- [Redis Server](https://redis.io/)

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Devduhub/cassino.git
   cd cassino
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`.
   - Edite o `.env` com as suas credenciais do banco de dados e do Redis.

## 🗄️ Configuração do Banco de Dados

1. Crie um banco de dados chamado `pgsoft` (ou o nome que preferir no `.env`).
2. Importe o arquivo `apidb.sql` localizado na raiz do projeto para criar as tabelas necessárias.

## 🌐 Configuração de DNS Local (Desenvolvimento)

Para que os jogos carreguem corretamente no seu ambiente local, você deve apontar os domínios da PG Soft para o seu IP local. 

No Windows, edite o arquivo `C:\Windows\System32\drivers\etc\hosts` e adicione:
```text
127.0.0.1 m.pgsoft.com
127.0.0.1 api.pgsoft.com
```

## 🟢 Como Executar

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor iniciará por padrão na porta `3000`.

## 📈 Ajustando Probabilidades e Ganhos

As chances de vitória são controladas diretamente no banco de dados:

- **Tabela `agents`:** Configura as probabilidades globais do operador (agente).
  - `probganho`: Chance geral de acerto.
  - `probbonus`: Frequência de bônus/cartas.
- **Tabela `users`:** Configurações específicas para cada jogador.
  - `rtp`: Porcentagem de retorno (ex: 100 = neutro, 500 = ganha muito).
  - `isinfluencer`: Define se a conta é do tipo influencer (ganhos facilitados).

## ⚠️ Segurança

- Nunca suba o seu arquivo `.env` ou seus certificados SSL (`.key`, `.crt`) para o GitHub.
- Certifique-se de alterar o `API_SECRET` no arquivo `.env` antes de colocar em produção.
- O arquivo `.gitignore` já está configurado para proteger seus dados sensíveis.

## 📄 Licença

Este projeto está sob a licença MIT.
