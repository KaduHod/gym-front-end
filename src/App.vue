<script setup>
  import Alunos from './components/alunos/Alunos.vue'
  import Periodizacoes from './components/Periodizacoes.vue'
  import Treinos from './components/Treinos.vue'
  import Configuracoes from './components/Configuracoes.vue'
  
</script>

<template>

  <nav>
    <ul>
      <li @click="changeFocus('alunos')"><ion-icon name="accessibility-outline"></ion-icon>
      </li>
      <li @click="changeFocus('treinos')"><ion-icon name="barbell-outline"></ion-icon></li>
      <li @click="changeFocus('periodizacoes')"><ion-icon name="albums-outline"></ion-icon></li>
      <li @click="changeFocus('configuracoes')"><ion-icon name="settings-outline"></ion-icon></li>
    </ul>
  </nav>

  <main>
    <Alunos id="alunos" data-name="alunos" data-fase="initial" class=" " />
    <Treinos id="treinos" data-name="treinos" data-fase="initial" class="hidden" />
    <Periodizacoes id="periodizacoes" data-name="periodizacoes" data-fase="initial" class="hidden"/>  
    <Configuracoes id="configuracoes" data-name="configuracoes" data-fase="initial" class="hidden"/>
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
        profile : {}
      }
    },
    methods : {
      changeFocus(id){

        console.log(id)

        setAllInitialHidden()

        const el = document.getElementById(id)
        console.log(el)

        el.classList.remove('hidden')

      }
    },
    computed : {
      
    },
    async mounted(){
      this.profile = await getProfile(this.profileId)
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
  padding-bottom: 10px;
  height: fit-content;
  color: black;
  
  
}
nav ul {
  display: flex;
  width: 22%;
  justify-content: space-around;
  list-style: none;
  padding-left: 20px;
  margin-left: 0px;
}
main{
  width: calc(100vw - 4px);
  height: 90vh;
  border-top: 1px solid rgba(160, 160, 160, 0.568);
  color: rgb(0, 0, 0);
}
</style>
