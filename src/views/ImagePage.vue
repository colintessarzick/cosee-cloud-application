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
  mounted() {
    var url =
      'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/images' +
      window.location.pathname;
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, requestOptions).then(async (data) => {
      var object = await data.json();
      this.name = object.body.filename;
      this.file_url = object.body.file_url;
      this.created = object.body.created;
      this.updated = object.body.updated;
      this.tags = object.body.tags;
    });

    var tagInput = document.getElementById('tag-input');
    var tagString = this.tags.join(', ');
    tagInput.value = tagString;
  },
  methods: {
    deleteImage() {
      var message = document.getElementById('delete-button');
      message.innerText = 'Deleting ...';

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
    updateFields() {
      var message = document.getElementById('update-button');
      message.innerText = 'processing';

      var tagInput = document.getElementById('tag-input').value;
      var tagsRaw = tagInput.replace(', ', ',');
      var tagsJSON = tagsRaw.toLowerCase().split(',');
      var requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          tags: tagsJSON,
        }),
      };

      var url =
        'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/images' +
        window.location.pathname;
      fetch(url, requestOptions).then(async (response) => {
        if (response.status == 200) {
          console.log('success');
          var button = document.getElementById('update-button');
          window.setTimeout(function () {
            button.classList.remove('success');
            button.innerText = 'save changes';
          }, 2500);
          button.classList.add('success');
          button.innerText = 'changes saved';
        }
      });
    },
    convertToDate(unix) {
      var a = new Date(unix * 1000);
      var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
      return time;
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <img :src="file_url" :alt="name" />
    <div class="meta-data">
      <input id="title-input" type="text" name="name" v-model="name" />
      <p v-if="created">Image uploaded: {{ convertToDate(created) }}</p>
      <p v-if="updated">Image updated: {{ convertToDate(updated) }}</p>
      <input id="tag-input" type="text" name="tags" v-model="tags" />
      <button id="update-button" @click="updateFields">Save Changes</button>
      <button id="delete-button" @click="deleteImage">Delete Image</button>
    </div>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  max-width: 1224px;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}
.wrapper > img {
  width: 100%;
  height: auto;
  max-height: calc(100vh - 3rem);
  background-color: var(--cosee-c-greyscale2);
  object-fit: cover;
  object-position: center;
}
.wrapper > .meta-data {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--cosee-c-black);
}
.meta-data > #title-input {
  color: var(--cosee-c-black);
  font-size: 3rem;
  font-weight: 500;
  border: none;
  box-shadow: none;
  transition: 350ms;
  padding: 0.25rem 0;
  outline: none;
}
.meta-data > p {
  font-size: 0.85rem;
}
.meta-data > #tag-input {
  font-size: 0.9rem;
  border: none;
  border-bottom: 1px solid var(--cosee-c-greyscale2);
  box-shadow: none;
  transition: 350ms;
  padding: 1rem 0;
  outline: none;
}
.meta-data > #title-input:hover,
.meta-data > #title-input:focus,
.meta-data > #tag-input:hover,
.meta-data > #tag-input:focus {
  background-color: var(--cosee-c-greyscale2);
}
.meta-data > #update-button,
.meta-data > #delete-button {
  padding: 1rem 2rem;
  background-color: var(--cosee-c-black);
  color: var(--cosee-c-white);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.28px;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  transition: 250ms;
}
.meta-data > #update-button:hover {
  background-color: var(--cosee-c-greyscale3);
}
.meta-data > #delete-button {
  background-color: var(--cosee-c-white);
  color: red;
}
.meta-data > #delete-button:hover {
  background-color: #ffe9e9;
}
.meta-data > #update-button.success {
  background-color: #b9ffb9;
  color: var(--cosee-c-black);
}
</style>
