//Manipulação do formulário de criação de veículos para que exista a possibilidade de adicionar novos veículos ao Local Storage
document.getElementById("form-anuncio").addEventListener("submit", function(event) { //Listener para quando o formulário for submetido
    event.preventDefault(); // Previne o comportamento padrão do formulário para ser possível manipular os dados antes de serem enviadose interagir com o Local Storage
    let maiorId = 0;
    const veiculos = JSON.parse(localStorage.getItem("veiculos")) || []; // Se não houver veículos no Local Storage, retorna um array vazio
    
    // Recupera o array de veículos do localStorage. Se o array estiver vazio, utiliza um array de backup chamado automoveis.
    // Uso de reduce para identificar o maior id existente entre os veículos, garantindo que cada veículo tenha um identificador único.
    if(veiculos.length > 0){
        // Encontra o maior id existente entre os veículos no Local Storage
        maiorId = veiculos.reduce((max, carro) => (carro.id > max ? carro.id : max), 0);
    }
    else{ // Se não houver veículos no Local Storage, retorna um array vazio
        maiorId = automoveis.reduce((max, carro) => (carro.id > max ? carro.id : max), 0);
    }
    // Cria um novo automovel com um ID superior ao existente
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
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;
    const mes = document.getElementById("mes").value;
    const quilometros = document.getElementById("quilometros").value;
    const cor = document.getElementById("cor").value;
    const preco = document.getElementById("preco").value;
    const estado = document.getElementById("estado").value;
    const descricao = document.getElementById("descricao").value;
    const telefone = document.getElementById("telefone").value;
    const imagem = document.getElementById("imagem").value;
    const email = document.getElementById("email").value;
    const combustivel = document.getElementById("combustivel").value;

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

    //Pega e converte em json o que já existe no local storage
    const veiculosInseridos = JSON.parse(localStorage.getItem("veiculos")) || [];
    veiculosInseridos.push(veiculo);
    localStorage.setItem("veiculos", JSON.stringify(veiculosInseridos));
};

//Gestão dos anúncios com armazenamento local, onde o browser guarda os dados do anúncio

// Função para limpar os campos do formulário
const clearFields = () => {
    const formFields = document.querySelectorAll("#form-anuncio input, #form-anuncio textarea, #form-anuncio select");
    formFields.forEach(field => {
        if (
            field.type === "text" || 
            field.type === "number" || 
            field.type === "file" || 
            field.type === "email" || 
            field.type === "tel"
        ) {
            field.value = "";
        } else if (field.tagName.toLowerCase() === "textarea") {
            field.value = "";
        } else if (field.type === "select-one") {
            field.selectedIndex = 0;
        }
    });
};