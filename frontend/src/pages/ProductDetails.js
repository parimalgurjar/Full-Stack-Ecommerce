import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa6";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCard from '../helpers/addToCard';
import Context from '../context';


const ProductDetails = () => {
    const[data,setData]=useState({
        productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
    })
    const params=useParams()
    
    const [loading,setLoading]=useState(false)
    const[zoomImage,setZoomImage]=useState(false)

    const productImageListLoading=new Array(4).fill(null)
    const navigate=useNavigate()
const [activeImage,setActiveImage]=useState("")
    const fetchProductDetails=async()=>{
        setLoading(true)
        const response=await fetch(SummaryApi.productDetails.url,{
            method:SummaryApi.productDetails.method,
            headers:{
                "content-type":"application/json",

            },
            body:JSON.stringify({
                productId:params?.id
            })

        })
       setLoading(false)
        const dataResponse=await response.json()
        
        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
    }
    useEffect(()=>{
        fetchProductDetails()
    },[params])

    const handleMouseEnterProduct=(imageUrl)=>{
      setActiveImage(imageUrl)


    }
    
    const [zoomImageCoordinate,setZoomImageCoordinate]=useState({
      x:0,
      y:0
    })
    
    const handleZoomEffect = (e) => {
      setZoomImage(true)
      const { left, top, width, height } = e.target.getBoundingClientRect();
    
      // Calculate the relative cursor position as percentages
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
    
      setZoomImageCoordinate({ x, y });

    };
    const handleZoomOut=()=>{
      setZoomImage(false)
    }
    const {fetchUserAddToCart }=useContext(Context)


    const handleAddToCart=async(e,id)=>{
      await addToCard(e,id)
      fetchUserAddToCart()
    }
    const handleBuyProduct=async(e,id)=>{
      await addToCard(e,id)
      fetchUserAddToCart()
      navigate("/cart")
    }
    
    return (
        <div className="container p-4 mx-auto">
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            
            {/* Smaller Images on the Left */}
            <div className="flex flex-col gap-2">
              {loading ? (
                <div className="flex flex-col gap-2 overflow-scroll scroll-bar-none h-full">
                  {productImageListLoading.map((el, index) => (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 scroll-bar-none h-full overflow-scroll scroll-bar-none  scroll-bar">
                  {data.productImage.map((imageUrl, index) => (
                    <div key={index} className="h-20 w-20 bg-slate-200 rounded p-1">
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={()=>handleMouseEnterProduct(imageUrl)}
                        onClick={()=>handleMouseEnterProduct(imageUrl)}

                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Larger Image in the Center */}
            <div className="flex-shrink-0 h-[400px] w-[400px] lg:h-[96] lg:w-[96] bg-slate-200 relative p-4">
              <img src={activeImage} alt='' className=' h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomEffect}
              onMouseLeave={handleZoomOut}
                  
/>
              {/**Product zoom */}
              {
                zoomImage &&(
              <div className="hidden lg:block absolute min-h-[400px] p-1 min-w-[400px] top-0 -right-[410px] bg-slate-200"
>
  <div
    className="h-full w-full mix-blend-multiply min-h-[400px] min-w-[400px]"
    style={{
      backgroundImage: `url(${activeImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`,


      backgroundSize: '200%',
    }}
  ></div>
</div>

                )
              }

            </div>
            
            {/* Product Details on the Right */}
            <div className="flex-1 space-y-3">
    {/* Product Name */}
    <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">{data.productName}</h2>
    
    {/* Brand Name */}
    <p className="text-sm font-semibold text-red-600 bg-red-200 rounded-full px-2 inline-block">{data.brandName}</p>
    <p className='capitalize'>{data.category}</p>
    <div className='flex items-center gap-1 text-yellow-500'>
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    </div>
    
    {/* Price Section */}
    <div className="flex items-center space-x-4">
        <p className="text-2xl font-bold text-red-600">₹{data.sellingPrice}</p>
        <p className="text-lg line-through text-gray-400">₹{data.price}</p>
        <p className="text-lg text-green-600 font-semibold">
            {Math.round(((data.price - data.sellingPrice) / data.price) * 100)}% off
        </p>
    </div>
    <div className='space-x-5 items-center'>
      <button className='border-2 border-red-600 min-w-[100px] rounded px-3 py-1 text-red-600 font-semibold hover:bg-red-600 hover:text-white'onClick={(e)=>handleBuyProduct(e,data._id)}>Buy</button>
      <button className='border-2 border-red-600 min-w-[100px] rounded px-3 py-1  bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600'onClick={(e) => handleAddToCart(e, data._id)} >Add to cart</button>
    </div>
    
    {/* Description */}
    <div className='my-4'>
    <p className='font-semibold'>Product Description</p>
    <p className="text-gray-700 leading-relaxed">{data.description}</p>
    </div>
</div>

            
          </div>
          {
            data.category&&(

              <CategoryWiseProductDisplay category={data.category} heading={"Recommended Products"}/>
            )
          }

        </div>
      );
      
      
}

export default ProductDetails
