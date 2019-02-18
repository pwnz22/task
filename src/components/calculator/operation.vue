<template>
  <div>
    <div class="calc__equal">
      <template v-if="equal">
        =
      </template>
      <template v-else>
        <div>
          <select class="calc__select" v-model="currentOption" @change="updateOperation">
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'operation',
    props: ['type', 'id'],
    data() {
      return {
        showSelect: false,
        currentOption : '+'
      }
    },
    computed: {
      equal() {
        return this.type === '='
      }
    },
    methods: {
      updateOperation() {
        this.$emit('changeOperation', {id: this.id, newOp: this.currentOption})
      }
    }
  }
</script>

<style lang="scss">
  .calc {
    &__select {
      font-size: 20px;
      display: inline-block;
      height: 36px;
      line-height: 36px;
      max-width: 100%;
      border: 1px solid #bdc3c7;
      padding: 0 8px;
      background-color: #fff;
      margin: 0 15px;
    }
    &__equal {
      margin: 0 15px;
    }
  }
</style>
