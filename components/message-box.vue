<template>
  <div>
    <div class="mint-msgbox-wrapper">
      <transition name="msgbox-bounce">
        <div class="mint-msgbox" v-if="value">
          <div class="mint-msgbox-header" v-if="title !== ''">
            <div class="mint-msgbox-title">{{ title }}</div>
          </div>
          <div class="mint-msgbox-content" v-if="message !== ''">
            <div class="mint-msgbox-message" v-html="message"></div>
          </div>
          <div class="mint-msgbox-btns">
            <div :class="[ confirmButtonClasses2 ]" v-show="showConfirmButton2">
              <span @click="handleAction('confirm2')">{{ confirmButtonText2 }}</span>
            </div>
            <div :class="[ cancelButtonClasses ]" v-show="showCancelButton">
              <span @click="handleAction('cancel')">{{ cancelButtonText }}</span>
            </div>
            <div :class="[ confirmButtonClasses ]" v-show="showConfirmButton">
              <span @click="handleAction('confirm')">{{ confirmButtonText }}</span>
            </div>
          </div>
          <div class="msgbox-cancle-icon icon-cancle" v-show="showCancleIcon" @click="doClose()">×</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.mint-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 78%;
  font-size: 12px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  z-index: 1000;
  border: 4px;
  padding: 19px;
  border-radius:4Px;
}
.mint-msgbox-content {
  margin-top: 7px;
}
.mint-msgbox-title {
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
  font-weight: bolder;
}
.mint-msgbox-message {
  text-align: center;
  font-size: 13px;
  line-height: 25px;
  color: #333333;
}
.mint-msgbox-btns {
  margin-top: 19px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 46px;
  justify-content: space-between;
  line-height: 46px;
}
.mint-msgbox-btns > div {
  flex: 1;
  text-align: center;
}
.mint-msgbox-btns > div:not(:last-child) {
  margin-right: 15px;
}
.mint-msgbox-btn > span {
  display: inline-block;
  font-size: 13px;
  color: #666666;
  border: 1px solid #cccccc;
  border-radius: 4Px;
  background: #fff;
  width: 100%;
}
.mint-msgbox-confirm2 > span,
.mint-msgbox-confirm > span {
  font-size: 13px;
  color: #ffffff;
  border: 1Px solid rgba(201, 55, 61, 1);
  border-radius: 4Px;
  background: rgba(201, 55, 61, 1);
}
.mint-msgbox-btn:focus {
  outline: none;
}
.mint-msgbox-btn:active {
  background-color: #fff;
}
.mint-msgbox-cancel {
  width: 180px;
}
.mint-msgbox-cancel > span {
  border: 1px solid #d9d9d9;
  color: #333333;
  background: #ffffff;
  border-radius: 10Px;
}
.mint-msgbox-cancel:active {
  color: #000;
}
.msgbox-bounce-enter {
  opacity: 0;
  -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
.msgbox-cancle-icon {
  position: fixed;
  top: 0;
  right: 10px;
  color: #333;
  font-size: 24px;
  cursor: pointer;
}
</style>

<script type="text/babel">
let CONFIRM_TEXT = "22";
let CANCEL_TEXT = "22";
let CANALE_ICON = true;
import Popup from "@/assets/js/untils/popup.js";
export default {
  mixins: [Popup],
  props: {
    modal: {
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      default: true,
    },
    closeOnPressEscape: {
      default: true,
    },
    showCancleIcon: {
      default: false,
    },
  },
  computed: {
    confirmButtonClasses() {
      let classes =
        "mint-msgbox-btn mint-msgbox-confirm " + this.confirmButtonClass;
      if (this.confirmButtonHighlight) {
        classes += " mint-msgbox-confirm-highlight";
      }
      if (!this.showCancelButton) {
        classes += " mint-msgbox-confirm-center";
      }
      return classes;
    },
    confirmButtonClasses2() {
      let classes =
        "mint-msgbox-btn mint-msgbox-confirm2 " + this.confirmButtonClass2;
      if (this.confirmButtonHighlight2) {
        classes += " mint-msgbox-confirm-highlight2";
      }

      return classes;
    },
    cancelButtonClasses() {
      let classes =
        "mint-msgbox-btn mint-msgbox-cancel " + this.cancelButtonClass;
      if (this.cancelButtonHighlight) {
        classes += " mint-msgbox-cancel-highlight";
      }
      return classes;
    },
  },
  methods: {
    doClose() {
      this.value = false;
      this._closing = true;
      this.onClose && this.onClose();
      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== "hidden") {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
      this.opened = false;
      if (!this.transition) {
        this.doAfterClose();
      }
    },
    handleAction(action) {
      if (this.handleAction1) {
        this.handleAction1(action);
      } else {
        if (
          this.$type === "prompt" &&
          action === "confirm" &&
          !this.validate()
        ) {
          return;
        }
        this.value = false;
        if (action != "cancel") {
          var callback = this.callback;
          callback(action);
        } else if (action == "cancel") {
          this.showCancleIcon = false;
          // comback.js
          var callback = this.callback;
          callback(action);
        }
      }

      // if(action == 'cancel'){
      //     this.showCancleIcon = false
      // }
    },
    validate() {
      this.editorErrorMessage = "";
      this.$refs.input.classList.remove("invalid");
      return true;
    },
  },

  data() {
    return {
      title: "",
      message: "",
      type: "",
      inputErrorMessage: "",
      showConfirmButton: true,
      showConfirmButton2: false,
      showCancelButton: false,
      confirmButtonText: "",
      confirmButtonText2: "",
      cancelButtonText: "",
      confirmButtonClass: "",
      confirmButtonClass2: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      editorErrorMessage: null,
      callback: null,
      handleAction1: null,
    };
  },
};
</script>