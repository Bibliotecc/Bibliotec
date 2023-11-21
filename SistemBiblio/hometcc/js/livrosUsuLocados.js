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
const db = getDatabase();    

//-------------
const pegaData = new Date();

// Obter informações específicas da data (ano, mês, dia, etc.)
const ano = pegaData.getFullYear();
const mes = pegaData.getMonth() + 1; // Lembre-se que os meses começam do zero
const dia = pegaData.getDate();
const dataHoje = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano}`;
//------

    var user = "!logado";
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
           
        const corpo = document.getElementById('corpo');
        function AddItemToTable(nomeLivro, rm, dataDevolu, idEmprestimo, statusEmp) {
            console.log(rm+"||"+Rm);
            if(keepLoggedIn == "yes"){
                user = JSON.parse(localStorage.getItem('user'));
                var Rm = user.usuRM;
                if(rm == Rm){
                    console.log("RM Compatível");
                    const tr = document.createElement("tr");
                    const tdNomeLivro = document.createElement("td");
                            tdNomeLivro.innerText = nomeLivro;
                    const tdPrazo= document.createElement("td");
                            if(statusEmp == "Recusado"){
                                tdPrazo.innerText = "---";
                            }else{
                                tdPrazo.innerText = dataDevolu;
                            }
                    const tdAtraso = document.createElement("td");
                            if(statusEmp == "Recusado"){
                                tdAtraso.innerText = "---";
                            }else{
                                if(dataDevolu < dataHoje){
                                    tdAtraso.innerText = "Sim";
                                }
                                if(dataDevolu > dataHoje){
                                    tdAtraso.innerText = "Não";
                                }       
                            }
                    const tdStatusEmp= document.createElement("td");
                            tdStatusEmp.innerText = statusEmp;

                    
                    tr.appendChild(tdNomeLivro);
                    tr.appendChild(tdPrazo);
                    tr.appendChild(tdAtraso);
                    tr.appendChild(tdStatusEmp);

                    corpo.appendChild(tr);
                }else{
                    console.log("RM Incompatível");
                }
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

            

