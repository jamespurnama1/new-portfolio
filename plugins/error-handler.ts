export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error(error);
    if (nuxtApp.clientPosthog && typeof (nuxtApp.clientPosthog as any).captureException === 'function') {
      (nuxtApp.clientPosthog as { captureException: (error: unknown) => void }).captureException(error);
    }
  })
})
