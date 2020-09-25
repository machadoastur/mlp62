if ('serviceWorker' in navigator) {
    try {
        let serviceWorker = navigator.serviceWorker.register('./sw.js');
        console.log('El Sw ta currando, nin');
    } catch (err) {
        console.log(err)
    }
}



console.log('code.js');

//////

var user, name, email, photoUrl, emailVerified, uid;


//////
var miPase = document.getElementById('pase');
var miAdmin = document.getElementById('administrador');
var contSig = document.querySelector("#contendorSiguientes");

miPase.style.display = 'none';
miAdmin.style.display = 'none';


function connex(){
     // Your web app's Firebase configuration
  const config = {

//Storage correcto para MeloPido
    apiKey: "AIzaSyD8UD1Wbjn64jl_rFiLQcgG9_1F3NzYbkw",
    authDomain: "melopidoapp-f32f7.firebaseapp.com",
    databaseURL: "https://melopidoapp-f32f7.firebaseio.com",
    projectId: "melopidoapp-f32f7",
    storageBucket: "melopidoapp-f32f7.appspot.com",
    messagingSenderId: "412190169745"



};
firebase.initializeApp(config);

        console.log('Mi proyecto '+config.projectId);
    
} //connex

connex();

function registrar(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
   firebase.auth().createUserWithEmailAndPassword(email, password)
 .then(function(){
        console.log('Comprobar si se envía  emilio');
        user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
    console.log('Enviando mail de verificación');
}).catch(function(error) {
  // An error happened.
    console.log(error);
});
       
    })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
    
    console.log(`Bienvenido, ${email}`);
    
}

function ingresar(){
        var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;
    var mail2 = document.getElementById('email2');
    var pss2 =  document.getElementById('password2');
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  // ...
  if(!user){
    console.log("No te conozco");
    var contPrim = document.querySelector("#contenedorPrimera");
    var bocazas = document.querySelector("#vocero");
    var bmtI = document.querySelector("#btnI");
    var conSig = document.querySelector("#contenedorSiguientes");
        contPrim.style.display = "block";
        bocazas.classList.add("sayonara");
        mail2.style.display="none";
        pss2.style.display="none";
        bmtI.style.display="none";
        
       
  }
});

    console.log(`Ìngresó de nuevo ${email2}`)
  
    
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
     
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
      
console.log(`Hay usuario: ${user.email}`);
        var contenido = document.getElementById('contenido');
      contenido.innerHTML = ` 

<button type="button" class="btn btn-danger mt-1 ml-3" onclick="salir()">¿Te sales'</button>
   `; 

  var email2 = document.getElementById('email2');
    var password2 = document.getElementById('password2');
      email2.value='';
      password2.value='';
      email2.focus();
        console.log(user.email+ 'Onload'); 
      if(user != null){
          var mtCon = document.getElementById('metacontainer');
          mtCon.style.display='none'; //Si hay usuario registrado activo, no aparecen los formularios
          
          var miVoz = document.getElementById('vocero');
          miVoz.innerHTML = `<h1 class="font-weight-bold" >Bienvenido, ${user.email}</h1>`;
          //Saludamos al usuario
      }  else{
        
      }
      
    pinTar() //Lanzamos la baraja
    
    if(user.email === 'machadoastur@gmail.com'){
        miPase.style.display = 'block';
    }
  } else {
    // No user is signed in.
      console.log('No hay usuaerio');
    
  }
}); 
    

} // observador

observador();



function salir(){
   firebase.auth().signOut().then(function() {
  // Sign-out successful.
  location.reload();
}).catch(function(error) {
  // An error happened.
}); 
}  //salir

 function pinTar(){
  
 
      var db = firebase.firestore();

  db.collection("deseos").onSnapshot((querySnapshot) => {



    querySnapshot.forEach((doc) => {


    console.log(`${doc.id} => ${doc.data().nombre}`);
       var misGatos = document.getElementById('gatos');
    
     
     

      
      misGatos.innerHTML += `
<div class="column">
    <div class="card">
 <a href="${doc.data().enlace}"><img src="${doc.data().foto}" alt="meow" style="max-width: 200px;"></a>
      <h5><span>Artículo: </span>${doc.data().nombre}</h5>
      <p><span>Visto en: </span>${doc.data().origen}</p>
      <p><span>Precio Aprox:</span>${doc.data().precio} </p>
    </div>
  </div>




  
` //Fin de la inclusión de código con tildes especiales

    });
   

  });
contSig.classList.add("sayonara");
 } //pintar
    
