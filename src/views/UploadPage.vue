<script>
export default {
  data() {
    return {
      filename: '',
      tags: '',
    };
  },
  methods: {
    uploadFile() {
      var message = document.getElementsByClassName(
        'upload-response-message'
      )[0];
      let photo = document.getElementById('image-input').files[0];
      let name = this.filename;
      var tagsRaw = this.tags.replace(', ', ',');
      var tags = tagsRaw.toLowerCase().split(',');
      var router = this.$router;

      const reader = new FileReader();

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (name == '' || photo == null) {
        message.innerHTML = 'You have to provide both a file and a name.';
        message.classList.add('error');
        return;
      }
      message.classList.remove('success');
      message.classList.remove('error');
      message.innerHTML = '';
      console.log('just before');

      reader.onload = function () {
        console.log('just after');

        var binary = reader.result.replace('data:', '').replace(/^.+,/, '');

        requestOptions.body = JSON.stringify({
          tags: tags,
          name: name,
          file: binary,
        });

        fetch(
          'https://ui4nfc0db6.execute-api.eu-central-1.amazonaws.com/v1/upload',
          requestOptions
        ).then(async (response) => {
          var message = document.getElementsByClassName(
            'upload-response-message'
          )[0];
          if (response.status == 200) {
            console.log('success');
            message.innerHTML = 'Image successfully uploaded!';
            message.classList.add('success');
            router.push({ path: '/' });
          } else {
            console.log('error');
            message.innerHTML = 'Something went wrong. Please try again.';
            message.classList.add('error');
          }
        });
      };
      reader.readAsDataURL(photo);
    },
  },
};
</script>

<template>
  <form id="upload-content-container" @submit.prevent="uploadFile">
    <label for="filename">Enter the file name: {{ filename }}</label>
    <input type="text" name="filename" v-model="filename" />

    <label for="filename">Tags (Optional)</label>
    <input type="text" name="tags" v-model="tags" />

    <p>
      Only images of type PNG, JPEG, JPG, and WEBP can be uploaded. Additionally
      you can add tags to your file. Tags are comma-separated e.g. "book,
      family, interior" results in 3 tags.
    </p>

    <input type="file" id="image-input" />

    <button>Upload new image</button>

    <p class="upload-response-message"></p>
  </form>
</template>

<style>
form#upload-content-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

form#upload-content-container > p {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

p.upload-response-message {
  display: none;
  padding: 1rem;
  border-radius: 0.5rem;
}
p.upload-response-message.success {
  background-color: #d4ffd4;
  display: flex;
}
p.upload-response-message.error {
  background-color: #ffd4d4;
  display: flex;
}
</style>
