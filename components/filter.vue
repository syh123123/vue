<template>
  <div class="filterBox" @touchmove.prevent="">
    <div class="filter" ref="filter">
      <div
        :class="['picker',pickType==item.type?'active':'']"
        @click="pick(item.type)"
        v-for="(item,index) in  pickList"
        :key="index"
      >
        <span class="font_14">{{showSelect(pickData,item)}}</span>
        <img
          class="icon_16"
          :src="require(pickType==item.type?'@/assets/img/arrow_full_active.png':'@/assets/img/arrow_full.png')"
        />
      </div>
    </div>
    <!-- 弹出层 -->
    <div
      :class="['toast_box',pickType?'show_toast':'']"
      :style="{top:top-2+'px'}"
      @click="hideToast"
     @touchmove.prevent=""
    >
      <div :class="['toast_main',pickType?'show_main':'']">
        <div
          class="more_box"
          v-if="pickType=='more'"
          @click.stop=" '' "
          @touchmove.stop=""
        >
          <div class="content">
            <div class="common status_box">
              <div class="commonTop">
                <div class="title font_14">场馆状态</div>
              </div>
              <div class="commonContent">
                <!-- <div
                  :class="['btn',moreData.make==''?'active':'']"
                  @click="moreOpation('make',)"
                >全部</div> -->
                <div
                  :class="['btn','font_14', moreData.make=='Y'?'active':'']"
                  @click="moreOpation('make','Y')"
                >可预约</div>
                <div
                  :class="['btn','font_14',moreData.make=='N'?'active':'']"
                  @click="moreOpation('make','N')"
                >不可预约</div>
              </div>
            </div>
            <div class="common input_box">
              <div class="commonTop">
                <div class="title font_14">场地面积(㎡)</div>
              </div>
              <div class="commonContent">
                <div class="input font_14">
                  <input
                    type="number"
                    v-model="moreData.minspacenum"
                    placeholder="最小面积"
                  />
                </div>
                <div class="slide"></div>
                <div class="input font_14">
                  <input
                    type="number"
                    v-model="moreData.maxspacenum"
                    placeholder="最大面积"
                  />
                </div>

              </div>
            </div>
            <div class="common input_box">
              <div class="commonTop">
                <div class="title font_14">容纳人数(人)</div>
              </div>
              <div class="commonContent">
                <div class="input font_14">
                  <input
                    type="number"
                    v-model="moreData.minlimitnum"
                    placeholder="最小人数"
                  />
                </div>
                <div class="slide"></div>
                <div class="input font_14">
                  <input
                    type="number"
                    v-model="moreData.maxlimitnum"
                    placeholder="最大人数"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="reset font_14" @click="moreOpation('result')">重置</div>
            <div
              :class="['font_14','confirm',isFilte?'confirmActive':'']"
              @click="isFilte? moreOpation('submit') :''"
            >确定</div>
          </div>
        </div>
        <div class="toast_list" v-else @touchmove.stop="">
          <div
            :class="['font_14','li' ,pickData[pickType+'Index']==index?'active':'']"
            v-for="(item,index) in pickData[pickType+'List']"
            :key="index"
            @click.stop="select(index)"
          >
            <span class="ellipsis"> {{item.name}}</span>
            <img
            class="icon_24"
              v-if="pickData[pickType+'Index']==index"
              src="@/assets/img/pitchon.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pickData', 'pickList', 'type'],
  data() {
    return {
        top:'',
      pickType: '',
      moreData: {     //场馆预定  更多选择值
        make: '',
        minspacenum: '',
        maxspacenum: '',
        minlimitnum: '',
        maxlimitnum: '',
      },
      linkageList: [],
      linkageLeft: 0,
      linkageContent: -1
    }
  },
  mounted() {
    this.top=this.$refs.filter.offsetTop+this.$refs.filter.offsetHeight
  },
  computed : {
    isFilte () {
      let flag = false
      let arr = Object.values(this.moreData)
      arr.forEach(item => {
        if (item) flag = true
      });
      return flag
    }
  },
  methods: {
    showSelect(pickData, item) {
      var text = '';
      var type = item.type;
      if (type == 'more') {
        text = '更多选项'
      }  else {
        text = pickData[type + 'Index'] == 0 ? item.name : pickData[type + 'List'][pickData[type + 'Index']].name;
      }
      return text
    },
    pick(type) {
      this.pickType = this.pickType == type ? '' : type;
    },
    select(index) {
      var pickData = this.pickData;
      pickData[this.pickType + 'Index'] = index;
      this.$emit('filterCallBack', {
        type: this.pickType,
        index: index
      });
      this.pickData = pickData;
      this.pickType = '';

    },
    hideToast() {
      this.pickType = '';
    },
    moreOpation(type, make) {
      let moreData = this.moreData;
      switch (type) {
        case 'make':
          moreData.make = make;
          break;
        case 'result':
          moreData.make = '';
          moreData.minspacenum = '';
          moreData.maxspacenum = '';
          moreData.minlimitnum = '';
          moreData.maxlimitnum = '';
          break;
        case 'submit':
          this.$emit('filterCallBack', {
            type: 'more',
            index: moreData
          });
          this.pickType = ''
          break;

        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.filter {
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  .picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    position: relative;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80%;
      margin-right: 4px;
      font-weight: 300;
      // font-size: 14px;
      // line-height: 20px;
    }
    img {
      transition: all linear 0.3s;
    }
  }
  .picker:not(:last-child)::before {
    // content: " ";
    display: inline-block;
    width: 1px;
    background: #d5d5d5;
    height: 16px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -8px;
  }
  .active {
    span {
      color: rgba(254, 121, 84, 1);
      font-weight: bolder;
    }
    img {
    }
  }
}
/* pink li */
.toast_box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
  opacity: 0;
  transition: all linear 0.2s;
  display: none;
  .toast_main {
    position: absolute;
    left: 0;
    right: 0;
    // height: 20vh;
    display: flex;
    flex-direction: column;
    background: #fff;
    transition: all linear 0.2s;
    .toast_list {
      border-top: 1Px solid rgba(223, 226, 230, 1);
      max-height: 50vh;
      box-sizing: border-box;
      // height: 100%;
      overflow: auto;
      background: #ffffff;
      padding: 12px 16px;
      .li {
        padding: 13px 0;
        // font-size: 14px;
        // line-height: 22px;
        color: rgba(161, 170, 179, 1);
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        span {
          flex: 1;
          margin-right: 12px;
        }
        img {
          // width: 24px;
          // height: 24px;
          // vertical-align: middle;
        }
      }
      .li:not(:last-child) {
        // border-bottom: 0.5Px solid #eaeaea;
      }
      .li:first-child {
        padding-top: 12px;
      }
      .active {
        font-weight: bolder;
        color: rgba(254, 121, 84, 1);
      }
    }
  }
  .show_main {
    opacity: 1;
    transition: all linear 0.2s;
    overflow: hidden;
  }
}
.show_toast {
  display: block;
  opacity: 1;
  z-index: 999999;
  transition: all linear 0.2s;
}
.more_box {
  // margin: 24px 16px ;
  // padding: 24px 16px 16px 16px;
  border-top: .5px solid #DFE2E6;  
  .common {
    margin-bottom: 24px;
    .commonTop {
      .title {
        // font-size: 14px;
        // line-height: 20px;
        color: #1F262E;
        font-weight: bolder;
      }
    }
    .commonContent {
      margin-top: 16px;
    }
  }
  .status_box {
    .btn {
      // font-size: 14px;
      // line-height: 17px;
      font-weight: 400;
      color: #5E6A75;
      padding: 5px 12px;
      border: .5px solid #5E6A75;
      border-radius: 4px;
      margin-right: 10px;
      display: inline-block;
    }
    .active {
      border-color: rgba(254, 121, 84, 1);
      color: rgba(254, 121, 84, 1);
      background-color: rgba(219, 91, 65, 0.06);
    }
  }
  .input_box {
    .commonContent {
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow: hidden;
      .input {
        flex: 1;
        background: rgba(244, 244, 247, 1);
        // font-size: 14px;
        // line-height: 20px;
        // color: #333;
        padding: 12px;
        border-radius: 4px;
        input{
            width: 100%;
            color: #1F262E;
            text-align: center;
            &::placeholder {
              color: #A1AAB3;
            }
        }
      }
      .slide {
        display: inline-block;
        margin: 0 16px;
        width: 9px;
        height: 1px;
        background: #A1AAB3;
      }
    }
  }
  .footer {
    padding: 24px 16px 16px 16px;
    // padding: 16px 0 0 16px;
    padding-top: 15px;
    border-top: .5px solid #DFE2E6;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .reset {
      // width: 76px;
      padding: 14px 24px;
      margin-right: 12px;
      border-radius: 24px;
      background: rgba(240, 241, 242, 1);
      // font-size: 14px;
      // line-height: 22px;
      font-weight: bolder;
      color: #1F262E;
    }
    .confirm {
      flex:1;
      background: rgba(254, 121, 84, .4);
      padding: 13px 0;
      border-radius: 24px;
      text-align: center;
      color: #fff;
      // font-size: 14px;
    }
    .confirmActive {
      background: rgba(254, 121, 84, 1);
    }
  }
  .content {
    padding: 24px 16px 0px 16px;
  }
}
input::placeholder {
  color: #818181;
  font-size: 14px;
  line-height: 20px;
  height: 26px;
  width: 100%;
  text-align: center;
}
</style>