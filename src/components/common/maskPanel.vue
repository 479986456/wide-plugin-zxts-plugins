<!--
 * @Date: 2023-08-07 15:45:58
 * @LastEditors: liudandan01
 * @LastEditTime: 2023-08-07 17:02:41
 * @FilePath: \hd-secrecy-plugin\src\components\common\maskPanel.vue
 * @Description: 
-->
<template>
  <div class="mask-panel" :style="getStyle()">
    <div class="container">
      <div class="header">{{ maskPanel.title }}</div>
      <div class="close" @click="close"></div>
      <div class="main">
        <bmDialog @clickEvent="clickEvent" :data="panelParams"></bmDialog>
      </div>
    </div>
  </div>
</template>

<script>
import bmDialog from './bmDialog.vue';
export default {
  name:"maskPanel",
  data(){
    return {
      comp: 'bmDialog'
    }
  },
  components:{
    bmDialog
  },
  props:{
    maskPanel:{
      type:Object,
      default:()=>{}
    }
  },
  watch: {
    maskPanel: {
      immediate: true,
      handler() {
        if (this.maskPanel.component)
        this.comp = this.maskPanel.component || 'bmDialog';
        this.panelParams = this.maskPanel.requestParams;
      }
    }
  },
  fdx:{
    states:{
      taskId: 'project.taskId',
      isSonNode: 'project.isSonNode',
      currentIndex: 'project.currentIndex',
    }
  },
  methods:{
    getStyle(){
      return {
        width: this.maskPanel.width || '50%',
        height: this.maskPanel.height || '50%',
      }
    },
    close(){
      this.$emit("close")
    },
    clickEvent(item){
      this.$fdx.project.setState('isSonNode',true);
      this.$fdx.project.setState('currentIndex',item.name);
      this.$fdx.project.setState('taskId',item.id);
      this.$emit("close")

    }

  }
  
}
</script>

<style lang="less" scoped>
.mask-panel{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(../../assets/panelBg.png);
  border-image-slice: 20 20 20 20 fill;
  border-image-width: 20px 20px 20px 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .container{
    width: 100%;
    max-height: 730px;
    position: relative;
    overflow: auto;
    .close{
      background: url(../../assets/close.svg) no-repeat 0 0;
      position: absolute;
      top: 20px;
      right: 30px;
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
    .header{
      width: 309px;
      height: 64px;
      padding: 0 0 0 20px;
      line-height: 64px;
      background: url(../../assets/set-up-title.png) no-repeat 0 0;
      font-weight: 700;
      font-size: 20px;
    }
    .main{
      padding: 20px;
    }
  }
}
</style>