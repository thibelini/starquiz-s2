var retornoAPI;
var totalRegistros = 0;
var totalPaginas = 0;
var paginaAtual = 0;


$('.acionapaginas').click(function(){
    var pagina = $(this).attr('mod');
});

$('.page-link').click(function(){
    var pagina = $(this).attr('data-page');
});

function abreModal(){
    $('#myModal').modal('show');
}

function esconderDivPrincipal(){
    $('#div-principal').hide();
}

function mostrarDivPrincipal(){
    $('#div-principal').show();
}

function mudaPagina(pagina, obj){
    var texto = '';
    //altera atributos da pagina anterior
    $('#li'+paginaAtual).html("<a class='page-link' onclick='mudaPagina("+ paginaAtual +", this);'>"+ paginaAtual +"</a>");
    $('#li'+paginaAtual).removeAttr("active");

    //altera atributos da pagina anterior
    $('#li'+pagina).html("<span class='page-link'>"+ pagina +"<span class='sr-only'>(current)</span></span>");
    $('#li'+pagina).attr("active");
    paginaAtual = pagina;

    $.ajax({
        type: "GET", 
        url: 'https://swapi.co/api/people/?page='+ pagina,
        datatype: 'JSON',
        contentType: "application/json; charset=utf-8",
        cache: false,
        beforeSend: function() {
            $("#div-carregar").html("Carregando...<img src='images/loading.gif' height='36' width='64'>");
        },
        error: function() {
            alert("O servidor não conseguiu processar o pedido");
            return '';
        },
        success: function(retorno) {
            retornoAPI = retorno;
            if (typeof(retorno.results) != "undefined"){
                qtdeReg = retorno.results.length;
                if (qtdeReg > 0){
                    //alert(retornoAPI.results.length);
                    for (i = 0; i < qtdeReg; i++){

                        var word=/ /g; // Letra à trocar: entre as barras
                        var str = retornoAPI.results[i].name;
                        var replacestr = str.replace(word,"_"); // Letra substituta: entre as aspas
                        var nomePerson = replacestr;

                        var pathNome =  window.location.pathname.replace('index.html','');

                        //alert(retornoAPI.results[i].name)
                        texto += "<div class='col-lg-3 col-md-4 col-sm-6 portfolio-item'>";
                        texto += "<div class='card h-100'>";
                        texto += "<a href='#'><img class='card-img-top' height='180' src='images/"+ nomePerson +".jpg' alt=''></a>";
                        //texto += "<a href='#'><img class='card-img-top' src='http://placehold.it/500x325' alt=''></a>";
                        texto += "<div class='card-body'>";
                        texto += "<div class='input-group'>";
                        texto += "<input type='text' data-index='" + i + "' data-nome='" + retorno.results[i].name + "' class='form-control input-person' placeholder='Nome do Personagem?' aria-label='Recipient's username' aria-describedby='basic-addon2'>";
                        texto += "<div class='input-group-append'>";
                        texto += "<button class='btn btn-outline-success validaPerson' index='"+ i +"' onclick='modalPersonagem("+ i +");' data-toggle='tooltip' data-placement='right' title='Visualizar Todos os dados do Personagem' type='button'>?</button>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";    
                        $('#princial').html(texto);
                    }
                }
            }
        } 
    });  
}

function fimTempo() {
    $("#textoinicio").html("Fim do Jogo!");
    $('#botaoJogar').show();
    $('#botaoParar').hide();
    $('#time').empty();
}

function tempoJogo() {
    $('#textoinicio').html('Jogo em Andamento!');
    $('#time').empty();
    $('#time').chrony({ 
        hour: 0, 
        minute: 2, 
        second: 0,
        displayHours: false,
        displayMinutes: true,
		finish: function() {
            fimTempo();
		}
	});
}

function modalPersonagem(index){
    var texto = "";
    var altura = (retornoAPI.results[index].height) / 100
    texto += "<p>Altura: "+ altura +' cm</p>';  
    texto += "<p>Peso: "+ retornoAPI.results[index].mass+' kg</p>'; 
    texto += "<p>Cor Cabelo: "+ retornoAPI.results[index].hair_color+'</p>';  
    texto += "<p>Cor da Pele: "+ retornoAPI.results[index].skin_color+'</p>';  
    texto += "<p>Cor dos Olhos: "+ retornoAPI.results[index].eye_color+'</p>';  
    texto += "<p>Nascimento: "+ retornoAPI.results[index].birth_year+'</p>';  
    texto += "<p>Cor Cabelo: "+ retornoAPI.results[index].hair_color+'</p>'; 
    texto += "<p>Genero: "+ retornoAPI.results[index].gender+'</p>'; 
    //getPlanets(retornoAPI.results[index].homeworld);

    $('#exampleModalLabel').html('Detalhes do Personagem - ?');
    $('#exampleModalBody').html(texto);
    abreModal();    
}

