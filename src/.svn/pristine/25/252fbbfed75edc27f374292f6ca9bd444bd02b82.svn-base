<template>
    <div class="container_box" ref="el">
        <a-row style class="mag_push_title">
            <a-col span="12" class="til">{{createState==1?'添加产品':'编辑产品'}}</a-col>
            <a-col span="12" class="flr">
                <a-button type="default" icon="left" @click="back">返回</a-button>
            </a-col>
        </a-row>
        <a-row justify="center"    style="padding: 20px 0;position: relative;background:#fff;overflow:auto;height: calc(100vh - 200px)" >
            <a-col span="18" push="3">
                <a-form>
                    <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="产品名称："
                        :validateStatus='saveFlag?"success":paramsObj.title?"success":"error"'
                        :help='saveFlag?"":paramsObj.title?"":"请输入产品名称"'
                    >
                        <a-input placeholder="请输入产品名称" v-model="paramsObj.title"/>
                    </a-form-item>

                    <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="货号："
                        :validateStatus='saveFlag?"success":paramsObj.item_number?"success":"error"'
                        :help='saveFlag?"":paramsObj.item_number?"":"请输入产品货号"'
                    >
                        <a-input placeholder="请输入产品货号" v-model="paramsObj.item_number"/>
                    </a-form-item>

                    <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="产品类别："
                        :validateStatus='saveFlag?"success":paramsObj.class_id?"success":"error"'
                        :help='saveFlag?"":paramsObj.class_id?"":"请选择产品类别"'
                    >
                        <a-select
                            v-model="paramsObj.class_id"
                            placeholder="请选择类别"
                            style="width: 150px;margin-right: 20px;"
                            @change="selChange"
                        >
                            <a-select-option v-for="(item,index) in selectList" :key="item.id">{{item.title}}</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="产品价格："
                        :validateStatus='saveFlag?"success":paramsObj.price?"success":"error"'
                        :help='saveFlag?"":paramsObj.price?"":"请输入产品价格"'
                    >
                        <a-input-number
                            style="width: 100%;"
                            :formatter="value => `${value}元`"
                            :parser="value => value.replace('元', '')"
                            placeholder="请输入产品价格（元）"
                            v-model="paramsObj.price"
                        />
                    </a-form-item>

                    <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="产品图片："
                        :validateStatus='saveFlag?"success":fileList.length>0?"success":"error"'
                        :help='saveFlag?"":fileList.length>0?"":"请上传产品图片"'
                    >
                        <a-upload-dragger
                            name="file"
                            :headers="headers"
                            @change="handleChange"
                            listType="picture-card"
                            :beforeUpload="beforeUpload"
                            :multiple="true"
                            :showUploadList="false"
                            action="/index.php?r=uc/user/upload"
                        >
                            <p class="ant-upload-drag-icon">
                                <a-icon type="inbox"/>
                            </p>
                            <p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
                        </a-upload-dragger>
                    </a-form-item>

                    <div class="clearfix ant-upload-list ant-upload-list-picture-card">
                        <div
                            class="ant-upload-list-item ant-upload-list-item-done"
                            v-for="(item,index) in fileList"
                            :key="item.id"
                        >
                            <div class="ant-upload-list-item-info">
                                <span>
                                    <a
                                        href="javascript:void(0)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="ant-upload-list-item-thumbnail"
                                    >
                                        <img :src="item" :alt="item">
                                    </a>
                                </span>
                            </div>
                            <span class="ant-upload-list-item-actions">
                                <a href="javascript:void(0)">
                                    <a-icon type="eye" @click="handlePreview(item)"></a-icon>
                                </a>
                                <a-icon type="delete" @click="deleteFn(index)"></a-icon>
                            </span>
                        </div>

                        <div class="ant-upload-list-item ant-upload-list-item-done" v-if="loading">
                            <a-icon type="loading" class="loading"/>
                        </div>
                    </div>
                </a-form>
            </a-col>
            <a-col span="18" push="3" style="text-align: right">
                <a-row>
                    <a-col span="5">
                    </a-col>
                    <a-col span="12">
                        <a-button  type="primary" @click="save()">保存</a-button>
                        <a-button  @click="back">取消</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
		 <!--<div class="send-action" style="position: fixed;bottom: 0;left: 0;width: 100%;background: #f0f2f5;padding-top: 20px;">&lt;!&ndash;    &ndash;&gt;-->
		 	<!--<a-button class="btn btn_send" type="primary" @click="save()">保存</a-button>-->
			<!--<a-button class="btn" @click="back">取消</a-button>	-->
		<!--</div>-->
        <a-modal :visible="previewVisible" :footer="null" @cancel="cancel">
            <img alt="example" style="width: 100%" :src="mediapath">
        </a-modal>
    </div>
</template>

