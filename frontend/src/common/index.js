

const backendDomain=process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"

const SummaryApi={
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:'POST'
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:"POST"
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:"GET"
    },
    logout_user:{
        url:`${backendDomain}/api/userLogout`,
        method:"GET"
    },
    allUser:{
        url:`${backendDomain}/api/all-users`,
        method:"GET"
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:"POST"
    },
    uploadProduct:{
        url:`${backendDomain}/api/upload-product`,
        method:"POST"
    },
    allProduct:{
        url:`${backendDomain}/api/get-product`,
        method:"GET"
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method:"POST"
    },
    categoryProduct:{
        url:`${backendDomain}/api/get-categoryProduct`,
        method:"GET"
    },
    categoryWiseProduct:{
        url:`${backendDomain}/api/category-product`,
        method:"POST"
    },
    productDetails:{
        url:`${backendDomain}/api/product-details`,
        method:"POST"

    },
    addToCart:{
        url:`${backendDomain}/api/addtocart`,
        method:"POST"
    },
    countAddToCartProduct:{
        url:`${backendDomain}/api/countAddToCartProduct`,
        method:"get"
    },
    addToCartProductView:{
        url:`${backendDomain}/api/view-cart-product`,
        method:"get"
    },
    updateCartProduct:{
        url:`${backendDomain}/api/update-cart-product`,
        method:"post"
    },
    deleteCartProduct:{
        url:`${backendDomain}/api/delete-cart-product`,
        method:"post"

    },
    searchProduct:{
        url:`${backendDomain}/api/search`,
        method:"get"
    },
    filterProduct:{
        url:`${backendDomain}/api/filter-product`,
        method:"post"

    },
    payment:{
        url:`${backendDomain}/api/checkout`,
        method:'post'
    }
}

module.exports=SummaryApi