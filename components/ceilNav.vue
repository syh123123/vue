<template>
  <div :class="['box',info.ceil?'ceil':'']">
    <div
      class="navBox"
      ref='navBox'
      :class="!info.flex?'notFlex':''"
    >
      <ul ref='ul'>
        <li
          :class="[active==index?'active':'','font_16']"
          :ref="'nav'+index"
          v-for="(item,index) in list"
          :key="index"
          @click="slide(index)"
        >{{item[info.key]}}</li>
      </ul>
      <div
        class="label"
        ref='label'
        :style="{ left: left+'px',}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {      //nav元素集合
      type: Array,
      default: ()=>{
        return []
      }
    },
    value:{    //当前active第几个
      type:Number,
      default:0
    },
    /* 
    其余附带参数
      flex:true:false //是否是flex布局
      ceil:true:false,//是否吸顶
      key:'',//显示的字段名
    */
    info:{     
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      active: 0,
      left: -200,
      reloadList: [],
      ulWidth:'',
      top:''
    }
  },
  watch: {
    value() {
      this.active = this.value
      this.getOffsetLeft()
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
          if(!this.ulWidth){
            this.ulWidth=this.$refs.ul.offsetWidth;
          }
          if (this.$refs['nav' + this.active]) {
            this.getOffsetLeft()
          } else {
            this.$once('hook:updated', function () {
              this.getOffsetLeft()
            })
          }
    },
   
    slide(index) {
      this.active = index
      this.$emit('input', this.active)
    },
    getOffsetLeft() {
      if (this.active < 0 && !this.$refs['nav' + this.active][0]) return
      let navWidth = this.$refs['nav' + this.active][0].offsetWidth //当前选项的宽度
      let navLeft = this.$refs['nav' + this.active][0].offsetLeft //当前选项的距离左边宽度
      let width = this.$refs.label.offsetWidth //label距离宽度
      this.left = navLeft + parseInt((navWidth - width) / 2)
      if(navLeft>(this.ulWidth/2)){
        this.$refs.navBox.scrollLeft=(navLeft-(this.ulWidth/2)).toFixed(2);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.box{
  position: sticky;
  display: flex;
}
.ceil{
  position: sticky;
  top: 0;
}
.navBox {
  position: relative;
  padding: 16px 0;
  background: #fff;
  border-bottom: 0.5px solid rgba(151, 151, 151, 0.2);
  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    li {
      cursor: pointer;
      // font-size: 14px;
      // line-height: 24px;
      // color: #86878a;
      // font-weight: 600;
      // padding: 9px 0;
      font-size: 16px;
      font-weight: 600;
      color: #a1aab3;
      line-height: 24px;
    }
    .active {
      color: #2aadcd;
    }
    // .active::before {
    //     margin-left: 5px;
    //     content: '';
    //     display: block;
    //     position: absolute;
    //     bottom: -2px;
    //     width: 18px;
    //     height: 2px;
    //     color: #35363c;
    //     background-color: #35363c;
    // }
  }
  .label {
    width: 16px;
    height: 3px;
    background: #2aadcd;
    position: relative;
    left: -200px;
    top: 6px;
    transition: all ease-in-out 0.3s;
    vertical-align: top;
  }
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: -1;
  }
}
.notFlex {
  overflow-x: auto;
  ul {
    display: block;
    white-space: nowrap;
    padding-left: 16px;
    li {
      cursor: pointer;
      display: inline-block;
      margin-right: 16px;
    }
  }
}
</style>