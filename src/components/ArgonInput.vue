<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :isRequired="isRequired"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="error-message">{{ errorMsg }}</div>
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "argon-input",
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    errorMsg: String,
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    modelValue: String,
    placeholder: String,
    type: String,
    isRequired: Boolean,
  },
  emits: ["update:modelValue"],
  methods: {
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      isValidValue = valid ? `${valid}` : "invalid";

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1.5em;
}
</style>