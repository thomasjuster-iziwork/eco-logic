<template>
    <v-data-iterator :items="$electricity.viewModel.meters" hide-actions>
        <template v-slot:item="props">
            <v-card class="mx-auto mb-3 mt-3" color="#26c6da" dark max-width="400"
                    @click="$electricity.ui.showUpdatePowerConsumption(props.item)">
                <v-card-title>
                    <v-icon large left>mdi-flash</v-icon>
                    <span class="title">{{ props.item.name }}</span>&nbsp;<span class="title font-weight-light"> {{ props.item.lastUpdateDate}}</span>
                </v-card-title>
                <v-card-text class="headline font-weight-bold text-xs-right">{{ props.item.kWh }}</v-card-text>
            </v-card>
        </template>
    </v-data-iterator>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ListElectricMetersView extends Vue {
  }
</script>