function administra(){
  miAdmin.style.display = 'block';  
   var miQueso = document.getElementById('queso');
    miQueso.style.display = 'none';
    rePinta();
 
}  //administra




    
function rePinta() {
  //document.getElementById('nombre').focus();
 var db = firebase.firestore();
  var tabla2 = document.getElementById('tabla2');
  db.collection("deseos").onSnapshot((querySnapshot) => {
    tabla2.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().origen}`);
      tabla2.innerHTML += `
<tr>
     <th scope="row">${doc.id}</th>
      <td>${doc.data().nombre}</td>
      <td>${doc.data().origen}</td>
      <td>${doc.data().precio}</td>
      <td>
<a href="${doc.data().enlace}"><img src="https://firebasestorage.googleapis.com/v0/b/melopidoapp-f32f7.appspot.com/o/misLogos%2FChrome.png?alt=media&token=2f54b793-8698-474d-92a4-9645db4f4c2c" alt="" style="hanging-punctuation: 50px;" ></a></td>



 <td onclick="eliminar('${doc.id}')">

<img src="images/logBor.jpg" alt=""></td>


 <td onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().origen}',
 '${doc.data().precio}','${doc.data().enlace}' )"> 


<img src="images/logEdit.jpg" alt="">

</td>
</tr>` //Fin de la inclusión de código con tildes especiales
    });


  });

  //    var btn1A = document.getElementById('btn1A');
  //    btn1A.addEventListener('click', guardar, false);
} //repinta

function añadir(){
  var admin = document.getElementById('administrador');
  admin.style.visibility = 'visible';
} //añadir

function incluir(){  //Aquí meteremos lo de guardar
   
    
    
  ////
  var db = firebase.firestore();

var nombre = document.getElementById('nombre').value;
var origen = document.getElementById('origen').value;
var precio = document.getElementById('precio').value;
var enlace = document.getElementById('enlace').value;
var foto = document.getElementById('foto').value;    
console.log('Guardarás ' + nombre + ', ' + precio);
  console.log(`Guardarás  ${nombre } , ${precio} `);


db.collection("deseos").add({
   nombre,
   origen,
   precio,
   enlace,
   foto
})
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('nombre').value = '';
    document.getElementById('origen').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('enlace').value = '';
    document.getElementById('foto').value = '';
    document.getElementById('nombre').focus();
   renacer();
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });

} //añadir

 function eliminar(id){
  console.log('¡Vas a eliminar!');

var db = firebase.firestore();
db.collection("deseos").doc(id).delete().then(function () {
 console.log("¡Eliminste una entrada sin problemas!");
}).catch(function (error) {
 console.error("Error eliminando un documento: ", error);
});
document.getElementById('nombre').focus();

} //eliminar    

    

 function editar(id, nombre, origen, precio, enlace, foto){
        
  //    var admin = document.getElementById('administrador');
  //    admin.style.visibility = 'visible';
          
         var db = firebase.firestore();
  
    document.getElementById('nombre').value = nombre;
    document.getElementById('origen').value = origen;
    document.getElementById('precio').value = precio;
    document.getElementById('enlace').value = enlace;
    document.getElementById('foto').value = foto;
  
    console.log('Editarás ' + nombre + ', ' + precio);
  
    var btn1B = document.getElementById('btn1B');
    btn1B.innerHTML = '¡Editar!';
  
    btn1B.onclick = function () {
  
  
      var washingtonRef = db.collection("deseos").doc(id);
      var nombre = document.getElementById('nombre').value;
      var origen = document.getElementById('origen').value;
      var precio = document.getElementById('precio').value;
      var enlace = document.getElementById('enlace').value;
      var foto = document.getElementById('foto').value;
  
      return washingtonRef.update({
        nombre: nombre,
        origen: origen,
        precio: precio,
        enlace: enlace,
          foto: foto
      })
        .then(function () {
          console.log("¡Editaste sin problemas!");
          btn1B.innerHTML = "¡Guardar!";
          document.getElementById('nombre').value = '';
          document.getElementById('origen').value = '';
          document.getElementById('precio').value = '';
          document.getElementById('enlace').value = '';
           document.getElementById('foto').value = '';
          document.getElementById('nombre').focus();
         renacer();
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
        
    } //onclick 
      }

      function renacer(){
        location.reload();
      }
