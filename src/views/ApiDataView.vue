<template>
    <div class="mt-4">
        <div class="flex mt-2 text-right">
            <div class="w-4/5">
                <p class="text-5xl font-bold">Products Data from API</p>
            </div>
            <div  class="w-2/5">
                <button class="h-10 ml-4 bg-blue-600 mr-1 hover:bg-blue-700 text-white font-bold px-4 rounded" @click="$router.push({path: '/'})">Go
                    to Home page</button>
            </div>
        </div>
        <Table :tableData="apiData" v-if="apiData && apiData.length" class="my-10" />
        <v-pagination v-model="page" :pages="10" :range-size="1" active-color="#DCEDFF" @update:modelValue="updateHandler"
            class="justify-center" />
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from "vue";
import Table from "@/components/TableStructure"
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

var apiData = ref([])
var skip = ref(0)
var limit = ref(10)
var page = ref('')

onMounted(() => {
    getUsersData();
})

const updateHandler = () => {
    skip.value = 5 * page.value;
    getUsersData();
}

var getUsersData = () => {
    axios.get('https://dummyjson.com/products?skip=' + skip.value + '&limit=' + limit.value)
        .then(response => {
            apiData.value = response.data.products.map(product => ({
                id: product.id,
                name: product.title,
                price: product.price,
                category: product.category,
                stock: product.stock
            }))
        })
        .catch(error => {
            console.log(error);
        });
}
</script>