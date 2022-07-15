<template>
  <div class="formContainer">
    <div class="formInnerContainer">
      <form @submit.prevent="handleSumbit" action="">
        <div id="topForm">
          <div @click.native="close" id="AlunoCreateClose" class="Close"><ion-icon name="close-outline"></ion-icon></div>

          <div v-show="succesAlunoCreated" class="alert alert-success" role="alert">
            Aluno criado!
          </div>
          <div v-if="formErros.length" class="msgError">
            <p v-for="error in formErros" >{{error}}</p>
          </div>
          
        </div>
        <h1>Criar Aluno</h1>
        <label for="">
          Nome
          <input type="text" class="form-control" required v-model="nome" name="nome">
        </label>
        <label for="">
          Data de nascimento
          <input type="date" class="form-control" required v-model="dataNascimento" name="dataNascimento">
        </label>
        <label for="">
          Email
          <input type="email" class="form-control" required v-model="email" name="email">
        </label>
        <label for="">
          Telefone
          <input type="text" class="form-control" required v-model="telefone" name="telefone">
        </label>
        
        <label for="">
          Senha
          <input type="text" class="form-control" required v-model="senha" name="senha">
        </label>
        
        <input type="submit" value="Criar Aluno" class="btn btn-success">
        <img id="gif" v-show="showGif" src="/loadingGif.gif" alt="this slowpoke moves" />
      </form>
    </div>
  </div>
  </template>
  
  <script>
    import axios from 'axios';
    import * as api from '../../service/requests.js';
    
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
          professor: this.professorId,
          showGif: false,
          succesAlunoCreated : false, 
          unsuccesAlunoCreated : false,
          formErros : []
        }
      },
      methods : {
        async handleSumbit(){
          this.showGif = true
          this.succesAlunoCreated = false
          this.unsuccesAlunoCreated = false

          const formData = {
            nome :this.nome,
            dataNascimento :this.dataNascimento,
            senha :this.senha,
            telefone :this.telefone,
            email : this.email.toLowerCase(),
            professorId : parseInt(this.professor),
            type: 'Aluno'
          }
          let dadosValidados = await this.validateForm(formData)
          if(!dadosValidados) {
            this.showGif = false
            this.unsuccesAlunoCreated = true
            return
          }

          try {
            let profile = await this.createProfile(formData)
             
            let aluno = await this.createAluno()
            
            let attachAlunoToProfile = await this.attachProfileToAluno(profile.id, aluno.id)
            
            let attachAlunoToProfessor = await this.attachAlunoToProfessor(this.professorId, aluno.id)
            
            this.nome = ''
            this.dataNascimento = ''
            this.email = ''
            this.telefone = ''
            this.senha = ''

            this.showGif = false
            this.succesAlunoCreated = true

            return
          } catch (error) {
            this.showGif = false
            this.unsuccesAlunoCreated = true

            return
          }
        },
        async validateForm(formData){
          let {nome, dataNascimento, senha, telefone, email, professorId} = formData
          this.formErros = []
          if(!nome || nome.length < 1) this.formErros.push('O nome é necessário')
          if(!dataNascimento) this.formErros.push('A data de nascimento é necessária')
          if(dataNascimento) {
            let nascimento = new Date(dataNascimento)
            let hoje = new Date()
            if(hoje.getFullYear() - nascimento.getFullYear() > 130 || hoje.getFullYear() - nascimento.getFullYear() < 0) this.formErros.push('Digite uma data de nascimento válida')
          }
          if(email){
            const searchMail = await axios.post('http://localhost:9999/profile/validate-email', { email })
            if(searchMail.data.alreadyInUse) this.formErros.push('Email já cadastrado')
          }
          if(senha.length < 8) this.formErros.push('Senha deve ter no mínimo 8 caracteres!')
          return this.formErros.length === 0  
        },
        async createProfile (formData)  {
          const body = await axios.post('http://localhost:9999/profile', formData)
          return body.data.data
        },
        async createAluno  () {
          const body = await axios.post('http://localhost:9999/aluno', {})
          return body.data.data
        },
        async attachProfileToAluno  (profileId, alunoId)  {
          const body = await axios.patch('http://localhost:9999/profile/attach-aluno', {profileId, alunoId})
          return body.data.data
        },
        async attachAlunoToProfessor (professorId, alunoId)  {
          const body = await axios.patch('http://localhost:9999/professor/attach-aluno', {professorId, alunoId})
          return body.data.data
        },
        close(){
          this.$emit('fecharCreate')
        }
      },
      mounted(){
        
      }
    }
  </script>
  
  <style scoped>
  #gif{
    position: fixed;
    top: calc(50% - 150px/2);
    width: 150px;
    left: calc(50% - 150px/2);
  }
  #topForm{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  form{
    width: 60vw;
    height: 70%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    padding: 40px;
  }
  label{
    margin: 10px;
  }
  </style>
  