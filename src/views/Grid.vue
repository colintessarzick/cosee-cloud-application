<script>
import GridItem from '../components/GridItem.vue';

export default {
  data() {
    return {
      images: [],
    };
  },
  components: [GridItem],
};
</script>

<template>
  <section id="content-grid">
    <GridItem
      v-for="item in images"
      :key="item.id"
      :image="item.url"
      :name="item.name"
      :tags="item.tags"
    />
  </section>
</template>
