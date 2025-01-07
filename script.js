//Gere a exibição e criacao de veículos, pesquisa, detalhe dos veículos selecionados e navegação interativa

// Cria todos os carros e insere na página
const criarAutomoveis = () => {
    let areaStand = document.querySelector(".grid"); // Encontra o elemento com a classe 'grid' na página HTML
    const automoveisLocal = JSON.parse(localStorage.getItem("veiculos")) || [];     // Obtém veículos do Local Storage
    const totalAutomoveis = automoveis.concat(automoveisLocal); // Combina automóveis das duas fontes

    totalAutomoveis.forEach((element, index) => { // Itera sobre cada veículo para criar e exibir na página
        let automovel = criarAutomovel(element, index); // Cria um elemento HTML para o veículo
        areaStand.append(automovel); // Adiciona o elemento HTML ao div 'grid'
    });
}

// Cria todas as caracteristicas de um veiculo
const criarAutomovel = (element) => { // Cria um elemento HTML para um veículo
    let area = document.createElement("div");   // Cria um novo elemento div
    area.classList.add("card"); // Adiciona a classe 'card' ao elemento div
    area.id = element.id;   // Define o ID do elemento div com o ID do veículo

    let imagem = document.createElement("img");     // Cria um novo elemento img
    imagem.src = element.foto;// Define o atributo src da imagem com a foto do veículo        
    imagem.alt = "Imagem do automóvel";        // Define o atributo alt da imagem com um texto alternativo
    imagem.loading = "lazy";  // Carrega as imagens de uma forma a que o site não pareça tão lento

    let title = document.createElement("h3");   // Cria um titulo
    title.textContent = `${element.marca} ${element.modelo}`;  // Define o texto com a marca e o modelo do veículo

    let botao = document.createElement("button"); // Cria um novo elemento botao
    botao.textContent = "Ver Detalhes"; // Define o texto do botão
    botao.id = element.id;  // Define o ID do botão com o ID do veículo
    botao.classList.add("botao-detalhe");   // Adiciona a classe 'botao-detalhe' ao botão para estilização
    botao.addEventListener("click", (event) => verDetalhes(event)); // Adiciona um listener de evento ao botão para redirecionar para a página de detalhes do veículo

    area.appendChild(imagem);  // Anexa a imagem 
    area.appendChild(title);  // Anexa o título 
    area.appendChild(botao); // Anexa o botão
    return area; // Retorna o elemento div criado com a imagem, o título e o botão
}
//Envia para a pagina dos detalhes do veiculo
const verDetalhes = (event) => {
    const id = event.target.id;
    window.location.href = `./detalhesVeiculo.html?modelo=${id}`;
}


const criarDetalhesAutomovel = () => { // Cria os detalhes do veículo na página de detalhes
    
    let url = window.location.href; // Obtém a URL da página
    let urlParameters = new URL(url); // Cria um novo objeto URL com a URL da página
    let modelo = urlParameters.searchParams.get("modelo"); // Obtém o parâmetro 'modelo' da URL

    const automoveisLocal = JSON.parse(localStorage.getItem("veiculos")) || []; // Veículos do Local Storage
    const totalAutomoveis = automoveis.concat(automoveisLocal); // Combina os arrays

    // Busca o veículo com o ID correspondente ao parâmetro 'modelo'
    let automovel = totalAutomoveis.find(auto => auto.id == modelo);

    // Verifica se o veículo foi encontrado
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
    document.querySelector("title").textContent = `${automovel.marca} ${automovel.modelo} ${automovel.ano}` // Coloca a marca e modelo do veículo no título
    document.getElementById("imagem-do-carro").src = automovel.foto; // Imagem do veículo
    document.getElementById("modelo").innerText = `${automovel.marca} ${automovel.modelo}`; // Marca e modelo do veículo 
    document.getElementById("caracteristicas-cados").innerHTML = `
     ${automovel.combustivel} - ${automovel.estado} - ${automovel.mes} - ${automovel.ano} - ${automovel.cor} - ${automovel.quilometros} km`;   // Características do veículo
    document.getElementById("preco").innerText = `${automovel.preco} €`;    // Preço do automóvel
    document.getElementById("telefone").innerText = `Telefone: ${automovel.telefone}`; // Número de contato do vendedor
    document.getElementById("email").innerText = `Email: ${automovel.email}`; // Email do vendedor

    // Atualiza a descrição formatada em vários parágrafos
    mostrarDescricao(automovel.descricao);
}
    
function mostrarDescricao(descricao) { // Transforma descrição em parágrafos formatados
    const descricaoDiv = document.getElementById("descricao"); // Encontra o elemento div com o ID 'descricao' na página HTML
    descricaoDiv.innerHTML = ''; // Limpa qualquer conteúdo existente

    const frases = descricao.split('. '); // Divide a descrição completa em frases separadas por um ponto e um espaço ('. ')
    frases.forEach(frase => {
        if (frase.trim() && !frase.trim().endsWith('.')) {        // Remove espaços em branco do início e fim da frase e verifica se a frase termina com um ponto
            frase += '.'; // Se a frase não terminar com um ponto, adiciona no fim
        }
        const paragrafo = document.createElement("p"); // Cria um novo parágrafo para cada frase
        paragrafo.textContent = frase; // Define o texto do parágrafo com a frase atual
        descricaoDiv.appendChild(paragrafo); // Anexa o parágrafo criado ao div 'descricao'
    });
}

const pesquisa = () => { // Define a função pesquisa. Esta função é chamada quando o utilizador clica no botão de pesquisa
        const campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase(); //Convertendo o valor do campo de pesquisa para minúsculas, para que a pesquisa não seja sensível a maiúsculas e minúsculas
        let areaStand = document.querySelector(".grid"); // Encontra o elemento com a classe 'grid' na página HTML
        areaStand.innerHTML = ''; // Mudar de null para string vazia para limpar o conteúdo e evitar duplicados
    
        // Obtém veículos do Local Storage
        const automoveisLocal = JSON.parse(localStorage.getItem("veiculos")) || []; // Se não houver veículos no Local Storage, retorna um array vazio
        const totalAutomoveis = automoveis.concat(automoveisLocal); // Combina automóveis de duas fontes
        
        totalAutomoveis.forEach((automovel, index) => { // Verifica cada veículo
            if (automovel.modelo.toLowerCase().includes(campoPesquisa) || automovel.marca.toLowerCase().includes(campoPesquisa) || automovel.combustivel.toLowerCase().includes(campoPesquisa) || automovel.estado.toLowerCase().includes(campoPesquisa) || automovel.ano.toString().includes(campoPesquisa)){ // Verifica se o nome ou a marca do veículo contêm o texto pesquisado
                let automovelElement = criarAutomovel(automovel, index); 
                areaStand.append(automovelElement);
            }
        });
    
        if (areaStand.children.length === 0) {
            criarAutomoveis();
        }
    }

document.addEventListener("DOMContentLoaded", () => { // Adiciona um listener de evento para executar o código quando o conteúdo da página for totalmente carregado
    const caminho = window.location.pathname;   // Obtém o caminho da página atual
    const noePaginam = caminho.substring(caminho.lastIndexOf('/') + 1);     // Obtém o nome da página atual
    if (noePaginam === "index.html") {
        criarAutomoveis(); // Se a página atual for index.html, chama a função criarAutomoveis
    } else if (noePaginam === "detalhesVeiculo.html") {
        criarDetalhesAutomovel(); // Se a página atual for detalhesVeiculo.html, chama a função criarDetalhesAutomovel
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