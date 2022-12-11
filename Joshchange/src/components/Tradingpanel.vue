<template> 
<div class="sidebar">
    <div class="orderForms">
      <Limit/>
    </div>
</div>

</template>
<script>

import Limit from "./Limit.vue";
export default {
  name: 'Trade',
  components: {
    Limit,
  }
}


</script>
