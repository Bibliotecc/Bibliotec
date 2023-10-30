import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC95RHcPl1VhNT484rnwWDaE_E8cC_q4ZQ",
    authDomain: "tccsb-39f62.firebaseapp.com",
    projectId: "tccsb-39f62",
    storageBucket: "tccsb-39f62.appspot.com",
    messagingSenderId: "446535834077",
    appId: "1:446535834077:web:b43e6da142918afae53e34",
    measurementId: "G-QFJFTQ66ZC"
};

// Inicia Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var uplaund = document.getElementById("uplaund");


function upload() {
    var files = document.getElementById('file_upload').files;
    if (files.length == 0) {
        alert("Não Existe nenhum arquivo");
        return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    } else {
        alert("Formato de arquivo não é válido. Confira a extensão");
    }
}


function excelFileToJSON(file) {
    try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    roa.forEach(function (item) {
                        const rm = item.RM;
                        const email = item[Object.keys(item)[5]];
                        const emaili = item[Object.keys(item)[6]];
                        const dataNascimento = converterNumeroParaData(item['Data de Nasc.']);

                        // Atribui novas propriedades
                        item['usuNome'] = item.Nome;
                        item['usuDataNasc'] = dataNascimento;
                        item['usuTel'] = item.Telefone;
                        item['usuCel'] = item.Celular;
                        item['usuEmailPart'] = email;
                        item['usuEmailInst'] = emaili;
                        item['typeUser'] = "leitor";
                        item['password'] = "@"+dataNascimento.replace(/\//g, "");
                        item['primAcesso'] = true;
                        // Exclui a propriedades originais
                        delete item['Nome'];  
                        delete item['Data de Nasc.'];
                        delete item['Telefone'];  
                        delete item['Celular'];
                        delete item['e-mail'];  
                        delete item['e-mail institucional'];

                        result[rm] = item;
                    });
                }
            });

            // Inserindo dados no Firebase
            update(ref(db,"UsuárioAutomatico/"), result)
                .then(() => {
                    console.log(result);
                    alert("Deu certo!");
                    
                })
                .catch((error) => {
                    alert("ERRO:" + error);
                });
        };
    } catch (e) {
        console.error(e);
    }
}


function converterNumeroParaData(numero) {

    const dataExcel = new Date((numero - 1) * 24 * 60 * 60 * 1000);
    const dia = dataExcel.getDate().toString().padStart(2, '0');
    const mes = (dataExcel.getMonth() + 1).toString().padStart(2, '0');


    // Número de série do Excel para data base (1 de janeiro de 1900)
const dataBaseExcel = new Date(1900, 0, 1);

    // Adiciona o número de dias correspondente ao número de série do Excel
    const dataExcel2 = new Date(dataBaseExcel.getTime() + (numero - 1) * 24 * 60 * 60 * 1000);
    const ano = dataExcel2.getFullYear();
    console.log(dia+"/"+mes+"/"+ano);

    return `${dia}/${mes}/${ano}`;
}



//EVENTOS
uplaund.addEventListener('click', upload);
