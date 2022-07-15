<template>
  <div id="MajorListBlock">
    <div id="Top-of-table">
      <div @click.native="close" id="AlunoCreateClose" class="Close"><ion-icon name="close-outline"></ion-icon></div>
    </div>
    <div id="AlunosTabela">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th>Email</th>
            <th scope="col">Periodização</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(aluno, index) in alunos">
            <th scope="row">{{index + 1}}</th>
            <td>{{aluno.profile.nome}}</td>
            <td>{{aluno.profile.email}}</td>
            <td>Periodização</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
    export default {
      props : {
        alunos : {
          type : Array,
          required : true
        },
        professorId : {
          type: Number,
          required : true
        }
      },
      data() {
        return {
        }
      },
      methods : {
        close(){
          this.$emit('fecharList')
        }
      }
    }
  </script>
  
  <style scoped>
  #MajorListBlock{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #Top-of-table{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  #AlunosTabela{
    margin-top: 10px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
  }
  #AlunosTabela table {
    width: 80%;
  }
  </style>
  