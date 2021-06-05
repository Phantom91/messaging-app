<template>
	<div class="message-entry" :class="{ 'align-right': isLoggedUser }">
        <div class="message-from" v-tooltip="firstname">
            <i class="fa fa-user"></i>
        </div>
        <div class="message-bubble" :class="{ 'blue-bg' : isLoggedUser }">
            {{ conversation.message }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'MessageEntry',
    props: {
        conversation: {
            type: Object,
            default : () => null
        }
    },
    computed: {
        ...mapState([
            'user'
        ]),
        firstname() {
            console.log(this.conversation);
            return this.conversation.from.firstName;
        },
        isLoggedUser() {
            return this.conversation.from.id === this.user.id;
        }
    }
}
</script>

<style scoped>
.message-entry {
	display: flex;
}

.message-entry.align-right {
    justify-content: flex-end;
}

.message-entry.align-right .message-from{
    order: 2;
}

.message-from {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
}

.message-bubble {
    border-radius: 8px;
    padding: 8px;
    background: rgb(231, 231, 231);
    margin-bottom: 10px;
    max-width: 60%;
}

.blue-bg {
    background: #49bcff;
}
</style>
