<template>
  <div ref='navBox'>
    <div
      class="navBox"
      :class="notFlex?'notFlex':''"
    >
      <ul>
        <li
          :class="[active==index?'active':'','font_16']"
          :ref="'nav'+index"
          v-for="(item,index) in list"
          :key="index"
          @click="slide(index)"
        >{{item.name}}</li>
      </ul>
      <div
        class="label"
        ref='label'
        :style="{ left: left+'px',}"
      ></div>
    </div>
    <div
      v-if="ceiling"
      class="navBox"
      :class="[notFlex?'notFlex':'',ceiling?'ceiling':'']"
    >
      <ul>
        <li
           :class="[active==index?'active':'','font_16']"
          v-for="(item,index) in list"
          :key="index"
          @click="slide(index)"
        >{{item.name}}</li>
      </ul>
      <div
        class="label"
        :style="{ left: left+'px',}"
      ></div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['list', 'value', 'notFlex', 'ceiling'],  //type  
  data() {
    return {
      active: 0,
      left: -200,
      reloadList:[],
    }
  },
  watch: {
    value() {
      this.active = this.value;
      this.getOffsetLeft()
    },
  },
  mounted () {
    // 
    if(this.$refs['nav' + this.active]){
      this.getOffsetLeft();
    }else{
    this.$once('hook:updated',function(){
        this.getOffsetLeft();
        })
    }
   
  },
  methods: {
    slide(index) {
      this.active = index;
      this.$emit('input', this.active)
    },
    getOffsetLeft() {
      if (this.active < 0&&!this.$refs['nav' + this.active][0]) return;
      let navWidth = this.$refs['nav' + this.active][0].offsetWidth; //当前选项的宽度
      let navLeft = this.$refs['nav' + this.active][0].offsetLeft; //当前选项的距离左边宽度
      let width = this.$refs.label.offsetWidth;  //label距离宽度
      this.left =navLeft+parseInt((navWidth-width)/2)
    }
  },
}
</script>

<style lang="scss" scoped>
.navBox {
  position: relative;
  padding: 4px 0;
  background: #fff;
  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    li {
      // font-size: 16px;
      // line-height: 24px;
      color: #a1aab3;
      font-weight: 600;
      padding: 9px 0;
    }
    .active {
      color: #fe7954;
    }
  }
  .label {
    width: 16px;
    height: 4px;
    background: #fe7954;
    position: relative;
    border-radius: 2px;
    left: -200px;
    transition:all ease-in-out .3s;
    vertical-align: top;
  }
}
.notFlex {
  overflow-x: auto;
  ul {
    display: block;
    white-space: nowrap;
    padding-left: 16px;
    li {
      display: inline-block;
      margin-right: 16px;
    }
  }
}
.ceiling {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
      border-bottom: .5px solid #dfe2e6;
}

</style>