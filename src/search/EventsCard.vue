<script setup>
  defineProps({
  events: Array
})
</script>


<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    <router-link
        v-for="event in events"
        :key="event.id"
        :to="`/events/${event.id}`"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <div class="h-56 bg-purple-100"></div>
      <div class="flex flex-col gap-1 p-4">
        <h3 class="text-lg font-bold text-neutral-800">{{ event.title }}</h3>
        <p class="text-sm text-zinc-600">{{ event.dateRange }}</p>
        <p class="text-xs text-zinc-500">{{ event.location }}</p>
        <p class="text-base font-bold text-zinc-800">{{ event.price }}</p>
        <span class="px-2 py-1 text-xs font-medium text-amber-500 bg-yellow-50 rounded-full w-fit">
      {{ event.status }}
    </span>
      </div>
    </router-link>
  </section>
</template>

<style scoped>

</style>