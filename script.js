//Este ficheiro negloba desde a criacao de veiculo de forma a que o utilizador possa visualizalos, pesquisa e todas as outras funcionalidades de maior importancia

// Função é responsável por criar e apresentar todos os carros na página principal do site.
let areaStand = document.querySelector(".grid"); // Variavel que representa a area onde são mostrados os veiculos
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

const criarAutomoveis = () => {
    
    const automoveisLocal = getFromLocalStorage("veiculos");     // Recuperação dos Veículos: Obtém os veículos armazenados no localStorage, converte de JSON para um array de objetos. Se não existirem veículos armazenados, utiliza um array vazio.
    const totalAutomoveis = automoveis.concat(automoveisLocal); // Recuperação dos Veículos: Combina os veículos pré-definidos com os armazenados localmente.

    totalAutomoveis.forEach((element, index) => { // Criação e Exibição dos Veículos: O método forEach executa uma função para cada veículo no array totalAutomoveis, chama a função criarAutomovel para cada um.
        let automovel = criarAutomovel(element, index);
        areaStand.append(automovel); // Adiciona cada elemento de veículo criado à secção areaStand na página.
    });
}

//Funcao responsavel por pegar todos os veiculos que estão nos favoritos
const criarFavoritos = () =>{
    let favoritos = getFromLocalStorage("coracao");

    const automoveisLocal = getFromLocalStorage("veiculos");
    const totalAutomoveis = automoveis.concat(automoveisLocal);

    //Valida se existem veiculos adicionados aos favoritos ou não
    if(!favoritos || favoritos.length === 0){
        let descricao = document.createElement("h3");
        descricao.innerText = "Ainda não tem veiculos favoritos";

        areaStand.append(descricao);
    }
    else{
        favoritos.forEach((element) =>{

            totalAutomoveis.forEach((e,i) =>{
                if(element == e.id){
                    let automovel = criarAutomovel(e, i);
                    areaStand.append(automovel);
                }
            });
        });
    }
}

// Cria individualmente um elemento HTML para cada veículo, organizando e apresentando suas informações de maneira estruturada.
const criarAutomovel = (element) => { // Criação da Estrutura Principal
    let area = document.createElement("div");   // Cria um novo elemento div servir como o cartão do veículo.
    area.classList.add("card"); // Adiciona a classe 'card' ao elemento div aplicar estilos CSS.
    area.id = element.id;   // Define um identificador único para o cartão, baseado no ID do veículo.

    let imagem = document.createElement("img");     // Criado um elemento img para exibir a foto do veículo.
    imagem.src = element.foto;    // Define o atributo src da imagem com a a fonte da imagem do veículo
    imagem.alt = "Imagem do automóvel";        // Define o atributo alt da imagem com um texto alternativo para acessibilidade.
    imagem.loading = "lazy";  // Otimiza o carregamento das imagens de forma a que o site não pareça lento

    let areaDados = document.createElement("div");
    areaDados.classList.add("areaDados");

    let title = document.createElement("h3");   // Cria um elemento "h3" para o título
    title.textContent = `${element.marca} ${element.modelo}`;  // Define o texto com a marca e o modelo do veículo

    let preco = document.createElement("h3"); // Cria preço do veículo
    preco.textContent = `${element.preco}€`; // Define o texto com o preço do veículo

    areaDados.append(title, preco);


    let botao = document.createElement("button"); // Cria um botão para aceder a mais detalhes.
    botao.textContent = "Ver Detalhes"; // Define o texto do botão
    botao.id = element.id;  // Define o ID do botão com o ID do veículo  facilitando a identificação ao selecionar
    botao.classList.add("botao-detalhe");   // Adiciona a classe 'botao-detalhe' ao botão para estilização
    botao.addEventListener("click", (event) => verDetalhes(event)); // Adiciona um listener de evento ao botão para redirecionar para a página de detalhes do veículo
    
    area.append(imagem, areaDados, botao); //Salva os dados dentro da variavel
    
    return area; // Retorna o elemento div criado com a imagem, o título e o botão
}

/*
Montagem do Cartão:

Os elementos de imagem, título e botão são anexados ao div principal.
A função retorna o elemento "area", que representa o cartão completo do veículo.
*/



//Envia para a pagina dos detalhes do veiculo
const verDetalhes = (event) => {
    const id = event.target.id; //Obtém o ID do veículo a partir do elemento que criou o evento (no caso, o botão).
    window.location.href = `./detalhesVeiculo.html?modelo=${id}`; //Redireciona o browser para a página detalhesVeiculo.html, anexando o ID do veículo como um parâmetro de consulta na URL, o que permite identificar qual dos veículos deve ser apresentado.
}


