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
  <div class="image-grid-item">
    <a class="image" :href="id">
      <img :src="image" :alt="name" />
    </a>
    <h2>{{ name }}</h2>
    <div class="image-tags" v-if="tags">
      <Tag v-for="tag in tags" :key="tag" :label="tag" />
    </div>
  </div>
</template>

<style>
div.image-grid-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: fit-content;
  align-items: start;
  justify-content: flex-start;
  text-decoration: none;
  color: black;
}

div.image-grid-item > .image {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #d9d9d9;
  overflow: hidden;
}
div.image-grid-item > .image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: 500ms;
}
a.image:hover > img {
  scale: 1.05;
}

div.image-grid-item > h2 {
  font-size: 1.25rem;
  font-weight: 500;
  font-style: normal;
  margin: 0;
}

div.image-grid-item > div {
  display: flex;
  flex: 1;
  flex-flow: row wrap;
  gap: 0.75rem;
  width: 100%;
}
</style>
