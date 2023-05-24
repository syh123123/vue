<template>
  <div class="searchBox">
    <div class="inputBox">
      <div class="searchFrom">
        <form
          action="/"
          method="get"
          enctype="application/json"
          @submit.prevent="saveReport()"
        >
        <img class="searchIcon icon_24" src="@/assets/img/components/search/search.png" alt="" srcset="">
          <input
          class="font_14"
            type="search"
            ref="input"
            v-model="text"
            :placeholder="searchOpt.tip"
            @blur="blur()"
            @focus="focus()"
          />
          <img class="clear icon_16" @click="clear()" v-if="text.trim().length > 0" src="@/assets/img/components/search/clear.png" alt="" srcset="">
        </form>
      </div>
      <span class="font_14" @click.stop="cancel()">取消</span>
    </div>
    <div class="search hideInput" v-if="!showInput" @click.stop="search()">
      <div class="text" v-if="text">{{ text }}</div>
      <div class="tip" v-else>
        <img class="searchIcon icon_24" src="@/assets/img/components/search/search.png" alt="" srcset="">
        <span class="font_14">{{ searchOpt.tip }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*  {
    focus:false  //获取焦点
    disable：false  //是否禁用输入框
    text:// 搜索文字初始值
  } */
  props: ["searchOpt"],
  data() {
    return {
      showInput: false,
      text: "",
    };
  },
  components: {},
  watch: {
    ["searchOpt.text"]() {
      this.text = this.searchOpt.text;
    },
    deep: true,
  },
  mounted() {
    if (this.searchOpt.focus) {
      this.search();
    }
    if (this.searchOpt.text) {
      this.text = this.searchOpt.text;
    }
  },
  methods: {
    search() {
      var _this = this;
      if (!this.searchOpt.disable) {
        if (this.searchOpt && this.searchOpt.target) {
          this.$emit("serchCallback", { type: "target" });
        } else {
          this.showInput = true;
          this.$refs.input.focus();
        }
      } else {
        this.$emit("serchCallback", { type: "disable" });
      }
    },
    saveReport() {
      //if (this.text.trim().length > 0) {
      this.$emit("serchCallback", {
        type: "search",
        searchText: this.text.trim(),
      });
      this.$refs.input.blur();

      //this.text = "";
      /* } else {
        this.util.toast({ msg: "请输入搜索内容" });
      } */
    },
    blur() {
      //针对安卓端软键盘顶起问题
      this.$emit("serchCallback", { type: "popUp", popUpType: 0 });
    },
    focus() {
      this.$emit("serchCallback", { type: "popUp", popUpType: 1 });
    },
    cancel() {
      this.text = "";
      this.showInput = this.text.length > 0 ? true : false;
      this.$emit("serchCallback", { type: "cancel" });
    },
    clear() {
      this.text = "";
      this.$refs.input.focus();
      this.$emit("serchCallback", { type: "clear" });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  position: relative;
  .search {
    width: 100%;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    color: rgba(161, 170, 179, 1);
    // border: 0.5Px solid #cccccc;
    padding: 12px 16px;
    text-align: left;
    .tip {
      text-align: left;
    }
    .text {
      color: #333;
    }
    .searchIcon {
      margin-right: 8px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
    .clear {
      position: absolute;
      // display: inline-block;
      // width: 18px;
      // height: 18px;
      // background: url(~@/assets/img/components/search/clear.png) no-repeat;
      // background-size: 18px 18px;
      margin-left: 8px;
      vertical-align: middle;
      right: 0;
      top: 50%;
      margin-top: -9px;
    }
  }
  .hideInput {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #F7F7F7;
    z-index: 11;
  }
  .inputBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .searchFrom {
      flex: 1;
       padding: 12px 16px;
      // padding: 6.5px 10px;
      background: rgba(246, 247, 248, 1);
      form {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
      }
      input {
        flex: 1;
        // font-size: 14px;
        // line-height: 20px;
        // height: 20px;
        color: #333;
        padding-right: 18px;
        margin-left: 8px;
        // background: #F7F7F7;
      }
      input::placeholder {
        font-size: 14px;
        line-height: 20px;
        color: rgba(161, 170, 179, 1);
      }
    }
    span {
      margin-left: 8px;
      // font-size: 14px;
      // line-height: 20px;
      color: rgba(161, 170, 179, 1);
    }
  }
}
</style>