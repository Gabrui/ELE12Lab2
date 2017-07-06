/**
 * @function [beta] Calcula o coeficiente dieletrico efetivo
 * @constant {number} k0 numero de onda padrao
 * @param {number} er constante dieletrica relativa
 * @constant {number} c velocidade da luz
 * @param {number} f frequencia
 * @returns constante de propagacao
 */
function beta(f, er) {
    c = 300000000;
    k0 = 2 * Math.PI * f / c;
    return k0 * Math.sqrt(er);
}

/**
 * @function [vp] Calcula a velocidade de fase em metros por segundo
 * @param {number} ee coeficiente dieletrico efetivo
 * @constant {number} c velocidade da luz
 * @returns velocidade de fase
 */
function vp(ee) {
    c = 300000000;
    return c / Math.sqrt(ee);
}

/**
 * Calcula o coeficiente dieletrico efetivo
 * @param {number} w espessura da fita condutora
 * @param {number} d espessura do dieletrico
 * @param {number} er constante dieletrica relativa
 * @returns coeficiente dieletrico efetivo
 */
function cde(er, d, w) {

    return (er + 1) / 2 + ((er - 1) / 2) * (1 / Math.sqrt(1 + 12 * d / w));
}

/**
 * Calcula a impedancia intrinseca
 * @param {number} ee dieletrico efetivo
 * @param {number} w espessura da fita condutora
 * @param {number} d espessura do dieletrico
 * @returns {number} impedancia intrinseca ohm
 */
function Z0(d, w, ee) {

    var wd = w / d;
    if (wd <= 1) {

        z0 = 60 / Math.sqrt(ee) * Math.log(8 * d / w + w / (4 * d));
    }
    else {

        z0 = 120 * Math.PI / (Math.sqrt(ee) * (w / d + 1.393 + 0.667 * Math.log(w / d + 1.444)));
    }
    return z0;

}


/**
 * Calcula a razao w por d
 * @param {number} er dieletrico relativo
 * @param {number} b constatne numerica
 * @param {number} a constante numerica
 * @returns {number} wd razao da largura da fita pela espessura do dieletrico
 */
function wd(a, b, er, d, Z) {
    
    var resultado, resultado2, erro, erro2;
    resultado = 2 / Math.PI * (b - 1 - Math.log(2 * b - 1) + (er - 1) / (2 * er) * (Math.log(b - 1) + 0.39 - 0.61 / er));

    resultado2 = 8 * Math.exp(a) / (Math.exp(2 * a) - 2);
    var ee;
    ee = cde(er, d, d * resultado);
    erro = Math.pow(Z - Z0(d, d * resultado, ee), 2);
    ee = cde(er, d, d * resultado2);
    erro2 = Math.pow(Z - Z0(d, d * resultado2, ee), 2);

    if ((erro2 < erro || resultado < 0 ) && resultado2 > 0) {
        resultado = resultado2;
    }
    return resultado;
}

/**
 * Calcula a constante numerica A
 * @param {number} er dieletrico relativo
 * @param {number} z0 impedancia intrinseca
 * @returns {number} coeficiente numerico
 */
function A(z0a,era){
    var resul = (z0a/60)*Math.sqrt((era+1)/2) + ((era-1)/(era+1))*(0.23+0.11/era);
    return resul;
}

/**
 * Calcula a constante numerica B
 * @param {number} er dieletrico relativo
 * @param {number} z0 impedancia instrinseca
 * @returns {number} coeficiente numerico 
 */
function B(z0,er){
    
    return 377*Math.PI/(2*z0*Math.sqrt(er));
    
}


/**
 * Calcula a atenuacao no dieletrico
 * @param {number} f Frequência de operação
 * @param {number} sigma Condutividade do dielétrico
 * @param {number} ee dieletrico efetivo
 * @param {number} er dieletrico relativo
 * @returns {number} atenuacao no dieletrico Np/m
 */
function alfad(f, sigma, er, ee) {
    c = 300000000;
    e0 = 8.854187 * 0.000000000001;
    k0 = 2*Math.PI*f/c;
    tdelta = sigma/(Math.PI*2*f*ee*e0);
    return k0 * er * (ee - 1) * tdelta / (2 * Math.sqrt(ee) * (er - 1));

}
/**
 * 
 * @param {number} w largura da fita condutora
 * @param {number} z0 impedancia intrinseca
 * @param {number} rs resistencia superficial ou de folha
 * @returns {number} atenuacao no condutor Np/m
 */
