<!-- Fazer a documentação do projeto aqui -->
<!-- Testar o código no site https://stackedit.io/app# -->

# Stand Altamente

Este documento descreve a estrutura e as funcionalidades de um **sistema digital para a gestão de um stand de automóveis**, concebido como um portal web que permite a visualização, detalhamento e inserção de veículos no inventário. Este projeto surge através de um desafio academico promovido pela disciplina de TI (Tecnologias da Internet) onde nos foi pedida a criação de um projeto onde fosse implementados uma série de critérios definidos num documento anteriormente fornecido.

## 📌 **Funcionalidades**

### 1. **Página Principal - Catálogo de Veículos Disponíveis**

A página principal disponibiliza a lista completa de automóveis anunciados no stand. Cada anúncio apresenta algumas informações básicas sobre o anúncio em questão, sendo estas:

- Marca do automóvel (1)
- Modelo do automóvel (2)
- Imagem/fotografia do automóvel (3)

Cada anúncio disponível na página principal inclui um botão (4) que (caso seja premido) o redirecionará para o anúncio em questão, disponibilizando assim mais informações sobre o veículo.

![Esquema de funcionalidades dos anúncios da página principal com os pontos 1,2,3 e 4 mencionados no texto"](./assets/prints/pp1)

Caso o utilizador procure algo em particular é possível utilizar o menu de pesquisa (5) presente na mesma página, possibilitando assim filtrar os veículos (6) por:

- Marca
- Modelo
- Ano
- Combustível
- Estado
- Cor

Caso existam veículos correspondentes, a página irá listar todos os veículos correspondentes com a pesquisa (7).
![Esquema operacional do menu de pesquisa presente na página principal com os pontos 5,6 e 7 mencionados no texto](./assets/prints/pp2)

### 2. **Detalhes do Veículo**

Esta página apresenta a versão detalhada do anúncio que o utilizador selecionou para visualização. Esta página inclui os detalhes do anúncio presentes na página inicial:

- Marca do automóvel (8)
- Modelo do automóvel (8)
- Imagem/fotografia, de maior dimensão quando comparada com a apresentada na página principal, estando contudo dependente da resolução do dispositivo do utilizador (9)

Encontram-se também disponíveis mais informações sobre o veículo do anúncio, informações estas anteriormente não visíveis para o utilizador:

- Especificações do veículo, tais como o combustível ou estado (10). Todas estas especificações, à exceção dos quilómetros, podem ser utilizadas no menu de pesquisa (5) anteriormente mencionado.
- Informações importantes como o preço e os dados do anunciante encontram-se com realçados (11)
- Uma descrição (12), redigida pelo anunciante, permitindo partilhar algo que considere pertinente, ou simplesmente adicionar mais informações sobre o veículo que não se encontrem sobre a alçada dos anteriores pontos

![Esquema de informação de "Detalhes do Veículo", com os pontos 8,9,10,11 e 12 mencionados no texto](./assets/prints/dv1)

### 3. **Criação de anúncio**

A plataforma permite que os utilizadores criem os seus próprios anúncios através do preenchimento dum formulário com os seguintes pontos:

- Marca e modelo do automóvel (13), inseridos manualmente, através do teclado, o mesmo se aplica a outros campos, como os presentes nos pontos (15), (17), (19), (20) e (21)
- Combustível (14), Mês (16) e Estado (18), com várias opções para selecionar
- Alguns campos têm controlo dos dados inseridos, tal é o caso do "Ano" (15), com valores mínimos e máximos
- A descrição (19) permite ao anunciante adicionar informações adicionais que considere pertinentes
- O campo (20) permite ao utilizador adicionar uma imagem, colocando um link da mesma
- Os campos presentes no ponto (21) permitem que o anunciante seja contactado por possíveis interessados, tendo estes campos também validação

É importante realçar que o preenchimento dos diversos campos do formulário é de carácter obrigatório, e que o não preenchimento de qualquer um dos campos presentes no mesmo resultará na falha da criação do anúncio, juntamente com uma mensagem a realçar o primeiro campo de carácter obrigátorio não preenchido

![Esquema operacional para a criação de anúncios, com os pontos 13,15,17,19,20 e 21 mencionados no texto](./assets/prints/ca1)
![Esquema operacional para a criação de anúncios, com o ponto 14 mencionado no texto](./assets/prints/ca2)
![Esquema operacional para a criação de anúncios, com o ponto 16 mencionado no texto](./assets/prints/ca3)
![Esquema operacional para a criação de anúncios, com o ponto 18 mencionado no texto](./assets/prints/ca4)

Caso o formulário tenha sido corretamente preenchido, irá ser apresentada uma mensagem de sucesso (22)

![Imagem ilustrativa da mensagem de sucesso, com o ponto 22 mencionado no texto](./assets/prints/ca5)

## 🖥️ **Arquitetura Tecnológica**

O projeto utiliza uma stack tecnológica moderna, conforme descrito abaixo:

- **Frontend:** Construído com HTML, CSS e JavaScript para oferecer uma interface responsiva e amigável ao utilizador.

## 📁 **Estrutura do Projeto**

A organização dos arquivos do projeto segue a seguinte disposição:

```
Stand_Altamente/
|-- assets/
|   |-- automoveis/
|   |-- prints/
|   |-- logo.jpg
|   |-- menu-aberto(1).png
|   |-- showroom.jpg
|
|-- automoveis.js
|-- criarAnuncio.html
|-- criarVeiculo.js
|-- detalhesVeiculo.html
|-- index.html
|-- README.md
|-- script.js
|-- style.css
|
```

## 📈 **Evolução e Melhorias Futuras (Roadmap)**

Tendo em consideração a contínua evolução da plataforma, têm-se como próximos objetivos os seguintes aspetos :

- Implementação de um sistema de registo dos utilizadores, desbloqueando novas funcionalidades na plataforma
- Permitir aos utilizadores registados editarem ou excluírem os anúncios criados pelos próprios
- Criação de uma página de pesquisa dedicada, permitindo aos utilizadores utilizarem vários filtros em simultâneo, permitindo assim uma pesquisa mais eficiente
- Otimização da interface para garantir total responsividade em dispositivos móveis

🚀 **Desenvolvido por [ Diogo Mata | Diogo Consciência | Miguel Cruz ]**
