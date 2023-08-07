<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">
      {{ this.todo.title }}
    </h1>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
      @click="$emit('closeModal', null)"
    ></button>
  </div>
  <div class="modal-body d-flex flex-column gap-2">
    <div
      v-for="(item, index) in this.todo.extra"
      :key="index"
      class="card px-2 py-3 shadow"
      @click="item.check = !item.check"
      :class="{ 'text-decoration-line-through': item.check }"
      role="button"
    >
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          :class="{ 'bg-green border-0': item.check }"
          :checked="item.check"
        />
        <p class="m-0">{{ item.title }}</p>
      </div>
    </div>
    <hr />
    <form
      class="input-group"
      @submit.prevent="
        $emit('addTodo', this.userInput, this.todo.title);
        this.userInput = '';
      "
    >
      <div class="form-floating">
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          class="form-control"
          placeholder="newTodo"
          v-model="this.userInput"
        />
        <label for="newTodo" class="text-capitalize">New todo name</label>
      </div>
      <button type="submit" class="btn btn-basic px-3 text-white">
        <i class="bi bi-plus-lg"></i>
      </button>
    </form>
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-basic"
      data-bs-dismiss="modal"
      @click="$emit('closeModal', null)"
    >
      Close
    </button>
    <button
      type="button"
      class="btn btn-basic"
      data-bs-dismiss="modal"
      @click="$emit('closeModal', null)"
    >
      Save changes
    </button>
  </div>
</template>
<script>
export default {
  name: "todoDetailComponent",
  emits: ["closeModal", "addTodo"],
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userInput: "",
    };
  },
};
</script>
