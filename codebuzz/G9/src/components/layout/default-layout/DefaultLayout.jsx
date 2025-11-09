import { Outlet } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import ChatBot from '../../chat-bot/ChatBot';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqtoGetProductCategory, reqtoGetProductSubCategory } from '../../../redux-Toolkit/services/ProductServices';

const DefaultLayout = () => {

    const dispatch = useDispatch();

    const product = useSelector((state) => state.Product);
    const { categoryList, subCategoryList } = product;

    console.log(categoryList, subCategoryList);

    const GetProductCategory = async () => {
        await dispatch(reqtoGetProductCategory());
    }

    const GetProductSubCategory = async () => {
        await dispatch(reqtoGetProductSubCategory());
    }

    useEffect(() => {
        GetProductCategory();
        GetProductSubCategory();
    }, []);

    return (
        <>

            <Header categoryList={categoryList} subCategoryList={subCategoryList} />
            <Outlet />
            <Footer categoryList={categoryList} subCategoryList={subCategoryList} />

            {/* -- Chat-Bot -- */}
            {/* <ChatBot /> */}

        </>
    )
}

export default DefaultLayout;