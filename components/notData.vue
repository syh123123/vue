<template>
  <div class="notDataBox" :style="{paddingTop: top||'15%'}">
    <div class="img">
      <img
        :class="['aspectFill', className]"
        :src="require('@/assets/img/components/notData/' + className + '.png')"
      />
    </div>
    <div class="text font_14">
      <span>{{ text }}</span>
    </div>
    <div class="btnBox" v-if="btn&&btn.length">
      <div
        v-for="(item, index) in btn"
        :key="index"
        :class="['font_14','btn', item.className]"
        @click="opation(item.type)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['text','className','btn','top'],
  data() {
    return {
    };
  },
  methods: {
    opation(type) {
      var _this = this;
      switch (type) {
        case "login":
          this.util.wechatLogin();
          break;
        default:
          _this.$emit("notDataCallBack", {
            type: type,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
 .notDataBox {
     position: relative;
     left: 0;
     right: 0;
     top: 0;
     bottom: 0;
     text-align: center;
     
}
 .notDataBox .img img {
     width:160px;
     height:160px;
}
 .notDataBox .img .order {
     width:138px;
     height:155px;
}
 .notDataBox .text {
    //  font-size:14px;
    //  line-height:20px;
     color: rgba(134, 135, 138, 1);
     margin-top:8px;
     font-weight: 300;
}
 .notDataBox .btnBox {
     margin-top:12px;
     text-align: center;
}
 .notDataBox .btnBox .btn {
    //  font-size:14px;
    //  line-height:20px;
     color: rgba(255, 255, 255, 1);
     font-weight: 500;
     min-width:80px;
     text-align: center;
     padding:6px 12px;
     box-sizing: border-box;
     border-radius:18px;
     display: inline-block;
}
 .notDataBox .btnBox .loginMsg {
    padding: 11px 22px;
    background: #F36641;
    border-radius: 21px;  
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 20px;
}
 .notDataBox .btnBox .btn:not(:last-child) {
     margin-right:16px;
}
 
</style>