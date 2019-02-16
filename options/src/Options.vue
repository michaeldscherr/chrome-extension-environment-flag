<template>
  <div>
    <h1>Options</h1>
    <options-table
      :config="config"
      :deleteEntry="deleteEntry"
    />
    <options-form :addEntry="addEntry" />
  </div>
</template>

<script>
import OptionsTable from '@/options/src/components/Table';
import OptionsForm from '@/options/src/components/Form';

export default {
    name: 'OptionsPage',
    components: {
        OptionsTable,
        OptionsForm,
    },
    data() {
        return {
            config: [],
        };
    },
    mounted() {
        chrome.storage.sync.get(['config'], this.setConfig);
    },
    methods: {
        setConfig(storage) {
            this.config = storage.config;
        },
        deleteEntry(index) {
            this.config.splice(index, 1);

            chrome.storage.sync.set(
                {
                    config: this.config,
                },
                null
            );
        },
        addEntry(entry) {
            this.config.push(entry);

            chrome.storage.sync.set(
                {
                    config: this.config,
                },
                null
            );
        },
    },
};
</script>
