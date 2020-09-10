<template>
  <div id='dropdown'>
    <ul>
      <li>
        <router-link :to="{
        name: 'planet',
        params: {
          heading: 'interactivity planet',
          desc: 'test',
          id: 'ui'
        }}"
        class='margin'>
          interactivity
        </router-link>
      </li>
      <li>
        <router-link :to="{
        name: 'planet',
        params: {
          heading: 'photography planet',
          desc: 'test',
          id: 'photography'
        }}"
        class='margin'>
          photography
        </router-link>
      </li>
      <li>
        <router-link :to="{
        name: 'planet',
        params: {
          heading: 'motion planet',
          desc: 'test',
          id: 'motion'
        }}"
        class='margin'>
          motion
        </router-link>
      </li>
      <li>
        <router-link :to="{
        name: 'planet',
        params: {
          heading: 'branding planet',
          desc: 'test',
          id: 'brand'
        }}"
        class='margin'>
        branding
        </router-link>
      </li>
      <li>
        <router-link :to="{
        name: 'planet',
        params: {
          heading: 'all discoveries',
          desc: 'test',
          id: 'works'
        }}"
        class='margin'>
          all works
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      desc: [
        'Every work, assignments, freelance, and side projects taught and made me discover something new.',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
div {
    padding: 20px;
    background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
    border-radius: 0 0 15px 15px;
    box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}

li {
  display: block;
}
</style>