<script>
var storage = require("../../common/store");
export default {
    name: "new_add",
    data() {
        return {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 5
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 12
                }
			},
			hflg:false,
            createState: "", //新增或者编辑状态
            previewVisible: false,
            loading: false,
            mediapath: "", //预览图片地址
            paramsObj: {}, //所有内容编辑参数集合
            selectList: [], //分类列表
            fileList: [], //图片列表
            headers: {
                Authorization: storage.store.get("token")
            },
            saveFlag:true
        };
    },
    methods: {
        back() {
            this.$router.push({
                path: "/productManage/productInfo"
            });
        },
        cancel() {
            this.previewVisible = false;
        },
        selChange(value) {
            this.paramsObj.class_id = value; //分类id
        },
        handleChange(info) {
            let that = this;
            if (info.file.status === "uploading") {
                this.loading = true;
                return;
            }
            if (info.file.status === "done") {
                if (info.file.response.status == 1) {
                    that.fileList.push(info.file.response.data.path);
                    this.loading = false;
                } else {
                    that.$notification["warning"]({
                        message: "上传错误",
                        description: info.file.response.msg
                    });
                    this.loading = false;
                }
            } else if (info.file.status === "error") {
                that.$notification["warning"]({
                    message: "上传失败",
                    description: "文件" + info.file.name + "上传失败"
                });
                this.loading = false;
            }
        },
        beforeUpload(file) {
            console.log(file.type === "image/jpeg");
            const isJPG =
                file.type === "image/jpeg"
                    ? true
                    : file.type === "image/png"
                    ? true
                    : file.type === "image/jpg"
                    ? true
                    : false;
            if (!isJPG) {
                this.$notification["warning"]({
                    message: "文件格式不正确",
                    description: "文件格式不正确，请选择JPG或PNG。"
                });
            }
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$notification["warning"]({
                    message: "超出文件大小限制",
                    description: "图像不能大于1MB！"
                });
                this.$message.error("图像不能大于1MB！");
            }
            return isJPG && isLt2M;
        },

        handlePreview(img) {
            this.mediapath = img;
            this.previewVisible = true;
        },
        deleteFn(index) {
            this.fileList.splice(index, 1);
        },
        save() {
            if (
                !this.paramsObj.price ||
                !this.fileList.length ||
                !this.paramsObj.class_id ||
                !this.paramsObj.title ||
                !this.paramsObj.item_number
            ) {
                this.saveFlag = false
                return false;
            }
            let arr = [];
            for (let item of this.fileList) {
                arr.push(item);
            }
            this.paramsObj.src = arr;
            this.$axios({
                method: "POST",
                url: "/index.php?r=uc/product/goods-add",
                data: Object.assign({ data: [this.paramsObj] }) // 参数
            }).then(d=> {
                // 响应成功回调
                var udata = d.data;
                if (udata.status == 1) {
                    this.$message.success('保存成功');
                    this.saveFlag = true
                    this.$router.push({
                        path: "/productManage/productInfo"
                    });
                }
            });
        },

        refreshGroup() {
            this.$axios({
                method: "GET",
                url: "/index.php?r=uc/product/goods-info",
                params: { id: this.$route.query.id } // 参数
            }).then(d=> {
                // 响应成功回调
                var udata = d.data;
                if (udata.status == 1) {
                    this.paramsObj = udata.data;
                    this.fileList = udata.data.src;
                    this.saveFlag = false
                }
            });
        },

        getSelect() {
            let that = this;
            this.$axios({
                //请求分类下拉列表
                method: "GET",
                url: "/index.php?r=uc/product/get-class",
                params: {}
            }).then(function(d) {
                // 响应成功回调
                var udata = d.data;
                if (udata.status == 1) {
                    that.selectList = udata.data;
                }
            });
        }
    },
    created() {
        this.paramsObj = {};
        this.paramsObj.id = this.$route.query.id;
        this.createState = this.$route.query.create;
        this.getSelect();
        if (this.createState == "2") {
                this.refreshGroup();
        }
    },
};
</script>

<style>
.container_box {
    /* height: calc(100vh - 90px);
		overflow-y: auto;
		max-height: 500px; */
}
.flr {
    text-align: right;
}
.til {
    font-size: 18px;
    font-weight: bold;
}
.ant-upload-list {
    position: relative;
    height: 112px;
    width: 58%;
    margin-left: 21%;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload.ant-upload-drag p.ant-upload-text {
    margin-top: 8px;
    padding: 0 10px;
    color: #666;
}

.ant-upload-list-item-actions svg {
    font-size: 20px;
}
.ant-upload-drag-icon svg {
    font-size: 60px;
}
</style>
<style lang="less" scoped="scoped">
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -7px;
    margin-left: -7px;
    svg {
        font-size: 24px;
    }
}

.mag_push_title {
    background: #fff;
    margin: 0 0 10px 0;
    padding: 12px 38px;

    font-size: 16px;
}
.send-action {
    text-align: right;
    // background: #f0f2f5;
    padding: 10px 50px 20px;
    .btn {
        padding: 0 25px;
    }
    .btn:nth-child(1) {
        margin-right: 30px;
    }
    .btn_send {
        background: #1890ff;
        border-color: #1890ff;
    }
}
</style>