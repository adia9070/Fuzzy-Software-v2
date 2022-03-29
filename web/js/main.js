var U = []

function upload_file(order, formFile){
    const reader = new FileReader();
    document.getElementById("upload_progress_bar"+order.toString()).innerHTML = `
            File is Uploading
            <div class="mt-2 container progress">
                <div class="progress-bar" role="progressbar" 
                style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
        `
    if(formFile.value.endsWith(".csv")){
        reader.readAsText(formFile.files[0]);
        reader.onload =  function(){
            eel.upload_file(order, formFile.value, reader.result)(function(ret){
                if(ret==false){
                    alert("File could not get uploaded!");
                    return false;
                }
                else{
                    U.push(order);
                    document.getElementById("upload_progress_bar"+order.toString()).innerHTML = `
                    FIle is Uploaded!
                    <div class="mt-2 container progress">
                        <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" 
                        aria-valuemin="0" aria-valuemax="100">100%</div>
                     </div>
                    `
                }
            })
        }
    }
    else{
        reader.readAsBinaryString(formFile.files[0])
        reader.onload = function(){
            data = reader.result;
            const workbook = XLSX.read(data, {type:"binary"});
            workbook.SheetNames.forEach(sheet=>{
                const rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                const jsonObject = JSON.stringify(rowObject);
                eel.upload_file(order, formFile.value, jsonObject)(function(ret){
                    if(ret==false){
                        alert("File could not get uploaded!");
                        return false;
                    }
                    else{
                        U.push(order);
                        document.getElementById("upload_progress_bar"+order.toString()).innerHTML = `
                            File is Uploaded!
                            <div class="mt-2 container progress">
                                <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" 
                                aria-valuemin="0" aria-valuemax="100">100%</div>
                            </div>
                        `
                    }
                })
            })
        }
    }
}

function handle_files(){
    upload_file(1, document.getElementById("formFile1"));
    upload_file(2, document.getElementById("formFile2"));
    upload_file(3, document.getElementById("formFile3"));
    upload_file(4, document.getElementById("formFile4"));
    let t = setInterval(() => {
        if (U.length == 4){
            exec_code()
            U = [];
            clearInterval(t);
        }
    }, 1000)
}

async function exec_code(){
    document.getElementById("upload_progress_bar5").innerHTML = `
    <div class="container mt-2">
        Code is Executing
        <div class="mt-2 container progress">
            <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="100" 
            aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>
    </div>
    `
    eel.compute_work()(function(ret){
        if (ret==true){
            document.getElementById("upload_progress_bar5").innerHTML = `
            <div class="container mt-2">
                Code is Executed!
                <div class="mt-2 container progress">
                <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" 
                aria-valuemin="0" aria-valuemax="100">100%</div>
                </div>
            </div>
            `
        }
        else{
            alert("some error occured");
        }
    });
}
