<script>
import Tag from './Tag.vue';

export default {
  props: {
    image: String,
    name: String,
    tags: [String],
  },
  components: [Tag],
};
</script>

<template>
  <div class="image-grid-item">
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <div class="image-tags" v-if="tags">
      <Tag v-for="tag in tags" :key="tag">{{ tag }}</Tag>
    </div>
  </div>
</template>

<style>
div.image-grid-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  align-items: start;
  justify-content: flex-start;
  overflow: hidden;
}

div.image-grid-item > img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transition: 500ms;
  object-fit: cover;
  object-position: center;
  background-color: #d9d9d9;
}

div.image-grid-item > h2 {
  font-size: 1.5rem;
  font-weight: 500;
  font-style: normal;
}

div.image-grid-item > div {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  overflow: hidden;
}
</style>
