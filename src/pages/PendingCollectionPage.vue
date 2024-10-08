<template>
  <q-page padding>
    <PageTitle
      title="Lista de pendientes"
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

    <div class="flex flex-center q-mb-lg">
      <q-chip size="lg" color="accent" text-color="white" icon="bookmark">
        {{ total_goal }}
      </q-chip>
      <q-chip size="lg" color="primary" text-color="white" icon="attach_money">
        {{ pagado_goal }}
      </q-chip>
      <q-chip size="lg" color="teal" text-color="white" icon="money_off">
        {{ saldo_goal }}
      </q-chip>
      <q-chip
        size="lg"
        class="glossy"
        color="orange"
        text-color="white"
        icon="star"
      >
        {{ pines_goal }}
      </q-chip>
    </div>

    <div
      class="relative-position"
      v-for="collection in pending_collections"
      :key="collection.id"
    >
      <q-card class="my-card q-mb-lg">
        <q-card-section
          class="text-white"
          :class="{
            'bg-secondary': isAcuenta(collection.a_cuenta),
            'bg-primary': !isAcuenta(collection.a_cuenta),
          }"
        >
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
          <p class="q-mb-none q-ml-sm text-subtitle2 text-grey">
            {{ collection.ubicacion }}
          </p>
          <q-space />
          <div>
            <q-btn
              flat
              label="A cuenta"
              text-color="black"
              color="primary"
              @click="prompt(collection.id)"
            />
            <q-btn
              flat
              label="Editar"
              color="primary"
              text-color="black"
              :to="`editar/${collection.id}`"
            />
            <q-btn
              label="Cancelar"
              color="primary"
              @click="confirm(collection.id)"
            />
          </div>
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
  name: "PendingCollectionPage",
});

const $q = useQuasar();

const collections = reactive([]);

const savedData = $q.localStorage.getItem("collections");
if (savedData) Object.assign(collections, savedData);

const pending_collections = computed(() => {
  return collections.filter((collection) => collection.estado == "pendiente");
});

const total_goal = computed(() => {
  return collections.reduce((total, collection) => {
    return total + collection.total;
  }, 0);
});

const pines_goal = computed(() => {
  return collections.reduce((total, collection) => {
    return total + Number(collection.pines);
  }, 0);
});

const saldo_goal = computed(() => {
  return collections.reduce((total, collection) => {
    return total + collection.saldo;
  }, 0);
});

const pagado_goal = computed(() => {
  return total_goal.value - saldo_goal.value;
});

function isAcuenta(a_cuenta) {
  return a_cuenta != 0;
}

function confirm(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Te gustaria marcar esta cobranza como cancelada?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    const collection = collections[id];
    collection.estado = "cancelado";
    collection.a_cuenta = collection.total;
    collection.saldo = 0;
    $q.notify({
      type: "positive",
      message: "Cobranza cancelada correctamente.",
    });
  });
}

function prompt(id) {
  $q.dialog({
    title: "A cuenta",
    message: "Ingrese el monto",
    prompt: {
      model: "",
      type: "number", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    let collection = collections[id];
    collection.a_cuenta = Number(collection.a_cuenta) + Number(data);
    collection.saldo = collection.total - Number(collection.a_cuenta);

    $q.notify({
      type: "info",
      message: "El monto fue cambiado correctamente.",
    });
  });
}

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
