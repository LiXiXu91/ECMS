<style scoped>
    .carousel-wrapper {
        position: relative;
		font-size:0;
        max-height: 585px;
    }
    .img-item {
        width: 100%;
        height: 100%;
    }
    .prev {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -200px;
        width: 200px;
        height: 200px;
        line-height: 230px;
        text-align: center;
        cursor: pointer;
    }
    .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -200px;
        width: 200px;
        height: 200px;
        line-height: 230px;
        text-align: center;
        cursor: pointer;
    }
</style>
<template>
    <div>
        <div class="carousel-wrapper">
            <a>
                <img :src="imgSrc.src" class="img-item" v-if="imgSrc.type==0"/>
                <video :src="imgSrc.src" :destroyOnClose="true" width="100%" height="100%" controls="controls" v-if="imgSrc.type==20" :autoplay="true"></video>
            </a>
            <!-- 上一张、下一张按钮 -->
            <div  class="prev" @click="toggleImg('prev')">
                <img src="../../assets/arrow-prev.png" alt="">
            </div>
            <div class="next" @click="toggleImg('next')">
                <img src="../../assets/arrow-next.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    // 定义每个小图标的宽度
    export default {
        name: 'carousel_img',
        props: {
            imgList:{
                type:Array,
                default:[]
            },
            pos:{
                type:Number,
                default:0
            }
        },
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            // 图片路径
            imgSrc() {
                return this.imgList[this.pos];
            }
        },
        beforeDestroy() {

        },
        methods: {
            // 图片上、下一张切换
            toggleImg(type) {
                if(type === 'prev'){
                    this.pos === 0 ? this.pos = this.imgList.length - 1 : this.pos -- ;
                }else{
                    this.pos === this.imgList.length - 1 ? this.pos = 0 : this.pos ++ ;
                }
            }
        }
    };
</script>