<script setup>
import { onBeforeMount, ref } from 'vue';
import PokeCard from './components/PokeCard.vue';

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
      abilities: result.abilities.map(({ability}) => ability.name).join(', '),
      image: result.sprites['front_default'],
      type: result.types.map(({type}) => type.name).join(', '),
      id: result.id
    }));
  });
};

onBeforeMount(() => {
  fetchPokemon();
});
</script>

<template>
  <div>
    <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row v-for="row in pokemonList.length / 5" :key="row">
        <v-item>
            <v-card
              class="d-flex align-center"
              height="350"
            >
              <PokeCard v-for="pokemon in pokemonList.slice((row - 1) * 5, (row * 5))" :key="pokemon.id" :pokemon="pokemon"/>
            </v-card>
          </v-item>
      </v-row>
    </v-container>
  </v-item-group>
  </div>
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
