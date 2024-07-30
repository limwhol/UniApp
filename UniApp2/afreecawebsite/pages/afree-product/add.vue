<template>
  <view class="uni-container">
	  <view class="myhead">
	  	<h1>游戏产品录入系统 CMS</h1>
	  </view>
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="title" label="游戏名" required>
        <uni-easyinput placeholder="游戏名" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="description" label="游戏描述">
        <uni-easyinput placeholder="游戏描述" v-model="formData.description" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="productImgUrl" label="游戏大图地址">
        <uni-easyinput placeholder="游戏大图地址" v-model="formData.productImgUrl" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="icon_id" label="icon的ID集合">
        <uni-easyinput placeholder="icon的ID集合" v-model="formData.icon_id" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/afree-product.js';

  const db = uniCloud.database();
  const dbCollectionName = 'afree-product';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "title": "",
        "description": "",
        "productImgUrl": "",
        "icon_id": "_id"
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 00px 500px;
  }
  .myhead{
	  height: 100px;
	  /* background-color: aqua; */
	  display: flex;
	  align-items: center;
	  justify-content: center;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
