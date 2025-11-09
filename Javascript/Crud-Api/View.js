let HandleGet = async () => {
    try {
        let get= await axios.get("http://localhost:4000/user");

        if(get.data.length== 0){
            document.getElementById('nodata').innerHTML= "No Data";
            document.getElementById('nodata').style.fontWeight= "bold";
            document.getElementById('nodata').style.fontSize= "23px";
        }
        else if(get.status== 200){
            console.log("Get Api++", get);

            ShowTbl(get.data);
        }
    }
    catch (e) {
        console.log("Get Api Error++", e);

        if(e.message== "Network Error"){
            console.log("Get Api Error++", e.message);

            document.getElementById("nodata").innerHTML= e.message;
            document.getElementById("nodata").style.color= "red";
            document.getElementById("nodata").style.fontWeight= "bold";
            document.getElementById("nodata").style.fontSize= "23px";
        }
        else if(e.response.status== 404){
            console.log("Get Api Error++", e.response.data, ",", e.message);
            
            document.getElementById("nodata").innerHTML= e.message;
            document.getElementById("nodata").style.color= "red";
            document.getElementById("nodata").style.fontWeight= "bold";
            document.getElementById("nodata").style.fontSize= "23px";

            setTimeout(() => {
                document.getElementById("nodata").innerHTML= e.response.data;
            }, 10000);
        }
        else{
            document.getElementById("nodata").innerHTML= null;
        }
    }
}


let ShowTbl = (data) => {
    let tbl = "";

    tbl += `    
            <thead class="bg-dark text-white">
                <tr>
                    <td>Sr No.</td>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Password</td>
                    <td>Phone</td>
                    <td>Action</td>
                </tr>       
            </thead>
           `;

    data.map((i, index) => {
        return (
            tbl += `
                    <tr>
                        <td>${index + 1}.</td>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td>${i.email}</td>
                        <td>${i.password}</td>
                        <td>${i.phone}</td>
                        <td>
                            <button class="btn btn-primary" onclick="HandleEdit('${i.id}')">Edit</button>
                            &nbsp; | &nbsp;
                            <button class="btn btn-danger" onclick="HandleDelete('${i.id}')">Delete</button>

                        </td>
                    </tr>
                  `
        );
    });

    document.getElementById('datashow').innerHTML = tbl;
}


let HandleDelete = async (Did) => {
    if (window.confirm("Do You Want to Delete?")) {
        try {
            let del= await axios.delete(`http://localhost:4000/user/${Did}`);

            if(del.status== 200){
                console.log("Delete Api++", del);

                HandleGet();
            }
        }
        catch (e) {
            console.log("Delete Api Error++", e);

            if(e.response.status== 404){
                console.log("Delete Api Error++", e.response.data, ",", e.message);

                document.getElementById("delete-error").innerHTML= e.message;

                setTimeout(()=>{
                    document.getElementById("delete-error").innerHTML= e.response.data;
                },5000);
            }
            else{
                document.getElementById("delete-error").innerHTML= null;
            }
        }
    }
}


let HandleEdit = async (Eid) => {
    try {
        localStorage.setItem("edit-id", Eid);

        window.location.href = "Update.html";
    }
    catch (e) {
        console.log("Edit Error++", e);
    }

}

HandleGet();
