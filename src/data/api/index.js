import axios from '../../axios'

export const getProdcutList = (params) => {
    return axios.get('/product', { params })
}

export const getProdcutListByCategory = (params) => {
    return axios.get('/product/getByCategory', { params })
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