<script setup>
    
    
</script>

<template>
    <div id="botao" class="button" @click="toogle">
        oi
    </div>
</template>

<script>
export default {
    props : {
        titulo : {
            type: String,
            required : true
        }
    },
    data() {    
        
    },
    methods : {
        toogle(){
            const botao = document.getElementById('botao')
            botao.classList.remove('clicked')
            botao.classList.add('clicked')
            setTimeout(() => botao.classList.remove('clicked'), 500)
        }
    }
}

</script>

<style scoped>
.button{
    margin: 0px;
    padding: 20px;
    color: black;
    min-width: 200px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: rgb(73, 73, 73);
    font-size: 19px;
}
.clicked{
    animation: clicked 400ms ease-in 0ms forwards;
}

@keyframes clicked {
    20%{
        transform: scale(.7);
    }
    60%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
}
</style>