<template>
  <div class="transition-all duration-500" :class="[opened ? 'dark:bg-black/50 bg-white/50' : '']">
    <section class="pointer-events-none z-40 relative p-5 h-safe-height w-screen">
      <div
        class="lottie pointer-events-auto cursor-pointer w-64 max-h-28 sm:w-80 sm:max-h-40 -ml-10 sm:-ml-16 md:w-[27rem] md:max-h-52 2xl:w-[42rem]"
        @click="about()" @mouseenter="windowWidth > 600 ? hover() : null"
        @mouseleave="windowWidth > 600 ? leave() : null" />
      <button
        class="flex items-center justify-center border-solid border rounded-2xl bg-transparent transition-all duration-500 ease-in-out pointer-events-auto cursor-pointer dark:border-white border-black dark:text-white text-black dark:hover:text-black hover:text-white dark:hover:bg-white hover:bg-black py-2 px-4 pb-1 m-5 mb-safe-b-margin fixed bottom-8 md:bottom-0 left-0"
        v-posthog-capture="'about'" @click="about()" :aria-label="opened ? 'Home' : 'About'">
        <transition name="fade" mode="out-in">
          <p class="leading-none" v-if="!opened">about</p>
          <p class="leading-none" v-else>home</p>
        </transition>
      </button>
    </section>
    <!-- About -->
    <transition name="fade">
      <section v-show="opened"
        class="abt absolute pointer-events-auto top-0 right-0 transition-all duration-500 ease-in-out z-10 grid gap-5 lg:gap-5 grid-rows-[0.35fr_20px_1fr] grid-cols-3 md:grid-cols-[20.5rem_1fr] md:grid-rows-[13rem_minmax(0,1.5fr)_minmax(0,2fr)] w-full !h-safe-height lg:pr-20 pb-20 md:pb-5 p-5">
        <!-- image -->
        <div class="md:row-start-2 md:col-start-1 col-start-3 block ml-auto top-12 right-12">
          <NuxtImg provider="sanity" sizes="50vw md:75vw lg:100vw" :modifiers="{ fit: 'crop' }"
            class="md:h-full w-auto object-cover" :src="store.about.image.asset._id" alt="James Henry Purnama" />
        </div>
        <!-- socials -->
        <div class="flex justify-end gap-2 row-start-2 col-span-3 md:col-span-1 md:row-start-3">
          <NuxtLink class="cursor-pointer" external to="http://www.instagram.com/jamespurnama1" target="_blank">
            <font-awesome
              class="h-5 w-auto dark:text-white text-black dark:hover:text-black hover:text-white flex items-center justify-center"
              :icon="['fab', 'instagram']" />
          </NuxtLink>
          <NuxtLink class="cursor-pointer" external :to="store.about.socials.find(x => x.media === 'behance')?.link"
            target="_blank">
            <font-awesome
              class="h-5 w-auto dark:text-white text-black dark:hover:text-black hover:text-white flex items-center justify-center"
              :icon="['fab', 'behance-square']" />
          </NuxtLink>
          <NuxtLink class="cursor-pointer" external :to="store.about.socials.find(x => x.media === 'linkedin')?.link"
            target="_blank">
            <font-awesome
              class="h-5 w-auto dark:text-white text-black dark:hover:text-black hover:text-white flex items-center justify-center"
              :icon="['fab', 'linkedin']" />
          </NuxtLink>
          <NuxtLink class="cursor-pointer" external :to="store.about.socials.find(x => x.media === 'github')?.link"
            target="_blank">
            <font-awesome
              class="h-5 w-auto dark:text-white text-black dark:hover:text-black hover:text-white flex items-center justify-center"
              :icon="['fab', 'github']" />
          </NuxtLink>
          <NuxtLink class="cursor-pointer" external :to="store.about.socials.find(x => x.media === 'email')?.link"
            target="_blank">
            <font-awesome
              class="h-5 w-auto dark:text-white text-black dark:hover:text-black hover:text-white flex items-center justify-center"
              icon="envelope-open" />
          </NuxtLink>
        </div>
        <div
          class="row-start-3 md:col-start-2 md:row-start-1 col-span-3 md:col-span-2 lg:row-span-3 md:row-span-4 transition-all duration-500 ease-in-out z-10 grid gap-8 lg:gap-5 grid-rows-[0.25fr,1fr,1fr,1fr] grid-cols-3 md:grid-cols-1 md:grid-rows-[13rem_1fr_1fr_0.75fr] w-full lg:pr-20 xl:pr-64 md:pl-5 overflow-y-scroll overflow-x-hidden no-scrollbar pb-20"
          :class="{ 'mask-top': clipped === 'top', 'mask-bottom': clipped === 'bottom' }" @scroll.passive="onScroll">
          <!-- bio -->
          <p class="md:col-start-2 row-start-1 col-span-3 md:col-span-1 w-full self-center">
            {{ store.about.bio }}
          </p>
          <!-- awards -->
          <div class="relative ml-6 row-start-2 col-span-3 md:col-start-2 md:col-span-1">
            <h4
              class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
              awards</h4>
            <Transition name="fade" mode="out-in">
              <p class="h-8" :key="which">{{ store.about.awards[whichAward[0]][tiers[whichAward[1]]][whichAward[2]] }}
              </p>
            </Transition>
            <div class="flex flex-wrap gap-2">
              <div v-for="(award, index) in store.about.awards"
                class="flex flex-col-reverse items-start gap-1 mb-5 w-min">
                <NuxtImg provider="sanity" sizes="50vw md:75vw lg:100vw" :modifiers="{ fit: 'crop' }"
                  class="transition-all duration-500 ease-in-out w-10 h-10 object-contain brightness-100 invert dark:invert-0"
                  :class="whichAward[0] === index ? 'opacity-100' : 'opacity-30'" :src="award.icon.asset._id"
                  :alt="award.issuer" />
                <div class="flex gap-2 min-w-12 mr-6">
                  <Awards v-for="tier in tiers" :key="index + tier" @on-hover="stopInterval" @on-leave="startInterval"
                    :index="index" :award="award[tier]" :whichAward="which" :tier />
                </div>
              </div>
            </div>
          </div>
          <!-- technical skills -->
          <div class="flex flex-wrap gap-6 row-start-3 md:col-start-2 col-span-3 md:col-span-1">
            <div class="relative ml-6">
              <h4
                class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
                3d</h4>
              <ul>
                <li v-for="skill in store.about.skills.filter(x => x.type === '3D')">{{ skill.skill }}</li>
              </ul>
            </div>
            <div class="relative ml-6">
              <h4
                class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
                website</h4>
              <ul class="grid grid-cols-2 gap-x-4">
                <li v-for="skill in store.about.skills.filter(x => x.type === 'UI/UX & Web')">{{ skill.skill }}</li>
              </ul>
            </div>
            <div class="relative ml-6">
              <h4
                class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
                graphic design</h4>
              <ul>
                <li v-for="skill in store.about.skills.filter(x => x.type === 'Graphics & Design')">{{ skill.skill }}
                </li>
              </ul>
            </div>
            <div class="relative ml-6">
              <h4
                class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
                vid &amp; motion</h4>
              <ul>
                <li v-for="skill in store.about.skills.filter(x => x.type === 'Video & Motion')">{{ skill.skill }}</li>
              </ul>
            </div>
          </div>
          <!-- theory skills -->
          <div class="row-start-4 md:col-start-2 col-span-3 md:col-span-1 relative ml-6">
            <h4
              class="font-bold -rotate-90 -translate-x-full -translate-y-full absolute top-0 left-0 origin-bottom-right whitespace-nowrap">
              skills</h4>
            <p>{{store.about.skills.filter(x => x.type === 'Theory').map(x => x.skill).join(', ')}}</p>
          </div>
        </div>
        <!-- resume download -->
        <NuxtLink external :to="store.about.resume.asset.url" download target="_blank">
          <button
            class="flex items-center justify-center gap-2 border-solid border rounded-2xl bg-transparent transition-all duration-500 ease-in-out pointer-events-auto cursor-pointer dark:border-white border-black dark:text-white text-black dark:hover:text-black hover:text-white dark:hover:bg-white hover:bg-black m-5 mb-safe-b-margin fixed bottom-8 md:bottom-0 right-0 pt-2 chrome-only:pb-1 px-4"
            aria-label="Download Resume">
            <font-awesome class="icon mb-2" icon="file" />
            <p class="leading-none">download resume</p>
          </button>
        </NuxtLink>
      </section>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/store'
