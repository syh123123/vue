<template>
<div>
  <div
    class="carousel"
    v-if="list.length>0"
  >
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      class="swiper-wrapper"
    >
      <swiper-slide
        v-for="(item,index) in list"
        :key="index"
      >
        <div style="width:100%;height:100%">
          <img
            v-if="item.type=='img'"
            class="carouselImg"
            :src="item.url"
            :preview="reviewId||false"
            @click="goDetail()"
          />
          <Video
            v-if="item.type=='video'"
            controls="true"
            :playInfo="{src:item.url,poster:item.poster}"
            :playIndex='playIndex'
            :index='index'
            @playVideoCallback='playVideoCallback'
          ></Video>
          <!-- <video :ref='"video"+index' @play="playing" style="width:100%;height:100%" v-if="item.type=='video'" :src="item.url" :poster="item.poster" controls></video> -->
        </div>
      </swiper-slide>
    </swiper>
    <div
      :class="['carouselPagination',paginationType=='num'?'num':'']"
      v-if="list.length>1&&playType!='play'"
    >
      <div
        class="numBox"
        v-if="paginationType=='num'"
      >{{(carouselIndex+1)+'/'+list.length}}</div>
    </div>
  </div>
  <div class="paginationOther" v-if="showOther&&list.length>1" >
        <div class="bg" ref='bg'>
          <div class="item" :style="{width:itemWidth+'px',left:itemWidth*carouselIndex+'px'}"></div>
        </div>
    </div>
     <div
        class="carouselPaginationBox"
        v-if="!paginationType&&list.length>1"
      >
        <i
          :class="[carouselIndex==index?'active':'']"
          v-for="(item,index) in list"
          :key="index"
        ></i>
      </div>
  </div>
</template>

<script>

import Video from "@/components/videojs";
export default {
  props: ['list', 'height', 'paginationType','showOther','reviewId'],  //showOther 首页小绿书
  components: {
    Video,
  },
  data() {
    return {
      carouselIndex: 0,
      swiperOption: {
        onSlideChangeEnd: function (swiper) {
          this.carouselIndex = swiper.activeIndex
        }.bind(this),
      },
      playIndex: -1,
      playType:'',
      itemWidth:0,
    }
  },
  created() {
  },
  mounted () {
    if(this.showOther){
      if(this.list.length>1){
        let bgWidth=this.$refs.bg.offsetWidth;
        this.itemWidth=(bgWidth/this.list.length).toFixed(4)
      }
    }
  },
  methods: {
    goDetail(data) {
      this.$emit('carouselCallBack', data)
    },
    playVideoCallback(e) {
      this.playType=e.type;
      if(e.type=='play'){
       this.playIndex = e.playIndex;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.swiper-wrapper{
  background: rgba(246, 247, 248, 1);
}
.swiper-slide{
  margin: auto;
}

swiper-item {
  box-sizing: border-box;
}
.carousel {
  img {
    width: 100%;
    // height: 100%;
    object-fit: cover;
  }
  .carouselPagination {
    display: inline-block;
    position: absolute;
    left: 50%;
    bottom: 8px;
    z-index: 11;
    transform: translate(-50%, 0);
  }
  .num {
    transform: none;
    position: absolute;
    right: 8px;
    left: auto;
    .numBox {
      background: rgba(0, 0, 0, 0.6);
      border-radius: 14px;
      padding: 2px 12px;
      font-size: 11px;
      line-height: 18px;
      color: #fff;
    }
  }
}
.paginationOther{
  margin-top: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg{
    display: inline-block;
     background: rgba(0, 0, 0, .1);
     border-radius: 2px;
     width: 128px;
     position: relative;
     overflow: hidden;
     height: 3px;
     .item{
      width: 0;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      border-radius: 2px;
      transition: left linear .1s;
     }
  }

}
.carouselPaginationBox {
      margin-top: 8px;
      display: inline-flex;
      position: relative;
      left: 50%;
      transform: translate(-50%,0);
      i {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: rgba(0, 0, 0, .1);
        border-radius: 50%;
      }
      i.active {
        background: rgba(0, 0, 0, .4);
      }
      i:not(:last-child) {
        margin-right: 4px;
      }
    }
</style>