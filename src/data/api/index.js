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