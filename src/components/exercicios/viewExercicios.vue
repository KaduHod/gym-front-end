<script setup >

</script>
<template>
    <div class="card">
        <div @click.native="close" id="AlunoCreateClose" class="Close">
            <ion-icon name="close-outline">
            </ion-icon>
        </div>
        <p v-for="exercicio in exerciciosView" >{{exercicio.nome}}</p>
    </div>
    
</template>
<script>
    export default{
        props: ['exerciciosView'],
        data(){
            return{

            }
        },
        methods : {
            close(){
                this.$emit('closeViewExercicios')
            }
        },
        mounted(){
            console.log(this.exerciciosView)
        }
    }
</script>
<style>
    .card{
        display: block;
        position: absolute;
    }
</style>