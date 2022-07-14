<template>
  <div class="setting">
    <el-dialog title="设置" v-model="isShow">
      <el-form ref="formRef" :model="formData" label-width="70px">
        <el-form-item label="选择分类">
          <el-radio-group v-model="selectCate" @change="changeCate" size="large">
            <template v-for="item in cate.cateData" :key="item.id">
              <el-radio-button :label="item.id">{{ item.title }}</el-radio-button>
            </template>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择藏品">
          <el-checkbox-group v-model="cate.selected" size="large">
            <el-checkbox-button v-for="item in cate.cateInfoData" :key="item.sku_id" :label="item">
              {{ item.title }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="已选择">
          <el-checkbox-group v-model="cate.selected" size="large">
            <div v-for="(item,index) in cate.selected" :key="item">
              <el-checkbox :label="item">
                {{ item.title }}
              </el-checkbox>
              <el-input-number @click.stop="" v-model="cate.selected[index].price" @change="handleChange" />
            </div>

          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useStore } from "@/store/index"
import { ElMessage } from 'element-plus';
import { getCategory, getCategoryInfo } from '@/apis/index'
let formRef = ref<any>(null)
let selectCate = ref()

const emit = defineEmits(['refresh'])

let isShow = ref(false)

let formData = reactive({
  token: '' as any
})

let cate = reactive<{
  cateData: CategoryModel[],
  cateInfoData: CategoryInfoModel[],
  selected: []
}>({
  cateData: [],
  cateInfoData: [],
  selected: [] as any
})

const show = (row: any) => {
  isShow.value = true
  getCateList()
}

// 一级菜单
const getCateList = async () => {
  let cates = await getCategory({}) as any
  cate.cateData = cates.series_list
}

// 切换一级菜单
const changeCate = async () => {
  getCateInfo(selectCate.value)
}

// 价格改变
const handleChange = (price: number) => {
  console.log('price', cate.selected)
}

const getCateInfo = async (id: number) => {
  let cateInfos = await getCategoryInfo({
    series_id: id
  }) as any
  cate.cateInfoData = cateInfos.sku_list
}

// 提交更新
const submit = () => {
  formRef.value.validate(async (vaild: boolean) => {
    if (!vaild) return false
    // userStore.updateToken(formData.token)
    ElMessage.success('更新成功')
    isShow.value = false
    emit('refresh')
  })
}

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
</style>