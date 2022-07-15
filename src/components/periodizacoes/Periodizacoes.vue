<script setup>
  
</script>

<template>
  <main class="main-container">
    <h1>Periodizações</h1>
    <div  class="search-container">
      <SearchComponentPeriodizacao  />
    </div>
    <div class="create-button-container">
      <input 
        type="button" 
        @click="showCreate"
        value="Criar Periodização"
      >
    </div>

    <div class="list-button-container">
      <input 
      type="button" 
      
      value="Listar Periodizações"
      >
    </div>
    
    <div class="modals" v-show="showCreateComponent || showlistComponent">
      <CreateComponentPeriodizacao 
      @fechar-create="closeCreate"  
      v-show="showCreateComponent" 
      :alunos="alunos"
      :treinos="treinos"
      :professorId="profile.professorId"/>
    </div>
    

    
  </main>
</template>

<script>
  import SearchComponentPeriodizacao from './SearchComponentPeriodizacao.vue'
  import CreateComponentPeriodizacao from './CreateComponentPeriodizacao.vue'

  export default {
    components:{
      SearchComponentPeriodizacao,
      CreateComponentPeriodizacao
    },
    props: ['profile','treinos','exercicios','alunos'],
    data() {
      return {
        showlistComponent: false,
        showCreateComponent: false,
        ready: false
      }
    },
    methods : {
      showCreate(){
        this.showCreateComponent = true
      },
      showList(){
        this.showlistComponent = true
      },
      closeCreate(){
        this.showCreateComponent = false
      },
      closeList(){
        this.showlistComponent = false
      },
      closeAll(){
        this.closeCreate()
        this.closeList()
      },
      async mounted(){
        this.ready = true
      }
    }
  }
</script>

