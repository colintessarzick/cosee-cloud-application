<script>
import GridItem from '../components/GridItem.vue';

export default {
  data() {
    return {
      images: [],
    };
  },
  components: { GridItem },
  mounted() {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(
      'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/images?tags=[]',
      requestOptions
    ).then(async (response) => {
      if (response.status == 200) {
        var object = await response.json();
        this.images = object.body;
      } else {
        console.error('error occured');
      }
    });
  },
};
</script>

<template>
  <section id="content-grid">
    <GridItem
      v-for="item in images"
      :key="item.id"
      :image="item.file_url"
      :name="item.filename"
      :tags="item.tags"
    />
  </section>
</template>

<style>
section#content-grid {
  width: 100%;
  max-width: 1224px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}
</style>
