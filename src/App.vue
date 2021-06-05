<template>
  <div id="app">
    <ConversationArea>
      <MessageEntry v-for="(conversation, idx) in conversations" :key="idx" :conversation="conversation"></MessageEntry>
      <ComposeSection v-model="message" @submit="sendReply"></ComposeSection>
    </ConversationArea>
  </div>
</template>

<script>
import ConversationArea from './components/ConversationArea.vue';
import ComposeSection from './components/ComposeSection.vue';
import MessageEntry from './components/MessageEntry.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    ConversationArea,
    MessageEntry,
    ComposeSection
  },
  computed: {
    ...mapGetters({
      conversations : 'sortedConversations'
    })
  },
  data() {
    return {
      message: ''
    }
  },
  created() {
    this.loadCurrentUser();
    this.loadConversations();
  },
  methods: {
    ...mapActions([
      'loadCurrentUser',
      'loadConversations',
      'simulateReply'
    ]),
    sendReply() {
      this.simulateReply(this.message);
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
}
</style>
