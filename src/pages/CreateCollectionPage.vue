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
        :rules="[(val) => val]"
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
        v-model="info.observaciones"
        label="Observaciones"
        type="textarea"
        maxlength="255"
        class="q-mb-md"
      />

      <q-input outlined v-model="dateNow" mask="date" class="q-mb-md">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateNow">
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
import { date } from "quasar";
import PageTitle from "src/components/PageTitle.vue";

defineOptions({
  name: "CreateCollectionPage",
});

const dateNow = ref(date.formatDate(Date.now(), "YYYY-MM-DD"));
const costoPin = ref(2.5);
const options_pago = ["Efectivo", "Yape", "Plin", "Transferencia"];

const info = reactive({
  id: 1,
  cliente: "",
  celular: "",
  pines: 0,
  total: 0,
  a_cuenta: 0,
  metodo_pago: "",
  observaciones: "",
  fecha: dateNow.value,
  estado: "pendiente",
});

const collections = reactive([]);

watch(
  () => [info.pines, costoPin.value],
  (newPines) => {
    info.total = info.pines * costoPin.value;
  }
);

function submitForm() {
  console.log(info);
}
</script>
