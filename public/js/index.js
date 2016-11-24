$('.tab a').on('click', function(ev){
	// aca coloco la reaccion de hacer click en un a
	ev.preventDefault();

	// selecciono el li padre del "a" pulsado, y le pongo clase "active"
	$(this).parent().addClass('active');
	// selecciono todos los hermanos del li anterior, y les saco la clase "active"
	$(this).parent().siblings().removeClass('active');

	var href_pulsada = $(this).attr('href');

	$('.tab-content > div').not(href_pulsada).hide();
	$(href_pulsada).fadeIn('slow');
});


/* El evento keyup se dispara cuando usuario levanta una
tecla sobre el campo seleccionado */
$('form').find('input, textarea').on('keyup', function(ev){
	var campo = $(this);
	var label_campo = campo.prev();

	// dependiendo si hay texto o no, añadimos o removemos la clase "active"
	if (campo.val() == ""){
		label_campo.removeClass('active');
	} else {
		label_campo.addClass('active');
	}
});

/* al momento de login, se pide por AJAX los
datos del usuario */
$('#login form').on('submit', function(ev){
	// se previene que formulario se envie
	ev.preventDefault();
	// recuperar los datos del formulario
	var email = $('#login_email').val();
	var password = $('#login_password').val();

	// llamada AJAX
	$.ajax({
		url: "/api/user",
		dataType: "json",
		success: function(usuario){
			if(usuario.email == email && usuario.password == password) {
			   	// si coinciden usuario y contraseña, dejo pasar al usuario
			   	dejar_pasar(usuario);
			} else {
				alert('Estai mal');
			}
		},
		error: function(code, obj){
			alert('Falló la conexión');
		}
	});
});

function dejar_pasar(usuario){
	// escondemos la pantalla de login
	$('#login').hide();
	$('#primer_tab').hide();
	// mostramos el home
	$('#pass').fadeIn('slow');
	$('#segundo_tab').fadeIn('slow');
}


/* Funcionalidad que permite el select de paises, con banderas y prefijos
	Parte del repaso del 23 de noviembre de 2016 */
var paises = [
	{
		nombre: "chile",
		prefijo: "+569",
		bandera: "images/chile.jpg"
	},
	{
		nombre: "peru",
		prefijo: "+519",
		bandera: "images/peru.png"
	},
	{
		nombre: "mexico",
		prefijo: "+529",
		bandera: "images/mexico.png"
	}
];

// traerme el nombre del pais desde localStorage
var nombre_pais = window.localStorage.getItem("nombre_pais") || "chile";

// recuperar el objeto pais, desde el arreglo de paises
var pais = {};
for (var i=0 ; i<paises.length ; ++i){
	if (paises[i].nombre == nombre_pais) {
		pais = paises[i];
		break;
	}
}
// solo queda modificar el DOM
$('#pais img').attr('src', pais.bandera);
$('#prefijo').html(pais.prefijo);