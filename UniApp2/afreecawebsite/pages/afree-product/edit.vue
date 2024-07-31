<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="publish_date" label="游戏产品注册时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.publish_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="game_title" label="游戏名" required>
        <uni-easyinput placeholder="如：暗黑破坏神" v-model="formData.game_title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="game_type" label="游戏类型" required>
        <uni-easyinput placeholder="如：放置挂机类" v-model="formData.game_type" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="game_description" label="游戏描述" required>
        <uni-easyinput placeholder="如：这是一款以中世纪题材为背景的游戏，讲述的是亚瑟王和他的武士们打天下的故事。" v-model="formData.game_description" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="game_imgUrl" label="游戏大图地址" required>
        <uni-easyinput placeholder="游戏产品在首页的展示大图" v-model="formData.game_imgUrl" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="platforms" label="">
        <uni-data-checkbox :multiple="true" v-model="formData.platforms"></uni-data-checkbox>
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
        "publish_date": null,
        "game_title": "",
        "game_type": "",
        "game_description": "",
        "game_imgUrl": "",
        "platforms": []
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
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
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("publish_date,game_title,game_type,game_description,game_imgUrl,platforms").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
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
