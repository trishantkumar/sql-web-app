<template>
  <div class="top_container ml-5">
    <div class="textarea_container">
      <div class="utilities_button justify-between">
        <div class="input_heading p-1">Input</div>
        <div>
          <select class="select_button rounded" v-model="selectedOption" ref="selectElement"
            @click="updateDisplayData(selectedOption)">
            <option :value="opt.value" v-for="opt in displayDataOption" :key="opt.value">{{ opt.label }}</option>
          </select>
          <button
            class="ml-4 bg-blue-600 mr-1 hover:bg-blue-700 text-white font-bold px-4 rounded float-right clear_button"
            @click="clearQuery">Clear</button>
        </div>
      </div>

      <textarea ref="sqlEditor" id="sql_text_area"></textarea>
      <button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 font-bold px-4 rounded float-right"
        @click="executeQuery('')">Execute Query</button>

      <div v-if="queryResult" class="output_container">
        <!-- Display the query result here -->
        <Table :tableData="queryResult" />
      </div>
      <div v-if="tablesName" class="output_container">
        <!-- Display the table names here -->
        <p v-for="(name, i) in tablesName" :key="i">{{ name }}</p>
      </div>

    </div>
    <div class="table_container">
      <div class="">
        <span class="text-2xl font-bold">Available Tables</span>
        <br />
      </div>
      <hr class="my-2" />
      <div class="table_1_container">
        <div class="relative">
          <span class="text-lg font-bold mb-2">Customers:</span>
        </div>
        <Table :tableData="customersData" class="mb-6" />
      </div>
      <hr class="my-2" />
      <div class="table_2_container">
        <div class="relative">
          <span class="text-lg font-bold mb-2">Products:</span>
        </div>
        <Table :tableData="productsData" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import data from "@/data.js"
import Table from "@/components/TableStructure"
import CodeMirror from 'codemirror';

var editor = ref(null)
var queryResult = ref(null)
var customersData = ref(data.customers)
var productsData = ref(data.products)
var sqlEditor = ref(null)
var tablesName = ref([])
var selectedOption = ref('default')
const selectElement = ref(null);
var displayDataOption = ref([
  { 'value': 'default', 'label': 'Select pre-define query' },
  { 'value': 'tableNames', 'label': 'Display table names' },
  { 'value': 'customersData', 'label': 'Display Customers Table Data' },
  { 'value': 'productsData', 'label': 'Display Products Table Data' },
  { 'value': 'productsElectronicData', 'label': 'Display Electronics Products' },
  { 'value': 'customersNameEmail', 'label': 'Display Customers Name & Email' }
])

onMounted(() => {
  initCodeMirror();
  if (selectElement.value) {
    selectElement.value.value = selectedOption.value;
  }
})

const clearQuery = () => {
  editor.value.setValue('');
  editor.value.toTextArea();
  initCodeMirror(); // re-initialize the editor
}
const initCodeMirror = () => {
  const codeEditor = CodeMirror.fromTextArea(sqlEditor.value, {
    mode: 'text/x-sql',
    lineNumbers: true,
  });

  editor.value = codeEditor; // Store the editor instance for later use
}

const executeQuery = (query) => {
  var sqlQuery;
  if (query) {
    sqlQuery = query // Get the SQL query from the dropdown
  } else {
    sqlQuery = editor.value.getValue(); // Get the SQL query from the editor
  }
  sqlQuery = sqlQuery.replace(';', '') // to remove semi colon
  // Process the SQL query with the static dummy data
  if (sqlQuery.toLowerCase() == 'show tables') {
    queryResult.value = [];
    tablesName.value = Object.keys(data);
  } else {
    tablesName.value = null
    const result = processQuery(sqlQuery);
    queryResult.value = result;
  }
}