function alfac(rs, z0, w) {

    return rs / (z0 * w);

}


function arredonda(num) {
	return Math.round(num * 100000) / 100000;
}



$(document).ready(function () {

	var audio1 = new Audio('anvil.mp3');
	var audio2 = new Audio('paper.mp3');
	var design = true;
	var analisar = false;

    $(".btn-warning").on("click", function(){
    	design = true;
    	analisar = false;
    	$(this).addClass("pressed")
    	$(".btn-info").removeClass("pressed")
    	$('#design_title').text('Input')
    	$('#analisar_title').text('Output')

    });

    $(".btn-info").on("click", function(){
    	design = false;
    	analisar = true;
    	$(this).addClass("pressed")
    	$(".btn-warning").removeClass("pressed")
    	$('#design_title').text('Output')
    	$('#analisar_title').text('Input')
    });

    $(".btn-success").on("click", function () {

    	if(design)
    	{
    	var $inputs = $('#entradas1 :input');
    	var values1 = {};
    	$inputs.each(function() {
        values1[this.name] = $(this).val();
   		 });
    	
    	var $inputs = $('#design_entradas :input');
    	var values2 = {};
    	$inputs.each(function() {
        values2[this.name] = $(this).val();
   		 });

    	var epsilon    = Number(values1['epsilon']);
    	var altura     = Number(values1['altura']);
    	var frequencia = Number(values1['freq'])*1000000;
	var sigma      = Number(values1['sigma']);
	var rs         = Number(values1['rs']);
    	var z0         = Number(values2['z0']);
    	var theta      = Number(values2['theta']);

    	var a = A(z0,epsilon);
    	var b = B(z0,epsilon);
    	var W = altura*wd(a,b,epsilon, altura, z0);
    	var cd_eff = cde(epsilon,altura,W);
    	var L = (theta * Math.PI / 180) / beta(frequencia, cd_eff);
    	$('#W').val(arredonda(W));
    	$('#L').val(arredonda(L*1000));
	document.getElementById("alphad_value").innerHTML = alfad(frequencia, sigma, epsilon, cd_eff).toFixed(4) +" Np/m";
	document.getElementById('alphac_value').innerHTML = alfac(rs, z0, W).toFixed(4) +" Np/m";
	document.getElementById('vp_value').innerHTML = vp(cd_eff).toFixed(0) +" m/s";
	document.getElementById('beta_value').innerHTML = beta(frequencia, cd_eff).toFixed(4) +"1/m";
	document.getElementById('epsilone_value').innerHTML = cd_eff.toFixed(4);
	audio1.play();
    	}

    	else if(analisar)
    	{
    	var $inputs = $('#entradas1 :input');
    	var values1 = {};
    	$inputs.each(function() {
        values1[this.name] = $(this).val();
   		 });
    	
    	var $inputs = $('#analisar_entradas :input');
    	var values2 = {};
    	$inputs.each(function() {
        values2[this.name] = $(this).val();
   		 });

    	var epsilon    = Number(values1['epsilon']);
    	var altura     = Number(values1['altura']);
    	var frequencia = Number(values1['freq'])*1000000;
	var sigma      = Number(values1['sigma']);
	var rs         = Number(values1['rs']);
    	var W          = Number(values2['largura']);
    	var L          = Number(values2['comprimento'])/1000;
    	var cd_eff = cde(epsilon,altura,W);
    	var theta  = L * beta(frequencia, cd_eff) * 180 / Math.PI;
    	var z0     = Z0(altura,W,cd_eff);
    	$('#z0').val(arredonda(z0));
    	$('#theta').val(arredonda(theta));
	document.getElementById("alphad_value").innerHTML = alfad(frequencia, sigma, epsilon, cd_eff).toFixed(4) +" Np/m";
	document.getElementById('alphac_value').innerHTML = alfac(rs, z0, W).toFixed(4) +" Np/m";
	document.getElementById('vp_value').innerHTML = vp(cd_eff).toFixed(0) +" m/s";
	document.getElementById('beta_value').innerHTML = beta(frequencia, cd_eff).toFixed(4) +"1/m";
	document.getElementById('epsilone_value').innerHTML = cd_eff.toFixed(4);

    	
		audio2.play();
    	}


    });

});
