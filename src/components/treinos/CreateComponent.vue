<script setup >
    import criarExercicioComponent from './criarExercicioComponent.vue'
</script>
<template>
    <div v-if="createComponentReady" class="formContainer">
        <div class="formInnerContainer">
            <div @click.native="close" id="AlunoCreateClose" class="Close"><ion-icon name="close-outline"></ion-icon></div>
            
            <form @submit.prevent="handleSubmit" id="formTreino" action="">
                <div @click="hide('form success')" v-show="treinoCriado" class="alert alert-success" role="alert">
                    Treino criado!
                  </div>
                  <div @click="hide('form err')" v-show="erroCriarTreino" class="alert alert-danger" role="alert">
                    <p v-for="msg in errorMsgs">- {{msg}}</p>
                  </div>
                  
                <div class="forms-container-flex">
                    
                    <div class="forms-container-flex-inner">
                        <h1>Criar Treino</h1> 
                        <label for="nome">Nome</label>
                        <input type="text" id="nome" v-model="nome" class="form-control" placeholder="Nome do Treino">
                        <label for="aquecimento">Aquecimento</label>
                        <input type="text" id="aquecimento" v-model="aquecimento" class="form-control" placeholder="Aquecimento">
                        <label for="descricao">Descrição</label>
                        <input type="text" id="descricao" v-model="descricao" class="form-control" placeholder="Descrição">                        
                    </div>
                    <div id="exerciciosContainer" class="forms-container-flex-inner">
                        <div @click="hide('exercicio')" v-show="eventoAdicionarExercicio" class="alert alert-success" role="alert">
                            Exercício adicionado!
                          </div>
                          <div @click="hide('alert')" v-show="eventoAdicionarExercicioErro" class="alert alert-danger my-alert" role="alert">
                            {{msg}}
                          </div>
                        <criarExercicioComponent   
                            class="exercicio-create" 
                            :exercicios="exercicios"
                            @receive-data="sendExercicio"
                            @receive-error="alert"
                        />
    
                    </div>
                </div>
                <hr>
                
                
                <input class="btn btn-success" type="submit" value="Salvar treino">
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Exercício</th>
                        <th scope="col">Séries</th>
                        <th scope="col">Repeticões</th>
                        <th scope="col">Acões</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(el, index) in exercicio">
                        <th scope="row">{{index + 1}}</th>
                        <td>{{getNomeExercicio(el.exercicioId)}}</td>
                        <td>{{el.series}}</td>
                        <td>{{el.repeticoes}}</td>
                        <td>
                            <ion-icon @click="removeExercicio(index)"  style="color: red;" name="trash-outline"></ion-icon>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </form>
            <div id="ShowExercicios">
                
            </div>

        </div>
        <img id="gif" v-show="showGif" src="/public/loadingGif.gif" alt="this slowpoke moves" />
    </div>
</template>
<script>
    import axios from 'axios';
    //imports
    export default {
        emmits : ['receiveError', 'receiveData'],
        components: {
            criarExercicioComponent
        },
        props : [
            'profile'
        ],
        data(){
            return {
                nome: '',
                aquecimento: '',
                descricao: '',
                showGif: false,
                exercicio : [],
                eventoAdicionarExercicio : false,
                eventoAdicionarExercicioErro : false,
                msg : '',
                erroCriarTreino : false,
                treinoCriado: false,
                errorMsgs: [],
                createComponentReady : false,
                
            }
        },
        methods : {
            close(){
                this.$emit('fechar-create')
            },
            async handleSubmit(submitEvent){
                this.errorMsgs = []
                this.treinoCriado = false
                this.erroCriarTreino = false

                const data = {
                    nome : this.nome,
                    aquecimento : this.aquecimento,
                    descricao : this.descricao,
                    exercicios : this.exercicio,
                }

                let verify = this.validateData(data)

                if(!verify) return

                const treinoCreated = await this.createTreino(data)

                if(!treinoCreated){
                    this.erroCriarTreino = true
                    this.treinoCriado = false
                    return
                }

                this.erroCriarTreino = false
                this.treinoCriado = true
                this.nome = ''
                this.aquecimento = ''
                this.descricao = ''
                this.exercicio = [] 
            },
            validateData(data){
                console.log(data)
                this.errorMsgs = []
                if(data.exercicios.length < 2){
                    this.errorMsgs.push('Crie mais de dois exercícios para o treino')
                    this.erroCriarTreino = true
                }
                if(data.nome.length < 1){
                    this.errorMsgs.push('Adicione um nome para o treino')
                    this.erroCriarTreino = true
                }
                if(this.erroCriarTreino === true) return false
                return true
            },
            sendExercicio(exercicio){
                this.eventoAdicionarExercicioErro = false
                this.eventoAdicionarExercicio = true
                this.exercicio.push(exercicio)                
            },
            alert(msg){
                this.msg = msg
                this.eventoAdicionarExercicio = false
                this.eventoAdicionarExercicioErro = true
            },
            getNomeExercicio(id){
                let exercicio = this.exercicios.find( exer => exer.id === id )

                return exercicio.nome
            },
            removeExercicio(index){   
                this.exercicio = this.exercicio.filter( (e, i) => i !== index )
            },
            hide(attr){
                if(attr === 'alert') this.eventoAdicionarExercicioErro = false
                if(attr === 'exercicio') this.eventoAdicionarExercicio = false
                if(attr === 'form err') this.erroCriarTreino = false
                if(attr === 'form success') this.treinoCriado = false
            },
            async getExercicios(){
              const responseExercicios = await axios.get(`http://localhost:9999/exercicios/`)
              this.exercicios = responseExercicios.data.data
              return this.exercicios
            },
            async getAlunos(){
              const responseAlunos = await axios.get(`http://localhost:9999/professor/${this.profile.professorId}/alunos`)
              this.alunos = responseAlunos.data.data.alunos        
              return this.alunos
            },
            async getData(){
                this.exercicios = await this.getExercicios()
                this.alunos = await this.getAlunos()
            },
            async createTreino(data){
                const response = await axios.post('http://localhost:9999/treino',{
                    descricao: data.descricao,
                    aquecimento: data.aquecimento,
                    nome: data.nome,
                    exercicios: data.exercicios
                }) 
                if(response.data.treino) return true
                return false
            }
        },
        computed : {

        },
        created(){

        },
        async mounted(){
            await this.getData()
            this.createComponentReady = true
        }
    }
</script>
<style >
.formInnerContainer{
    background-color: white;
    display: flex;
    flex-direction: column;
}
form{
    width: 80%;
    max-height: fit-content;
    padding: 5px;
    overflow-y: scroll;
    
}
button, input{
    margin: 5px;
}
.exerciciosContainer{
    display: flex;
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;    
    flex-wrap: wrap;
}
.exercicio-create{
    margin: 10px 0px;
}
.forms-container-flex{
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.forms-container-flex-inner{
    width:45%;
}


</style>