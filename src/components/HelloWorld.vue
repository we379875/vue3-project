<template>
  <div>
    <el-card class="box-card">
      <div class="button-tab">
        <el-button
          type="primary"
          class="btn"
          :class="{ 'btn--noactive': list_activeName !== '地下孔洞查詢' }"
          @click="list_activeName = '地下孔洞查詢'"
          >地下孔洞查詢</el-button
        >
        <el-button
          type="primary"
          class="btn"
          :class="{ 'btn--noactive': list_activeName !== '巡查範圍查詢' }"
          @click="list_activeName = '巡查範圍查詢'"
          >巡查範圍查詢</el-button
        >
      </div>
      <div class="box-main">
        <div v-if="list_activeName === '地下孔洞查詢'">
          <h3 class="box-title">行政區</h3>
          <div>
            <el-select
              v-model="area"
              class="m-2"
              style="width: 320px"
              multiple
              placeholder="請選擇行政區"
              size="large"
            >
              <el-option
                v-for="item in areaOption"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <h3 class="box-title">巡查時間</h3>
          <div>
            <el-date-picker
              v-model="daterange"
              type="daterange"
              style="width: 100%"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
            />
          </div>
          <h3 class="box-title">嚴重程度</h3>
          <div>
            <el-select
              v-model="level"
              class="m-2"
              style="width: 320px"
              placeholder="請選擇嚴重程度"
              size="large"
            >
              <el-option
                v-for="item in levelOption"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
        <div v-if="list_activeName === '巡查範圍查詢'">
          <h3 class="box-title">行政區</h3>
          <div>
            <el-select
              v-model="value5"
              class="m-2"
              style="width: 320px"
              placeholder="請選擇行政區"
              size="large"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <h3 class="box-title">巡查時間</h3>
          <div>
            <el-date-picker
              v-model="daterange"
              type="daterange"
              style="width: 100%"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
            />
          </div>
        </div>
        <el-button
          type="primary"
          class="btn"
          style="width: 100%"
          @click="list_activeName = '巡查範圍查詢'"
          >查詢</el-button
        >
      </div>
    </el-card>
    <div class="mapContainer" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentInstance, onMounted, ref, reactive } from "vue";
import iconUrl from '@/assets/logo/pin.svg';
import siconUrl from '@/assets/logo/spin.svg';
const list_activeName = ref("地下孔洞查詢");
const areaOption = ref([]);
const levelOption = ref([]);
const area = ref("");
const level = ref("");
const value1 = ref("");
const daterange = ref("");
const value5 = ref("");
const mapContainer = ref(null);
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

onMounted(() => {
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  // 取得行政區
  globalProperties.$http
    .get(`${$url}getDis`)
    .then((res) => {
      areaOption.value = res.data.data.dis
    })
    .finally(() => {})
    .catch((e) => {
    });
    // 取得嚴重程度
  globalProperties.$http
    .get(`${$url}getLevel`)
    .then((res) => {
      levelOption.value = res.data.data.level
    })
    .finally(() => {})
    .catch((e) => {
    });




  // 地圖相關
  const map = L.map(mapContainer.value, {
    center: [22.654054332812326, 120.30302854477935],
    zoom: 18,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  delete L.Icon.Default.prototype._getIconUrl;

  const icon = L.icon({
    iconUrl: iconUrl,

    iconSize: [28, 40],
    iconAnchor: [14, 20],
  });
  const Sicon = L.icon({
    iconUrl: siconUrl,

    iconSize: [28, 40],
    iconAnchor: [14, 20],
  });
  L.marker([22.654054332812326, 120.30302854477935], {
    icon: icon
  }).addTo(map);

  L.marker([22.654865332812326, 120.30744854477935], {
    icon: Sicon
  }).addTo(map);



  // globalProperties.$http
  //   .post(`${$url}search_SP_List`, {
  //     page: 1,
  //   })
  //   .then((res) => {
  //     console.log(res.data.data);
  //   })
  //   .finally(() => {})
  //   .catch((e) => {
  //     console.log("Process_read", e);
  //   });
});
</script>
<style lang="scss" scoped>
.mapContainer {
  width: 100%;
  height: 80vh;
  border: 2px solid red;
}
.box-card {
  position: absolute;
  left: 0;
  text-align: left;
  top: 80px;
  z-index: 1000;
  width: 416px;
  background: #f8f8f8;
  .button-tab {
    display: flex;
    .btn {
      display: block;
      width: 50%;
      margin: 0;
      padding: 0.5rem 1rem;
      font-size: 24px;
    }
    .btn--noactive {
      background: #b5b5b5;
      border-color: transparent;
      color: #fff;
    }
  }
  .box-main {
    padding: 1.25rem 2rem;
    border: 1px solid #707070;
  }
  .box-title {
    font-size: 1.25rem;
    padding-left: 4px;
    border-left: 4px solid #02318e;
  }
}
</style>
