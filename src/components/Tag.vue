<script>
export default {
  data() {
    return {};
  },
  props: { label: String },
};
</script>

<template>
  <p v-if="label" class="tag-label">{{ label }}</p>
</template>

<style>
p.tag-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.28px;
  background-color: rgba(212, 216, 0, 0.25);
  color: var(--cosee-c-greyscale3);
  padding: 5px 12px;
  border-radius: 1rem;
  margin: 0;
  width: fit-content;
  height: fit-content;
}
</style>
