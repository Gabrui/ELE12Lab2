function wd(a,b,er){
    
    var resultado;
    resultado = 8*Math.exp(a)/(Math.exp(2*a)-2);
    if (resultado > 2){
        
        resultado = 2/Math.pi*(b-1-Math.log(2*b-1)+(er-1)/(2*er)*(Math.log(b-1)+0.39-0.61/er));
    }
    
    return resultado;
}
/**
 * Calcula a constante numerica A
 * @param {number} er dieletrico relativo
 * @param {number} z0 impedancia intrinseca
 * @returns {number} coeficiente numerico
 */
function A(z0,er){
   
    return (z0/60)*Math.sqrt((er+1)/2)+ ((er-1)/(er+1))*(0.23+0.11/er);
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

function cde(er,d,w){
    
    return (er+1)/2 + ((er-1)/2)*(1/Math.sqrt(1+12*d/w));
}

$( document ).ready(function() {



    $(".btn-warning").on("click", function(){
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

    	var epsilon    = values1['epsilon'];
    	var altura     = values1['altura'];
    	var frequencia = values1['freq'];
    	var z0         = values2['z0'];
    	var theta      = values2['theta'];

		
    	var a = A(z0,epsilon);
    	var b = B(z0,epsilon);

    	var W = wd(a,b,epsilon);
    	var cd_eff = cde(epsilon,altura,W);
    	var L = (theta/360)*(300/frequencia)/Math.sqrt(cd_eff);
    	$('#W').val(W);
    	$('#L').val(L);
    	


    });






});