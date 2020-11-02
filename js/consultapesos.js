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
db.collection("animales").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        let {
            ANIMALFINAL
        } = doc.data();

        ANIMALFINAL.map((animal) => {
            const {
                nombre,
                colorImagen,
                edad,
                pesoImagen,
                raza,
                urlimagen
            } = animal;


           
                //lenar select de pesos
            $("#selecttamanos").append(`
                <option value="${pesoImagen}">${pesoImagen} kb</option>
            `);


            //al cambiar de peso

            $("#selecttamanos").change((e) => {
                e.preventDefault();
               console.log(e.target)
                
               pesoImagen===e.target.value &&  $("#cardlistanimales").html(`<div style="border: 8px solid ${colorImagen}" class="card cardanimales">
               <img style="height: 200px;" class="card-img-top" src="${urlimagen}" alt="Card image cap">
               <div class="card-body">
                 <h5 class="card-title">${nombre}</h5>
                 <h5 class="card-title">${edad} años</h5>
                 <p class="card-text">${raza}</p>
               </div>
               </div>`);
            })





            

        })



    });
});




