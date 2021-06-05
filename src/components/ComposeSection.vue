<template>
    <div class="compose-section">
        <textarea class="type-message" placeholder="Type your message here..." v-model="message" @input="updateMessage"/>
        <a class="send-message" @click="sendMessage">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'ComposeSection',
    props: {
        value: String
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        updateMessage() {
            this.$emit('input', this.message);
        },
        sendMessage() {
            this.$emit('submit');
            this.message = '';
        }
    }
}
</script>

<style scoped>
    .compose-section {
        display: flex;
    }

    .type-message {
        width: 100%;
    }

    .send-message { 
        display: flex;
        align-items: center;
        max-width: 60px;
        margin-left: 12px;
        margin-right: 12px;
    }
</style>