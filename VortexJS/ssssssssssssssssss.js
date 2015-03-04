/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/


var Canal = function(alias, filtro, transformacion){
    this._alias = alias;
    this._filtro = filtro;
    this._trafo = transformacion;
    this.start();
}

Canal.prototype = {
    start:function(){

    },
    estamparFiltro: function(un_filtro){
        return new FiltroAND([this._filtro, un_filtro]);     
    },
    estamparMensaje: function(un_mensaje){
        return this._trafo.transformarMensaje(un_mensaje);
    },
    getSubCanal: function(alias, filtro, transformacion){
        return new Canal(alias, 
                         new FiltroAND([this._filtro, filtro]).simplificar(), 
                         new TrafoCompuesta([this._trafo, transformacion]));
    },
    serializar: function(){
        return {alias: this._alias,
                filtro: this._filtro.serializar(), 
                trafo: this._trafo.serializar()
                };
    },
    desSerializar: function(canal_serializado){
        this._alias = canal_serializado.alias;
        this._filtro = DesSerializadorDeFiltros.desSerializarFiltro(canal_serializado.filtro);
        this._trafo = DesSerializadorDeTrafos.desSerializarTrafo(canal_serializado.trafo);
    },
    equals: function(obj){
        if(!(obj instanceof Canal)) return false;
        return this._filtro.evaluarMensaje(obj._trafo.transformarMensaje({})) &&
               obj._filtro.evaluarMensaje(this._trafo.transformarMensaje({})) ;
    }
}

var CanalNulo = function(){

};

CanalNulo.prototype = {
    estamparFiltro:function(un_filtro){
        return new FiltroAND([un_filtro])
    },
    estamparMensaje:function(un_mensaje){
        return un_mensaje;
    }
};

var ComparadorDeCanales = {

}



-----END OF FILE #1(Canal.js C:\Personal\Experimentos\SIME\HTML\sime\VortexJS\Canal.js)-----


