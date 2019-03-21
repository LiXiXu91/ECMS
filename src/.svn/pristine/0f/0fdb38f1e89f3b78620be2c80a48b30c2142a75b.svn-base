<style scoped>

</style>
<template>
	<div >
		<router-view>

		</router-view>
	</div>
</template>
<script>
    var storage = require('../common/store')
	export default {
		data() {
			return {

			}
		},
		computed: {

		},
		watch: {

		},
		methods: {

		},
		mounted: function() {

		},
		created: function() {
            if (!storage.store.get('token')) {
                this.$router.push('/login')
            }
		}
	}
</script>