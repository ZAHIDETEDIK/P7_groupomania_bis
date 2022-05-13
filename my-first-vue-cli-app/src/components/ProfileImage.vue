<template>
  <div class="newPost__photo">
    <img
      :src="src || 'circle-user-solid.svg'"
      class="image"
      alt="Ma superbe Photo de profil"
    />
  </div>
</template>

<script>
export default {
  name: "ProfileImage",
  props: ["src"],
};
</script>

<style lang="scss">
.image {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
}
</style>
