<div align="center">
  <img src="https://img.shields.io/badge/STATUS-OPERACIONAL-gold?style=for-the-badge&logo=statuspage&logoColor=white" />
  <img src="https://img.shields.io/badge/NODE.JS-v18+-green?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/DATABASE-MYSQL-blue?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/CACHE-REDIS-red?style=for-the-badge&logo=redis&logoColor=white" />
</div>

<br />

<div align="center">
  <h1> 🎰 PG Soft API Emulator - Premium Edition 💰 </h1>
  <p><i>A solução definitiva para emulação e controle total de jogos PG Soft com foco em alta performance e lucro.</i></p>
</div>

---

### 💎 Sobre o Projeto
Este repositório contém uma infraestrutura robusta desenvolvida em **TypeScript** para emulação de servidores de jogos da PG Soft. O sistema permite que operadores tenham controle absoluto sobre a experiência do usuário, desde o saldo até as chances críticas de premiação.

### 🎯 Principais Recursos
- 🚀 **Performance Extrema:** Backend otimizado com cache em Redis.
- 🛠️ **Painel de Probabilidades:** Ajuste em tempo real de RTP e bônus.
- 📱 **Mobile First:** Interface de jogos 100% responsiva.
- 🔐 **Segurança Reforçada:** Camada de proteção contra ataques e logs de auditoria.

---

### ⚙️ Configuração Rápida

<details>
<summary><b>1. Instalação das Dependências 📦</b></summary>
<p>
Use o gerenciador de pacotes de sua preferência:
```bash
npm install
# ou
yarn install
```
</p>
</details>

<details>
<summary><b>2. Banco de Dados 🗄️</b></summary>
<p>
Importe o arquivo <code>apidb.sql</code> no seu MySQL. O esquema já está otimizado para produção.
</p>
</details>

<details>
<summary><b>3. Variáveis de Ambiente 🔑</b></summary>
<p>
Crie um arquivo <code>.env</code> baseado no <code>.env.example</code>:
```env
DB_HOST=localhost
DB_NAME=pgsoft
REDIS_HOST=127.0.0.1
```
</p>
</details>

---

### 📈 Configurações de Ganhos (RTP)

| Parâmetro | Descrição | Impacto no Jogo |
| :--- | :--- | :--- |
| **ProbGain** | Probabilidade Geral | Define se a rodada será vitoriosa |
| **ProbBonus** | Frequência de Bônus | Controla a entrada em modos especiais |
| **RTP User** | Return to Player | Porcentagem de lucro/perda por usuário |
| **Influencer** | Modo Demonstração | Ganhos garantidos para vídeos/lives |

---

### 🛠️ Tecnologias Utilizadas
- **Linguagem:** TypeScript / Node.js
- **Framework:** Express
- **Banco de Dados:** MySQL 8.0
- **Cache:** Redis Server
- **Comunicação:** Socket.IO (Tempo Real)

---

<div align="center">
  <p>Desenvolvido com ❤️ para a comunidade Devduhub</p>
  <img src="https://img.shields.io/github/license/Devduhub/cassino?style=flat-square&color=gold" />
</div>
