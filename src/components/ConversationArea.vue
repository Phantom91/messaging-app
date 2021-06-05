<template>
    <div class="conversation-area">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ConversationArea'
}
</script>

<style scoped>
    .conversation-area {
        width: 500px;
        height: 400px;
        overflow: auto;
    }
</style>