import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: []
  }),
  actions: {
    addDocument(name, url) {
      this.documents.push({ name, url });
    },
    getDocuments() {
      return this.documents;
    }
  }
});
