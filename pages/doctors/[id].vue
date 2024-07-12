<template>
    <div class="">
        <div class="h-24 bg-primary mb-10">

        </div>
      <div v-if="category">
        <h1 class="text-center text-3xl md:text-4xl font-bold">{{ category.name }}</h1>
        <div v-if="doctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          <div
            v-for="doctor in doctors"
            :key="doctor.id"
            @click="showDoctorDetail(doctor)"
          >
            <div class="bg-white shadow-lg rounded-lg p-4 m-4 cursor-pointer">
              <div class="flex items-center justify-center">
                <div>
                  <img
                    :src="useImg(doctor.image)"
                    alt="Doctor Image"
                    class="w-56 h-56 object-cover object-center rounded-full border-2 border-primary"
                  />
                  <div class="mt-4">
                    <h2 class="text-xl text-gray-800 font-bold text-center">
                      {{ doctor.name }}
                    </h2>
                    <p class="text-sm font-normal text-gray-500 mt-2 text-center">
                      {{ doctor.phone }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-96">
          <p class="text-center text-xl text-gray-700 mt-4">មិនទាន់មានវេជ្ជបណ្ឌិនផ្នែកនេះនៅឡើយ</p>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
  
      <!-- Flowbite Modal with Animation -->
      <transition name="modal">
        <div v-if="selectedDoctor" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-auto" @click.self="closeModal">
          <div class="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl relative overflow-y-auto max-h-screen">
            <button @click="closeModal" class="absolute top-4 right-4 text-2xl">&times;</button>
            <div class="flex flex-col items-center">
              <img :src="useImg(selectedDoctor.image)" alt="Doctor Image" class="w-56 h-56 object-cover object-center rounded-full border-2 border-primary" />
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
  import type { IDoctorsCategories } from '@/types/doctors_categories';
  import type { IDoctors } from '@/types/doctors';
  import type { IResponse } from '~/types/api';
  
  const route = useRoute();
  const category = ref<IDoctorsCategories | null>(null);
  const doctors = ref<IDoctors[]>([]);
  const loading = ref(true);
  const selectedDoctor = ref<IDoctors | null>(null);
  
  const fetchCategoryAndDoctors = async () => {
    try {
      const categoryResponse = await useApi<IResponse<IDoctorsCategories[]>>(
        `/items/doctors_categories?filter[id][_eq]=${route.params.id}&fields=id,name`,
        { method: 'GET' }
      );
  
      if (categoryResponse.data.length > 0) {
        category.value = categoryResponse.data[0];
        const doctorsResponse = await useApi<IResponse<IDoctors[]>>(
          `/items/doctors?filter[category][id][_eq]=${category.value.id}&fields=id,name,phone,image,description`,
          { method: 'GET' }
        );
        doctors.value = doctorsResponse.data;
        console.log('Doctors data:', doctors.value);
      }
    } catch (error) {
      console.error('Error fetching category and doctors:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const showDoctorDetail = (doctor: IDoctors) => {
    selectedDoctor.value = doctor;
  };
  
  const closeModal = () => {
    selectedDoctor.value = null;
  };
  
  watch(
    () => route.params.id,
    () => {
      fetchCategoryAndDoctors();
    },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: scale(0.95);
  }
  </style>
  