/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/
var ClonadorDeObjetos = {
    clonarObjeto: function(obj){
        if (typeof obj === 'object')
            {
            if (obj ===null ) { return null; }
            if (obj instanceof Array )
            { 
                return this.extend([], obj); 
            }
            else if( obj instanceof Date )
            {
                var t= new obj.constructor();
                t.setTime(obj.getTime());
                return t;
            }
            else
            { 
                return this.extend({}, obj); 
            }
        }
        return obj;        
    },
    hop: Object.prototype.hasOwnProperty,
    extend: function(a, b, context, newobjs, aparent, aname, haveaparent){
        if (a==b){ return a;}
        if (!b)  { return a;}
         
        var key, clean_context=false, return_sublevel=false,b_pos;
        if(!haveaparent){ aparent={'a':a}; aname='a'; }
        if(!context){clean_context=true;context=[];newobjs=[];}
        b_pos=context.indexOf(b);
        if( b_pos==-1 ) {context.push(b);newobjs.push([aparent, aname]);} else { return newobjs[b_pos][0][ newobjs[b_pos][1] ]; }
        
        for (key in b)
        {
            if(this.hop.call(b,key))
            { 
                if(typeof a[key] === 'undefined')
                {   
                    if(typeof b[key] === 'object')
                    {
                        if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
                        {a[key] = this.extend([], b[key],context,newobjs,a,key,true);}
                        else if(b[key]===null)
                        {a[key] = null;}
                        else if( b[key] instanceof Date )
                        { a[key]= new b[key].constructor();a[key].setTime(b[key].getTime());  }
                        else
                        { a[key] = this.extend({}, b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                    }
                    else
                    {  a[key] = b[key]; }
                }
                else if(typeof a[key] === 'object' && a[key] !== null)
                {  a[key] = this.extend(a[key], b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                else  
                {  a[key] = b[key]; }
            }
        }
        if(clean_context) {context=null;newobjs=null;}
        if(!haveaparent)
        {
            aparent=null;
            return a;
        }
        if(typeof a === 'object' && !(a instanceof Array) )
        {
            /*a.constructor = b.constructor;
            a.prototype   = b.prototype*/;
        } 
        return a;        
    }
};

if (typeof (require) != "undefined") { exports.clase = ClonadorDeObjetos; }


-----END OF FILE #2(ClonadorDeObjetos.js C:\Personal\Experimentos\SIME\HTML\sime\VortexJS\ClonadorDeObjetos.js)-----


/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/
var ClonadorDeObjetos = {
    clonarObjeto: function(obj){
        if (typeof obj === 'object')
            {
            if (obj ===null ) { return null; }
            if (obj instanceof Array )
            { 
                return this.extend([], obj); 
            }
            else if( obj instanceof Date )
            {
                var t= new obj.constructor();
                t.setTime(obj.getTime());
                return t;
            }
            else
            { 
                return this.extend({}, obj); 
            }
        }
        return obj;        
    },
    hop: Object.prototype.hasOwnProperty,
    extend: function(a, b, context, newobjs, aparent, aname, haveaparent){
        if (a==b){ return a;}
        if (!b)  { return a;}
         
        var key, clean_context=false, return_sublevel=false,b_pos;
        if(!haveaparent){ aparent={'a':a}; aname='a'; }
        if(!context){clean_context=true;context=[];newobjs=[];}
        b_pos=context.indexOf(b);
        if( b_pos==-1 ) {context.push(b);newobjs.push([aparent, aname]);} else { return newobjs[b_pos][0][ newobjs[b_pos][1] ]; }
        
        for (key in b)
        {
            if(this.hop.call(b,key))
            { 
                if(typeof a[key] === 'undefined')
                {   
                    if(typeof b[key] === 'object')
                    {
                        if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
                        {a[key] = this.extend([], b[key],context,newobjs,a,key,true);}
                        else if(b[key]===null)
                        {a[key] = null;}
                        else if( b[key] instanceof Date )
                        { a[key]= new b[key].constructor();a[key].setTime(b[key].getTime());  }
                        else
                        { a[key] = this.extend({}, b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                    }
                    else
                    {  a[key] = b[key]; }
                }
                else if(typeof a[key] === 'object' && a[key] !== null)
                {  a[key] = this.extend(a[key], b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                else  
                {  a[key] = b[key]; }
            }
        }
        if(clean_context) {context=null;newobjs=null;}
        if(!haveaparent)
        {
            aparent=null;
            return a;
        }
        if(typeof a === 'object' && !(a instanceof Array) )
        {
            /*a.constructor = b.constructor;
            a.prototype   = b.prototype*/;
        } 
        return a;        
    }
};

if (typeof (require) != "undefined") { exports.clase = ClonadorDeObjetos; }


-----END OF FILE #3(ClonadorDeObjetos.js C:\Personal\Experimentos\SIME\HTML\sime\VortexJS\ClonadorDeObjetos.js)-----


/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/
var ClonadorDeObjetos = {
    clonarObjeto: function(obj){
        if (typeof obj === 'object')
            {
            if (obj ===null ) { return null; }
            if (obj instanceof Array )
            { 
                return this.extend([], obj); 
            }
            else if( obj instanceof Date )
            {
                var t= new obj.constructor();
                t.setTime(obj.getTime());
                return t;
            }
            else
            { 
                return this.extend({}, obj); 
            }
        }
        return obj;        
    },
    hop: Object.prototype.hasOwnProperty,
    extend: function(a, b, context, newobjs, aparent, aname, haveaparent){
        if (a==b){ return a;}
        if (!b)  { return a;}
         
        var key, clean_context=false, return_sublevel=false,b_pos;
        if(!haveaparent){ aparent={'a':a}; aname='a'; }
        if(!context){clean_context=true;context=[];newobjs=[];}
        b_pos=context.indexOf(b);
        if( b_pos==-1 ) {context.push(b);newobjs.push([aparent, aname]);} else { return newobjs[b_pos][0][ newobjs[b_pos][1] ]; }
        
        for (key in b)
        {
            if(this.hop.call(b,key))
            { 
                if(typeof a[key] === 'undefined')
                {   
                    if(typeof b[key] === 'object')
                    {
                        if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
                        {a[key] = this.extend([], b[key],context,newobjs,a,key,true);}
                        else if(b[key]===null)
                        {a[key] = null;}
                        else if( b[key] instanceof Date )
                        { a[key]= new b[key].constructor();a[key].setTime(b[key].getTime());  }
                        else
                        { a[key] = this.extend({}, b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                    }
                    else
                    {  a[key] = b[key]; }
                }
                else if(typeof a[key] === 'object' && a[key] !== null)
                {  a[key] = this.extend(a[key], b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
                else  
                {  a[key] = b[key]; }
            }
        }
        if(clean_context) {context=null;newobjs=null;}
        if(!haveaparent)
        {
            aparent=null;
            return a;
        }
        if(typeof a === 'object' && !(a instanceof Array) )
        {
            /*a.constructor = b.constructor;
            a.prototype   = b.prototype*/;
        } 
        return a;        
    }
};

if (typeof (require) != "undefined") { exports.clase = ClonadorDeObjetos; }


-----END OF FILE #4(ClonadorDeObjetos.js C:\Personal\Experimentos\SIME\HTML\sime\VortexJS\ClonadorDeObjetos.js)-----


