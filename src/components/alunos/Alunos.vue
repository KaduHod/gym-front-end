<script setup>
  import SearchComponent from './SearchComponent.vue'
  import CreateComponent from './CreateComponent.vue'
  import ListComponent   from './ListComponent.vue'
  import MainButton      from '../mainButton.vue'
  
</script>
<template>
  <main v-if="AlunoComponentReady">
    <h1>Alunos</h1>
    <div id="search">
      <SearchComponent :alunos="alunos" />
    </div>
    <div>
    </div>
    <div class="create-button-container">
      <input 
        type="button" 
        data-type="alunos" 
        value="Criar Aluno"
        @click="showModals('create')">
    </div>
    <div class="list-button-container">
      <input 
        type="button" 
        data-type="alunos" 
        value="Listar Alunos"
        @click="showModals('list')">
    </div>
    <div class="modals" v-show="showCreateComponent || showListComponent">
      
        <CreateComponent 
          v-show="showCreateComponent" 
          id="createModal" 
          :professorId="professorId" 
          data-modal-name="CreateComponent"
          @fechar-create="closeCreate"
          />
          
        <ListComponent 
          v-show="showListComponent" 
          id="listModal" 
          :professorId="professorId" 
          :alunos="alunos"
          data-modal-name="ListComponent"
          @fechar-list="closeList" /> 
      
    </div>
    
  </main>
</template>

<script>
  import getProfile from '../../service/requests.js'
  import {setModalAlunoHidden} from '../../helpers.js' 

  export default {
    components: {
      SearchComponent,
      CreateComponent,
      ListComponent,
      MainButton
    },
    props : ['profile','alunos'],
    data() {
      return {
        isHidden: false,
        profileId:'31',
        professorId : null,
        showCreateComponent : false,
        showListComponent : false,
        tituloCriar:'Criar',
        tituloListar:'Listar',
        AlunoComponentReady : false
      }
    },
    methods : {
      showModals(str){
        if (str === 'create'){
          this.showCreateComponent = true
          this.showListComponent = false
          return
        } 
        this.showCreateComponent = false 
        this.showListComponent = true
      },
      closeCreate(){
        this.showCreateComponent = false
      },
      closeList(){
        this.showListComponent = false
      },
      async getData(){
        
        
      }
    },
    async mounted(){
      await this.getData()
      this.AlunoComponentReady = true
    }
  }
</script>

<style scoped>
#modalsAlunos{
  width: 100vw;
  height: 100vh;
  display: block;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.904);
}
#modalsAlunosInner{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
main{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

#search{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex:.6;
}

#create{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
#list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
