<template>
  <div class="header">
    <div class="check-container">
      <el-dropdown class="drop-down" trigger="click" v-for="(itemFa,index) in cate.cateData" :key="index">
        <el-button type="primary" @click="getCateInfoList(itemFa.id)" :loading="isLoading && current === itemFa.id">
          {{itemFa.title}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu v-if="isShowCateInfo">
            <el-dropdown-item @click="chooseCate(-1,itemFa.id)">全部</el-dropdown-item>
            <template v-for="item in cate.cateInfoData"  >
              <el-dropdown-item @click="chooseCate(item.sku_id,itemFa.id)">
                <div class="chooseItem" >{{item.title}}</div>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    
    </div>
    <div @click="onSetting">
      <el-icon color="#409EFC" class="no-inherit">
        <setting />
      </el-icon>
    </div>
  </div>
  <setting-form ref="settingRef" @refresh="refresh" :append-to-body="true" ></setting-form>

</template>

<script lang="ts">
export default {
  name: 'Header'
}
</script>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import SettingForm from './components/setting/index.vue'
import { getCategory , getCategoryInfo } from '../../../apis/index'

const emit = defineEmits(['changeCate'])
let settingRef = ref<any>(null)
let isShowCateInfo = ref(false)
let isLoading = ref(false)
let current = ref(0)

let cate = reactive<{
  cateData: CategoryModel[],
  cateInfoData:CategoryInfoModel[]
}>({
  cateData: [],
  cateInfoData: []
})

const onSetting = () => {
  settingRef.value.show()
}

// 一级菜单
const getCateList = async () => {
  let cates = await getCategory({}) as any
  cate.cateData = cates.series_list
}

// 二级菜单
const getCateInfoList = async (id: number) => {
  current.value = id
  isShowCateInfo.value = false
  isLoading.value = true
  let cateInfos = await getCategoryInfo({
    series_id: id
  }) as any
  cate.cateInfoData = cateInfos.sku_list
  isShowCateInfo.value = true
  isLoading.value = false
}

// 选择分类
const chooseCate = (skuId: number,seriesId: number) => {
  emit('changeCate',skuId,seriesId)
}

// 刷新页面
const refresh = () => {
  
}

onMounted(() => {
  getCateList()
})

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.no-inherit {
  cursor: pointer;
}
.check-container{
  .drop-down{
    margin: 0 5px 5px 0;
  }
}

.chooseItem{
  height: 100%;
  width: 100%;
}
</style>