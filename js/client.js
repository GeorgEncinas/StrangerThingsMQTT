var conexion = undefined;
$(document).ready(function(){
    let inputMensaje = $('#payload');
    let btnOk = $('.btnOk.btn');
    console.log("events ok");
    let conn = mqtt.connect('ws://scesi.org:8084',{username:'georg',password:'iot'});
    window.conn = conn;
    conexion = conn

    btnOk.click(function(){
        if(validarInput()){
            enviarMensaje(inputMensaje.val(),conn);
        }
    });
   
});

function enviarMensaje(mensaje,conexion){
   conexion.subscribe('stranger things');
   conexion.publish('stranger things',mensaje);
   console.log(mensaje);
}

function validarInput(){
    let inputMensaje = $('#payload');
    let res = true;
    let validarTexto = new RegExp('[a-zA-ZñíÁÍÚs]+');
    let validacion = validarTexto.test(inputMensaje.val());
    if(!validacion){
	res = res && false;
	inputMensaje[0].className = "payload validate invalid";
    }else{	
	inputMensaje[0].className = "payload validate valid";
    }
    return res;
}

function accionarTostadora(){
    let tostadora = $('.swTostadora');
    let estado = tostadora.prop('checked');
    let mensaje = "";
    if(estado == true){
	console.log("encender tostadora");
	mensaje = "on";	
    }else{
	console.log("apagar tostadora");
	mensaje = "off";
    }
    if(conexion != undefined){
	conexion.subscribe('iot/toaster');
	conexion.publish('iot/toaster',mensaje);
	console.log(mensaje);
    }
}

function accionarLampara(){
    let lampara = $('.swLampara');
    let estado = lampara.prop('checked');
    let mensaje = "";
    if(estado == true){
	console.log("encender lampara");
	mensaje = "on";	
    }else{
	console.log("apagar lampara");
	mensaje = "off";
    }
    if(conexion != undefined){
	conexion.subscribe('iot/lamp');
	conexion.publish('iot/lamp',mensaje);
	console.log(mensaje);
    }
}
