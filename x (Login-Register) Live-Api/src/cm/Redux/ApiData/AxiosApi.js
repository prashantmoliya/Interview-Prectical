import axios from "axios";
import { getdataerror, getdatarequest, getdatasuccess } from "./Action";


export const getapi = (search, select) => {
    return (async (dispatch)=>{
        dispatch(getdatarequest());

        try{
            const res= await axios.get("https://dummyjson.com/products");

            console.log("Dummy Api Get++", res);

            if(res.status== 200) {

                const filterdata= res.data.products.filter((i)=>{
                    return (
                        (i.category.includes(select)) &&
                        (i.category.toLowerCase().includes(search.toLowerCase()) ||
                         i.brand.toLowerCase().includes(search.toLowerCase()) ||
                         i.title.toLowerCase().includes(search.toLowerCase()) ||
                         i.description.toLowerCase().includes(search.toLowerCase()))
                    )
                })

                dispatch(getdatasuccess(filterdata));
            }
        } 
        catch(error){
            console.error("Dummy Api Get Error++", error);

            if(error?.response?.status== 404){
                dispatch(getdataerror(error.message));
            }
        }
    })
}