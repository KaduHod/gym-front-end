<script setup>
  import SearchComponent from './SearchComponent.vue'
  import CreateComponent from './CreateComponent.vue'
  import ListComponent from './ListComponent.vue'
</script>


<template>
    <main v-if="treinosComponentReady">
      <h1>Treinos
      </h1>
      <div id="search">
         <SearchComponent :treinos="treinos" :exercicios='exercicios'/>
      </div>
      <div class="create-button-container">
        <input 
          type="button" 
          data-type="alunos" 
          value="Criar Treino"
          @click="showModals('create')">
      </div>
      <div class="list-button-container">
        <input 
          type="button" 
          data-type="alunos" 
          value="Listar Treinos"
          
          @click="showModals('list')">
      </div>

      <div class="modals" v-show="showCreateComponent || showListComponent">
        <CreateComponent @fechar-create="closeCreate" :profile="profile" v-show="showCreateComponent"/>
        <ListComponent @fechar-list="closeList" :treinos="treinos" v-show="showListComponent"/>
      </div>
     

      
    </main>
</template>

<script>
  import getProfile from '../../service/requests.js'
  export default {
    components: {
      SearchComponent,
      CreateComponent,
      ListComponent
      
    },
    props : [
      'profile','treinos','exercicios'
    ],
    data() {
      
      return {
        showCreateComponent : false,
        showListComponent : false,
        alunos : [],
        treinos: this.treinos,
        treinosComponentReady : false
      }
    },
    methods: {      
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
      this.treinosComponentReady = true 
    }
  }
</script>


<style scoped>
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