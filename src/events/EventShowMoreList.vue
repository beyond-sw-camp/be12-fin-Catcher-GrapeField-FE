<template>
  <div class="wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-10">
    <EventShowMoreCard
      v-for="event in events"
      :key="event.id"
      :id="event.id"
      :title="event.title"
      :venue="event.venue"
      :period="event.period"              
      :posterUrl="event.posterUrl"
    />
  </div>
</template>

<script setup>
import EventShowMoreCard from './EventShowMoreCard.vue'
import eventsData from '../assets/data/events.json'

const events = eventsData.events


</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
}
</style>