<template>
  <q-page padding>
    <PageTitle
      title="Lista de cancelados"
      :buttons="[
        {
          label: 'Nueva cobranza',
          route: '/crear',
          icon: 'add',
        },
      ]"
      icon="list"
      class="q-mb-lg"
    />

    <div
      class="relative-position"
      v-for="collection in cancelled_collections"
      :key="collection.id"
    >
      <q-card class="my-card q-mb-lg">
        <q-card-section class="bg-primary text-white">
          <div class="text-h4 text-weight-medium">{{ collection.cliente }}</div>
          <div class="text-subtitle2 row justify-between">
            <div class="row">
              <p class="q-mr-md q-mb-none">Pines: {{ collection.pines }}</p>
              <p class="no-margin">Total: {{ collection.total }}</p>
            </div>
            <p class="no-margin">Saldo: {{ collection.saldo }}</p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Editar"
            color="primary"
            text-color="black"
            :to="`editar/${collection.id}`"
          />
        </q-card-actions>
      </q-card>
      <q-icon
        v-if="!!collection.observaciones"
        class="absolute-top-right move"
        name="warning"
        color="warning"
        size="2rem"
      />
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useQuasar } from "quasar";

import PageTitle from "src/components/PageTitle.vue";

defineOptions({
  name: "CancelledCollectionPage",
});

const $q = useQuasar();

const collections = reactive([]);

const savedData = $q.localStorage.getItem("collections");
if (savedData) Object.assign(collections, savedData);

const cancelled_collections = computed(() => {
  return collections.filter((collection) => collection.estado == "cancelado");
});

watch(
  collections,
  (value) => {
    $q.localStorage.set("collections", value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}

.move {
  top: -10px;
  right: -10px;
}
</style>
