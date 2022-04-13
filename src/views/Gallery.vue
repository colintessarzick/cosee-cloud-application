<script>
import GridItem from '../components/GridItem.vue';

export default {
  data() {
    return {
      images: Array,
      queryString: '',
      timer: undefined,
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

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.getImages(queryJSON);
      }, 750);
    },
    getImages(query) {
      var overlay = document.getElementsByClassName('loading-container')[0];
      overlay.style.display = 'flex';

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
        overlay.style.display = 'none';
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
      placeholder="Filter by tags or name"
      v-model="queryString"
      v-on:keyup="filter"
    />

    <a href="/upload">Upload File</a>
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

    <div class="loading-container">
      <p>loading ...</p>
    </div>
  </section>
</template>

<style>
.searchbar {
  z-index: 100;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--cosee-c-greyscale2);
  gap: 1rem;
}
.searchbar > input {
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 500px;
  border: 2px solid var(--cosee-c-greyscale1);
  font-size: 1rem;
  border-radius: 3rem;
  transition: 250ms;
}
.searchbar > input:focus {
  border: 2px solid var(--cosee-c-primary);
  outline: none;
}
.searchbar > a {
  background-color: var(--cosee-c-black);
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 2rem;
  color: var(--cosee-c-primary);
  text-decoration: none;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.64px;
  transition: 250ms;
}
.searchbar > a:hover {
  background-color: var(--cosee-c-primary);
  color: var(--cosee-c-black);
}

section#content-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 3rem 10%;
  position: relative;
}

section#content-grid > .loading-container {
  z-index: 99;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.35);
  display: none;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1.28px;
  font-size: 1rem;
  font-weight: 600;
}
</style>
