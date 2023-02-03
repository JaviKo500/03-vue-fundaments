<template>
    <h2>{{ customTitle }}</h2>
    <p>{{ counter }} <sup>2</sup> = {{ counter * counter }}</p>
    <div class="buttons-container">
        <button @click="increase">+1</button>
        <button @click="decrease">-1</button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 100,
        }
    },  
    data(){
        return {
            counter: this.start
        }
    },
    methods: {
        getSquare() {
            return this.counter * this.counter;
        },
        increase(){
            ++this.counter;
        },
        decrease(){
            --this.counter;
        }
    },
    computed: {
        getSquareCounter() {
            return this.counter * this.counter;
        },
        customTitle(){
            return this.title || 'Counter'
        }
    }
}
</script>

<style>
    button{

        background-color: #608887;
        border-radius: 5px;
        border: 1px solid white;
        color: white;
        cursor: pointer;
        margin: 0 5px;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover{
        background-color: #5aa67b;
    }
</style>