const criarDetalhesAutomovel = () => { // Cria os detalhes do veículo na página de detalhes, apresentado as informações do veículo selecionado
    //Obter o id do veículo a partir da URL
    let url = window.location.href; // Obtém a URL da página
    let urlParameters = new URL(url); // Cria um novo objeto URL com a URL da página
    let modelo = urlParameters.searchParams.get("modelo"); // Obtém o parâmetro 'modelo' da URL
    //Recuperação dos Veículos:
    const automoveisLocal = getFromLocalStorage("veiculos"); // Pesquisa dos Veículos do Local Storage, caso nao existam devolve um array vazio
    const totalAutomoveis = automoveis.concat(automoveisLocal); // Combina os arrays de veículos pré-definidos e armazenados localmente caso existam

    // Procura no array totalAutomoveis um objeto cujo id corresponda ao valor do modelo obtido do URL.
    let automovel = totalAutomoveis.find(auto => auto.id == modelo);

    let favoritos = getFromLocalStorage("coracao");

    // Verifica se o veículo foi encontrado, se nao for, apresenta uma mensagem de erro e redireciona para a página inicial
    if (!automovel) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Veículo não encontrado!",
            allowOutsideClick: false,
            timer: 1800
        }).then(() => {
            window.location.href = "./index.html"; // Redireciona para a página inicial
        });
        return; // Encerra a execução caso o veículo não seja encontrado
    }

    // Atualiza os elementos com informações do veículo
    if(favoritos.includes(modelo))
        document.getElementById("coracao").src = "assets/icons/coracao-vermelho.png";
    else
        document.getElementById("coracao").src = "assets/icons/coracao-preto.png";
    document.querySelector("title").textContent = `${automovel.marca} ${automovel.modelo}` // Seleciona o elemento title e define o texto com a marca, modelo e ano do veículo
    document.getElementById("imagem-do-carro").src = automovel.foto; // Seleciona o elemento img com o ID 'imagem-do-carro' e define o atributo src com a fonte da imagem do veículo
    document.getElementById("modelo").innerText = `${automovel.marca} ${automovel.modelo}`; // Seleciona o elemento com o ID 'modelo' e define o texto com a marca e modelo do veículo
    document.getElementById("estado").innerHTML = `${automovel.estado}`;   // Características do veículo
    document.getElementById("data").innerHTML = `${automovel.mes} ${automovel.ano}`
    document.getElementById("quilometros").innerText = `${automovel.quilometros} km`;
    document.getElementById("cor").innerText = `${automovel.cor}`;
    document.getElementById("combostivel").innerText = `${automovel.combustivel}`;
    document.getElementById("preco").innerText = `${automovel.preco} €`;    // Preço do automóvel
    document.getElementById("telefone").innerText = `${automovel.telefone}`; // Número de contato do vendedor
    document.querySelector(".botao-detalhe").value = automovel.id; 

    mostrarDescricao(automovel.descricao); // Chama a função mostrarDescricao para exibir a descrição do veículo na página
}
    
function mostrarDescricao(descricao) { // Formatação e exibição da descrição de um veículo na página de detalhes
    const descricaoDiv = document.getElementById("descricao"); 
    /* Seleciona o elemento HTML onde a descrição formatada será inserida. 
    document.getElementById("descricao") para encontrar o elemento <div> que tem o atributo id="descricao". 
    Seção onde o conteudo será adicionado.
    */
    descricaoDiv.innerHTML = ''; // Limpa qualquer conteúdo existente, para que nao haja duplicados

    const frases = descricao.split('. '); // Divide a descrição completa em frases separadas por um ponto e um espaço ('. ') por uma questao de formatação
    frases.forEach(frase => { // Para cada frase na descrição
        if (frase.trim() && !frase.trim().endsWith('.')) { // Remove espaços em branco do início e fim da frase e verifica se a frase termina com um ponto
            frase += '.'; // Se a frase não terminar com um ponto, adiciona no fim
        }
        const paragrafo = document.createElement("p"); // Cria um novo parágrafo para cada frase
        paragrafo.textContent = frase; // Define o texto do parágrafo com a frase atual
        descricaoDiv.appendChild(paragrafo); // Anexa o parágrafo criado ao div 'descricao'
    });
}

