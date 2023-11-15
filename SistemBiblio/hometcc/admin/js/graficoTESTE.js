// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
  authDomain: "tccsb-39f62.firebaseapp.com",
  projectId: "tccsb-39f62",
  storageBucket: "tccsb-39f62.appspot.com",
  messagingSenderId: "446535834077",
  appId: "1:446535834077:web:b43e6da142918afae53e34",
  measurementId: "G-QFJFTQ66ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {getDatabase, ref, set, get, child, onValue,update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const db = getDatabase();



function AddGrafico(livros, emprestimos){
        
    var qntdLivros = livros;
    console.log(qntdLivros.length);

    var qntdEmprestimos = emprestimos;
    console.log(qntdEmprestimos.length);
    const contexto = document.getElementById('meuGrafico').getContext('2d');
    const opcoes = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    font:{
                        family: 'Arial',
                        size: '15pt',
                    }
                },
            },
        },
    }
        // Cria o gráfico de rosquinha
        const meuGrafico = new Chart(contexto, {
            type: 'doughnut',
            data: {
                labels: ['Quantidade de Livros Cadastrados', 'Quantidade de Livros Emprestados'],
                datasets: [{
                    data: [qntdEmprestimos.length, qntdLivros.length],
                    backgroundColor: [
                        '#7FFF00',
                        '#FF1493',
                    ],
                    
                    hoverOffset: 4
                }],
            },
            options: opcoes,
        });
}



function GetAllDataOnce(){
    const dbref = ref(db);
 
    get(child(dbref, "livros"))
    .then((snapshot)=>{
        var livros =[];
 
        snapshot.forEach(childSnapshot => {
 
            livros.push(childSnapshot.val());
        });
    
        GetAllLivros();
    });
 }
 //GET ALL TEMPO REAL
 function GetAllLivros(){
    const dbref = ref(db, "livros");
 
    onValue(dbref,(snapshot)=>{
        var livros =[];
        snapshot.forEach(childSnapshot => {
 
            livros.push(childSnapshot.val());
        });
 
        GetAllEmprestimos(livros);
    })
 }
 function GetAllEmprestimos(livros){
     const dbref = ref(db, "emprestimos");
  
     onValue(dbref,(snapshot)=>{
         var emprestimos =[];
         snapshot.forEach(childSnapshot => {
  
             emprestimos.push(childSnapshot.val());
         });
  
         AddGrafico(livros, emprestimos);
     })
  }
 
 window.onload = GetAllDataOnce;