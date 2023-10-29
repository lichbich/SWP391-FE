<template>
  <div class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" style="display: block;
  position: absolute; top: 25px; right: 25px; background-color: #fff">
    <div class="d-flex">
      <img v-if="success" style="margin-left: 10px" src="@/assets/img/icons/check-circle.svg"
           alt="user1" />
      <img v-if="!success" style="margin-left: 10px" src="@/assets/img/icons/x-circle.svg"
           alt="user1" />
      <div class="toast-body" style="color: grey">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";

export default {
  name: "Toast",
  props:{
    msg:{type:String,required:true},
    timeout:{type:Number,default:2000, validate:function (val){return val >= 0}},
    clickToClose:{type:Boolean, default: true},
    success:{type:Boolean, default: true},
    close:{type:Function,required: true},
  },
  setup(props){
    let innerTimeout = ref();

    onMounted(()=>{
      toClearTimeout();
      if(props.timeout > 0)
        innerTimeout.value = setTimeout(()=>{ props.close(); },props.timeout);
    });

    onUnmounted(()=>{toClearTimeout()})

    const toClearTimeout = ()=>{
      if(innerTimeout.value){
        try{
          clearTimeout(innerTimeout.value);
        }catch (e){
          console.error(e);
        }
      }
    }

    return {};
  },
}
</script>

<style scoped>

</style>