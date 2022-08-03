import axios from "axios"
import request from "../utils/requestProcess"

// 获取寄售藏品列表
export const getProduct = async(params: any) => {
  return request.get('/api/Org/Unimart/Product/getListProductNFT',{
    params: params
  })
}

// 获取一级分类
export const getCategory = async(params: any) => {
  return request.get('/api/issuance/getSeriesList',{
    params: params
  })
}

// 获取二级分类
export const getCategoryInfo = async(params: any) => {
  return request.get('/api/issuance/getSkuListBySeriesId',{
    params: params
  })
}

// 获取二级分类
export const getProductDetail = async(params: any) => {
  return request.get('/api/Org/Unimart/Product/getDataOfProduct',{
    params: params
  })
}


