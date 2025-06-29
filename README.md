# 📚 Bibliotech

**Bibliotech** é uma aplicação web de biblioteca online desenvolvida com o objetivo de facilitar o acesso à leitura, permitindo que usuários explorem, leiam e façam download de livros em PDF de forma simples e intuitiva.

---

## 🚀 Tecnologias Utilizadas

* ⚙️ **Backend:** [Spring Boot](https://spring.io/projects/spring-boot)  
* 💻 **Frontend:** [React (JSX)](https://reactjs.org/)  
* 🐳 **Containerização:** [Docker](https://www.docker.com/)  
* 🛢️ **Banco de Dados:** POSTGRES via [HeidiSQL](https://www.heidisql.com/)  

---

## 🧩 Funcionalidades

* 📖 Visualização e leitura de livros online  
* 🔍 Busca por título de livros  
* 📥 Download de livros em PDF  
* 🧑 Cadastro e gerenciamento de usuários  
* ⭐ Sistema de avaliação de livros  
* 🎨 Interface responsiva para desktop e mobile  

---

## 🖥️ Estrutura do Projeto

```bash
bibliotech/
├── backend/             # Projeto Spring Boot
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── Dockerfile
├── frontend/            # Projeto React (JSX)
│   ├── public/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml   # Arquitetura multi-container
└── README.md
⚙️ Como Executar
1. Clone o repositório:
bash
Copiar
Editar
git clone https://github.com/seu-usuario/bibliotech.git
cd bibliotech
2. Execute com Docker Compose:
bash
Copiar
Editar
docker-compose up --build
Isso irá levantar o backend (Spring Boot), o frontend (React) e o banco de dados (MySQL).

📌 Observações
📁 PDFs e imagens dos livros podem ser carregados via painel administrativo ou via banco.

🔐 O sistema pode ser expandido com autenticação e permissões.

📸 Screenshots
Em breve...

✨ Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.