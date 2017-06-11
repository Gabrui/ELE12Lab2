/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Calcula o coeficiente dieletrico efetivo
 * @param {number} w espessura da fita condutora
 * @param {number} d espessura do dieletrico
 * @param {number} er constante dieletrica relativa
 * @returns coeficiente dieletrico efetivo
 */
function cde(er,d,w){
    
    return (er+1)/2 + ((er-1)/2)*(1/math.sqrt(1+12*d/w));
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
        
        Z0 = 60/math.sqrt(ee)*math.log(8*d/w + w/(4*d));
    }
    else{
        
        Z0 = 120*math.pi/(math.sqrt(ee)*(w/d+1.393+0.667*math.log(w/d+1.444)));
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
    resultado = 8*math.exp(a)/(math.exp(2*a)-2);
    if (resultado > 2){
        
        resultado = 2/math.pi*(b-1-math.log(2*b-1)+(er-1)/(2*er)*(math.log(b-1)+0.39-0.61/er));
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
    
    return z0/60*math.sqrt((er+1)/2)+ (er-1)/(er+1)*(0.23+0.11/er);
}
/**
 * Calcula a constante numerica B
 * @param {number} er dieletrico relativo
 * @param {number} z0 impedancia instrinseca
 * @returns {number} coeficiente numerico 
 */
function B(z0,er){
    
    return 377*math.pi/(2*z0*sqrt(er));
    
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
    
    return k0*er*(ee-1)*tdelta/(2*math.sqrt(ee)*(er-1));
    
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



