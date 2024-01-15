<template>
  <div class="app-container">商品信息</div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 80%;
  margin: 0 auto 50px;

  .footer {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .box-card {
    margin-top: 20px;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
