<template>
  <div class="aside">
    <div class="settingBtn" @click="onSetting">设置</div>

    <div class="content">

    </div>
  </div>
  <spy-setting ref="spyRef"></spy-setting>
</template>

<script lang="ts">
export default {
  name: 'Aside'
}
</script>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getCategory , getCategoryInfo } from '../../../apis/index'
import SpySetting from './components/spySetting/index.vue'

let spyRef = ref<any>(null)

const onSetting = () => {
  spyRef.value.show()
}

onMounted(() => {
  // getCateList()
})

</script>

<style lang="scss" scoped>
  .aside{
    height: 100%;
    background: #FFF;
    margin-right: 5px;
    border-radius: 15px;
    overflow: hidden;
  }
  .settingBtn{
    padding: 8px 0;
    text-align: center;
    background: #2b88d8;
    font-size: 12px;
    cursor: pointer;
    color: #FFF;
  }
  .settingBtn:hover{
    background: #71afe5;

  }
</style>