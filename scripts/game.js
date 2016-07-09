/* Definições do cenário e da câmera*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 50 );
//var camera = new THREE.PerspectiveCamera( 75, screen.width / screen.height, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
//renderer.setSize(screen.width,screen.height);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild( renderer.domElement );

/*Definicoes do player*/
var geometry = new THREE.CircleGeometry( 1, 20 );
var textureLoader = new THREE.TextureLoader();
var playerTexture = textureLoader.load( 'img/player.png' );
var material = new THREE.MeshBasicMaterial( { map : playerTexture } );
var circle = new THREE.Mesh( geometry, material );
scene.add( circle );

/*Definicoes do cenario*/
var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x0af53f, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

/*Definicoes da fisica do jogo */
var iniciar = false;
var gravidade = 0.005;
var impulso = 1.0;

function pular (){
	gravidade = 0.2;
	circle.position.y += (impulso / gravidade);
	//circle.rotation.z = 0.9;
	iniciar = true;
	//circle.position.y -= 5;
}

function descer(){
	gravidade += 0.002;
	circle.position.y -= gravidade;
	//circle.rotation.z -= 0.04;
}

function resetar(){
	circle.position.y = 0;
	circle.position.x = 0;
	circle.rotation.z = 0;
	iniciar = false;
}



console.log(screen.width);
console.log(screen.height);
console.log(window.innerWidth);
console.log(window.innerHeight);

/*Afasta a camera para visualizacao do personagem*/
camera.position.z = 40;//window.innerWidth/2;

plane.position.x = 20;
plane.position.y = 20;


/*funcoes do teclado*/
function click(event) {
	pular();
}

function pause(event){
	if (event.keyCode === 32){
		resetar();
	}
}

window.addEventListener('click', click, false);
window.addEventListener('keyup', pause, false);

//Renderizar 
function render() {
	requestAnimationFrame( render );
	if(iniciar){
		descer();
	}	
	renderer.render( scene, camera );
}
render();