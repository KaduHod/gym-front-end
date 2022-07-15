<template>
    <label for="treino">
        <input id="treino" class="form-control" name="treino_input" v-model="treino"  type="text" list="treinos-lista"/>
        
        <datalist id="treinos-lista">
          <option v-for="treino in treinos" >Treino: {{treino.nome}}</option> 
          <option v-for="exercicio in exercicios">Exercicio: {{exercicio.nome}}</option>
        </datalist>
        </label>        
</template>

<script>
    import getProfile from '../../service/requests.js'
  
    export default {
        props :[
          'treinos',
          'exercicios'
        ]
        ,
      data() {
        return {
          
        }
      },
      methods : {
  
      },
      computed : { 
  
      }
    }
  </script>