const pesquisa = () => { // Define a função pesquisa. Esta função é chamada quando o utilizador clica no botão de pesquisa ou enter e permite pesquisar veículos disponíveis no site com base em vários critérios, como modelo, marca, combustível, estado e ano. 
        const campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase(); // Converte todo o texto inserido para letras minúsculas, garantindo que a pesquisa não seja sensível a maiúsculas e minúsculas. O resultado é armazenado na constante "campoPesquisa" para ser usado posteriormente na função.
        let areaStand = document.querySelector(".grid"); // Encontra o elemento com a classe 'grid' na página HTML
        areaStand.innerHTML = ''; // Mudar de null para string vazia para limpar o conteúdo e evitar duplicados
    
        // Obtém veículos do Local Storage
        const automoveisLocal = getFromLocalStorage("veiculos"); // Acessde ao localStorage e tenta obter o item com a chave "veiculos". Converte a string JSON em localStorage de volta para um objeto JavaScript. Se não houver veículos armazenados, então automoveisLocal será definido como um array vazio
        const totalAutomoveis = automoveis.concat(automoveisLocal); // Combina automóveis de duas fontes num único array, de local storage e dos veículos pré-definidos
        
        totalAutomoveis.forEach((automovel, index) => { // Verifica cada veículo
            if (automovel.modelo.toLowerCase().includes(campoPesquisa) || automovel.marca.toLowerCase().includes(campoPesquisa) || automovel.combustivel.toLowerCase().includes(campoPesquisa) || automovel.estado.toLowerCase().includes(campoPesquisa) || automovel.ano.toString().includes(campoPesquisa) || automovel.cor.toLowerCase().includes(campoPesquisa)){
            // Converte o valor de automovel.modelo para minusculas e verifica se o nome, marca, combustivel, estado ou ano do veículo contêm o texto pesquisado
                let automovelElement = criarAutomovel(automovel, index); // Declara uma variável chamada automovelElement que armazenará o elemento HTML que representa o veículo criado pela função criarAutomovel. Chama a função criarAutomovel, passando dois argumentos: automovel (contém todos os detalhes) e o índice do veículo no array totalAutomoveis.
                areaStand.append(automovelElement); // Adiciona o elemento automovelElement à área de stand na página. automovelElement é adicionado como filho do elemento areaStand. O browser renderiza o novo conteúdo e o veículo é exibido na página.
                
            }
        });
    
        if (areaStand.children.length === 0) { // Se não houver veículos correspondentes a funcao criarAutomoveis é chamada para exibir todos os veículos
            criarAutomoveis();
        }
    }

//Esta funcao copia o numero de telefone do vendedor
const copiarNumero = () =>{
    const valor = document.getElementById("telefone").innerText;

    // Cria um elemento de texto temporário
    const tempInput = document.createElement("input");
    tempInput.value = valor;
    document.body.appendChild(tempInput);

    // Seleciona o texto e copia para a área de transferência
    tempInput.select();
    document.execCommand("copy");

    // Remove o elemento temporário
    document.body.removeChild(tempInput);
}

document.addEventListener("DOMContentLoaded", () => { // Adiciona um listener de evento para executar o código quando o conteúdo da página for totalmente carregado
    const caminho = window.location.pathname;   // Obtém o caminho da página atual
    const noePaginam = caminho.substring(caminho.lastIndexOf('/') + 1);     // Obtém o nome da página atual
    if (noePaginam === "index.html") {
        criarAutomoveis(); // Se a página atual for index.html, chama a função criarAutomoveis
    } else if (noePaginam === "detalhesVeiculo.html") {
        document.getElementById("imagem-do-carro").loading = "lazy";
        criarDetalhesAutomovel(); // Se a página atual for detalhesVeiculo.html, chama a função criarDetalhesAutomovel

        //Função que redireciona para a pagina de contactarVendedor
        document.querySelector(".botao-detalhe").addEventListener("click", function(){
            const idVeiculo = document.querySelector(".botao-detalhe").value
            window.location.href = `./contactarVendedor.html?modelo=${idVeiculo}`;
        });
    }
    else if(noePaginam === "favoritos.html"){
        criarFavoritos();
    }

    //Abre e fecha o menu
    const toggleButton = document.getElementById('menu-bar');
    const menu = document.getElementById('menu');

    // Abrie e fecha o menu ao clicar no botão
    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open-menu');
    });

    // Fechar o menu ao clicar fora
    document.addEventListener('click', () => {
        menu.classList.remove('open-menu');
    });

    // Evitar que cliques dentro do menu fechem o menu
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Adicionar listener de tecla enter para o campo de pesquisa
    document.getElementById('campo-pesquisa').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pesquisa();
        }
    });
});

document.getElementById("coracao").addEventListener("click", function () {
    let url = window.location.href; // Obtém a URL da página
    let urlParameters = new URL(url); // Cria um novo objeto URL com a URL da página
    let modelo = urlParameters.searchParams.get("modelo"); // Obtém o parâmetro 'modelo' da URL
    let favoritos = getFromLocalStorage("coracao"); // Recupera favoritos ou inicializa vazio

    // Caso este veículo já esteja nos favoritos
    if (favoritos.includes(modelo)) {
        document.getElementById("coracao").src = "assets/icons/coracao-preto.png";

        // Remove o modelo dos favoritos
        favoritos = favoritos.filter(item => item !== modelo);
    } else {
        // Caso este veículo não esteja nos favoritos
        document.getElementById("coracao").src = "assets/icons/coracao-vermelho.png";

        // Adiciona o modelo aos favoritos
        favoritos.push(modelo);
    }
    // Atualiza o localStorage com o array atualizado
    localStorage.setItem("coracao", JSON.stringify(favoritos));
});
