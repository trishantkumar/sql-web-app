<template>
    <div>
        <div class="flex mt-2 text-right">
            <div class="w-3/5">
                <p class="text-5xl font-bold">SQL Editor</p>
            </div>
            <div  class="w-2/5">
                <button class="h-10 ml-4 bg-blue-600 mr-1 hover:bg-blue-700 text-white font-bold px-4 rounded" @click="$router.push({path: '/apiData'})">Go
                    to Products API page</button>
            </div>
        </div>
        <hr class="my-5" />
        <Editor />
    </div>
</template>
<script setup>
import Editor from "@/components/QueryEditor"
</script>