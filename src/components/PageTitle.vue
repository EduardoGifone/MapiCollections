<template>
  <q-card class="bg-grey-1">
    <q-card-section class="fit row justify-between items-start content-start">
      <div class="text-h5">
        <template v-if="icon">
          <q-icon :name="icon" color="primary" />
        </template>
        {{ title }}
      </div>
      <div>
        <q-btn
          v-for="button in buttons"
          :key="button.label"
          :label="button.label"
          :to="button.route"
          :color="button.color ? button.color : 'primary'"
          class="q-mr-md"
          :icon="button.icon ? button.icon : undefined"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },

  buttons: {
    type: Array,
    required: true,
  },
});
</script>
