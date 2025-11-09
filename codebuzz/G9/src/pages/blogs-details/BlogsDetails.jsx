import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Css
import "./BlogsDetails.scss"

// Image
import BlogsDetail1 from "../../assets/images/blog/blog-details1.svg";
import { reqtoGetBlogsDetail } from '../../redux-Toolkit/services/BlogsServices';

import DOMPurify from 'dompurify';


const BlogsDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogs = useSelector((state) => state.Blogs);
    const { loader, blogsDetail } = blogs;
    console.log(blogsDetail);


    const GetBlogsDetail = async (id) => {
        await dispatch(reqtoGetBlogsDetail(id));
    }

    useEffect(() => {
        GetBlogsDetail(id);
    }, [id]);

    return (
        <>

            {/* ------ Blogs-Detail Start ------ */}
            <div className="blogs_detail pd-x">
                <h6 className='mb-0'>Blogs Details</h6>

                {/* <h4> Timeless Elegance: The Allure of Golden Rings</h4>

                <div className='blog_image'>
                    <img src={BlogsDetail1} alt className='img-fluid' draggable={false} />
                </div>

                <p>
                    The allure of golden rings lies in their timeless elegance, rich history, and versatile style. These rings, crafted from yellow gold or other gold alloys, have been symbols of luxury and sophistication for centuries, from ancient civilizations to modern fashion. The warm, radiant hue of gold complements various skin tones and suits a wide range of looks—from minimalist bands to intricate vintage designs.
                </p>

                <p>
                    Golden rings embody both tradition and innovation, often worn as symbols of everlasting love and commitment, especially in engagement and wedding rings. They are valued not only for their beauty but also for their durability and resistance to tarnish, making them cherished investment pieces that can be passed down through generations.
                </p>

                <p>
                    Their designs can feature detailed craftsmanship such as milgrain edges, engraving, and floral motifs, reflecting a vintage charm. They can also be paired with colored gemstones to add a personalized splash of color, or combined with other metals for a contemporary, mixed-metal look. Minimalist gold bands offer refined simplicity and can be worn alone or stacked for a modern style.
                </p>

                <p className='mb-0'>
                    In essence, golden rings represent a perfect blend of beauty, symbolism, and quality that makes them a timeless choice for both everyday elegance and special occasions. Their enduring appeal continues to captivate jewelry lovers around the world.
                </p> */}


                {/*  */}

                <h4>{blogsDetail?.title}</h4>

                <div className='blog_image'>
                    <img src={blogsDetail?.image} alt={blogsDetail?.title} className='img-fluid' draggable={false} />
                </div>

                <p className='mb-0'>
                    {/* {blogsDetail?.description} */}
                    <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogsDetail?.description) }}
                    />
                </p>
            </div>

            {/* ------ Blogs-Detail End ------ */}


        </>
    )
}

export default BlogsDetails;