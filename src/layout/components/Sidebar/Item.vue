<template>
  <el-icon v-if="icon && icon.includes('el-icon')" class="sub-el-icon" />
  <SvgIcon v-else-if="icon" :icon-class="icon" />
  <span v-if="title">{{ translateRouteTitle(title) }}</span>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentcolor;
}
</style>
