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

    <div>
      <q-card
        class="my-card q-mb-lg"
        v-for="collection in collections"
        :key="collection.id"
      >
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ collection.cliente }}</div>
          <div class="text-subtitle2 row justify-between">
            <p class="no-margin">Pines: {{ collection.pines }}</p>
            <p class="no-margin">Total: {{ collection.total }}</p>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Editar"
            color="primary"
            text-color="black"
            @click="editar(collection.id)"
          />
          <q-btn label="Cancelar" color="primary" @click="confirm" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";

import PageTitle from "src/components/PageTitle.vue";

defineOptions({
  name: "PendingCollectionPage",
});

const $q = useQuasar();

const collections = reactive([
  {
    id: 1,
    cliente: "Eduardo Gifone",
    pines: 100,
    total: 200,
    fecha: "2024/09/06",
    estado: "pendiente",
    extra: "yape",
  },
  {
    id: 2,
    cliente: "Maria Sanchez",
    pines: 50,
    total: 100,
    fecha: "2024/09/07",
    estado: "cancelado",
    extra: "plin",
  },
  {
    id: 3,
    cliente: "Juan Pérez",
    pines: 200,
    total: 400,
    fecha: "2024/09/08",
    estado: "pendiente",
    extra: "efectivo",
  },
  {
    id: 4,
    cliente: "Ana Torres",
    pines: 150,
    total: 300,
    fecha: "2024/09/09",
    estado: "cancelado",
    extra: "transferencia",
  },
  {
    id: 5,
    cliente: "Carlos Rivera",
    pines: 75,
    total: 150,
    fecha: "2024/09/10",
    estado: "pendiente",
    extra: "yape",
  },
  {
    id: 6,
    cliente: "Laura Fernández",
    pines: 180,
    total: 360,
    fecha: "2024/09/11",
    estado: "pendiente",
    extra: "plin",
  },
  {
    id: 7,
    cliente: "Miguel Álvarez",
    pines: 120,
    total: 240,
    fecha: "2024/09/12",
    estado: "cancelado",
    extra: "efectivo",
  },
  {
    id: 8,
    cliente: "Lucía Gómez",
    pines: 300,
    total: 600,
    fecha: "2024/09/13",
    estado: "pendiente",
    extra: "transferencia",
  },
  {
    id: 9,
    cliente: "Pedro Jiménez",
    pines: 90,
    total: 180,
    fecha: "2024/09/14",
    estado: "cancelado",
    extra: "yape",
  },
  {
    id: 10,
    cliente: "Raúl Vargas",
    pines: 130,
    total: 260,
    fecha: "2024/09/15",
    estado: "pendiente",
    extra: "plin",
  },
  {
    id: 11,
    cliente: "Clara Montoya",
    pines: 220,
    total: 440,
    fecha: "2024/09/16",
    estado: "cancelado",
    extra: "efectivo",
  },
  {
    id: 12,
    cliente: "Felipe Salazar",
    pines: 170,
    total: 340,
    fecha: "2024/09/17",
    estado: "pendiente",
    extra: "transferencia",
  },
  {
    id: 13,
    cliente: "Andrea López",
    pines: 140,
    total: 280,
    fecha: "2024/09/18",
    estado: "cancelado",
    extra: "yape",
  },
  {
    id: 14,
    cliente: "Sofía Ruiz",
    pines: 200,
    total: 400,
    fecha: "2024/09/19",
    estado: "pendiente",
    extra: "plin",
  },
  {
    id: 15,
    cliente: "Tomás Castillo",
    pines: 110,
    total: 220,
    fecha: "2024/09/20",
    estado: "cancelado",
    extra: "efectivo",
  },
  {
    id: 16,
    cliente: "Isabel Herrera",
    pines: 250,
    total: 500,
    fecha: "2024/09/21",
    estado: "pendiente",
    extra: "transferencia",
  },
  {
    id: 17,
    cliente: "Javier Ortega",
    pines: 160,
    total: 320,
    fecha: "2024/09/22",
    estado: "pendiente",
    extra: "yape",
  },
  {
    id: 18,
    cliente: "Monica Castillo",
    pines: 190,
    total: 380,
    fecha: "2024/09/23",
    estado: "cancelado",
    extra: "plin",
  },
  {
    id: 19,
    cliente: "David Silva",
    pines: 280,
    total: 560,
    fecha: "2024/09/24",
    estado: "pendiente",
    extra: "efectivo",
  },
  {
    id: 20,
    cliente: "Natalia Medina",
    pines: 210,
    total: 420,
    fecha: "2024/09/25",
    estado: "cancelado",
    extra: "transferencia",
  },
]);

function confirm() {
  $q.dialog({
    title: "Confirmar",
    message: "Te gustaria marcar esta cobranza como cancelada?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(">>>> OK");
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    });
}

function editar(index) {
  console.log(index);
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
</style>
