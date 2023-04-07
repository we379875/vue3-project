<template>
  <div>
    <p>{{ value1 }}</p>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <el-select v-model="value5" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="value5" placeholder="Please input" />
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
    <el-select v-model="value5" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    {{ value5 }}
    <div class="mapContainer" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentInstance, onMounted, ref, reactive } from "vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
const value1 = ref("");
const value5 = ref("Option2");
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
  console.log($url);
  console.log(globalProperties.$http);
  const map = L.map(mapContainer.value, {
    center: [23.611, 120.768],
    zoom: 8,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  globalProperties.$http
    .post(`${$url}search_SP_List`, {
      page: 1,
    })
    .then((res) => {
      console.log(res.data.data);
    })
    .finally(() => {})
    .catch((e) => {
      console.log("Process_read", e);
    });
});
</script>

<style>
.mapContainer {
  width: 900px;
  height: 900px;
  border: 2px solid red;
}
</style>
