<script setup>
  import Alunos from './components/alunos/Alunos.vue'
  import Periodizacoes from './components/periodizacoes/Periodizacoes.vue'
  import Treinos from './components/treinos/Treinos.vue'
  import Configuracoes from './components/Configuracoes.vue'
  
</script>

<template>

  <nav>
    <ul>
      <li  @click="changeFocus('alunos')"><ion-icon name="accessibility-outline"></ion-icon>
      </li>
      <li  @click="changeFocus('treinos')"><ion-icon name="barbell-outline"></ion-icon></li>
      <li  @click="changeFocus('periodizacoes')"><ion-icon name="albums-outline"></ion-icon></li>
      <li  @click="changeFocus('configuracoes')"><ion-icon name="settings-outline"></ion-icon></li>
    </ul>
  </nav>

  <main v-if="ready">
    <Alunos 
      id="alunos" 
      :profile="profile" 
      :alunos="alunos"
      class=" " />

    <Treinos 
      id="treinos" 
      :exercicios="exercicios" 
      :treinos="treinos" 
      :profile="profile" 
      class="hidden" />

    <Periodizacoes 
      id="periodizacoes" 
      :exercicios="exercicios" 
      :treinos="treinos" 
      :profile="profile" 
      :alunos="alunos"
      class="hidden"/>  

    <Configuracoes 
      id="configuracoes" 
      :profile="profile" 
      class="hidden"/>

  </main>

</template>

<script>
  import axios from 'axios'
  import getProfile from './service/requests.js'
  import {setAllInitialHidden} from './helpers.js'
  
  export default {
    data() {
      return{
        profileId:'31',
        profile : {},
        ready:false,
        treinos:null,
        exercicios:null,
        alunos:null
      }
    },
    methods : {
      changeFocus(id){
        setAllInitialHidden()
        const el = document.getElementById(id)
        el.classList.remove('hidden')

      },
      async getData(){
        let responseProfile = await axios.get(`http://localhost:9999/profile/31` )
        this.profile = responseProfile.data.profile 
        await this.getAlunos(this.profile.professorId)
        await this.getTreinos()
        await this.getExercicios()
      },
      async getTreinos(){
        const responseTreinos = await axios.get(`http://localhost:9999/treinos/${this.profile.professorId}`)
        this.treinos = responseTreinos.data.data
      },
      async getExercicios(){
        const responseExercicios = await axios.get(`http://localhost:9999/exercicios/`)
        this.exercicios = responseExercicios.data.data
      },
      async getAlunos(professorId){
        const responseAlunos = await axios.get(`http://localhost:9999/professor/${professorId}/alunos`)
        this.alunos = responseAlunos.data.data.alunos
      }
    },
    computed : {
      
    },
    async mounted(){
      await this.getData()
      this.ready = true      
    }    
}
</script>

<style>
ion-icon{
  transform: scale(1.4);
  transition: 150ms;
}
ion-icon:hover{
  transform: scale(1.9);
}

nav{
  display: flex;
  width: 100%;
  padding-top: 10px;
  height: fit-content;
  color: black;
}
nav ul {
  display: flex;
  width: calc(22% - 20px);
  justify-content: space-around;
  list-style: none;
  padding-left: 20px;
  margin-left: 0px;
}
main{
  width: calc(100vw - 4px);
  height: 95vh;
  border-top: 1px solid rgba(160, 160, 160, 0.568);
  color: rgb(0, 0, 0);
}
</style>
