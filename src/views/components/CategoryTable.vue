<template>
  
</template>

<script>
import http from "@/axios";
import { ref } from 'vue';
export default {
  name: "category-table",
  setup() {


    const categories = ref([]);
    const headers = ref(['Category ID','Category Name','Description', 'Action'])

    const getAllCategory = async () => {
      try {
        const res = await http.get(`${process.env.VUE_APP_API}/api/category`)
        categories.value = res.data.data
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategory();

    return {
      categories,
      headers,
      getAllCategory
      // columns
    }
  },
  methods: {
    
    
  }

};
</script>
