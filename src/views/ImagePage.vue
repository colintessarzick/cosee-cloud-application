<script>
import Tag from '../components/Tag.vue';

export default {
  data() {
    return {
      name: '',
      file_url: '',
      created: null,
      updated: null,
      tags: [],
    };
  },
  props: {
    id: String,
  },
  components: { Tag },
  mounted() {},
  methods: {
    deleteImage() {
      var requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      var url =
        'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/images' +
        window.location.pathname;
      fetch(url, requestOptions).then(async (response) => {
        if (response.status == 200) {
          console.log('success');
          this.$router.push({ path: '/' });
        }
      });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <img :src="file_url" :alt="name" />
    <div class="meta-data">
      <h1>{{ name }}</h1>
      <p>{{ created }}</p>
      <p>{{ updated }}</p>
      <Tag v-for="tag in tags" :key="tag" :label="tag" />
    </div>
    <button @click="deleteImage">Delete Image</button>
  </div>
</template>
