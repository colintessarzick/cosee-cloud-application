<script>
export default {
  data() {
    return {};
  },
  props: { label: String },
};
</script>

<template>
  <p class="tag-label">{{ label }}</p>
</template>

<style>
p.tag-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.28px;
  background-color: #eaeaea;
  color: #000;
  padding: 5px 12px;
  border-radius: 1rem;
  margin: 0;
  width: fit-content;
  height: fit-content;
}
</style>
