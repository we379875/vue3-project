<template>
  <div class="headerBar">
    <img
      src="@/assets/logo/header-logo.svg"
    />
    <h2 class="header-title" style="margin-left: 1rem">地下孔洞檢測查詢系統</h2>
  </div>
</template>
<style lang="scss" scoped>
.headerBar {
  display: flex;
  align-items: center;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 80px;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  .header-title {
    color: #000000;
    font-size: 40px;
  }
}
</style>
