<script setup>
  import SearchComponent from './SearchComponent.vue'
  import CreateComponent from './CreateComponent.vue'
  import ListComponent   from './ListComponent.vue'
  
</script>
<template>
  <main>
    <div id="search">
      <SearchComponent :alunos="alunos" />
    </div>
    <div id="create">
      <input 
        type="button" 
        data-type="alunos" 
        value="Create"
        @click="showModals('createModal')">
    </div>
    <div id="list">
      <input 
        type="button" 
        data-type="alunos" 
        value="List"
        @click="showModals('listModal')">
    </div>
    <div id="modalsAlunos">
      <CreateComponent id="createModal" :professorId="professorId" data-modal-name="CreateComponent" class="hidden"/>
      <ListComponent id="listModal" :professorId="professorId" data-modal-name="ListComponent" class="hidden"/> 
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
      ListComponent
    },
    data() {
      return {
        isHidden: false,
        alunos: [],
        profileId:'31',
        profile: {},
        professorId : null
      }
    },
    methods : {
      showModals(str){
        setModalAlunoHidden()
        const modal = document.getElementById(str)
        modal.classList.remove('hidden')
      }
    },
    computed : { 

    },
    async mounted(){
      this.profile = await getProfile(this.profileId)
      this.professorId = this.profile.professorId
      const responseAlunos = await axios.get(`http://localhost:9999/professor/${this.professorId}/alunos`)
      this.alunos = responseAlunos.data.data.alunos
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

#search input{

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
