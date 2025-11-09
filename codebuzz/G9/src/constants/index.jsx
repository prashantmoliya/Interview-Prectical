export const apiendpoints = {
    // Auth
    signUp: "user/signUp",
    signInOrSignUpWithGoogle: "user/signInOrSignUpWithGoogle",

    otpMethod: "user/otpMethod",
    otpVerification: "user/otpVerification",
    resendOtp: "user/resendOtp",

    addressDetail: "user/userAddress",

    signIn: "user/signIn",

    forgetPassword: "user/forgetPassword",
    changePassword: "user/changePassword",

    signOut: "user/signOut",


    // Account
    getProfile: "account/userData",
    editProfile: "account/edit",

    userAddress: "account/userAddress",

    userChangePassword: "changePassword/changePassword",

    getManageAddress: "ManageAddress/list",
    addManageAddress: "user/userAddress",
    editManageAddress: "ManageAddress/edit/:id",
    deleteManageAddress: "ManageAddress/delete/:id",
    setPrimaryManageAddress: "ManageAddress/setPrimary/:id",

    getOrder: "order/list",
    getOrderDetail: "order/alldetails/:id",
    addOrder: "order/order",

    getWishlist: "wishlist/list",
    addWishlist: "wishlist/add",
    deleteWishlist: "wishlist/delete/:id",

    getProductSaved: "productSaved/list",
    addProductSaved: "productSaved/add",
    deleteProductSaved: "productSaved/delete/:id",
    movetoCartProductSaved: "productSaved/movetoCart",


    // Blogs / Media
    getBlogs: "blogs/list",   // ?page=1&perPage=10
    getBlogsDetail: "blogs/detail/:id",
    getMedia: "home/mediaList",   // ?page=1&perPage=10

    // Faq's
    getFaqs: "faq/list",  

    // Contact
    addContact: "contact-us/add",

    // Home
    getOfferbar: "home/offerbarlist",
    getSlider: "slider/list",
    getTopSellingProduct: "products/topSelling",

    // Complaint
    addComplaint: "complaintQuery/add",

    // Policy
    getPolicy: "policy/list",

    // Product
    getProductCategory: "products/Categorylist",
    getProductSubCategory: "products/subCategoryList",    // ?categoryId=8    ?page=1&perPage=10

    getProductMetals: "products/getmetals",
    getProductGoldPurity: "products/getgoldPurity",
    getProductStoneShape: "products/getStoneShape",

    getProductPriceFilter: "products/priceFilter",

    getProductList: "products/productList",     // ?page=1&perPage=10
    getProductDetail: "products/detail/:id",

    // Cart
    getCart: "cart/list",
    addCart: "cart/add",
    cartQty: "cart/cartQty",
    deleteCart: "cart/delete/:id",

    shareProduct: "home/generate",

    // Address & Payment
    getOrderSummary: "cart/orderSummary",
    addAddressDetail: "order/addressDetail",
    paymentFetch: "payment/fetch",

    // ChatBot
    chatBot: "chatBot",
}


/// getTopSellingProduct    