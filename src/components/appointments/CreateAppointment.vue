<script setup>
import axios from "axios";
import { reactive } from "vue";
import FlatPickr from "vue-flatpickr-component";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const newAppointment = reactive({
  date: null,
  startTime: null,
  endTime: null,
  appointmentType: null,
  description: null,
});

const flatPickrState = {
  configCustom: { dateFormat: "d-m-Y" },
  configTimeStandalone24: {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
  },
};

const appointmentTypes = [
  { id: 0, name: "Driving" },
  { id: 1, name: "Theory" },
];

function combineDateAndTime(date, time) {
  if (!date || !time) {
    return null;
  }
  const [day, month, year] = date.split("-");
  const isoString = `${year}-${month}-${day}T${time}:00`;
  return new Date(isoString);
}

function saveAppointment() {
  if (
    !newAppointment.date ||
    !newAppointment.startTime ||
    !newAppointment.endTime ||
    newAppointment.appointmentType === null ||
    !newAppointment.description
  ) {
    console.log(newAppointment);
    toast.warning("All fields are required");
    return;
  }

  const startDateTime = combineDateAndTime(
    newAppointment.date,
    newAppointment.startTime
  );
  const endDateTime = combineDateAndTime(
    newAppointment.date,
    newAppointment.endTime
  );

  const appointmentData = {
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    description: newAppointment.description,
    appointmentType: newAppointment.appointmentType,
  };

  axios
    .post("https://localhost:44326/api/appointment/create", appointmentData)
    .then((response) => {
      console.log(response.data);
      toast("Appointment has been saved", {
        type: "info",
      });
    })
    .catch((error) => {
      console.log(error);
      toast("An error occured", {
        type: "error",
      });
    });

  resetNewAppointment();
}

function resetNewAppointment() {
  newAppointment.date = null;
  newAppointment.startTime = null;
  newAppointment.endTime = null;
  newAppointment.description = null;
  newAppointment.appointmentType = null;
}
</script>

<template>
  <BaseBlock title="Create Appointment">
    <template #options>
      <button @click="saveAppointment" type="button" class="btn-block-option">
        Save
      </button>
    </template>

    <div class="row mb-4">
      <div class="col-4">
        <label class="form-label" for="example-flatpickr-custom">Date</label>
        <FlatPickr
          id="example-flatpickr-custom"
          class="form-control"
          placeholder="d-m-Y"
          v-model="newAppointment.date"
          :config="flatPickrState.configCustom"
        />
      </div>
      <div class="col-4">
        <label class="form-label" for="example-flatpickr-time-standalone"
          >Time start</label
        >
        <FlatPickr
          id="example-flatpickr-time-standalone-24"
          class="form-control"
          v-model="newAppointment.startTime"
          :config="flatPickrState.configTimeStandalone24"
        />
      </div>
      <div class="col-4">
        <label class="form-label" for="example-flatpickr-time-standalone"
          >Time end</label
        >
        <FlatPickr
          id="example-flatpickr-time-standalone-24"
          class="form-control"
          v-model="newAppointment.endTime"
          :config="flatPickrState.configTimeStandalone24"
        />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-4">
        <label class="form-label" for="example-select">Appointment type</label>
        <select
          v-model="newAppointment.appointmentType"
          class="form-select"
          id="example-select"
          name="example-select"
        >
          <option value="" disabled selected hidden>
            Select an appointment type
          </option>
          <option v-for="type in appointmentTypes" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="col-8">
        <label class="form-label" for="example-text-input">Descriptinon</label>
        <input
          type="text"
          class="form-control"
          id="example-text-input"
          name="example-text-input"
          placeholder="Text Input"
          v-model="newAppointment.description"
        />
      </div>
    </div>
  </BaseBlock>
</template>

<style lang="scss"></style>
