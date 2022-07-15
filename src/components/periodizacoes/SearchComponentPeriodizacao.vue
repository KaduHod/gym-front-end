<template>
    <label for="aluno">
        <input id="aluno" class="form-control" name="aluno_input"  type="text" list="alunos-lista"/>
        
        <datalist id="alunos-lista">
        
            <option>
                
            </option>
        </datalist>
        </label>        
</template>

<script>
    import getProfile from '../../service/requests.js'
  
    export default {
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