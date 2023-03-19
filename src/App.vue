<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { onBeforeMount, ref } from 'vue';

let pokemonList = ref([]);

const fetchPokemon = async () => {
  const promises = [];

  for (let i = 1; i <= 50; i++) {
    // 50 request for 50 pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  pokemonList.value = await Promise.all(promises).then((results) => {
    return results.map((result) => ({
      name: result.name,
      abilities: result.abilities.map(({ability}) => ability.name),
      image: result.sprites['front_default'],
      type: result.types.map((type) => type.type.name).join(', '),
      id: result.id
    }));
  })
};

onBeforeMount(() => {
  fetchPokemon();
});
</script>

<template>
  <div>
    <ul>
      <li v-for="pokemon in pokemonList" :key="pokemon.id">{{ pokemon.name }}</li>
    </ul>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
