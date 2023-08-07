<template>
  <draggable
    v-model="this.todoItems.data"
    group="todo"
    item-key="id"
    drag-class="drag"
    ghost-class="ghost"
    class="draggable d-flex flex-column gap-2 px-3 py-2"
    :options="{ disabled: this.todoItems.data.length > 0 }"
  >
    <template #item="{ element: todo }">
      <div
        @mouseenter="this.toggleDeleteVisibility"
        @mouseleave="this.toggleDeleteVisibility"
      >
        <div
          class="card p-2 border-0 border-bottom border-2 border-dark border-opacity-50"
        >
          <div class="d-flex justify-content-between">
            <p
              class="m-0 d-inline flex-grow-1"
              data-bs-toggle="modal"
              :data-bs-target="'#todoDetail' + index"
              @click="this.changeSelected(todo)"
            >
              {{ todo.title }}
            </p>
            <i
              class="bi bi-trash3-fill text-danger pointer d-none opacity"
              @click="$emit('deleteTask', todo.title, this.todoItems.title)"
            ></i>
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <div
    class="modal fade"
    :id="'todoDetail' + index"
    tabindex="-1"
    :aria-labelledby="'todoDetail' + index + 'Label'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" v-if="this.selectedTodo !== null">
        <todoDetailComponent
          :todo="this.selectedTodo"
          @closeModal="this.changeSelected"
          @addTodo="this.addTodo"
        />
      </div>
      <div class="modal-content py-5" v-else>
        <div class="spinner-border mx-auto green" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import todoDetailComponent from "@/components/todoDetailComponent";
export default {
  name: "boardComponent",
  components: {
    draggable,
    todoDetailComponent,
  },
  emits: ["deleteTask"],
  props: {
    items: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedTodo: null,
    };
  },
  methods: {
    toggleDeleteVisibility(e) {
      let del = e.target.firstElementChild.firstElementChild.lastElementChild;
      del.classList.toggle("d-none");
    },
    changeSelected(todo) {
      if (todo !== null) {
        this.selectedTodo = todo;
      } else {
        setTimeout(() => {
          this.selectedTodo = todo;
        }, 500);
      }
    },
    async addTodo(input, todo) {
      let index = this.todoItems.data.findIndex((item) => {
        return item.title.toLowerCase().indexOf(todo.toLowerCase()) > -1;
      });
      this.todoItems.data[index].extra.push({ title: input, check: false });
    },
  },
  computed: {
    todoItems() {
      return this.items;
    },
  },
};
</script>
<style scoped>
.drag > div {
  transform: rotate(2deg);
  cursor: move;
  border: #42b983 2px solid;
}
.draggable > div {
  cursor: move;
}
.ghost {
  background: rgba(0, 0, 0, 0.05);
  border: rgba(0, 0, 0, 0.05) 2px dashed;
}
.ghost > div {
  visibility: hidden;
}
.draggable {
  max-height: 60vh;
  overflow-y: auto;
}
.pointer {
  cursor: pointer;
}
</style>
