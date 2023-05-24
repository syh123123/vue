<template>
    <div class="footer">
        <ul class="iosPaddingBottom">
            <li @click="toPage('/')">
                <i class="footer_common1" :class="{'common1':active=='index'}"></i>
                <em :class="{'selected':active=='index','font_10':true}">首页</em>
            </li>
            <li @click="toPage('/mine')">
                <i class="footer_common3" :class="{'common3':active=='mine'}"></i>
                <em :class="{'selected':active=='mine','font_10':true}">我的</em>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['active'],
    data() {
        return {}
    },
    mounted() {},
    computed: {},
    methods: {
        toPage(link) {
            var _this = this
            this.$router.push({
                path: link,
                query: {},
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.footer {
    width: 100%;
    padding: 12px 0;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    border-top: 0.5px solid rgba(0, 0, 0, 0.08);
    z-index: 105;
    ul {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        li {
            height: 100%;
            text-align: center;
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            i {
                display: inline-block;
                text-align: center;
                background-repeat: no-repeat;
            }
            em {
                margin-top: 3px;
                display: block;
                // font-size: 10px;
                // line-height: 14px;
                height: 14px;
                color: #666666;
                font-weight: normal;
            }
            em.selected {
                color: #f0683c;
            }
        }
    }
}

.footer_common1 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-size: 25px 25px !important;
    background-image: url('../assets/img/components/footer/index.png');
}
.footer_common3 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-size: 25px 25px !important;
    background-image: url('../assets/img/components/footer/mine.png');
}
.common1 {
    background-image: url('../assets/img/components/footer/index_active.png');
}
.common3 {
    background-image: url('../assets/img/components/footer/mine_active.png');
}

</style>
