<template>
  <div class="setting">
    <el-dialog title="设置" v-model="isShow">
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item label="设置token">
          <el-input v-model="formData.token" autocomplete="off"></el-input>
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
import { useStore } from "../../../../../store/index"
import { ElMessage } from 'element-plus';

const userStore = useStore()
let formRef = ref<any>(null)

const emit = defineEmits(['refresh'])

let isShow = ref(false)

let formData = reactive({
  token: '' as any
})

const show = (row: any) => {
  isShow.value = true
  formData.token = userStore.token
}

const rules = reactive({
  token: [
    { required: true, message: '请输入token' }
  ]
})

// 提交更新
const submit = () => {
  formRef.value.validate(async (vaild: boolean) => {
    if(!vaild) return false
    userStore.updateToken(formData.token)
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