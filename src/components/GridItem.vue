<script>
import Tag from './Tag.vue';

export default {
  props: {
    image: String,
    name: String,
    tags: Array,
    id: String,
  },
  components: { Tag },
};
</script>

<template>
  <a class="image-grid-item" :href="id">
    <img :src="image" :alt="name" />
    <h2>{{ name }}</h2>
    <div class="image-tags" v-if="tags">
      <Tag v-for="tag in tags" :key="tag" :label="tag" />
    </div>
  </a>
</template>

<style>
a.image-grid-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  align-items: start;
  justify-content: flex-start;
  overflow: hidden;
  text-decoration: none;
  color: black;
}

a.image-grid-item > img {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 5px;
  transition: 500ms;
  object-fit: cover;
  object-position: center;
  background-color: #d9d9d9;
}

a.image-grid-item > h2 {
  font-size: 1.25rem;
  font-weight: 500;
  font-style: normal;
  margin: 0;
}

a.image-grid-item > div {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
  overflow: hidden;
}
</style>
