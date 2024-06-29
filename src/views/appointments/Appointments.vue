<script setup>
import CreateAppointment from "../../components/appointments/CreateAppointment.vue";
import AppointmentsTable from "../../components/appointments/AppointmentsTable.vue";
</script>
<template>
  <BasePageHeading
    title="Blank with Block"
    subtitle="That feeling of delight when you start your awesome new project!"
  >
    <template #extra>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item">
            <a class="link-fx" href="javascript:void(0)">Generic</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">Blank with Block</li>
        </ol>
      </nav>
    </template>
  </BasePageHeading>
  <div class="content">
    <CreateAppointment />
    <AppointmentsTable />
  </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>
