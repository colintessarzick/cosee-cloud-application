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
      var button = document.getElementById('upload-button');
      button.innerText = 'uploading ...';

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

      reader.onload = function () {
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
          button.innerText = 'upload new image';
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
    dropzone(e) {
      e.preventDefault();

      var input = document.getElementById('image-input');
      input.files = e.dataTransfer.files;

      var form = document.getElementsByClassName('drag-container')[0];
      form.classList.remove('drag-over');
    },
    dragOver(e) {
      e.preventDefault();
      var form = document.getElementsByClassName('drag-container')[0];
      form.classList.add('drag-over');
    },
    dragLeave(e) {
      e.preventDefault();
      var form = document.getElementsByClassName('drag-container')[0];
      form.classList.remove('drag-over');
    },
  },
};
</script>

<template>
  <div
    class="drag-container"
    @drop.prevent="dropzone"
    @dragenter.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @dragover.prevent
  ></div>
  <form id="upload-content-container" @submit.prevent="uploadFile">
    <label for="filename">Enter the file name</label>
    <input type="text" name="filename" v-model="filename" />

    <label for="filename">Tags (Optional)</label>
    <input type="text" name="tags" v-model="tags" />

    <input type="file" id="image-input" accept="image/png, image/jpeg" />

    <p>
      Only images of type PNG, JPEG, JPG, and WEBP can be uploaded. Additionally
      you can add tags to your image. Tags are comma-separated e.g. "book,
      family, interior" results in 3 tags.
    </p>

    <button id="upload-button">Upload new image</button>

    <p class="upload-response-message"></p>
  </form>
</template>

<style>
form#upload-content-container {
  width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  margin: 0.5rem;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
div.drag-container {
  width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  position: fixed;
  top: 0;
  left: 0;
  margin: 0.5rem;
  z-index: 999;
}
div.drag-container.drag-over {
  background-color: rgba(212, 216, 0, 0.25);
  border: 0.25rem dashed var(--cosee-c-primary);
}

form#upload-content-container > label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.64px;
}
form#upload-content-container > input[type='text'] {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
  outline: none;
  border: 1px solid var(--cosee-c-greyscale2);
  box-shadow: none;
  padding: 1rem 1.5rem;
  transition: 500ms;
  width: 100%;
  max-width: 350px;
}
form#upload-content-container > input[type='text']:hover,
form#upload-content-container > input[type='text']:focus {
  background-color: var(--cosee-c-greyscale1);
}

form#upload-content-container > p {
  width: 100%;
  max-width: 600px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 160%;
}

form#upload-content-container > button#upload-button {
  background-color: var(--cosee-c-black);
  color: var(--cosee-c-white);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.64px;
  text-transform: uppercase;
  padding: 1rem 1.5rem;
  border: none;
  width: 100%;
  max-width: 350px;
  cursor: pointer;
  transition: 250ms;
}
form#upload-content-container > button#upload-button:hover {
  background-color: var(--cosee-c-greyscale3);
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
