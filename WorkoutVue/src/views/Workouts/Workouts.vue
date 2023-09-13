<template>
    <v-main>
        <v-container fluid>
            <v-row justify="center" align="center" style="height: 10vh;">
                <v-col cols="12" md="8">
                    <v-card elevation="3">
                        <v-card-title class="pa-5" align="center">Treinos - {{ alunoId }} </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
   </v-main>
</template>

<script>
export default {
    props: ['alunoId']
}
</script>