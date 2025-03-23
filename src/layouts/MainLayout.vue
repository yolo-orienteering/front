<template>
  <q-layout view="lHh Lpr lFf" class="background">
    <!-- header -->
    <myol-header @click="router.push('/')" />

    <!-- content -->
    <q-page-container>
      <q-page padding>
        <router-view class="animate-up" />
      </q-page>
    </q-page-container>

    <!-- mobile bottom menu -->
    <mobile-menu />
  </q-layout>
</template>

<script setup lang="ts">
import MobileMenu from 'src/components/layout/MobileMenu.vue'
import MyolHeader from 'src/components/layout/MyolHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>
