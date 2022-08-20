<script setup>
import { useHomeStore } from '@/stores/home';

const store = useHomeStore();

store.getAllPosts();
</script>

<template>
  <main v-if="store.posts.length > 0">
    <div 
      class="meme-block" 
      v-for="post in store.posts" 
    >
      <img :src="post.first_media.original_url" alt="" srcset="">

      <div class="meme-block-info">
        <div>
          <span>{{ post.name }}</span>
          <a href="">{{ post.category.name }}</a>
        </div>
        <a href=""><img src='http://placekitten.com/40/40' alt=''/></a>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }

  .meme-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    min-height: 315px;

    background-color: #F8F8F8;
    padding-bottom: 20px;
  }

  .meme-block img {
    width: 100%;
    object-fit: cover;
  }

  .meme-block-info {
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  .meme-block-info div:first-child {
    display: flex;
    flex-direction: column;
  }

  .meme-block-info div:first-child > a {
    text-decoration: none;
    font-size: 14px;
    color: #FF7D0D;
  }

  .meme-block-info > a > img {
    border-radius: 20px;
  }

  .meme-block-info div:first-child > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px;
    font-size: 15px;
    font-weight: 700;
    color: #000000d4;
    margin-bottom: 5px;
  }

  .meme-block:last-child .meme-block-info{
    z-index: 2;
  }

  @media (min-width: 768px) {
    main {
      width: 80%;
      margin: 0 auto;
      max-width: 800px;
    }
  }
</style>
