<script setup>
const props = defineProps({
    pokemon: {
        id: String,
        image: String,
        name: String,
        type: String,
        abilities: String
    }
});
</script>

<template>
    <v-card
        class="mx-auto my-12"
        max-width="374"
    >
        <v-img
            cover
            height="200"
            width="400"
            :src=props.pokemon.image
        ></v-img>

        <v-card-item>
            <v-card-title>{{ props.pokemon.name }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">{{ props.pokemon.type }}</span>

                <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
                ></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
                ></v-rating>
            </v-row>

            <div>{{ props.pokemon.abilities }}</div>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped>

</style>