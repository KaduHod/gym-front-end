<script setup>
    import AdicionarTreinoComponent from './AdicionarTreinoComponent.vue'
</script>
<template>
    <div class="formContainer">
        <div class="formInnerContainer">
            <div class="form-inner-container-flex-center">
                <div @click.native="close" id="AlunoCreateClose" class="Close">
                    <ion-icon name="close-outline">
                    </ion-icon>
                </div>
                <form @submit.prevent="handleSumbit" class="form-control" action="">
                    <div class="form-inner-flex">   
                        <h1>Criar Periodização
                            
                        </h1>
                        <label for="">
                            Nome
                            <input v-model="aluno" type="text" class="form-control">
                        </label>
                        <label for="">
                            Data de início
                            <input v-model="dataInicio" type="date" class="form-control">
                        </label>
                        <label for="">
                            Data fim
                            <input v-model="dataFim" type="date" class="form-control">
                        </label>
                        
                        <label for="">
                            Aluno
                            <select name="" class="form-control" >
                                <option
                                v-for="(aluno, index) in alunos" 
                                :value="aluno.id">
                                {{aluno.profile.nome}}
                                </option>
                            </select>
                        </label>
        
                        <AdicionarTreinoComponent @catch-treino="addTreino" :treinos='treinos'/>
                        
                        
                        <input type="button" value="Criar" class="btn btn-success">
                    </div>
                    <div >
                        <h1>Treinos da periodização</h1>
                        <table class="table overflow">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Quantidade de exercícios</th>
                                <th scope="col">Acões</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="conjuntoDeTreinos.length" v-for="(treino, index) in conjuntoDeTreinos">
                                <th scope="row">{{++index}}</th>
                                <td>{{treino.nome}}</td>
                                <td>{{treino.descricao}}</td>
                                <td>{{treino.exercicios.length}}</td>
                                <td class="acoes">
                                    <ion-icon @click="removeTreino(index)"  style="color: red;" name="trash-outline"></ion-icon>
                                    <ion-icon @click="viewExercicios(index)" name="barbell-outline"></ion-icon>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </form>
                
    
                <div class="my-card" v-show="showExercicioView">
                    <div class="my-card-inner">
                        <div @click="closeViewExercicios" class="Close">
                            <ion-icon name="close-outline">
                            </ion-icon>
                        </div>
                        <ul class="lista">
                            <li v-for="exercicio in exerciciosView">
                                - {{exercicio.exercicio.nome}}
                            </li>
                        </ul> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['treinos', 'alunos','professorId'],
        data(){
            return {
                nome: null,
                dataInicio: null,
                dataFim:null,
                aluno:null,
                conjuntoDeTreinos:[],
                showExercicioView:false,
                exerciciosView: null
            } 
        },
        methods: {
            close(){
                this.$emit('fecharCreate')
            },
            closeViewExercicios(){
                this.showExercicioView = false
            },
            addTreino(treinoId){
                
                const treino = this.treinos.find( treino => treino.id === treinoId )
                console.log({treino, treinoId})
                this.conjuntoDeTreinos.push(treino)
                console.log(this.conjuntoDeTreinos)
            },
            removeTreino(index){
                this.conjuntoDeTreinos = this.conjuntoDeTreinos.filter( (treino, i) => i !== index )
            },
            viewExercicios(index){
                this.exerciciosView = this.conjuntoDeTreinos[index].exercicios
                
                this.showExercicioView = true                
            }


        },
        async beforeCreate(){
            
        }
    } 
</script>
<style scoped>
    form{
        height: fit-content;
    }
   .overflow{
       max-height: 400px;
       overflow-y: scroll;
   }

</style>