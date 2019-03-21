<template>
	<div class="background-color">
		<div class="tab">
			<div class="ant-table-wrapper">
				<div class="ant-spin-nested-loading">
					<div class="ant-spin-container">
						<div class="ant-table ant-table-scroll-position-left ant-table-default">
							<div class="ant-table-content">
								<div class="ant-table-body">
									<table>
										<thead class="ant-table-thead">
											<tr>
												<th key="mobile_serial" class="ant-table-align-center" style="text-align: center;">
													<div>告警类型</div>
												</th>
												<th key="nickname" class="ant-table-align-center" style="text-align: center;">
													<div>告警阈值</div>
												</th>
												<th key="level" class="ant-table-align-center" style="text-align: center;">
													<div>故障阈值</div>
												</th>
											</tr>
										</thead>
										<tbody class="ant-table-tbody">
											<!--<tr class="ant-table-row">-->
												<!--<td style="text-align: center;">电量</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;电量告警阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.electricity_alarm" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;电量故障阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.electricity_fault" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
											<!--</tr>-->
											<!--<tr class="ant-table-row">-->
												<!--<td style="text-align: center;">CPU</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;cpu告警阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.cpu_alarm" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;cpu故障阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.cpu_fault" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
											<!--</tr>-->
											<!--<tr class="ant-table-row">-->
												<!--<td style="text-align: center;">运存</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;运行内存告警阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.memory_alarm" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;运行内存故障阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.memory_fault" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
											<!--</tr>-->
											<!--<tr class="ant-table-row">-->
												<!--<td style="text-align: center;">内存</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;硬盘使用告警阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.disk_alarm" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
												<!--<td style="text-align: center;">-->
													<!--&lt;!&ndash;硬盘使用故障阀值&ndash;&gt;-->
													<!--<a-input-number v-model="queryForm.disk_fault" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />-->
												<!--</td>-->
											<!--</tr>-->
											<tr class="ant-table-row">
												<td style="text-align: center;">心跳间隔</td>
												<td style="text-align: center;">
													<!--心跳告警阀值-->
													<a-input-number v-model="queryForm.heartbeat_alarm" :min="0" :max="10000" :formatter="value => `${value}s`" :parser="value => value.replace('s', '')" />
												</td>
												<td style="text-align: center;">
													<!--心跳故障阀值-->
													<a-input-number v-model="queryForm.heartbeat_fault" :min="0" :max="10000" :formatter="value => `${value}s`" :parser="value => value.replace('s', '')" />
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a-row>
			<a-col span="23"  style="text-align: right;">
				<a-button type='primary' @click="submit">保存</a-button>
			</a-col>
		</a-row>
	</div>
</template>
<script>
	
	export default {
		name: "monitorSetting",
		data() {
			return {
				queryForm: {
					cpu_alarm: 0,
					cpu_fault: 0,
					electricity_alarm: 0,
					electricity_fault: 0,
					heartbeat_alarm: 0,
					heartbeat_fault: 0,
					memory_alarm: 0,
					memory_fault: 0,
					disk_alarm: 0,
					disk_fault: 0
				},
			}
		},

		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
		},
		methods: {
			submit() {
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/monitor-setting',
					data: Object.assign(that.queryForm) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$message.success('保存成功', 2);
						that.refreshGroup();
					}
				});
			},
			refresh() {
				this.refreshGroup();
			},
			onChangeStart(date, dateString) {
				this.queryForm.startTime = dateString;
			},
			onChangeEnd(date, dateString) {
				this.queryForm.endTime = dateString;
			},

			refreshGroup() {
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/monitor',
					data:{} // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.queryForm.cpu_alarm = parseFloat(udata.data.monitor.cpu_alarm); //	cpu告警阀值
						that.queryForm.cpu_fault = parseFloat(udata.data.monitor.cpu_fault) //	cpu故障阀值
						that.queryForm.electricity_alarm = parseFloat(udata.data.monitor.electricity_alarm) //	电量告警阀值
						that.queryForm.electricity_fault = parseFloat(udata.data.monitor.electricity_fault) //	电量故障阀值
						that.queryForm.heartbeat_alarm = parseFloat(udata.data.monitor.heartbeat_alarm) //	心跳告警阀值
						that.queryForm.heartbeat_fault = parseFloat(udata.data.monitor.heartbeat_fault) //	心跳故障阀值
						that.queryForm.memory_alarm = parseFloat(udata.data.monitor.memory_alarm) //	运行内存告警阀值
						that.queryForm.memory_fault = parseFloat(udata.data.monitor.memory_fault) //	运行内存故障阀值
						that.queryForm.disk_alarm = parseFloat(udata.data.monitor.disk_alarm) //	硬盘使用告警阀值
						that.queryForm.disk_fault = parseFloat(udata.data.monitor.disk_fault) //	硬盘使用故障阀值
					}
				});
			}
		},
		created: function() {
			this.refreshGroup();
		},
		mounted() {},
		beforeUpdate() {}
	}
</script>
<style scoped>
	.background-color {
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
</style>
<style lang="less" scoped>
	.tab {
		margin: 20px 20px 50px 20px;
	}
	
	.background-color {
		background: #fff;
	}
</style>