const whichAward = ref([0, 0, 0])
const which = computed(() => whichAward.value.toString())
let interval: NodeJS.Timeout | null = null
const store = useStore()
const { $lottie } = useNuxtApp()
const windowWidth = computed(() => store.windowWidth)
const opened = ref(false)
const tiers = ref(["gold", "silver", "bronze", "crystal"])
const clipped = ref('bottom') as Ref<string | null>

onBeforeRouteLeave((to) => {
  if (to.path === '/video-reel') return false
})

store.$patch({
  opened: opened.value,
})

function onScroll(e: Event) {
  if (!e.target) return
  const target = e.target as HTMLElement;
  if (target.clientHeight === target.scrollHeight) {
    clipped.value = null
  } else if (target.scrollTop === 0) {
    clipped.value = 'bottom'
  } else if (Math.abs(target.scrollTop + target.clientHeight - target.scrollHeight) < 1) {
    clipped.value = 'top'
  }
}

onMounted(() => {
  $lottie.loadAnimation({
    container: document.querySelector('.lottie') as Element,
    loop: false,
    autoplay: false,
    path: './aboutme.json',
    rendererSettings: {
      className: 'lottieRoot',
    },
  })
  startInterval()
})

function stopInterval(which: number[]) {
  whichAward.value = which
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}

