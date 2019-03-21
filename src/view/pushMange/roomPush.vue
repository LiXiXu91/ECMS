<style scoped>

</style>

<template>
    <div>
        群聊推送
    </div>
</template>
<script>
    export default {
        name: ""
        ,data(){
            return{

            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{

        },
        created(){

        }
    }
</script>
