# Test - Health Tech

Este é um aplicativo móvel desenvolvido em React Native utilizando Expo, com roteamento gerenciado pelo Expo Router. O projeto consome dados de uma API (Dummy JSON) para exibir produtos, realizando operações básicas de CRUD como parte de um teste de habilidades.

# Tecnologias Utilizadas

- React Native: Estrutura principal para o desenvolvimento do aplicativo.
- Expo: Plataforma que facilita o desenvolvimento, compilação e distribuição do aplicativo.
- Expo Router: Roteamento e navegação.
- React Query: Gerenciamento de estado assíncrono, especialmente para o consumo da API e cache de dados.
- Zustand: Biblioteca de gerenciamento de estado leve e simplificada.
- Gluestack UI: Biblioteca de componentes para a interface do usuário. Em alguns casos, foram usados componentes do próprio React Native estilizados com o StyleSheet.
- Decisões de Desenvolvimento
- Estrutura de Arquivos
  Optou-se por uma estrutura que prioriza a separação de responsabilidades, organizando a navegação e componentes por módulos. Isso facilita a escalabilidade e manutenção do projeto.

## Gerenciamento de Estado

Foram utilizadas duas abordagens de gerenciamento de estado:

- React Query: Para manipulação e cache de dados provenientes da API.
- Zustand: Para armazenamento de estados globais do usuário e autenticação, otimizando a reatividade do aplicativo.
  Estilização

## Componentes e estilização

Embora o Gluestack UI seja a biblioteca principal para componentes estilizados, foi necessário utilizar o StyleSheet do React Native em algumas telas específicas para garantir a personalização de estilo.

# Instalação e Configuração

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados:

- Node.js e npm
- Expo CLI

## Passo a Passo para Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

```

2. Instale as dependências:

```bash
yarn
```

3. Inicie o servidor Expo:

```bash
yarn start
```

Siga as instruções no terminal para visualizar o aplicativo em um emulador ou dispositivo físico.

## Configuração da API

Este projeto utiliza a API do [Dummy JSON](https://dummyjson.com/docs) para manipulação de dados dos produtos. A configuração da URL da API pode ser ajustada no arquivo src/config/api.js para fácil alteração em caso de mudança de ambiente ou de API.

## Funcionalidades do Aplicativo

- Autenticação de Usuário: Tela de login e redirecionamento para listagem de produtos.
- Listagem de Produtos: Exibição de produtos recebidos da API com paginamento e cache.

### CRUD de Produtos:

- Criar Produto: Adição de novos produtos.
- Visualizar Produto: Exibe detalhes de um produto específico.
- Atualizar Produto: Permite a edição das informações de um produto.
- Excluir Produto: Remove um produto da listagem.

## Configuração do Gerenciamento de Estado

### Zustand

No arquivo src/store/authStore.ts, Zustand gerencia o estado de autenticação do usuário, mantendo o usuário logado ao optar por essa funcionalidade.

## React Query

React Query é usado para gerenciar e fazer cache das requisições da API, melhorando o desempenho do aplicativo e diminuindo a quantidade de chamadas à API.

# Contribuição

Faça um fork do projeto.
Crie uma branch para a nova funcionalidade:

# Contato

Para mais informações sobre o projeto ou para tirar dúvidas, entre em contato através do e-mail [lucas.lfs2004@gmail.com].
