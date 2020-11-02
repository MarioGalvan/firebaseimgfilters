
var firebaseConfig = {
    apiKey: "AIzaSyCkycE8d8Wmf0k2UdiQEnPbE8MFFWc_FPQ",
    authDomain: "animalitos-6fc32.firebaseapp.com",
    databaseURL: "https://animalitos-6fc32.firebaseio.com",
    projectId: "animalitos-6fc32",
    storageBucket: "animalitos-6fc32.appspot.com",
    messagingSenderId: "651171626645",
    appId: "1:651171626645:web:0b2cfda6b6607a894de59c"
  };
firebase.initializeApp(firebaseConfig); 


//inicializamos la firestore o database
var db = firebase.firestore();



//variables princiaples para la imagen
// let pesoimagen = null;
let colorimagen = null;
let imagensrc = null;


//funcion para guardar los animalitos
const saveAnimal = (animal) => {

    const ref = firebase.storage().ref();
    const imagenaguardar = document.getElementById('imagen').files[0];
    var metadata = {
        contentType: 'image/jpeg',
      };


    const task = ref.child(imagensrc.name).put(imagenaguardar, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url=>{

        animal.urlimagen = url;
        
        let ANIMALFINAL = [
            animal
        ];

        db.collection("animales").add({
            ANIMALFINAL
        })
        .then(function(docRef) {
            swal("Buen trabajo!", "Guardado correctamente!", "success");
            $("#nombre").val('');
            $("#raza").val('');
            $("#edad").val('');
        })
        .catch(function(error) {
            swal("Ups!", "Algo malo paso :(!", "error");
        });


    })
    
    
    
}


$("#imagen").on("change", (e) => {
    e.preventDefault();
    let imgpath = document.getElementById('imagen');
    let img = imgpath.files[0].size;
    let imgsize = Math.round(img / 1024);
    $("#pesoimagen").val(imgsize);


    //previsualizar imagen 
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    imagensrc = e.target.files[0];
    
    reader.onload = function () {
        $("#srcimagen").attr("src", reader.result);

    //ver el color mas prominente de la imagen 
    var imgtosearch = document.createElement('img');
    var imgactual = $("#srcimagen").attr("src");
    imgtosearch.setAttribute('src', imgactual)

    imgtosearch.addEventListener('load', function () {
        var vibrant = new Vibrant(imgtosearch);
        // var swatches = vibrant.swatches()
        colorimagen = vibrant["VibrantSwatch"].getHex();

    });

    };

})


 //guardar color de imagen en coleccion
 $("#btnsave").click((e) => {
    e.preventDefault();
    
    //metadatos recoleccion
    let  nombre = $("#nombre").val();
    let  raza   = $("#raza").val();
    let edad = $("#edad").val();
    let pesoImagen =  $("#pesoimagen").val();
    
    //guardar imagen y metadatos
    const animalData = {
        nombre,
        raza,
        edad,
        colorImagen: colorimagen,
        pesoImagen,
        urlimagen: null,
    }




    saveAnimal(animalData);

    
})



