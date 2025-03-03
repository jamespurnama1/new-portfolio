<template>
  <button ref="buttons" v-if="props.award" v-for="(t, subIndex) in props.award"
    :class="[whichAward === `${index},${tier},${subIndex}` ? '!scale-150 !opacity-100' : '!opacity-30 !scale-100', `mix-blend-difference w-6 h-2 transition-transform bg-${props.tier} rounded-2xl cursor-pointer`]"
    :data="`${index},${tier},${subIndex}`" :aria-label="t"
    :onmouseenter="() => emits('onHover', [index, tier, subIndex])" :onmouseleave="() => emits('onLeave')">
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  index: number
  award?: string[]
  whichAward: string
  tier: string
}>()
const tiers = ref(["gold", "silver", "bronze", "crystal"])
const emits = defineEmits(['onHover', 'onLeave'])
const buttons = ref([] as HTMLButtonElement[])
const tier = computed(() => tiers.value.indexOf(props.tier))
const whichAward = computed(() => props.whichAward)
const index = computed(() => props.index)
</script>