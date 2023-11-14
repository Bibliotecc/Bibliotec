// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

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
    
    var user = "!logado";
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
    if(keepLoggedIn == "yes"){
        user = JSON.parse(localStorage.getItem('user'));
        var Rm = user.usuRM;
    }
        const db = getDatabase();
        const corpo = document.getElementById('corpo');
        function AddItemToTable(nomeLivro, rm, dataDevolu, idEmprestimo, statusEmp) {
            if(rm == Rm){
                const tr = document.createElement("tr");
                const tdNomeLivro = document.createElement("td");
                        tdNomeLivro.innerText = nomeLivro;
                const tdPrazo= document.createElement("td");
                        tdPrazo.innerText = dataDevolu;
                const tdAtraso = document.createElement("td");
                        tdAtraso.innerText = "--";
                const tdStatusEmp= document.createElement("td");
                        tdStatusEmp.innerText = statusEmp;

                corpo.appendChild(tr);
            }
            else{
                console.log("RM falho");
            }
        }

        function AddAllItemToEmprestimos(emprestimos){
            corpo.innerHTML="";
            emprestimos.forEach(element => {
                AddItemToTable(element.livro, element.rm, element.dataDevolu, element.idEmprestimo, element.statusEmp);
         
            });
           }
        function GetAllDataOnce() {
            const dbref = ref(db, "emprestimos");

            onValue(dbref, (snapshot) => {
                const emprestimos = [];
                snapshot.forEach(childSnapshot => {
                    emprestimos.push(childSnapshot.val());
                });

                AddAllItemToEmprestimos(emprestimos);
            });
        }
        GetAllDataOnce();

            

