let HandleSubmit = async () => {
    try {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let phone = document.getElementById('phone').value;

        let obj = {
            name: name,
            email: email,
            password: password,
            phone: phone,
        };

        let post= await axios.post("http://localhost:4000/user", obj);

        if(post.status== 201){
            console.log("Post Api++", post);

            window.location.href= "View.html";
        }

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("phone").value = "";
    }
    catch (e) {
        console.log("Post Api Error++", e);

        if(e.message== "Network Error"){
            console.log("Post Api Error++", e.message);

            let errmsg= `
                            <div class="alert alert-danger text-center text-danger fw-bold p-2" role="alert">${e.message}</div>
                        `;

            document.getElementById("error").innerHTML= errmsg;
        }
        else if(e.response.status== 404){
            console.log("Post Api Error++", e.response.data, ",", e.message);

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