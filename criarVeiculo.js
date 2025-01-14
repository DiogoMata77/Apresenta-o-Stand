//Manipulação do formulário de criação de veículos para que exista a possibilidade de adicionar novos veículos ao Local Storage

document.getElementById("form-anuncio").addEventListener("submit", function(event) { // Seleciona o elemento do formulário na página, que possui o atributo id="form-anuncio" e adiciona um evento de submissão ao formulário
    event.preventDefault(); // Previne o comportamento padrão do formulário para ser possível manipular os dados antes de serem enviadose interagir com o Local Storage
    let maiorId = 0; // Declara uma variável maiorId com valor inicial 0. Essa variável será usada para determinar o maior identificador (id) existente entre os veículos já armazenados.
    const veiculos = JSON.parse(localStorage.getItem("veiculos")) || []; // Tenta recuperar do localStorage o item com a chave "veiculos". Se existir devolve uma string contendo os dados armazenados. Se não existir, retorna null.Se não houver veículos no Local Storage, retorna um array vazio
    
    if(veiculos.length > 0){
        // Encontra o maior id existente entre os veículos no Local Storage
        maiorId = veiculos.reduce((max, carro) => (carro.id > max ? carro.id : max), 0);
    }
    else{ // Se não houver veículos no Local Storage, retorna um array vazio
        maiorId = automoveis.reduce((max, carro) => (carro.id > max ? carro.id : max), 0);
    }
    // Cria um novo automovel com um ID superior ao existente para que não haja duplicado de IDs
    criarVeiculo(maiorId + 1);

    // Apresenta mensagem de veiculo inserido com sucesso com SweetAlert2.
    Swal.fire({
        title: "Sucesso",
        text: "Veiculo inserido com sucesso!",
        icon: "success"
    }).then(() => {
        clearFields(); // Limpa os campos do formulário
        });
});

// Puxa os dados que foram inseridos no formulário.
const criarVeiculo = (id) =>{
    const marca = document.getElementById("marca").value; // Seleciona o valor do campo de texto com o id "marca" e armazena na variável marca
    const modelo = document.getElementById("modelo").value; // Seleciona o valor do campo de texto com o id "modelo" e armazena na variável modelo
    const ano = document.getElementById("ano").value; //Seleciona o valor do campo de texto com o id "ano" e armazena na variável ano
    const mes = document.getElementById("mes").value; //Seleciona o valor do campo de texto com o id "mes" e armazena na variável mes
    const quilometros = document.getElementById("quilometros").value; // Seleciona o valor do campo de texto com o id "quilometros" e armazena na variável quilometros
    const cor = document.getElementById("cor").value; // Seleciona o valor do campo de texto com o id "cor" e armazena na variável cor
    const preco = document.getElementById("preco").value; // Seleciona o valor do campo de texto com o id "preco" e armazena na variável preco
    const estado = document.getElementById("estado").value; // Seleciona o valor do campo de texto com o id "estado" e armazena na variável estado
    const descricao = document.getElementById("descricao").value; // Seleciona o valor do campo de texto com o id "descricao" e armazena na variável descricao
    const telefone = document.getElementById("telefone").value; // Seleciona o valor do campo de texto com o id "telefone" e armazena na variável telefone
    const imagem = document.getElementById("imagem").value; // Seleciona o valor do campo de texto com o id "imagem" e armazena na variável imagem
    const email = document.getElementById("email").value; // Seleciona o valor do campo de texto com o id "email" e armazena na variável email
    const combustivel = document.getElementById("combustivel").value; // Seleciona o valor do campo de texto com o id "combustivel" e armazena na variável combustivel

    // Cria um objeto veículo com os dados que foram inseridos no formulário.
    const veiculo = {
        id: id,
        marca: marca,
        modelo: modelo,
        ano: ano,
        mes: mes,
        quilometros: quilometros,
        cor: cor,
        preco: preco,
        estado: estado,
        descricao: descricao,
        telefone: telefone,
        foto: imagem,
        email: email,
        combustivel: combustivel
    };
    /*Constrói um objeto que representa o veículo, incluindo todas as informações recolhidas do formulário.
Inclui um objeto seo para armazenar informações de SEO, como descrição e palavras-chave.*/

    //Recuperar a lista de veículos já inseridos no localStorage e convertê-la em objeto que possa ser manipulado. 
    //Se não houver nenhum veículo armazenado ainda, inicializa um array vazio para começar a armazenar os veículos.
    const veiculosInseridos = JSON.parse(localStorage.getItem("veiculos")) || [];
    veiculosInseridos.push(veiculo); //Adicionar o novo veículo ao array de veículos já existentes.
    localStorage.setItem("veiculos", JSON.stringify(veiculosInseridos)); //Armazenar o array atualizado de veículos no localStorage, após convertê-lo em string JSON.
};

    //Gestão dos anúncios com armazenamento local, onde o browser guarda os dados do anúncio

    // Função para limpar os campos do formulário
    const clearFields = () => {
        const formFields = document.querySelectorAll("#form-anuncio input, #form-anuncio textarea, #form-anuncio select"); // Seleciona todos os campos de texto, áreas de texto e seleções dentro do formulário com o id "form-anuncio" para limpar os valores
        formFields.forEach(field => { // Percorre todos os campos selecionados e limpa os valores de acordo com o tipo de campo
            if (
                field.type === "text" || 
                field.type === "number" || 
                field.type === "file" || 
                field.type === "email" || 
                field.type === "tel"
            ) {
                field.value = ""; // Limpa o valor dos campos de texto, número, ficheiro, email e telefone
            } else if (field.tagName.toLowerCase() === "textarea") { // Se o campo for uma área de texto 
                field.value = ""; // Limpa o valor da área de texto
            } else if (field.type === "select-one") { // Se o campo for uma seleção
                field.selectedIndex = 0; // Limpa a seleção do campo
            }
        });
    };