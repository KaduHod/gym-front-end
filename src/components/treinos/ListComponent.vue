<script setup >
    //imports
</script>
<template>
    <div id="MajorListBlock">
        <div id="Top-of-table">
          <div @click.native="close" class="Close"><ion-icon name="close-outline"></ion-icon></div>
        </div>
        <div class="ContainerTabela" >
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(treino, index) in treinos">
                <th>{{index + 1}}</th>
                <th>{{treino.nome}}</th>
                <th>{{treino.descricao}}</th>
                <th>
                  <ion-icon class="icon-edit" name="build-outline"></ion-icon>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>
<script>
    import axios from 'axios';
    //imports
    export default {
        props : ['treinos'],
        data(){
          return {
            treinos : this.treinos
          }
        },
        methods : {
          close(){
            this.$emit('fecharList')
          }
        },
        computed : {

        },
        mounted(){
        }
    }
</script>
<style scope >
  #MajorListBlock{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #Top-of-table{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>