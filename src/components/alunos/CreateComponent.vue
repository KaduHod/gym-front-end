<template>
  <div id="formContainer">
    <div id="formInnerContainer">
      
      <form @submit.prevent="handleSumbit" action="">
        <div v-on:click="closeModal" class="Close"><ion-icon name="close-outline"></ion-icon></div>
        <h1>Create Aluno</h1>
        <label for="">
          Nome
          <input type="text" v-model="nome" name="nome">
        </label>
        <label for="">
          Data de nascimento
          <input type="datetime" v-model="dataNascimento" name="dataNascimento">
        </label>
        <label for="">
          Email
          <input type="email" v-model="email" name="email">
        </label>
        <label for="">
          Telefone
          <input type="text" v-model="telefone" name="telefone">
        </label>
        <input type="hidden" v-model.number="professor" >
        <label for="">
          Senha
          <input type="text" v-model="senha" name="senha">
        </label>
        
        <input type="submit">
        
      </form>
    </div>
  </div>
  </template>
  
  <script>
    export default {
      props : {
        professorId : {
          type: Number,
          required : true
        }
      },
      data() {
        return {
          nome:'',
          dataNascimento: '',
          senha:'',
          telefone: '',
          email : '',
          professor: this.professorId
        }
      },
      method : {
        handleSumbit(){
          console.log('oi')
        },
        closeModal(){
          const modalFormAluno = document.getElementById('createModal')
          console.log('modalFormAluno')
        }
      },
      mounted(){
        
      }
    }
  </script>
  
  <style scoped>
  #formContainer{
    display: block;
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
  #formInnerContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  form{
    width: 60vw;
    height: 70%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    padding: 40px;
  }
  label{
    margin: 10px;
  }
  </style>
  