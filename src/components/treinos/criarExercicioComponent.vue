<script setup>

</script>
<template>
    <div class="exercicio-create">
        <label for="exercicioIds">Exercício</label>
        <select class="form-control" v-model="exercicio" name="exercicio[]" id="exercicioIds">
            <option v-for="exer in exercicios" :value="exer.id"> {{exer.musculo}} - {{exer.nome}}</option>
        </select>
        <label for="series">Séries</label>
        <input type="number" name="series[]" v-model="series" class="form-control">
        <label for="repeticoes">Repetições</label>
        <input type="number" name="repeticoes[]" v-model="repeticoes" class="form-control">
        <label for="tipoSeries">Tipo de séries</label>
        <input type="text" name="tipoSeries[]" v-model="tipoSeries" class="form-control">
        <label for="tipoRepeticoes">Tipo de repetições</label>
        <input type="text" name="tipoRepeticoes[]" v-model="tipoRepeticoes" class="form-control">
        <div class="btn btn-success" @click="transmitData" >Adicionar Exercício</div>
        
    </div>
</template>
<script>
    export default {
        emits : ['receiveError', 'receiveData'],
        props : ['exercicios'],
        data(){
            return {
                exercicio : null,
                series : null,
                repeticoes : null,
                tipoSeries : '',
                tipoRepeticoes : ''
            }
        },
        methods : {
            transmitData(){
                const data = {
                    exercicioId : this.exercicio,
                    series : this.series,
                    repeticoes : this.repeticoes,
                    tipoSeries : this.tipoSeries || '',
                    tipoRepeticoes : this.tipoRepeticoes || '',
                }

                const verify = this.validateForm(data)
                
                if(!verify){
                    return this.$emit('receiveError','Faltam dados para o exercício!')
                }
                
                this.resetForm()
                return this.$emit('receiveData', data)
            },
            validateForm(data){
                let verify = true
                if(!data.exercicioId || !data.series || !data.repeticoes ) verify = false   
                return verify
            },
            resetForm(){
                this.exercicio = null
                this.series= null
                this.repeticoes= null
                this.tipoSeries= null
                this.tipoRepeticoes= null
            }
        },
        computed : {

        },
        async mounted(){
            
        }
    }
</script>
<style scoped>
    
</style>