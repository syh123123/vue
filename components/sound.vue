<template>
  <div>
    <div class="sound" @click="playRecording">
      <div>
        <div class="left">
          <i></i>
          <div class="info">
            <p class="name">{{name}}</p>
            <p class="time">
              <span>{{formatDate(playTime)}}</span>/
              <span>{{recordingTime}}</span>
            </p>
          </div>
        </div>
        <i :class="{'play':recordingStatus}"></i>
      </div>
      <audio ref="audio" :id="'audio'+index">
        <source :src="src" type="audio/mp3" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  props: ["src", "index", "playIndex", "name"],
  data() {
    return {
      recording: "",
      recordingTime: "",
      recordingStatus: false,
      playTime: 0,
    };
  },
  components: {},
  mounted() {
    if (this.src) {
      this.showTime();
    }
  },
  watch: {
    ["playIndex"]() {
      if (this.index != this.playIndex) {
        if (this.recordingStatus) {
          this.recordingStatus = false;
          this.recording.load();
        }
      }
    },
    ["src"]() {
      if (this.src) {
        this.showTime();
      }
    },
  },
  methods: {
    formatDate(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60); //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60); //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60); //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime);
      result =
        (parseInt(minuteTime) > 10
          ? "0" + parseInt(minuteTime)
          : parseInt(minuteTime)) +
        ":" +
        (result > 10 ? result : "0" + result);
      /*  if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "'" + result;
      } */
      return result;
    },
    showTime() {
      var _this = this;
      this.recording = this.$refs.audio;
      var recordingTime = "";
      this.recording.load();
      this.recording.oncanplay = function () {
        _this.recordingTime = _this.formatDate(_this.recording.duration);
      };
      this.recording.ontimeupdate = function () {
        _this.playTime = _this.recording.currentTime;
      };
      this.recording.onended = function () {
        _this.recordingStatus = false;
      };
    },
    playRecording() {
      if (this.recordingTime) {
        if (this.recordingStatus) {
          this.recordingStatus = false;
          this.recording.load();
        } else {
          this.recordingStatus = true;
          this.recording.play();
          this.$emit("playSoundCallback", { playIndex: this.index });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sound {
  width: 100%;
  background: #f2f2f2;
  position: relative;
  border-radius: 4px;
  > div {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    .left {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url(../assets/img/h5/sound.png) no-repeat;
        background-size: 40px 40px;
      }
      .info {
        flex: 1;
        overflow: hidden;
        margin-left: 10px;
        .name {
          font-size: 13px;
          line-height: 21px;
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time {
          font-size: 12px;
          line-height: 21px;
          color: #999999;
        }
      }
    }
    i {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(../assets/img/h5/sound_play.png) no-repeat;
      background-size: 24px 24px;
    }
    i.play {
      background: url(../assets/img/h5/sound_stop.png) no-repeat;
      background-size: 24px 24px;
    }
  }
}
</style> 