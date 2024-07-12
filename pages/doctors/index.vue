<template>
  <div class=" ">
    <div class="h-24 bg-primary"></div>
    <h1 class="text-center text-5xl pt-8 font-bold">Doctors</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-16 lg:px-28"
    >
      <div
        v-for="(doctor, index) in doctors"
        :key="index"
        @click="showDoctorDetail(doctor)"
      >
        <!-- design card for doctors image, name, phone -->
        <div
          class="bg-white  shadow-lg rounded-lg p-4 m-4 cursor-pointer"
        >
          <div class="flex items-center justify-center">
            <div>
              <img
                :src="useImg(doctor.image)"
                alt="Doctor Image"
                class="w-56 h-56 object-cover object-center rounded-full border-2 border-primary"
              />
              <div class="mt-4 ">
                <h2 class="text-xl text-gray-800 font-bold text-center">
                  {{ doctor.name }}
                </h2>
                <p class="text-sm font-normal text-gray-500  mt-2 text-center">
                  {{ doctor.phone }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div
        v-if="selectedDoctor"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        @click.self="closeModal"
      >
        <div
          class="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl relative overflow-y-auto max-h-screen"
        >
          <button @click="closeModal" class="absolute top-4 right-4 text-2xl">
            &times;
          </button>
          <div class="flex flex-col items-center">
            <img
              :src="useImg(selectedDoctor.image)"
              alt="Doctor Image"
              class="w-56 h-56 object-cover object-center rounded-full border-2 border-primary"
            />
            <h2 class="text-3xl font-bold mt-4">{{ selectedDoctor.name }}</h2>
            <p class="text-lg text-gray-500 mt-2">{{ selectedDoctor.phone }}</p>
            <p class="text-lg mt-4" v-html="selectedDoctor.description"></p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { IDoctors } from '@/types/doctors';
import type { IResponse } from '~/types/api';

// Fetch doctors data
const doctors = ref<IDoctors[]>([]);
const selectedDoctor = ref<IDoctors | null>(null);

const fetchDoctors = async () => {
  try {
    const response = await useApi<IResponse<IDoctors[]>>(
      '/items/doctors?sort=sort',
      { method: 'GET' }
    );
    doctors.value = response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

const showDoctorDetail = (doctor: IDoctors) => {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  selectedDoctor.value = doctor;
};

const closeModal = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'auto';

  selectedDoctor.value = null;
};

fetchDoctors();
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}
</style>
