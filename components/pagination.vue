<template>
  <div>
    <div class="pagination">
      <div class="paginationBox">
        <span
          v-if="nowPage != 1"
          :class="['prev', { noPrev: nowPage == 1 }]"
          @click="nowPage == 1 ? '' : showPage(nowPage - 1)"
        >
          <i></i>
        </span>
        <div>
          <span
            v-if="nowPage - 3 >= 1 && pageTotal > showPageNum"
            @click="showPage(1)"
            >1</span
          >
          <span v-if="nowPage - 3 > 1 && pageTotal > showPageNum">...</span>
          <span
            :class="{ active: nowPage == minPage + item }"
            v-for="(item, index) in showPageNum"
            :key="index"
            @click="showPage(minPage + item)"
            >{{ minPage + item }}</span
          >
          <span v-if="nowPage + 3 < pageTotal && pageTotal > showPageNum"
            >...</span
          >
          <span
            v-if="nowPage + 3 <= pageTotal && pageTotal > showPageNum"
            @click="showPage(pageTotal)"
            >{{ pageTotal }}</span
          >
        </div>
        <span
          v-if="nowPage != pageTotal"
          :class="['next', { noNext: nowPage == pageTotal }]"
          @click="nowPage == pageTotal ? '' : showPage(nowPage + 1)"
        >
          <i></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pageAll", "bg","page"],
  data() {
    return {
      pageTotal: 0,
      nowPage: 1,
      minPage: 0,
      maxPage: 0,
      showPageNum: 6,
    };
  },
  watch: {
    ['page'](){
        this.nowPage=this.page;
    },
    ["pageAll"]() {
      this.pageTotal = this.pageAll;
      this.getPage();
    },
  },
  components: {},
  mounted() {
    this.pageTotal = this.pageAll;
    this.getPage();
  },
  methods: {
    getPage() {
      this.showPageNum = this.pageTotal > 6 ? 6 : this.pageTotal;
    },
    showPage(page) {
      if (
        (page - 3 >= 1 && this.pageTotal > this.showPageNum) ||
        (page + 3 <= this.pageTotal && this.pageTotal > this.showPageNum)
      ) {
        this.showPageNum = 5;
      }
      if (page + 2 <= this.pageTotal && page + 2 > this.showPageNum) {
        this.minPage = page - 2 - 1; //-1解决显示的起始值问题
        this.maxPage = page + 2 <= this.pageTotal ? page + 2 : this.pageTotal;
        this.nowPage = page;
      } else if (page + 2 <= this.showPageNum) {
        this.minPage = 0;
        this.maxPage = this.showPageNum;
        this.nowPage = page;
      } else if (page + 2 >= this.pageTotal) {
        this.minPage = this.pageTotal - this.showPageNum;
        this.maxPage = this.pageTotal;
        this.nowPage = page;
      }

      window.scrollTo(0, 0);
      this.$emit("goPage", { page: page });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  .paginationBox {
    span {
      display: inline-block;
      width: 40Px;
      height: 40Px;
      background: #fff;
      text-align: center;
      margin-right: 8Px;
      color: rgba(33, 33, 33, 1);
      border: .5Px solid rgba(33, 33, 33, 1);
      cursor: pointer;
      vertical-align: middle;
      font-weight: 600;
      font-size: 14Px;
      line-height: 40Px;
    }
    .prev {
      background: url(~@/assets/img/components/more.png) no-repeat;
      transform: rotateY(180deg);
      background-size: 20Px 20Px;
      background-position: center center;
      margin-right: 0;
    }
    .next {
      background: url(~@/assets/img/components/more.png) no-repeat;
      background-size: 20Px 20Px;
      background-position: center center;
      margin-right: 0;
    }
    div {
      margin-left: 10Px;
    }
    span.active {
      color: rgba(255, 255, 255, 1);
      background: rgba(33, 33, 33, 1);
    }

    .noPrev {
      cursor: not-allowed;
      /* opacity: 0.3; */
    }
    .noNext {
      cursor: not-allowed;
      /*  opacity: 0.3; */
    }
    div {
      display: inline-block;
    }
  }
}
</style>