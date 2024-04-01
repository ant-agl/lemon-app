<template>
  <label
    v-if="files.length == 0"
    class="upload"
    @drop.prevent="$emit('upload', $event.dataTransfer.files)"
    @dragenter.prevent
    @dragover.prevent
  >
    <img src="@/assets/img/icons/upload.svg" alt="Upload" />
    <p class="upload__desc">Загрузить фото</p>

    <input
      class="upload__input"
      type="file"
      accept="image/*"
      multiple
      @change="$emit('upload', $event.target.files)"
    />
  </label>

  <div
    v-else
    class="upload-preview"
    @drop.prevent="$emit('upload', $event.dataTransfer.files)"
    @dragenter.prevent
    @dragover.prevent
  >
    <label class="upload-preview__input">
      <img src="@/assets/img/icons/upload.svg" alt="Upload" />
      <p class="upload__desc">Добавить</p>

      <input
        class="upload__input"
        type="file"
        accept="image/*"
        multiple
        @change="$emit('upload', $event.target.files)"
    /></label>

    <div
      v-for="(file, i) in files"
      :key="i"
      class="upload-preview__item"
      :style="{ backgroundImage: `url(${getUrlFromFile(file)})` }"
    >
      <img
        src="@/assets/img/icons/cross.svg"
        alt="cross"
        @click="$emit('removeFile', i)"
      />
    </div>

    <!-- <div class="upload-preview__more">
      <img src="@/assets/img/icons/camera.svg" alt="Camera" />
      <p class="upload__desc">Ещё 3 фото</p>
    </div> -->
  </div>
</template>

<script>
export default {
  emits: ["upload", "removeFile"],
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getUrlFromFile(file) {
      return URL.createObjectURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  background-color: #c0c0c0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  gap: 4px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #9f9f9f;
  }

  img {
    width: 25px;
  }

  &__desc {
    color: #454444;
    font-size: 16px;
  }

  &__input {
    display: none;
  }
}

.upload-preview {
  display: flex;
  gap: 15px;
  background-color: var(--bg-input);
  border-radius: 10px;
  padding: 24px;
  overflow-x: auto;

  &__input {
    background-color: #c0c0c0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-width: 80px;
    max-width: 80px;
    height: 80px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #9f9f9f;
    }

    .upload__desc {
      font-size: 12px;
    }
  }
  &__item {
    min-width: 80px;
    max-width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      transition: 0.2s;
    }

    img {
      width: 13px;
      position: absolute;
      top: 5px;
      right: 5px;
      transition: 0.2s;
      opacity: 0;
      cursor: pointer;
    }

    &:hover {
      &::before {
        background-color: rgba(0, 0, 0, 0.4);
      }
      img {
        opacity: 1;
      }
    }
  }
  &__more {
    min-width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .upload__desc {
      color: #cbcbcb;
      font-size: 14px;
    }
  }
}
</style>
