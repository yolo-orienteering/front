<template>
  <q-header class="text-primary bg-white" elevated reveal :reveal-offset="5">
    <div class="row items-center q-ma-sm">
      <div class="col-auto">
        <img src="/img/logo.png" style="height: 65px; width: auto; display: block; margin: auto;" />
      </div>
      <div class="col-auto q-pl-md">
        <h3 class="title">o-mate</h3>
        <!-- <p class="claim">ORIENTEERING</p> -->
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.title {
  margin: 0;
  font-weight: 300;
  font-size: 48px;
  line-height: 0.95;
}

.claim {
  margin-left: 45px;
  margin-bottom: 0;
  font-size: 15px;
  color: $secondary;
  font-weight: 400;
}
</style>
