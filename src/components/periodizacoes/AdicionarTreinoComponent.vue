<script setup >

</script>

<template>
    <form>
        <label for="">
            Treinos
            <select class="form-control" v-model="treino" name="treino" id="">
                <option 
                v-for="treino in treinos"
                :value="treino.id">{{treino.nome}} - {{treino.descricao}} </option>
            </select>
        </label>
        <input type="button" @click="sendTreino" value="Adicionar Treino" class="btn btn-success">
    </form>
    
</template>
<script>
    export default {
        props : ['treinos'],
        data(){
            return {
                treino:null
            }
        },
        methods : { 
            sendTreino(){
                this.$emit('catchTreino', this.treino)
            },
        },
        async mounted(){
            console.log(this.treinos, 'trienos no componente filho')
        }

    }
</script>
<style>
    form{
        overflow: hidden;
        width: 100%;
    }
    label{
        width: 100%;
    }
    *{
        overflow: hidden;
    }
</style>