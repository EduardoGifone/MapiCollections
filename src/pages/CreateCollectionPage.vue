<template>
  <q-page padding>
    <PageTitle
      title="Nueva cobranza"
      icon="add"
      :buttons="[]"
      class="q-mb-lg"
    />

    <q-form @submit="submitForm">
      <q-input
        outlined
        v-model="info.cliente"
        label="Nombre del cliente"
        type="text"
        maxlength="255"
        :rules="[(val) => !!val || 'Ingrese el nombre']"
      />

      <q-input
        outlined
        v-model="info.celular"
        label="Celular del cliente"
        type="tel"
        class="q-mb-md"
      />

      <q-input
        v-model="info.pines"
        label="Cantidad de pines"
        type="number"
        min="0"
        outlined
        :rules="[(val) => !!val || 'Ingrese la cantidad']"
      />

      <q-input
        v-model="costoPin"
        label="Costo por pin"
        type="number"
        outlined
        :rules="[(val) => !!val || 'Ingrese la cantidad']"
      />

      <q-input
        outlined
        v-model="info.total"
        label="Total - $"
        type="number"
        readonly
        class="q-mb-md"
      />

      <q-input
        outlined
        v-model="info.a_cuenta"
        label="A cuenta"
        type="number"
        min="0"
        class="q-mb-md"
      />

      <q-input
        outlined
        v-model="info.saldo"
        label="Saldo - $"
        type="number"
        readonly
        class="q-mb-md"
      />

      <q-select
        outlined
        v-model="info.metodo_pago"
        :options="options_pago"
        label="Metodo de Pago"
        :rules="[(val) => !!val || 'Seleccione un metodo de pago']"
      />

      <q-input
        outlined
        v-model="info.ubicacion"
        label="Ubicacion o referencia"
        type="textarea"
        maxlength="255"
        class="q-mb-md"
      />

      <q-input
        outlined
        v-model="info.observaciones"
        label="Observaciones"
        type="textarea"
        maxlength="255"
        class="q-mb-md"
      />

      <q-input outlined v-model="info.fecha" mask="date" class="q-mb-md">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="info.fecha">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-btn type="submit" label="Guardar" color="primary" icon="save" />
    </q-form>
  </q-page>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { date, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

import PageTitle from "src/components/PageTitle.vue";

defineOptions({
  name: "CreateCollectionPage",
});

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const collections = reactive([]);

const savedData = $q.localStorage.getItem("collections");
if (savedData) Object.assign(collections, savedData);

const dateNow = ref(date.formatDate(Date.now(), "YYYY-MM-DD"));
const costoPin = ref(2.5);
const options_pago = ["Efectivo", "Yape", "Plin", "Transferencia"];
const id_calculated = ref(collections.length);

const info = reactive({
  id: id_calculated,
  cliente: "",
  celular: "",
  pines: null,
  total: null,
  a_cuenta: 0,
  saldo: null,
  metodo_pago: "Efectivo",
  ubicacion: "",
  observaciones: null,
  fecha: dateNow.value,
  estado: "pendiente",
});

watch(
  () => [info.pines, costoPin.value],
  () => {
    info.total = info.pines * costoPin.value;
  }
);

watch(
  () => [info.a_cuenta, info.total],
  () => {
    info.saldo = info.total - Number(info.a_cuenta);
  }
);

watch(
  collections,
  (value) => {
    $q.localStorage.set("collections", value);
  },
  { deep: true }
);

function submitForm() {
  try {
    const toPath = route.query.to || "/";
    collections.push(info);
    $q.notify({
      type: "warning",
      message: "Cobranza creada correctamente.",
    });
    router.push(toPath);
  } catch (error) {
    console.log(error);
    $q.notify({
      type: "negative",
      message: "Ups. Parece que algo anda mal...",
    });
  }
}
</script>
