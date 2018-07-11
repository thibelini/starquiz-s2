$(document).ready(function(){
    $(".modal-regras").click(function() {
        var texto = "<p><span class='badge badge-primary badge-pill'>01</span>";
            texto += "<span style='padding-left: 5px;'> Ao Clicar no Botão JOGAR, voce terá 2 minutos para acertar o maior número de personagens do Star Wars;</span></p>"; 
            texto += "<p><span class='badge badge-primary badge-pill'>02</span>";
            texto += "<span style='padding-left: 5px;'> Digite o Nome do Personagem no campo correspondente ? para validar se esta correto;</span></p>";   
            texto += "<p><span class='badge badge-primary badge-pill'>03</span>";
            texto += "<span style='padding-left: 5px;'> Voce poderá clicar em ... para ter mais informações sobre o personagem correspondente;</span></p>"; 
            texto += "<span style='padding-left: 5px;'>Acerto sem ajuda = 10 pontos.</span></p>";  
            texto += "<span style='padding-left: 5px;'>Acerto com ajuda = 5 pontos.</span></p>";   
        $('#exampleModalLabel').html('Regras do Jogo - StarQuiz!');
        $('#exampleModalBody').html(texto);
        abreModal();
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('#botaoParar').hide();
});
