<template>
  <div class="image-demo">
    <KyImage :src="source" alt="山谷插画" width="160" height="112" fit="cover" />
    <KyImage src="/missing-image-example.png" alt="不可用图片" width="160" height="112" radius="20"
      ><template #error>暂无图片</template></KyImage
    >
    <KyImage :src="source" alt="圆形山谷插画" width="88" height="88" round fit="cover" />
  </div>
</template>
<script setup lang="ts">
import KyImage from '../index';
const source =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#edf7f2"/><path d="M0 330L150 150l120 120L400 80l200 270v50H0z" fill="#78bfa0"/><circle cx="500" cy="80" r="38" fill="#ffd27d"/></svg>',
  );
</script>
<style scoped>
.image-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ky-space-4);
  align-items: center;
  justify-content: center;
  padding: var(--ky-space-4);
}
</style>
