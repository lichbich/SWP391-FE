import axios from '../../axios'

export const getProdcutList = (params) => {
    return axios.get('/product', { params })
}

export const getProdcutListByCategory = (params) => {
    return axios.get('/product/getByCategory', { params })
}

export const getProdcutNoneBestSeller = (params) => {
    return axios.get('/product/none-best-seller', { params })
}

export const getProdcutBestSeller = (params) => {
    return axios.get('/product/best-seller', { params })
}

export const addBestSellerTagApi = (id) => {
    return axios.get(`/product/add-best-seller/${id}`)
}

export const removeBestSellerTagApi = (id) => {
    return axios.get(`/product/remove-best-seller/${id}`)
}

export const getCategory = () => {
    return axios.get('/category')
}

export const createProduct = (formData) => {
    return axios.post('/product', formData)
}

export const updateProduct = (formData, id) => {
    return axios.post(`/product/update/${id}`, formData)
}

export const getCategoryList = (params) => {
    return axios.get("/category", { params })
}

export const createCategory = (formData) => {
    return axios.post("/category", formData)
}

export const updateCategory = (formData) => {
    return axios.post("/category/update", formData)
}

export const deleteCategory = (id) => {
    return axios.delete(`/category/delete/${id}`)
}

export const getOrderList = (params) => {
    return axios.get("/order", { params })
}

export const approveOrder = (id) => {
    return axios.get(`/order/approve/${id}`)
}

export const cancelOrder = (id) => {
    return axios.get(`/order/cancel/${id}`)
}

export const shippingOrder = (id) => {
    return axios.get(`/order/shipping/${id}`)
}

export const completeOrder = (id) => {
    return axios.get(`/order/complete/${id}`)
}

export const updateUser = (formData) => {
    return axios.post("/user/update", formData)
}

export const changeUserPassword = (formData) => {
    return axios.post("/user/change-password", formData)
}