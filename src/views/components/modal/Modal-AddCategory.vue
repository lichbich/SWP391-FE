<template>
    <div class="vue-modal">
        <vue-modal-inner>
            <div class="vue-modal-content">
                <slot></slot>
                <button type="button" @click="$emit('clode')">Close</button>
            </div>
        </vue-modal-inner>
    </div>
</template>

<script>
import ModalAddCategoryVue from '../Modal-AddCategory.vue'
export default{
    name: ModalAddCategoryVue,
}

</script>
