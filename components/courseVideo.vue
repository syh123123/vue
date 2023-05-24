<template>
  <div class="videoBox" id="videoBox">
    <div :class="['top', hideControl ? 'hideTop' : '']">
      <div class="moreBox">
        <span class="more" @click="showTopOpt = !showTopOpt">
          <i></i>
        </span>
        <div class="topOpt" v-if="showTopOpt && qualityList.length > 0">
          <ul>
            <li
              @click="
                showQuality = true;
                showTopOpt = false;
              "
            >
              {{ qualityList[qualityIndex].name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="videoContent">
      <video
        class="video video-js"
        ref="video"
        webkit-playsinline="true"
        playsinline="true"
        x5-playsinline=""
      ></video>
    </div>
    <div :class="['controlBox', hideControl ? 'hideControl' : '']">
      <div
        class="progress"
        @touchstart="jumpPlay"
        @touchmove="goJump"
        ref="progress"
      >
        <i class="red" :style="{ width: redWidth }"></i>
        <div class="pointBox">
          <i class="point" v-if="!hideControl" :style="{ left: redWidth }"></i>
        </div>
      </div>
      <div class="opation">
        <div class="left">
          <div class="playOpt">
            <!-- <i
              :class="playInfo.playChapters==0&&playInfo.playLesson==0?'notPrev':'prev'"
              @click="opation('prev')"
            ></i> -->
            <i :class="isPlay ? 'stop' : 'play'" @click="play"></i>
            <!-- <i
              :class="playInfo.playChapters==playInfo.chaptersLength-1&&playInfo.playLesson==playInfo.lessonsLength-1?'notNext':'next'"
              @click="opation('next')"
            ></i> -->
          </div>
          <div class="timeBox">
            <span class="playing">{{ util.formatSeconds(currentTime) }}</span>
            <em>/</em>
            <span>{{ util.formatSeconds(totalTime) }}</span>
          </div>
        </div>
        <div class="right">
          <div class="multiple">
            <span @click="showMultiple = !showMultiple"
              >{{ multipleBox[multipleValue] }}X</span
            >
            <div class="multipleBox" v-if="showMultiple">
              <ul>
                <li
                  v-for="(item, index) in multipleBox"
                  :key="index"
                  :class="index == multipleValue ? 'active' : ''"
                  @click="changeMultiple(index)"
                >
                  {{ item }}X
                </li>
              </ul>
            </div>
          </div>
          <i class="fullScreen" @click="fullScreen"></i>
        </div>
      </div>
    </div>
    <div class="qualityBox" v-if="showQuality">
      <ul>
        <li
          @click="changeQuality(index)"
          v-for="(item, index) in qualityList"
          :key="index"
          :class="qualityIndex == index ? 'active' : ''"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
require("video.js/dist/video-js.css");
export default {
  props: ["playInfo"],
  data() {
    return {
      redWidth: "0",
      player: "",
      isPlay: false,
      showMultiple: false,
      multipleValue: 1,
      multipleBox: ["0.75", "1.0", "1.25", "1.5", "2.0"],
      currentTime: "",
      totalTime: "",
      changeType: "",
      showTopOpt: false,
      showQuality: false,
      qualityIndex: 0,
      qualityList: [], //视频清晰度
      poster: "",
      errCode: "",
      businessid: "",
      ready: false,
      continuous: false,
      loopStatus: false,
      jump: false,
      jumpTime: 0,
      updateTime: "",
      hideControl: false,
      timeOut: "",
    };
  },
  watch: {
    ["playInfo"](newVal,oldVal) {
      if (this.playInfo) {
        if(this.player){
            this.saveStudy(oldVal);
        }
        this.readVideo(this.playInfo);
      }
    },
  },
  components: {},
  destroyed() {},
  mounted() {
    this.showMenu("multiple", "showMultiple");
    this.showMenu("qualityBox", "showQuality");
    this.showMenu("moreBox", "showTopOpt");
    this.readVideo(this.playInfo);
  },
  methods: {
    showMenu(dom, data) {
      var _this = this;
      $("#videoBox").on("touchstart", function (e) {
        _this.hideControl = false;
        clearTimeout(_this.timeOut);
        _this.timeOut = setTimeout(() => {
          _this.hideControl = true;
        }, 2000);
        if ($(e.target).parents("." + dom).length > 0) {
        } else {
          _this[data] = false;
        }
      });
    },
    readVideo(data) {
      this.qualityList = [];
      this.multipleIndex = 1;
      if (data.videolow) {
        if (data.videolow) {
          this.qualityList.push({ url: data.videolow, name: "流畅" });
        }
        if (data.videomid) {
          this.qualityList.push({ url: data.videomid, name: "标清" });
        }
        if (data.videosrchd) {
          this.qualityList.push({ url: data.videosrchd, name: "高清" });
        }
        this.qualityIndex = [0];
        var src = this.qualityList[this.qualityIndex].url;
        if (this.player) {
          this.player.src({ src: src });
        } else {
          this.showVideo(src);
        }
      } else {
      }
    },
    showVideo(url, type) {
      var _this = this;
      this.player = videojs(_this.$refs.video, {
        loop: false,
        controls: false, //是否显示空间
        autoplay: true, //自动播放
        preload: "auto", //播放器加载完是否下载视频 （auto）浏览器支持即会下载  （metadata）仅加载视频元数据 （none）用户点击播放下载视频
        sources: [{ src: url }],
        poster: "", //封面图
      });
      this.player.on("canplay", function () {
        _this.ready = true;
        var totalTime = this.duration();
        var playTime = this.currentTime();
        _this.currentTime = playTime;
        _this.totalTime = totalTime;
        setTimeout(() => {
          _this.hideControl = true;
        }, 1000);
      });
        _this.ready = true;
      _this.player.on("pause", function () {
        if (_this.playInfo.customercourse == "Y") {
          _this.saveStudy();
        }
        _this.isPlay = false;
      });
      _this.player.on("play", function () {
        _this.isPlay = true;
      });
      this.player.on("timeupdate", function () {
        if (_this.isPlay) {
          _this.currentTime = this.currentTime();
          var totalTime = this.duration();
          _this.totalTime = totalTime;
          _this.redWidth =
            ((_this.currentTime / _this.totalTime) * 100).toFixed(5) > 100
              ? 100
              : ((_this.currentTime / _this.totalTime) * 100).toFixed(5) + "%";
        }
      });
      _this.player.on("ended", function (totalTime) {
        _this.opation("next");
      });
    },
    //播放暂停
    play() {
      if (!this.ready) {
        return false;
      }
      if (this.player.paused()) {
        this.player.play();
        this.isPlay = true;
      } else {
        this.player.pause();
        this.isPlay = false;
      }
    },
    opation(type) {
      if (type == "prev") {
        if (this.playInfo.playChapters == 0 && this.playInfo.playLesson == 0) {
          return false;
        } else {
          this.$emit("opation", {
            type: "prev",
            playChapters: this.playInfo.playChapters,
            playLesson: this.playInfo.playLesson,
          });
        }
      } else {
        if (
          this.playInfo.playChapters == this.playInfo.chaptersLength - 1 &&
          this.playInfo.playLesson == this.playInfo.lessonsLength - 1
        ) {
          return false;
        } else {
          this.$emit("opation", {
            type: "next",
            playChapters: this.playInfo.playChapters,
            playLesson: this.playInfo.playLesson,
          });
        }
      }
    },
    //倍数播放
    changeMultiple(index) {
      var value = this.multipleBox[index];
      this.multipleValue = index;
      this.showMultiple = false;
      if (!this.ready) {
      } else {
        this.player.playbackRate(value - 0);
      }
    },
    //更改清晰度
    changeQuality(index) {
      var _this = this;
      this.qualityIndex = index;
      var url = this.qualityList[index].url;
      this.showQuality = false;
      var currentTime = _this.currentTime;
      this.player.src({ src: url });
      setTimeout(() => {
        this.player.currentTime(currentTime);
      });
      this.util.toast({ msg: "已切换到" + this.qualityList[index].name });
    },
    fullScreen() {
      if (this.errCode && !this.ready) {
        return false;
      }
      this.player.requestFullscreen();
    },
    saveStudy(data) {
     var playInfo=data?data:this.playInfo;
      if(playInfo.trysee){
        return false
      }
      var obj = {};
      obj.videoid = playInfo.videoid;
      obj.studytime = parseInt(this.currentTime?this.currentTime:0);
      obj.courseid = playInfo.courseid;
      obj.studytype = 1000;
      this.$post(
        "iart-api-crm/api/crm/custservice/createCustomerstudy",
        obj
      ).then((res) => {});
    },
    jumpPlay(e) {
      var _this = this;
      this.jump = true;
      var positionX =
        e.changedTouches[0].clientX - this.$refs.progress.offsetLeft;
      var totalWidth = this.$refs.progress.offsetWidth;
      this.currentTime = parseInt(
        (positionX / totalWidth).toFixed(2) * _this.totalTime
      );
      this.redWidth = ((positionX / totalWidth) * 100).toFixed(2) + "%";
      _this.player.currentTime(_this.currentTime);
    },
    goJump(e) {
      if (this.jump) {
        var _this = this;
        this.jump = true;
        var positionX =
          e.changedTouches[0].clientX - this.$refs.progress.offsetLeft;
        var totalWidth = this.$refs.progress.offsetWidth;
        this.currentTime = parseInt(
          (positionX / totalWidth).toFixed(2) * _this.totalTime
        );
        this.redWidth = ((positionX / totalWidth) * 100).toFixed(2) + "%";
        _this.player.currentTime(_this.currentTime);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.videoBox {
  width: 100%;
  height: 100%;
  background: #333333;
  position: relative;
  overflow: hidden;
  .videoContent {
    width: 100%;
    height: 100%;
    .video,
    video {
      width: 100%;
      height: 100%;
    }
  }
  .top {
    padding: 12px 15px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    transition: all 0.5s linear;
    .moreBox {
      display: inline-block;
      position: relative;
      span {
        width: 19px;
        height: 19px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        i {
          display: inline-block;
          width: 18px;
          height: 4px;
          background: url(../assets/img/components/video/more.png) no-repeat;
          background-size: 18px 4px;
        }
      }
      .topOpt {
        position: absolute;
        left: -22px;
        top: 19px;
        padding: 7px 10px;
        background: rgba(51, 51, 51, 0.8);
        border-radius: 4px;
        li {
          font-size: 13px;
          line-height: 19px;
          height: 19px;
          color: #ffffff;
          text-align: center;
          white-space: nowrap;
        }
        li:not(:last-child) {
          margin-bottom: 7px;
        }
      }
    }
  }
  .hideTop {
    top: -49px;
    transition: all 0.5s linear;
  }
  .controlBox {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.5s linear;
    .progress {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      position: relative;
      padding-right: 12px;
      .red {
        display: inline-block;
        position: absolute;
        height: 100%;
        background: #f62625;
        z-index: 10;
      }
      .pointBox {
        width: 100%;
        position: relative;
        .point {
          display: inline-block;
          position: absolute;
          left: 0;
          top: -4px;
          background: #fff;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          z-index: 11;
        }
      }
    }
    .opation {
      padding: 12px 16px 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .playOpt {
          display: flex;
          flex-direction: row;
          align-items: center;
          .prev {
            display: inline-block;
            width: 14px;
            height: 15px;
            background: url(../assets/img/components/video/prev.png) no-repeat;
            background-size: 14px 15px;
          }
          .notPrev {
            display: inline-block;
            width: 14px;
            height: 15px;
            background: url(../assets/img/components/video/notPrev.png)
              no-repeat;
            background-size: 14px 15px;
          }
          .next {
            display: inline-block;
            width: 14px;
            height: 15px;
            background: url(../assets/img/components/video/next.png) no-repeat;
            background-size: 14px 15px;
          }
          .notNext {
            display: inline-block;
            width: 14px;
            height: 15px;
            background: url(../assets/img/components/video/notNext.png)
              no-repeat;
            background-size: 14px 15px;
          }
          .play {
            width: 17px;
            height: 17px;
            background: url(../assets/img/components/video/play.png) no-repeat;
            background-size: 17px 17px;
            margin: 0 12px;
          }
          .stop {
            width: 17px;
            height: 17px;
            background: url(../assets/img/components/video/stop.png) no-repeat;
            background-size: 17px 17px;
            margin: 0 12px;
          }
        }
        .timeBox {
          font-size: 12px;
          line-height: 17px;
          color: #ffffff;
          margin-left: 16px;
        }
      }
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 19px;
        .multiple {
          display: inline-block;
          color: #ffffff;
          position: relative;
          span {
            display: inline-block;
            font-size: 14px;
            line-height: 20px;
            width: 52px;
            box-sizing: border-box;
            padding-top: 2px;
            text-align: center;
          }
          .multipleBox {
            background: rgba(51, 51, 51, 0.8);
            padding: 10px 10px 7px;
            border-radius: 4px;
            position: absolute;
            bottom: 30px;
            left: -10px;
            li {
              font-size: 13px;
              line-height: 19px;
              height: 19px;
              width: 52px;
              color: #ffffff;
              text-align: center;
            }
            li.active {
              color: #f62625;
            }
            li:not(:last-child) {
              margin-bottom: 10px;
            }
          }
        }
        .fullScreen {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: url(../assets/img/components/video/fullScreen.png)
            no-repeat;
          background-size: 14px 14px;
        }
      }
    }
  }
  .hideControl {
    bottom: -40px;
    transition: all 0.5s linear;
  }
  .qualityBox {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    width: 37%;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      li {
        font-size: 16px;
        line-height: 22px;
        height: 22px;
        color: #ffffff;
      }
      li.active {
        color: #f62625;
      }
      li:not(:last-child) {
        margin-bottom: 31px;
      }
    }
  }
}
</style>