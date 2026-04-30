<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&pause=1000&color=FFD700&center=true&vCenter=true&width=800&lines=💎+CASINO+ENGINE+PRO+💎;🚀+SOLUÇÃO+PG+SOFT+V2.0+🚀;💰+MAXIMIZE+SEUS+LUCROS+💰" alt="Typing SVG" />
</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/golden.png" width="100%">
</p>

## 📌 Índice
1. [📖 Sobre o Projeto](#-sobre-o-projeto)
2. [🏗️ Arquitetura Técnica](#-arquitetura-técnica)
3. [🛠️ Pré-requisitos](#-pré-requisitos)
4. [🚀 Guia de Instalação](#-guia-de-instalação)
5. [🔑 Configuração de Ambiente (.env)](#-configuração-de-ambiente-env)
6. [🗄️ Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
7. [🌐 Implantação em Produção (VPS)](#-implantação-em-produção-vps)
8. [📈 Controle de RTP e Probabilidades](#-controle-de-rtp-e-probabilidades)
9. [❓ FAQ & Troubleshooting](#-faq--troubleshooting)

---

## 📖 Sobre o Projeto
O **Casino Engine Pro** é uma infraestrutura de backend de alto nível projetada para emular o comportamento de servidores da PG Soft. Desenvolvido em **TypeScript**, o sistema oferece uma ponte segura entre o frontend do jogo e o seu sistema de carteira (Wallet), permitindo controle granular sobre cada rodada (spin).

---

## 🏗️ Arquitetura Técnica
O sistema opera em uma estrutura de microsserviços integrados:
*   **Core Engine (Node.js/Express):** Gerencia as rotas da API, validações de segurança e lógica de jogo.
*   **Camada de Cache (Redis):** Responsável por armazenar sessões ativas e tokens temporários, garantindo latência próxima de zero.
*   **Persistência (MySQL):** Armazena o histórico de jogadas, saldos e configurações de agentes.
*   **Real-time (Socket.io):** Comunicação em tempo real para atualizações de saldo instantâneas.

---

## 🛠️ Pré-requisitos
*   **Node.js:** v18.x ou superior (Recomendado v20 LTS).
*   **MySQL:** 8.0+ ou MariaDB 10.11+.
*   **Redis:** 7.0+ (Obrigatório para gestão de sessões).
*   **Gerenciador:** NPM ou Yarn.

---

## 🚀 Guia de Instalação

### 1. Clonagem e Dependências
```bash
git clone https://github.com/Devduhub/cassino.git
cd cassino
npm install
```

### 2. Preparação do Ambiente
Copie o arquivo de exemplo e configure suas credenciais:
```bash
cp .env.example .env
```

### 3. Compilação (Build)
Para transformar o código TypeScript em JavaScript otimizado para produção:
```bash
npm run build
```

---

## 🔑 Configuração de Ambiente (.env)
| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `PORT` | Porta de execução do servidor | `3000` |
| `DB_HOST` | Endereço do Servidor MySQL | `localhost` |
| `DB_USER` | Usuário do Banco de Dados | `root` |
| `DB_PASS` | Senha do Banco de Dados | `sua_senha` |
| `REDIS_URL` | URL de conexão do Redis | `redis://127.0.0.1:6379` |
| `API_SECRET` | Chave mestra para assinar tokens | `md5_secret_hash` |

---

## 🗄️ Estrutura do Banco de Dados
O banco de dados `apidb` é composto pelas seguintes tabelas críticas:

*   **`agents`:** Onde você configura o parceiro (site de apostas). Aqui você define a `secretKey` de integração.
*   **`users`:** Cadastro dos jogadores, onde você define o `rtp` individual.
*   **`calls`:** Histórico de todas as requisições de jogo para auditoria.
*   **`json_data` (Tabelas específicas):** Armazenam os modelos de comportamento de cada jogo (Tiger, Ox, etc).

---

## 🌐 Implantação em Produção (VPS)
Para colocar o projeto online de forma profissional em um Ubuntu 22.04:

### 1. Instalar o PM2 (Gerenciador de Processos)
```bash
npm install pm2 -g
pm2 start dist/index.js --name "casino-api"
```

### 2. Configurar Nginx (Proxy Reverso)
Crie um arquivo de configuração no Nginx para apontar seu domínio para a porta 3000 e gerencie o SSL com **Certbot**.

---

## 📈 Controle de RTP e Probabilidades
O sistema permite manipular os ganhos de duas formas:

### A. Nível Agente (Global)
Ajuste os valores na tabela `agents` para afetar todos os jogadores daquele operador.
```sql
UPDATE agents SET probganho = '90', probbonus = '20' WHERE agentCode = 'parceiro1';
```

### B. Nível Usuário (Individual)
Ajuste o `rtp` na tabela `users`.
*   `rtp = 100`: Jogo normal (casa ganha 5-10%).
*   `rtp = 500`: Jogador ganha muito (ideal para Influencers).
*   `rtp = 10`: Jogador perde quase sempre.

---

## ❓ FAQ & Troubleshooting

**P: O servidor não inicia (Porta 3000 em uso).**
R: Use o comando `fuser -k 3000/tcp` para liberar a porta e tente novamente.

**P: O jogo carrega mas dá "Erro de Sessão".**
R: Verifique se o Redis está rodando e se o token na URL coincide com o token na tabela `users`.

**P: Como adicionar novos jogos?**
R: Adicione os arquivos do jogo na pasta `src/public` e mapeie o ID no `apicontroller.ts`.

---

<div align="center">
  <p><b>Casino Engine Pro</b> - Desenvolvido para máxima escalabilidade.</p>
  <p>© 2024 Devduhub - Todos os direitos reservados.</p>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/golden.png" width="100%">
</div>
