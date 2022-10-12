//variables.
let $btnEnviar = document.querySelector('button[type="button"]#enviar'),
        // (Variables) -> Campos.
    $CampoPara = document.querySelector('input[type="email"]#Para'),
    $CampoAsunto = document.querySelector('input[type="text"]#Asunto'),
    $CampoMensaje = document.querySelector('#Mensaje');

let $btnResetear = document.querySelector('button[type="button"]#resetear');

let $pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

//eventos
LoadEventlistener();
document.addEventListener('DOMContentLoaded', CargarElementos);

function LoadEventlistener(){

    $btnEnviar.addEventListener('click', () => {
        const $animacion = document.querySelector('.animacion');
        if($animacion.classList.contains('animacion-desactivada')){
            $animacion.classList.remove('animacion-desactivada');
            $animacion.classList.add('animacion-activada');


            setTimeout(() => {
                $animacion.classList.add('animacion-desactivada');
                $animacion.classList.remove('animacion-activada');

                AlertaInformativa('Mensaje Enviado Correctamente', 'exito');

                setTimeout(( ) => {
                    window.location.reload();
                }, 2000);
            }, 8000);   
        }
    });

    $btnResetear.addEventListener('click', () => {
        document.querySelector('.formulario').reset();
    });

    $CampoPara.addEventListener('blur', EscuchaInputs);
    $CampoAsunto.addEventListener('blur', EscuchaInputs);
    $CampoMensaje.addEventListener('blur', EscuchaInputs);
}

function CargarElementos(){ 
    $btnEnviar.classList.add('desactivado');
    $btnEnviar.disabled = true;
}

// Funciones
function EscuchaInputs(e){
    //Que los campos no esten vacios
    if(!e.target.value.trim().length > 0 || e.target.value.trim() === ""){

        AlertaInformativa('Los Campos deben ser completados', 'error');

        //generar un efecto
        e.target.style.border = "1px solid #ee8080";
        e.target.style.boxShadow = "0px 2px 8px 0px #ee8080";
    }else{
        e.target.style.border = "1px solid rgba(151, 235, 29, 0.91)";
        e.target.style.boxShadow = "0px 2px 8px 0px rgba(151, 235, 29, 0.91)";
    }

    // Validar por el formato correcto.
    if(e.target.type === "email" && e.target.value.trim() !== ""){
        ValidarMail(e);
    }

    // Cuando todos nuestros campos estan llenos... 
    if( $pattern.test($CampoPara.value) && $CampoPara.value !== "" && $CampoAsunto.value !== "" && $CampoMensaje.value !== ""){
        $btnEnviar.classList.add('enviar');
        $btnEnviar.classList.remove('desactivado');
        $btnEnviar.disabled = false;

        let $alerta = document.querySelector('.error');
        if($alerta){
            $alerta.remove();
        }

    }else{
        $btnEnviar.classList.add('desactivado');
        $btnEnviar.classList.remove('enviar');
        $btnEnviar.disabled = true;
    }
}

// Alerta Informativa.
function AlertaInformativa($mensaje, $tipo){
    LimpiarHTML($tipo);
    // En done ingresar el valor.
    let $Insertar = document.querySelector('.formulario');

    const $parrafo = document.createElement("P");
    $parrafo.classList.add("alerta", $tipo);
    $parrafo.textContent = $mensaje;

    $Insertar.appendChild($parrafo);
}

function LimpiarHTML($tipo){
    const $eliminar = document.querySelector(`.${$tipo}`);
    if($eliminar){
        $eliminar.remove();
    }
}

function ValidarMail(e){
    if($pattern.test(e.target.value)){

        e.target.style.border = "1px solid rgba(151, 235, 29, 0.91)";
        e.target.style.boxShadow = "0px 2px 8px 0px rgba(151, 235, 29, 0.91)";
    }else{
        //generar un efecto
        e.target.style.border = "1px solid #ee8080";
        e.target.style.boxShadow = "0px 2px 8px 0px #ee8080";

        AlertaInformativa("Formato de Mail Incorrecto", "error");
    }
}