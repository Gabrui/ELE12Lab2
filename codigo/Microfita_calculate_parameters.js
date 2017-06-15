/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @function [beta] Calcula o coeficiente dieletrico efetivo
 * @constant {number} k0 numero de onda padrao
 * @param {number} er constante dieletrica relativa
 * @constant {number} c velocidade da luz
 * @param {number} f frequencia
 * @returns constante de propagacao
 */
function beta(f,er){
    c = 300000000;
    k0 = 2*Math.pi*f/c;
    return k0*Math.sqrt(er);
}

/**
 * @function [vp] Calcula a velocidade de fase em metros por segundo
 * @param {number} ee coeficiente dieletrico efetivo
 * @constant {number} c velocidade da luz
 * @returns velocidade de fase
 */
function vp(ee){
    c = 300000000;
    return c/Math.sqrt(ee);
}
/**
 * Calcula o coeficiente dieletrico efetivo
 * @param {number} w espessura da fita condutora
 * @param {number} d espessura do dieletrico
 * @param {number} er constante dieletrica relativa
 * @returns coeficiente dieletrico efetivo
 */
function cde(er,d,w){
    
    return (er+1)/2 + ((er-1)/2)*(1/Math.sqrt(1+12*d/w));
}

/**
 * Calcula a impedancia intrinseca
 * @param {number} ee dieletrico efetivo
 * @param {number} w espessura da fita condutora
 * @param {number} d espessura do dieletrico
 * @returns {number} impedancia intrinseca ohm
 */
function Z0(d,w,ee){
    
    var wd = w/d;
    if (wd<= 1){
        
        Z0 = 60/Math.sqrt(ee)*Math.log(8*d/w + w/(4*d));
    }
    else{
        
        Z0 = 120*Math.pi/(Math.sqrt(ee)*(w/d+1.393+0.667*Math.log(w/d+1.444)));
    }
    return Z0;
    
}

/**
 * Calcula a razao w por d
 * @param {number} er dieletrico relativo
 * @param {number} b constatne numerica
 * @param {number} a constante numerica
 * @returns {number} wd razao da largura da fita pela espessura do dieletrico
 */
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
    
    return z0/60*Math.sqrt((er+1)/2)+ (er-1)/(er+1)*(0.23+0.11/er);
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
 * @param {number} k0 numero de onda padrao
 * @param {number} tdelta tangente de perdas
 * @param {number} ee dieletrico efetivo
 * @param {number} er dieletrico relativo
 * @returns {number} atenuacao no dieletrico Np/m
 */
function alfad(k0,er,ee,tdelta){
    
    return k0*er*(ee-1)*tdelta/(2*Math.sqrt(ee)*(er-1));
    
}
/**
 * 
 * @param {number} w largura da fita condutora
 * @param {number} z0 impedancia intrinseca
 * @param {number} rs resistencia superficial ou de folha
 * @returns {number} atenuacao no condutor Np/m
 */
function alfac(rs,z0,w){
    
    return rs/(z0*w);
    
}



