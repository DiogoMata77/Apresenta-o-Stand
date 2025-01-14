document.querySelector(".enviar-email").addEventListener("click",function(){
    let url = window.location.href;
    let urlParameters = new URL(url);
    let modelo = urlParameters.searchParams.get("modelo");

    const automoveisLocal = JSON.parse(localStorage.getItem("veiculos")) || []; 
    const totalAutomoveis = automoveis.concat(automoveisLocal); 

    let automovel = totalAutomoveis.find(auto => auto.id == modelo);
    
    (function(){
        emailjs.init("_Kolb58zRvGNlxoCX");
    })();

    var params = {
        sendername: document.getElementById("nome").value,
        to: `${automovel.email}`,
        subject: "NOVO INTERESSADO 🎉",
        replyto: document.getElementById("email").value,
        message: document.getElementById("conteudoEmail").value,
    };

    var serviceId = "service_08eofs4";
    var templateId= "template_md3lj28";

    emailjs.send(serviceId,templateId,params).then( res =>{
        Swal.fire({
            title: "Sucesso",
            text: "Email enviado com sucesso!",
            icon: "success"
        })
    })
    .catch();
});

