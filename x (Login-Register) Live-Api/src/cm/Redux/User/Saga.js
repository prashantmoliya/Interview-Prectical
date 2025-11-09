// import { call, put, takeLatest } from 'redux-saga/effects'
// import { GET_USER_REQUEST } from './ActionType';

// function* getuserdata(){
//     try{
//         const res= yield call(process.env.REACT_APP_BashURL, `/reduxsagauser`);

//         console.log("data=>++", res);

//     } 
//     catch(err){
//         console.error("error=>++", err);
//     }
// }

// function* Saga(){
//     yield takeLatest(GET_USER_REQUEST, getuserdata);
// }

// export default Saga;