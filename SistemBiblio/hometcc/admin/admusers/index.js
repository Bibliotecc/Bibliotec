import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, update, child, get } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

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


async function upload() {
    var files = document.getElementById('file_upload').files;
    if (files.length == 0) {
        alert("Não Existe nenhum arquivo");
        return;
    }

    try {
        var result = await excelFileToJSON(files[0]);

        console.log(result);

        var usuarios = {};
        var telefones = {}; 

        // Normalizar os dados
        Object.values(result).forEach(item => {
            var usuario = {
                usuRM: item.RM,
                usuNome: item.usuNome,
                usuDataNasc: item.usuDataNasc,
                typeUser: "leitor",
                password: "",
                primAcesso: true,
                usuEmailInstitucional: item.usuEmailInst
            };
            usuarios[item.RM] = usuario;

            var telefone = {
                usuRM: item.RM,
                usuTelefone: item.usuTel,
                usuCelular: item.usuCel
            };
            telefones[item.RM] = telefone;

        });

        // Inserir dados normalizados no Firebase
        const dbref = ref(db);

        update(child(dbref, "UsuarioAutomatico/"), {usuarios});
        update(child(dbref, "UsuarioAutomatico/"), {telefones});

        alert("Dados normalizados inseridos no Firebase!");
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao processar arquivo Excel.");
    }
}


function excelFileToJSON(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
            try {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var result = {};
                workbook.SheetNames.forEach(function (sheetName) {
                    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        roa.forEach(function (item) {
                            const rm = item.RM;
                            const email = item[Object.keys(item)[5]];
                            const emaili = item[Object.keys(item)[6]];
                            console.log(item['Data de Nasc.']);
                            const dataNascimento = converterNumeroParaData(item['Data de Nasc.']);

                            // Atribui novas propriedades
                            item['usuNome'] = item.Nome;
                            item['usuDataNasc'] = dataNascimento;
                            item['usuTel'] = item.Telefone;
                            item['usuCel'] = item.Celular;
                            item['usuEmailInst'] = emaili;
                            item['typeUser'] = "leitor";
                            item['password'] = "";
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
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}


function converterNumeroParaData(numero) {
    const dataExcel = XLSX.SSF.parse_date_code(numero); // FUNÇÃO QUE EU TO FALANDO
    const dia = dataExcel.d.toString().padStart(2, '0');
    const mes = (dataExcel.m).toString().padStart(2, '0');

    const ano = dataExcel.y;

    console.log(dia + "/" + mes + "/" + ano);
    
    return `${dia}/${mes}/${ano}`;
}
//-------------------------------------------------------

//EVENTOS
uplaund.addEventListener('click', upload);
