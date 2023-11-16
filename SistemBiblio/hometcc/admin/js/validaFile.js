function dropHandler(ev) {
    console.log("Arquivos Dropados!");

    // Impedir o comportamento padrão (que o arquivo seja aberto)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        //Use essa interface para acessar os arquivos
        for(var i = 0; i < ev.dataTransfer.items.length; i++){
            // Se os itens soltos não forem arquivos, rejeita-los
            if (ev.dataTransfer.items[i].kind === "file") {
                var file = ev.dataTransfer.items[i].getAsFile();
                console.log("... arquivo[" + i + "].name = " + file.name);
                Swal.fire("O Arquivo " + file.name + " Foi inserido com sucesso!");
            }
        }
    } else {
        // Usa a interface DataTransfer para acessar o arquivo
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log("... arquivo [" + i + "].name = " + ev.dataTransfer.files[i].name,);
            Swal.fire("Houve um problema na inserção do arquivo\nTente novamente");
        }
    }
}

function dragOverHandler(ev) {
    console.log("Arquivos na Drop Zone");

    // Impedir o comportamento padrão
    ev.preventDefault();
}

// Borda Verde
 
function initApp() {
    const droparea = document.querySelector('.colocar-arquivo');

    const active = () => droparea.classList.add("borda-verde");

    const inactive = () => droparea.classList.remove("borda-verde");

    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive)
    });

    droparea.addEventListener("drop", handleDrop);
}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    console.log(files);
}