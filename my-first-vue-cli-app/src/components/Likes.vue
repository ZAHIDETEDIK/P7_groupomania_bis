
<template>
    <div class="like">
        <i :id="post.id" @click="likePost()" class="fas fa-heart like__button" aria-label="Aimer le message"></i>
        <span v-if="post.likes > 0" class="like__count">{{ post.likes }}</span>
    </div>
</template>
