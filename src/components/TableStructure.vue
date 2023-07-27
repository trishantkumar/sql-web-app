<template>
    <table class="output_table">
        <tr v-for="(row, index) in tableData" :key="index" v-show="index == 0">
            <th v-for="(value, key) in row" :key="key">
                <span v-if="key == 'id'">ID</span>
                <span v-if="key == 'name'">Name</span>
                <span v-if="key == 'email'">Email</span>
                <span v-if="key == 'age'">Age</span>
                <span v-if="key == 'city'">City</span>
                <span v-if="key == 'price'">Price</span>
                <span v-if="key == 'category'">Category</span>
                <span v-if="key == 'stock'">Stock</span>
            </th>
        </tr>
        <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(value, key) in row" :key="key">
                {{ value }}
            </td>
            <br />
        </tr>
    </table>
</template>
<script setup>
import { defineProps, toRefs } from "vue";
const props = defineProps({
    tableData: Array
})
const { tableData } = toRefs(props);
</script>