function startInterval() {
  if (interval) return
  interval = setInterval(() => {
    let [awardIndex, tierIndex, itemIndex] = whichAward.value
    let temp = [...whichAward.value];

    // Function to check if the current position is valid
    const isValid = (awardIdx: number, tierIdx: number, itemIdx: number) => {
      const award = store.about.awards[awardIdx];
      const tierKey = tiers.value[tierIdx];
      return award && award[tierKey] && award[tierKey]![itemIdx] !== undefined;
    };

    // Check if the next item in the current tier exists
    if (isValid(awardIndex, tierIndex, itemIndex + 1)) {
      temp[2] = itemIndex + 1; // Move to the next item in the same tier
    }
    // Check if the next tier exists and has items
    else if (isValid(awardIndex, tierIndex + 1, 0)) {
      temp[1] = tierIndex + 1; // Move to the next tier
      temp[2] = 0; // Reset to the first item in the new tier
    }
    // Check if the next award exists and has items in its first available tier
    else if (awardIndex + 1 < store.about.awards.length) {
      let foundNext = false;
      for (let nextTierIndex = 0; nextTierIndex < tiers.value.length; nextTierIndex++) {
        if (isValid(awardIndex + 1, nextTierIndex, 0)) {
          temp = [awardIndex + 1, nextTierIndex, 0]; // Move to the next award's first valid tier
          foundNext = true;
          break;
        }
      }
      if (!foundNext) {
        temp = [0, 0, 0]; // Reset if no valid tiers are found in the next award
      }
    }
    // Reset to the beginning if all awards and tiers are exhausted
    else {
      temp = [0, 0, 0];
    }

    // Update the current position
    whichAward.value = temp;
  }, 5000)
}

function about() {
  opened.value = !opened.value
  store.opened = opened.value
  leave()
}

function hover() {
  if (!$lottie) return
  if (opened.value) $lottie.setSpeed(-2)
  else $lottie.setSpeed(2)
  $lottie.play()
}

function leave() {
  if (!$lottie) return
  if (opened.value) $lottie.setSpeed(2)
  else $lottie.setSpeed(-2)
  $lottie.play()
}
</script>

<style>
.lottie *,
/* stylelint-disable-next-line selector-class-pattern */
.lottieLoading,
/* stylelint-disable-next-line selector-class-pattern */
.lottieLoading *,
/* stylelint-disable-next-line selector-class-pattern */
.lottieRoot,
/* stylelint-disable-next-line selector-class-pattern */
.lottieRoot * {
  fill: var(--color) !important;
}
</style>
