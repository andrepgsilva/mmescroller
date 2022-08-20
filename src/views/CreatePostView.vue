<script setup>
  import { onMounted } from 'vue';
  import { useCreatePostStore } from '@/stores/createpost';
  import { usePostCategoriesStore } from '@/stores/postcategories';
  
  const store = useCreatePostStore();
  const postCategoryStore = usePostCategoriesStore();
  onMounted(() => {
    postCategoryStore.fetchCategories();
    store.setupUploadListener('input[type="file"]', '#postImagePreview');
  })


</script>

<template>
  <div class="create-post-main">
    <h1 class="title">Create Post</h1>

    <div id="postImagePreviewWrapper">
      <img id="postImagePreview" src='https://dummyimage.com/500x500.png?text=Post%20Image%20Preview' alt=''/>
      
      <!-- <form id="post-form" action="" method="POST" ref="postForm">
        <input type='file' accept="image/*"/>

        <label for="postName">
          Post Name
        </label>
        <input type="text" name="postName">

        <label for="postCategory">
          Post Category
        </label>
        <input type="text" name="postCategory">

        <input id="post-form-submit" type="submit" @click.prevent="store.createPost(this.$.refs.postForm)">
      </form> -->

      <form @submit.prevent="store.sendForm()" id="post-form" action="http://localhost:80/api/create-post" method="post">
        <input type='file' accept="image/*" @change="store.changePostImage" required/>

        <label for="postName">
          Post Name
        </label>
        <input type="text" name="postName" v-model="store.validationForm.postName" required>

        <label for="postCategory">
          Post Category
        </label>
        <select name="postCategory" id="postCategory" v-model="store.validationForm.postCategory" v-if="postCategoryStore.categories.length > 0" required>
          <option v-for="category in postCategoryStore.categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <input id="post-form-submit" type="submit">
      </form>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .create-post-main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

#postImagePreview {
  width: 100%;
  max-width: 500px;
  max-height: 394px;
}

.title {
  text-align: center;
  margin-top: 15px;
}

.create-post-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#postImagePreviewWrapper {
  padding: 10px;
}

#post-form {
  display: flex;
  flex-direction: column;
}

#post-form > label {
  margin-top: 10px;
}

#post-form-submit {
  margin-top: 15px;
}
</style>