const processQuery = (sqlQuery) => {
  var dummyData = [];
  var query = sqlQuery.trim().toLowerCase();
  var tableName = "";
  if (query.includes(' where ')) {
    tableName = query.substring(query.indexOf(' from ') + 5, query.lastIndexOf(' where ')).trim();
  } else {
    tableName = query.substring(query.indexOf(' from ') + 5, query.length).trim();
  }

  if (tableName == 'customers') {
    dummyData = [...customersData.value]
  }
  if (tableName == 'products') {
    dummyData = [...productsData.value]
  }

  var fields = query.substring(query.indexOf('select ') + 6, query.lastIndexOf(' from'));
  var result = "";
  var condition = query.substring(query.indexOf('where ') + 5, query.length).trim();
  condition = condition.split(' ').filter(element => element != '')
  var [key, operator] = condition;
  var value;
  value = condition.slice(2).join(' ').trim()

  var dynamicCondition;
  if (condition) {
    if (operator == '=' || operator == 'is') {
      dynamicCondition = (item) => (((typeof item[key] == 'number') ? item[key] : item[key].toLowerCase()) == value);
    } else if (operator == '>') {
      dynamicCondition = (item) => item[key] > value
    } else if (operator == '<') {
      dynamicCondition = (item) => item[key] < value
    } else if (operator == '<=') {
      dynamicCondition = (item) => item[key] <= value
    } else if (operator == '>=') {
      dynamicCondition = (item) => item[key] >= value
    }
  }
  if (query) {
    if (fields != "") {
      if (fields.includes(',')) {
        fields = fields.split(',')
      } else {
        if (fields.trim != '*') {
          fields = [fields.trim()]
        }
      }
    }

    if (query.includes("select ")) {
      var arr = [];
      if (dynamicCondition) {
        arr = dummyData.filter(dynamicCondition);
      } else {
        arr = dummyData;
      }
      if (fields.includes('*')) {
        result = arr.filter((data) => data);
        return result;
      } else {
        result = arr.map((item) => {
          const extractedItem = {};
          fields.forEach((field) => {
            extractedItem[field.trim()] = item[field.trim()];
          });
          return extractedItem;
        });
        return result;
      }
    }
    if (query.includes("delete ")) {
      var arr1 = [];
      if (dynamicCondition) {
        arr1 = dummyData.filter(dynamicCondition);
      }
      return dummyData.filter((element) => !arr1.includes(element));
    }
  }
  if (!sqlQuery.trim()) {
    return dummyData; // if query is empty then return empty array
  }
  return [];
}

const updateDisplayData = (option) => {
  var query = "";
  if (option != 'default') {
    if (option == 'tableNames') {
      query = 'show tables'
    } else if (option == 'customersData') {
      query = 'select * from customers'
    } else if (option == 'productsData') {
      query = 'select * from products'
    } else if (option == 'productsElectronicData') {
      query = 'select * from products where category is Electronics'
    } else if (option == 'customersNameEmail') {
      query = 'select name, email from customers'
    }
    executeQuery(query);
  }
}
</script>
<style>
.select_button {
  position: relative;
  height: 16px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #E1E0DE;
}

.selected_table {
  background: bisque;
}

.product_radio_button {
  position: absolute;
  right: 50px;
  top: 7px;
}

.customer_radio_button {
  position: absolute;
  right: 50px;
  top: 7px;
}

.select_button {
  height: 30px;
  position: relative;
  top: 4px;
}

.clear_button {
  height: 30px;
  position: relative;
  top: 4px;
}

.output_table {
  width: 500px;
  margin: 0 auto;
  margin-top: 10px;
}

.CodeMirror {
  border: 2px solid #E1E0DE;
  border-left: 0;
}

.utilities_button {
  display: flex;
  margin: 0;
  height: 40px;
  border: 2px solid #E1E0DE;
  border-left: 0;
  border-bottom: 0;
  background: antiquewhite;
}

.input_heading {
  font-size: medium;
  font-weight: bold;
}

.top_container {
  display: flex;
  border-left: 2px solid #E1E0DE;
}

.textarea_container {
  width: 1000px;
  height: 350px;
}

.table_container {
  width: 40%;
  padding: 0 1rem;
}

.available_table_1 {
  margin: 0 auto;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>