function carregaPersonagens(url, page){
    var qtdeReg = 0;
    var texto = '';
    var htmlPaginas = '';

    $.ajax({
        type: "GET", 
        url: url,
        timeout: 3000,
        datatype: 'JSON',
        contentType: "application/json; charset=utf-8",
        cache: false,
        beforeSend: function() {
            $("#div-carregar").html("Carregando...<img src='images/loading.gif' height='36' width='64'>");
        },
        error: function() {
            alert("O servidor não conseguiu processar o pedido\Tente Novamente mais Tarde");
            $("#div-carregar").hide();
            return false;
        },
        afterSend: function(){
            alert('111');
        }, 
        success: function(retorno) {
            retornoAPI = retorno;
            console.log(retornoAPI);
            if (typeof(retornoAPI.results) != "undefined"){
                qtdeReg = retornoAPI.results.length;
            
                totalRegistros = retornoAPI.count;
                totalPaginas = Math.trunc(totalRegistros/10);
                if ((retornoAPI.count % 10) > 0) {
                    totalPaginas ++;   
                }

                if (qtdeReg > 0){
                    //alert(retornoAPI.results.length);
                    for (i = 0; i < qtdeReg; i++){
                        //alert(retornoAPI.results[i].name)
                        var word=/ /g; // Letra à trocar: entre as barras
                        var str = retornoAPI.results[i].name;
                        var replacestr = str.replace(word,"_"); // Letra substituta: entre as aspas
                        var nomePerson = replacestr;
                        //var pathNome =  window.location.pathname.replace('index.html','');
                        
                        //retornaStringPersonagens();

                        texto += "<div class='col-lg-3 col-md-4 col-sm-6 portfolio-item'>";
                        texto += "<div class='card h-100'>";
                        texto += "<a href='#'><img class='card-img-top' height='180' src='images/"+ nomePerson +".jpg' alt=''></a>";
                        //texto += "<a href='#'><img class='card-img-top' src='http://placehold.it/500x325' alt=''></a>";
                        texto += "<div class='card-body'>";
                        texto += "<div class='input-group'>";
                        texto += "<input type='text' data-index='" + i + "' data-nome='" + retornoAPI.results[i].name + "' class='form-control input-person' placeholder='Nome do Personagem?' aria-label='Recipient's username' aria-describedby='basic-addon2'>";
                        texto += "<div class='input-group-append'>";
                        texto += "<button class='btn btn-outline-success validaPerson' index='"+ i +"' onclick='modalPersonagem("+ i +");' data-toggle='tooltip' data-placement='right' title='Visualizar Todos os dados do Personagem' type='button'>...</button>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";
                        texto += "</div>";    
                    }
                    $('#princial').html(texto);
                }

                if (totalPaginas > 0){
                    var pag = 1;
                    for (i = 1; i <= totalPaginas; i ++){
                        if (i==1){
                            htmlPaginas += "<li class='page-item' id='li"+ i +"' active><span class='page-link'>"+ i +"<span class='sr-only'>(current)</span></span></li>";
                            pag = i + 1;
                        }else{
                            htmlPaginas += "<li class='page-item' id='li"+ i +"'><a class='page-link' onclick='mudaPagina("+ i +", this);'>"+ i +"</a></li>";
                            pag = i + 1;
                        }
                        
                    }
                    paginaAtual = 1;
                    $('.pagination').html(htmlPaginas);
                    $("#div-carregar").hide();
                    tempoJogo();
                    return true;
                    
                } 
            }else{
                return false;
                //$("#div-carregar").hide();
            }
        }
    })

}

jQuery(function($){
    $('#botaoJogar').on('click',function() {
        $('#princial').show();
        $('.pagination').show();
        $(this).hide();
        $('#botaoParar').show();
        //tempoJogo();
        carregaPersonagens('https://swapi.co/api/people/');
    });

    $('#botaoParar').on('click',function() {
        $(this).hide();
        $('#botaoJogar').show();
        $('#time').html('Cancelado');
        $('#princial').hide();
        $('.pagination').hide();
        $('.row').css('min-height', 'min-height:500px');
        //carregaPersonagens('https://swapi.co/api/people/');
    });
});


