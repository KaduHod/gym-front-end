<template>
    <label for="aluno">
        <input id="aluno" class="form-control" name="aluno_input" v-model="aluno"  type="text" list="alunos-lista"/>
        <datalist id="alunos-lista">
            <option v-for="aluno in alunos">
                Aluno: {{aluno.profile.nome}}
            </option>
        </datalist>
        </label>        
</template>

<script>
    import getProfile from '../../service/requests.js'
  
    export default {
        props :{
            alunos : {
                type : Array,
                required : true
            }
        },
      data() {
        return {
          aluno:''
        }
      },
      methods : {
  
      },
      computed : { 
  
      }
    }
  </script>