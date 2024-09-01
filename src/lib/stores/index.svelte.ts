let load = $state(0)

export const loadStore = {
  get load() { return load },
  set load(newValue) {
    load = Math.abs(newValue)
  }
}


const projects = $state([
  {
    title: "Yellow Canteen",
    url: "/1.png"
  },
  {
    title: "Creaid",
    url: "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg"
  },
  {
    title: "Tremors",
    url: "https://imgix.cosmicjs.com/1b9ae850-dbaf-11ed-b6eb-0fc980522195-KV-1-OK-rev-TERANG-copy.jpg"
  },
  {
    title: "Tremors",
    url: "https://imgix.cosmicjs.com/d0fd0620-f561-11ee-b8e9-b1c350f53f6e-KS_RHD_PRIME_COVER-copy.png"
  },
])

export const projectsStore = {
    get projects() { return projects }
}


let activeIndex = $state(0)

export const countStore = {
    get activeIndex():number {return activeIndex},
    set activeIndex(bool: boolean) {
      const y = bool ? 1 : -1;
      activeIndex = Math.max(Math.min(activeIndex + y, projects.length - 1), 0)
  }
}
