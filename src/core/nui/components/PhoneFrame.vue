<script setup lang="ts">
defineEmits<{
  power: []
  'volume-up': []
  'volume-down': []
  'silent-switch': []
}>()
</script>

<template>
  <div class="phone-frame">
    <div class="phone-content">
      <slot></slot>
    </div>
    <div class="frame-buttons">
      <div class="left">
        <div class="frame-button" @click="$emit('silent-switch')"></div>
        <div class="frame-button" @click="$emit('volume-up')"></div>
        <div class="frame-button" @click="$emit('volume-down')"></div>
      </div>
      <div class="right">
        <div class="frame-button" @click="$emit('power')"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 60px;
    background-color: #000;
    box-shadow: 0 0 .1em .25em var(--phone-frame-color, #a7a1d1),0 0 0 .4em #d3cde4;
    z-index: 1;
    padding: 8px;
    box-sizing: border-box;
}

.phone-content {
    height: 100%;
    width: 100%;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    z-index: 2;
    background: #000;
}

.frame-buttons {
    position: absolute;
    top: -.4em;
    right: -.4em;
    bottom: -.4em;
    left: -.4em;
    pointer-events: none;
}

.frame-buttons .left,
.frame-buttons .right {
    position: absolute;
    width: .333em;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5em;
    z-index: 0;
}

.frame-buttons .left {
    right: 100%;
    top: 10rem;
}

.frame-buttons .left .frame-button {
    cursor: pointer;
    pointer-events: all;
    border-radius: .75em 0 0 .75em;
}

.frame-buttons .left .frame-button:nth-child(1) {
    height: 3em;
    margin-bottom: .5em;
}

.frame-buttons .left .frame-button:nth-child(2),
.frame-buttons .left .frame-button:nth-child(3) {
    height: 4em;
}

.frame-buttons .right {
    left: 100%;
    transform: scale3d(-1,1,1);
    top: 16rem;
}

.frame-buttons .right .frame-button {
    pointer-events: all;
    cursor: pointer;
    border-radius: .75em 0 0 .75em;
    height: 6em;
}

.frame-buttons .frame-button {
    background: var(--phone-frame-color, #a7a1d1);
    height: 4em;
    box-shadow: inset -.15em 0 .1em #000,inset 0 0 .1em var(--phone-frame-color, #a7a1d1),inset 0 .2em .1em var(--phone-frame-color, #a7a1d1),inset 0 -.2em .1em var(--phone-frame-color, #a7a1d1),inset -.1em .333em .1em #00000080,inset -.1em -.333em .1em #00000080;
    border-top-left-radius: .2em;
    border-bottom-left-radius: .2em;
}
</style>
