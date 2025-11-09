let id = localStorage.getItem("edit-id");
if(!id){
    window.location.href= "View.html";
}


let HandleEdit = async () => {
    try {
        let edit= await axios.get(`http://localhost:4000/user/${id}`);
        console.log("Edit Api++", edit);

        if(edit.status== 200){
            console.log("Edit Api++", edit);
            
            ShowForm(edit.data)
        }
    }
    catch (e) {
        console.log("Edit Api Error++", e);

        if(e.message== "Network Error"){
            console.log("Edit Api Error++", e.message);

            let errmsg= `
                            <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.message}</div>
                        `;

            document.getElementById("error").innerHTML= errmsg;
        }
        else if(e.response.status== 404){
            console.log("Edit Api Error++", e.response.data, ",", e.message);

            let errmsg= `
                            <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.message}</div>
                        `;

            document.getElementById("error").innerHTML= errmsg;

            setTimeout(()=>{
                let errmsg= `
                            <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.response.data}</div>
                        `;

                document.getElementById("error").innerHTML= errmsg;
            }, 5000);
        }
        else{
            document.getElementById("error").innerHTML= null;
        }
    }
}

let ShowForm = (data) => {
    document.getElementById('id').value = data.id;
    document.getElementById('name').value = data.name;
    document.getElementById('email').value = data.email;
    document.getElementById('password').value = data.password
    document.getElementById('phone').value = data.phone;
}

let HandleUpdate = async () => {
    if (window.confirm("Do You Want to Update?")) {
        try {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let phone = document.getElementById("phone").value;

            let obj = {
                name: name,
                email: email,
                password: password,
                phone: phone,
            };

            let put= await axios.put(`http://localhost:4000/user/${id}`, obj)

            if(put.status== 200){
                console.log("Update Api++", put);

                window.location.href= "View.html";

                localStorage.removeItem("edit-id");
            }

            document.getElementById('name').value= "";
            document.getElementById('email').value= "";
            document.getElementById('password').value= "";
            document.getElementById('phone').value= "";
        }
        catch (e) {
            console.log("Update Api Error++", e);

            if(e.message== "Network Error"){
                console.log("Update Api Error++", e);
                
                let errmsg= `
                                <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.message}</div>
                            `;

                document.getElementById("error").innerHTML= errmsg;
            }
            else if(e.response.status== 404){   
                console.log("Update Api Error++", e.response.data, ",", e.message);

                let errmsg= `
                                <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.message}</div>
                            `;

                document.getElementById("error").innerHTML= errmsg;

                setTimeout(()=>{
                    let errmsg= `
                                <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.response.data}</div>
                            `;

                    document.getElementById("error").innerHTML= errmsg;
                },5000);
            }
            else{
                document.getElementById("error").innerHTML= null;
            }
        }
    }
}

let HandleBack = () =>{
    window.location.href= "View.html";

    localStorage.removeItem("edit-id");
}

HandleEdit();