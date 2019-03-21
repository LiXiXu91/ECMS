<style scoped="">
    p {
        margin-bottom: 0;
    }
    .view-material {
        background: #ffffff;
        margin: 10px 0 ;
        color: rgb(16,16,16);
        border-radius: 5px;
        cursor: pointer;
    }
    .view-material .ivu-card-head{
        padding: 0!important;
    }
    .w-a {
        width: auto!important;
        padding: 4px!important;
    }
</style>
<template>
    <div class="view-material" v-if="dataItem.type!=9" @click="emit()">
        <div v-bind:class="{ 'w-a': usedType!='0'}" style="max-width:100%;word-break: break-all;padding: 16px" v-if="dataItem!=null">
            <div v-if="dataItem.type=='1'">
                <p v-html="dataItem.content" style="padding: 5px;"></p>
            </div>
            <div v-if="dataItem.type=='2'" style="text-align: center">
                <img :src="dataItem.mediapath" style="max-width: 100%;width: auto">
            </div>
            <div v-if="dataItem.type=='3'">
                <h3>{{dataItem.title}}</h3>
                <p style="min-height: 60px;">
                    <span style="display: inline-block;max-width: calc(100% - 70px)">{{dataItem.desc}}</span>
                    <img :src="dataItem.mediapath" style="width:60px;float: right" />
                </p>
                <p >
                    链接
                </p>
            </div>
            <div v-if="dataItem.type=='7'">
                <p style="line-height: 60px;text-align: right">
                    <span style="margin-right: 20px">{{dataItem.title}}</span>
                </p>
                <p style="border-top: 1px solid #dddee1;">
                    公众号名片
                </p>
            </div>
            <div v-if="dataItem.type=='8'">
                <p style="line-height: 40px">
                    <img :src="dataItem.iconurl" style="width:40px;height: 40px;border-radius: 50%;vertical-align: middle" />
                    <span>{{dataItem.title}}</span>
                </p>
                <p style="font-weight: bold">
                    {{dataItem.desc}}
                    <img :src="dataItem.mediapath" style="max-width:100%;max-height: 200px;display: block" />
                </p>
                <p >
                    小程序
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viewMaterial",
        props: {
            dataItem:{
                type:Object,
                default:{}
            },
            usedType :{
                type: String,
                default:'0'
            }
        }
        , data() {
            return {

            }
        },
        methods:{
            emit() {
                this.$emit('click',this.dataItem)
            }
        }
    }
</script>

