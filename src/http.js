import axios from "axios";
import router from "./router";
import Vue from "vue";
import store from "./store/index";

axios.defaults.timeout = 300 * 10000;

const pending = []; // 存放每個請求的物件，{ url: config.url, methodType: config.method, f: c }
const cancelToken = axios.CancelToken;
const removePending = ({ url, method, data }) => {
  pending.forEach((item) => {
    if (item.url === url && item.methodType === method) {
      // 如果有重複的請求就把他取消
      item.f("重複請求(" + url + ")");
      pending.splice(item, 1);
    }
  });
};

function handleException(apiUrl = "") {
  const exception = ["version", "VerificationOnly"];
  const isSame = exception.some((item) => {
    return apiUrl.includes(item);
  });
  return isSame;
}

axios.interceptors.response.use(
  (response) => {
    // 請求成功後
    removePending(response.config); // 請求成功後，從 pending 移除剛剛的請求
    const isFormData = (v) => {
      return Object.prototype.toString.call(v) === "[object FormData]";
    };
    // 如果有資料且不為formData
    if (response.config.data && !isFormData(response.config.data)) {
      const url = response.config.url;
      if (!handleException(url)) {
        // 如果有需要監控的api，就把它存到store
        store.commit("setWatchApiStatus", response.config.url);
      }
    }
    if (response.data.status === "error") {
      // alert(response.data.message)
      // 跳警告訊息，內容為後端回傳。
      if (typeof response.data.message !== "undefined") {
        Vue.prototype.$message({
          message: response.data.message,
          type: "error",
        });
      }
    }
    return response;
  },
  (error) => {
    if (
      error.response?.status === 500 &&
      error.response?.data?.code === -1 &&
      Vue.prototype.$NODE_ENV === "development"
    ) {
      const errorMessage = JSON.stringify(error.response);
      const html = `
                    <div><strong>網址:</strong></div>
                    <div>${error.response.config.url}</div>
                    <hr>
                    <div><strong>訊息:</strong></div>
                    <div>${error.response.data?.message}</div>
                    <hr>
                    <div><strong>原因:</strong></div>
                    <div>${error.response.data?.data}</div>
                    <div class="theErrorMessage-messgae" style="display:none">${errorMessage}</div>
                    <button class="theErrorMessage-btn">詳細資訊</button>
                `;
      Vue.prototype.$notify({
        title: "api錯誤", // 標題
        message: html, // 要顯示的訊息
        dangerouslyUseHTMLString: true, // 開啟html功能
        customClass: "theErrorMessage", // 自定義class名稱
        duration: 0, // 不自動關閉
      });
      store.commit("setApiErrorArray", error.response.config.url);
      // console.log(Vue.prototype)
    } else if (error.response?.data?.code === "500") {
      Vue.prototype.$message({
        message: error.response.data.message,
        type: "error",
      });
      // token失效則登出
      router.push({
        name: "signIn",
        params: {
          type: "manual",
        },
      });
    } else if (
      error.response?.status === 500 ||
      error.response?.status === 404
    ) {
      Vue.prototype.$message({
        message: "伺服器發生錯誤，請聯繫相關單位進行處理！",
        type: "error",
      });
      // 權限
    } else if (error.response?.status === 401) {
      if (router.currentRoute.name !== "signin") {
        localStorage.clear();
        router.push({
          name: "signin",
          params: {
            type: "manual",
          },
        });
      }
    } else {
      console.log(error.response);
    }
    // console.log(error.response)
    return Promise.reject(error);
  }
);

export default axios;
