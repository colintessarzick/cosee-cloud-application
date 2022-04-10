<script>
import GridItem from '../components/GridItem.vue';

export default {
  data() {
    return {
      images: Array,
      queryString: '',
    };
  },
  components: { GridItem },
  methods: {
    filter() {
      var filterRaw = this.queryString.replace(', ', ',');
      var query = filterRaw.toLowerCase().split(',');
      if (query[0] == '') {
        query = [];
      }
      var queryJSON = JSON.stringify(query);

      this.getImages(queryJSON);
    },
    getImages(query) {
      var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      var url =
        'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/images?tags=' +
        query;
      fetch(url, requestOptions).then(async (response) => {
        if (response.status == 200) {
          var object = await response.json();
          this.images = object.body;
        } else {
          console.error('error occured');
        }
      });
    },
  },
  mounted() {
    var array = JSON.stringify([]);
    this.getImages(array);
  },
};
</script>

<template>
  <div class="searchbar">
    <input
      type="text"
      name="filter"
      placeholder="Type the tags to filter for"
      v-model="queryString"
      v-on:keyup.enter="filter"
    />

    <a href="/upload">Upload New File</a>
  </div>
  <section id="content-grid">
    <GridItem
      v-for="item in images"
      :key="item.id"
      :image="item.file_url"
      :name="item.filename"
      :tags="item.tags"
      :id="item.id"
    />
  </section>
</template>

<style>
.searchbar {
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid lightgrey;
  gap: 1rem;
}
.searchbar > input {
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  border-radius: 3rem;
}
.searchbar > a {
  background-color: #a5b1ff;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2rem;
  color: #000;
  text-decoration: none;
  font-size: 0.85rem;
  text-transform: capitalize;
}

#content-grid {
  width: 100%;
  max-width: 1224px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 3rem 0;
}
</style>
