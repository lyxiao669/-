<template>
  <div class="home">
    <el-container>

      <el-header class="header-contailner" height="auto">
        <Header @changeCate="changeCate"></Header>
      </el-header>

      <el-container>

        <!-- <el-aside width="200px">
          <Aside></Aside>
        </el-aside> -->

        <el-aside width="200px">
          <div class="new-list">
            <div class="loading-block" v-loading="loadingNew">加载块</div>
            <div class="new-item" v-for="(item, index) in data.newList.slice(0, 30)" :key="index">
              <div class="title">{{ item.product_name_cn }}</div>
              <el-image class="img" style=" height: 100px" :src="item.banner_abbr_url" fit="cover"
                @click="toDetail(item)" />
              <div class="price">￥{{ Number(item.product_price_original).toFixed(2) }}</div>
              <div class="pro-id">No:{{ item.id }}</div>
              <div class="code-content">
                <div>#{{ item.code_id }}</div>
                <div>u:{{ item.user_id }}</div>
              </div>
            </div>
          </div>
        </el-aside>

        <el-main class="main-contailner">

          <div class="product-list" v-loading="loading">
            <div class="item" v-for="(item, index) in data.products" :key="index">
              <div class="title">{{ item.product_name_cn }}</div>
              <el-image class="img" style=" height: 100px" :src="item.banner_abbr_url" fit="cover"
                @click="toDetail(item)" />
              <div class="price">￥{{ Number(item.product_price_original).toFixed(2) }}</div>
              <div class="pro-id">No:{{ item.id }}</div>
              <div class="code-content">
                <div>#{{ item.code_id }}</div>
                <div>u:{{ item.user_id }}</div>
              </div>
            </div>
          </div>
        </el-main>

      </el-container>
    </el-container>
    <!-- <div class="get-notice" @click="getNotice">获取公告</div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
};
</script>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { getProduct, getProductDetail } from '@/apis';
import Header from '@/components/layout/header/index.vue'
import Aside from '@/components/layout/aside/index.vue'
import { baseUrl } from '@/config/index'


let loading = ref(false)
let loadingNew = ref(false)
let data = reactive<{
  products: ProductModel[],
  newList: ProductModel[],
  newId: '',
}>({
  products: [],
  newList: [],
  newId: '' as any
})
const getData = async (skuId: number, series_id: number | null) => {
  loading.value = true
  let productsRes = await getProduct({
    product_type: 2,
    skus: skuId,
    series: series_id,
    from_id: 0,
    limit: 100,
    price_sort: 'asc'
  })
  loading.value = false
  data.products = productsRes.data
  return productsRes.data
}

const getDefData = async (skuId: number, series_id: number | null) => {
  loading.value = true
  let productsRes = await getProduct({
    product_type: 2,
    skus: skuId,
    series: series_id,
    from_id: 0,
    limit: 12,
  })
  loading.value = false
  return productsRes.data
}

// 分类切换
const changeCate = (skuId: number, series_id: number) => {
  getData(skuId, series_id)
}

const refreshData = () => {
  getData(-1, -1)
}

const toDetail = (row: ProductModel) => {
  console.log('row', row.id)
  let price = Number(row.product_price_original)
  // 跳转详情
  // window.open(`${baseUrl}/pages/market/sale-detail?id=${row.id}`)
  // 跳转付款页面
  window.open(`${baseUrl}/pages/asset/paymentmode?productid=${row.id}&amount=${price}&merchandiseType=${row.product_type}&cName=${row.product_name_cn}`)

}

// 获取最新数据
const getNewProduct = async (id: number) => {
  let newRes = await getProductDetail({
    product_type: 2,
    product_id: id
  }) as any
  if (newRes.id) {
    let isRepeat = data.newList.some(item => item.id == newRes.id)
    if (!isRepeat) {
      data.newList.unshift(newRes)
    }
  }
  return newRes
}

let timer = setInterval(async () => {
  loadingNew.value = true
  let num = 0
  if (data.newId) {
    num = await data.newId
  }
  for (let i = num; i < num + 10; i++) {
    await getNewProduct(i)
  }
  data.newId = data.newList[0].id as any
  loadingNew.value = false
}, 5000)

onMounted(async () => {
  getData(-1, -1)
  // 获取默认列表，取第1个id
  let proRes = await getDefData(-1, -1)
  let latest = proRes[0]
  data.newId = latest.id
  // clearInterval(timer)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  background: #FFF;
  padding: 15px;
  border-radius: 15px;
  height: 75vh;
  overflow: scroll;
  overflow-x: auto;
}

.item {
  background: #e1dfdd;
  border-radius: 5px;

  .title {
    width: 100%;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;
  }

  .price {
    text-align: center;
    font-size: 14px;
    color: #d83b01;
  }
}

.img {
  transition: transform 200ms;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  width: 100%;
}

.code-content {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}


.item:hover {
  .img {
    // transform: scale(1.05);
  }
}

.main-contailner {
  padding: 0;
  margin-right: 15px;
}

.header-contailner {
  padding: 0;
}

// 最新列表
.new-list {
  margin: 0 10px;
  background: #FFFFFF;
  padding: 15px;
  border-radius: 15px;
  font-size: 14px;
  height: 75vh;
  overflow-y: scroll;

  .price {
    text-align: center;
    color: #d83b01;
  }
}

.new-item {
  margin-bottom: 15px;
  background: #e1dfdd;
  border-radius: 5px;

  .title {
    width: 100%;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 999;
  }
}

.pro-id {
  text-align: center;
  font-size: 14px;
}

.loading-block{
  padding: 10px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .product-list {
    display: grid;
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 400px) {
  .product-list {
    display: grid;
    grid-template-columns: auto;
  }
}
</style>