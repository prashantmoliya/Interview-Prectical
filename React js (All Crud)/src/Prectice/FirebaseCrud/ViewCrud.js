import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { fb } from '../../fbconfig';

const ViewCrud = () => {

    useEffect(() => {
        Get();
    }, [])

    const [getdata, setgetdata] = useState([]);

    const Get = async () => {
        try{
            const fbc= collection(fb, "Crud");
            const get= await getDocs(fbc);
            
            console.log('Crud Firebase Get++', get)

            const arr = [];

            get.forEach((i) => {
                const obj = {
                    id: i.id,
                    name: i.data().name,
                    email: i.data().email,
                    password: i.data().password,
                    phone: i.data().phone,
                };
                
                arr.push(obj)
            })

            setgetdata(arr);        
        }
        catch(e){
            console.log('Crud Firebase Get Error++', e)
        }
    }


    const HandleDelete = async (Did) => {
        try{
            const fbc = doc(fb, "Crud", Did);
            await deleteDoc(fbc); 

            const del= getdata.filter((i)=> i.id !== Did);
            setgetdata(del);
        }
        catch(e){
            console.log('Crud Firebase Delete Error++', e)
        }
    }

    return (
        <div>

            <div className="card">
                <div className="card-header d-flex justify-content-center" >
                    <Link to={'/Firebase/AddCrud'} className="btn btn-success">Add User [+]</Link>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
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
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>18</td>
                                <td>Virat Kohli</td>
                                <td>virat18@gmail.com</td>
                                <td>2323cheeku</td>
                                <td>9789056789</td>
                                <td>
                                    <Link className="btn btn-primary">Edit</Link>
                                    &nbsp; | &nbsp;
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            {
                                getdata.map((i, index) => {
                                    return (
                                        <tr>
                                            <td>{ index + 1}.</td>
                                            <td>{i.id}</td>
                                            <td>{i.name}</td>
                                            <td>{i.email}</td>
                                            <td>{i.password}</td>
                                            <td>{i.phone}</td>
                                            <td>
                                                <Link to={`/Firebase/UpdateCrud/${i.id}`} className="btn btn-primary">Edit</Link>
                                                &nbsp; | &nbsp;
                                                <button className="btn btn-danger" onClick={()=> HandleDelete(i.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}

export default ViewCrud;
