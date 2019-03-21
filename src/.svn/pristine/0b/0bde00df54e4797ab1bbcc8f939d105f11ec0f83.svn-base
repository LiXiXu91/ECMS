<style lang="less" scoped>
    .record-item {
        padding: 8px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        background: #ffffff;
        margin-bottom: 10px;
        border-radius: 5px;
        color: rgb(16,16,16);
    }
    p {
        margin-bottom: 0;
    }
</style>
<template>
    <div class="record-item">
        <div>
            <p>{{recordItem.name}}</p>
            <p>￥{{recordItem.price}}</p>
            <p>{{recordItem.num}}件</p>
            <p style="color: rgb(203,203,203)">
                <span v-if="recordItem.order_type==10" style="color: rgb(37,253,36)">购</span>
                <span v-if="recordItem.order_type==20" style="color:rgb(229,28,35)">赠</span>
                {{recordItem.created}}
            </p>
        </div>
        <div>
            <img :src="recordItem.src" alt="" style="width: 100px;height: 90px">
        </div>
    </div>
</template>

<script>

export default {
    name: 'recordItem',
    props: {
        recordItem: {
            type: Object,
            required: true
        }
    },
    data () {
        return {

        }
    },
    computed: {

    },
    methods:{

    }
}
</script>


