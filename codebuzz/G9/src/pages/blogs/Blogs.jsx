import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./Blogs.scss"

// Image
import Blogs1 from "../../assets/images/blog/blog1.svg";
import Blogs2 from "../../assets/images/blog/blog2.svg";
import Blogs3 from "../../assets/images/blog/blog3.svg";
import Blogs4 from "../../assets/images/blog/blog4.svg";
import Blogs5 from "../../assets/images/blog/blog5.svg";
import Blogs6 from "../../assets/images/blog/blog6.svg";

import { reqtoGetBlogs, reqtoGetMedia } from '../../redux-Toolkit/services/BlogsServices';

import Pagination from '../../components/pagination/Pagination';

import DOMPurify from 'dompurify';


const Blogs = () => {

    const { type } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogs = useSelector((state) => state.Blogs);
    const { loader, blogsList, blogsListPagination, mediaList, mediaListPagination } = blogs;
    console.log(blogsList);

    const [currentPage, setCurrentPage] = useState(1);



    const GetBlogs = async (page) => {
        await dispatch(reqtoGetBlogs({ page, perPage: 9 }));
    }

    const GetMedia = async (page) => {
        await dispatch(reqtoGetMedia({ page, perPage: 9 }));
    }

    useEffect(() => {
        if (type === "blogs") {
            GetBlogs(currentPage);
        } else {
            GetMedia(currentPage);
        }
    }, [type, currentPage]);

    return (
        <>

            {/* ------ Blogs Start ------ */}
            <div className="blogs pd-x">
                <div className="blogs_top_content d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className='mb-0'>Blogs / Media</h6>

                        <h4>Explore Our Latest Blogs / Media Articles</h4>

                        <p className='mb-0'>
                            Stay informed and inspired with our blogs / media articles
                        </p>
                    </div>

                    <div className='blogs_group d-flex'>
                        <button
                            type='button'
                            className={`blogs-toggle ${type === "blogs" ? 'active' : ''}`}
                            onClick={() => {
                                navigate("/blogs-media/blogs");
                                setCurrentPage(1);
                            }}
                        >
                            <span>Blogs</span>
                        </button>
                        <button
                            type='button'
                            className={`blogs-toggle ${type === "media" ? 'active' : ''}`}
                            onClick={() => {
                                navigate("/blogs-media/media");
                                setCurrentPage(1);
                            }}
                        >
                            <span>Media</span>
                        </button>
                    </div>
                </div>

                <div className="row g-5">
                    {/* {
                        BlogsData?.map((i, index) => {
                            return (
                                <div className="col-lg-4" key={index}>
                                    <div className="blog_box">
                                        <div className="image">
                                            <img src={i.image} alt={i.name} className='img-fluid' draggable={false} />
                                        </div>

                                        <div className="detail text-center">
                                            <div className="name">{i.name}</div>

                                            <p>
                                                {i.description}
                                            </p>

                                            <button type='button' className='main_btn read_more' onClick={() => navigate(`/blogs-details/1`)}>
                                                READ MORE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    } */}


                    {
                        type === "blogs" ? (
                            blogsList?.length > 0 ? (
                                blogsList?.map((i, index) => {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <div className="blog_box d-flex flex-column h-100">
                                                <div className="image">
                                                    <img src={i.image} alt={i.title} className='img-fluid' draggable={false} />
                                                </div>

                                                <div className="detail text-center d-flex flex-column flex-grow-1">
                                                    <div>
                                                        <div className="name">{i.title}</div>

                                                        <p>
                                                            {/* {i.description} */}
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(i?.description) }}
                                                            />
                                                        </p>

                                                    </div>

                                                    <button
                                                        type='button'
                                                        className='main_btn read_more mt-auto mx-auto'
                                                        onClick={() => navigate(`/blogs-details/${i?.id}`)}
                                                    >
                                                        READ MORE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='blog_box nodata text-center'>
                                    <div className="detail my-5 "><span className='name'>Blogs Data found</span></div>
                                </div >
                            )
                        ) : (
                            mediaList?.length > 0 ? (
                                mediaList?.map((i, index) => {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <div className="blog_box d-flex flex-column h-100">
                                                <div className="image">
                                                    <img src={i.image} alt={i.title} className='img-fluid' draggable={false} />
                                                </div>

                                                <div className="detail text-center d-flex flex-column flex-grow-1">
                                                    <div>
                                                        <div className="name">{i.title}</div>

                                                        <p>
                                                            {/* {i.description} */}
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(i?.description) }}
                                                            />
                                                        </p>
                                        
                                                    </div>

                                                    <button
                                                        type='button'
                                                        className='main_btn read_more mt-auto mx-auto'
                                                        onClick={() => window.open(`${i?.redirectUrl}`, "_blank")}
                                                    >
                                                        READ MORE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='blog_box nodata text-center'>
                                    <div className="detail my-5 "><span className='name'>Media Data found</span></div>
                                </div >
                            )
                        )
                    }

                    {
                        (type === "blogs" ? blogsList?.length > 0 : mediaList?.length > 0) && (
                            <Pagination
                                pagination={type === "blogs" ? blogsListPagination : mediaListPagination}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        )
                    }

                </div >
            </div >
            {/* ------ Blogs End ------ */}

        </>
    )
}

export default Blogs;




const BlogsData = [
    {
        image: Blogs1,
        name: "Golden Chain Crafting -  Premium Quality Gold",
        description: "Discover the elegance of timeless craftsmanship with our Golden Chain Crafting service.",
    },
    {
        image: Blogs2,
        name: "Timeless Elegance: The Allure of Golden Rings",
        description: "Golden rings have symbolized love, power, and prestige for centuries.",
    },
    {
        image: Blogs3,
        name: "The Art of Layering: Styling Necklaces Like a Pro",
        description: "Layering necklaces is a trend that’s here to stay. Find out the do’s and don’ts for stacking.",
    },
    {
        image: Blogs4,
        name: "Golden Chain Crafting -  Premium Quality Gold",
        description: "Discover the elegance of timeless craftsmanship with our Golden Chain Crafting service. ",
    },
    {
        image: Blogs5,
        name: "Timeless Elegance: The Allure of Golden Rings",
        description: "Golden rings have symbolized love, power, and prestige for centuries.",
    },
    {
        image: Blogs6,
        name: "The Art of Layering: Styling Necklaces Like a Pro",
        description: "Layering necklaces is a trend that’s here to stay. Find out the do’s and don’ts for stacking.",
    },
]