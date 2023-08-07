<template>
  <main
    class="container-fluid bg-dark"
    :style="{
      background: 'url(' + this.selectedbg.urls.full + ') no-repeat center',
      backgroundSize: 'cover',
    }"
  >
    <div
      class="position-absolute start-0 w-100 d-flex justify-content-end p-3"
      data-v-632269a6=""
    >
      <div class="w-auto d-flex gap-3 align-items-center">
        <div class="badge bg-white rounded-pill p-2 px-3">
          <p class="m-0">
            <a
              :href="this.selectedbg.links.html"
              target="_blank"
              class="text-decoration-none green"
            >
              {{ this.selectedbg.user.first_name }}
              {{ this.selectedbg.user.last_name }}
            </a>
          </p>
        </div>
        <button
          class="btn btn-basic"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#bgPicker"
          aria-controls="bgPicker"
          data-v-632269a6=""
        >
          <i class="bi bi-grid-1x2" data-v-632269a6=""></i>
        </button>
      </div>
    </div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="bgPicker"
      aria-labelledby="bgPickerLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="bgPickerLabel">Choose a background</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body d-flex flex-wrap gap-3">
        <div class="d-flex flex-wrap justify-content-between gap-2 px-4">
          <div
            class="btn rounded-pill bgOption"
            v-for="(item, index) in this.bgOptions"
            :key="index"
            :class="{
              'btn-basic text-white': this.imageQuery === item.name,
              'btn-outline-basic': this.imageQuery !== item.name,
            }"
            @click="
              this.currentPage = 1;
              this.updateImages(item.name);
            "
          >
            {{ item.name }}
          </div>
          <div class="position-relative w-100 mt-2">
            <input
              type="text"
              class="form-control rounded-pill"
              v-model="this.imageSearch"
              @keydown.enter="
                this.currentPage = 1;
                this.updateImages(this.imageSearch);
                this.imageSearch = '';
              "
            />
            <i
              class="bi bi-search position-absolute end-0 top-50 translate-middle me-2 bg-white h-auto"
              @click="
                this.currentPage = 1;
                this.updateImages(this.imageSearch);
                this.imageSearch = '';
              "
            ></i>
          </div>
        </div>
        <hr class="w-100" />
        <div class="d-flex ms-auto gap-3">
          <i
            class="bi bi-chevron-left"
            role="button"
            @click="this.changePage('prev')"
          ></i>
          <p class="m-0 green">
            {{ this.currentPage }} of {{ this.totalPages }}
          </p>
          <i
            class="bi bi-chevron-right"
            role="button"
            @click="this.changePage('next')"
          ></i>
        </div>
        <hr class="w-100" />
        <img
          v-for="(img, index) in this.images"
          :key="index"
          :src="img.urls.regular"
          alt=""
          class="img-fluid"
          @click="this.selectedbg = img"
          height="300"
        />
        <hr class="w-100" />
        <div class="d-flex ms-auto gap-3">
          <i
            class="bi bi-chevron-left"
            role="button"
            @click="this.changePage('prev')"
          ></i>
          <p class="m-0 green">
            {{ this.currentPage }} of {{ this.totalPages }}
          </p>
          <i
            class="bi bi-chevron-right"
            role="button"
            @click="this.changePage('next')"
          ></i>
        </div>
      </div>
    </div>
    <section
      class="item-container row mx-4 flex-nowrap align-items-start mt-5 pt-3"
      v-if="!this.loading"
    >
      <div v-if="this.board.data.length > 0" class="w-auto">
        <draggable
          v-model="this.board.data"
          item-key="id"
          class="draggable overflow-hidden d-flex flex-row flex-nowrap gap-3 align-items-start w-auto"
          drag-class="drag"
          ghost-class="ghost"
          handle=".handle"
          @start="dragStart"
          @end="dragEnd"
        >
          <template #item="{ element: card, index }">
            <div>
              <div class="item card shadow p-0 bg-white bg-opacity-75">
                <div
                  class="d-flex align-items-center justify-content-between border-bottom border-dark border-opacity-25 ps-1 pe-3 py-2"
                  @mouseenter="this.toggleDeleteVisibility"
                  @mouseleave="this.toggleDeleteVisibility"
                >
                  <div class="d-flex align-items-center">
                    <i class="bi bi-grip-vertical fs-4 handle"></i>
                    <p class="m-0 fs-4 fw-bold">
                      {{ card.title }}
                    </p>
                  </div>
                  <i
                    class="deleteCard bi bi-trash3-fill bg-danger text-white px-2 py-1 d-none rounded"
                    data-bs-toggle="modal"
                    :data-bs-target="'#deleteCardModal' + index"
                    role="button"
                  ></i>
                  <div
                    class="modal fade"
                    :id="'deleteCardModal' + index"
                    tabindex="-1"
                    :aria-labelledby="'deleteCardModalLabel' + index"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered modal-lg position-relative"
                    >
                      <div class="modal-content">
                        <div class="modal-body text-center">
                          <button
                            type="button"
                            class="btn-close position-absolute top-0 end-0 translate-middle-x mt-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                          <p class="m-0 fs-3">
                            Are you sure you want to delete
                            <span class="fw-bold green">{{ card.title }}</span
                            >?
                          </p>
                          <div
                            class="d-flex justify-content-center align-items-center gap-3 mt-3"
                          >
                            <button
                              class="btn btn-outline-danger fw-bold px-3"
                              @click="deleteList(card.title)"
                              data-bs-dismiss="modal"
                            >
                              Yes, I'm sure
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <boardComponent
                  :items="card"
                  :index="index"
                  @deleteTask="this.deleteTask"
                />
                <div class="px-3 mt-2">
                  <button
                    class="btn btn-basic w-100 text-capitalize my-3"
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskModal"
                    @click="this.changeSelected(card.title)"
                  >
                    add new item
                  </button>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div
        v-else
        class="position-absolute top-50 translate-middle-y text-center"
      >
        <h2 class="text-white">Much emptiness... Such void...</h2>
      </div>
      <button
        class="btn btn-basic width"
        data-bs-toggle="modal"
        data-bs-target="#addCardModal"
      >
        Add List
      </button>
      <div
        class="modal fade"
        id="addCardModal"
        tabindex="-1"
        aria-labelledby="addCardModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addCardModalLabel">
                Add list to
                <span class="green fw-bold">{{ this.board.name }}</span>
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body mb-2">
              <form @submit.prevent="this.checkCard">
                <div class="input-group d-flex">
                  <div class="form-floating flex-grow-1">
                    <input
                      type="text"
                      name="cardName"
                      id="cardName"
                      placeholder="cardName"
                      class="form-control"
                      v-model="this.userInput"
                      required
                    />
                    <label for="cardName">Card Name</label>
                  </div>
                  <button type="submit" class="btn btn-basic">Add Card</button>
                </div>
                <div v-if="this.addCardError" class="pt-2">
                  <p class="text-danger m-0">{{ this.addCardError }}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="addTaskModal"
        tabindex="-1"
        aria-labelledby="addTaskLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  New Item
                </h1>
                <p class="m-0">in {{ this.selectedCard }}</p>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addItem">
                <div class="form-floating">
                  <input
                    class="form-control"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Task title"
                    required
                    v-model="this.userInput"
                  />
                  <label for="title" class="text-capitalize">List title</label>
                </div>
                <div class="d-flex justify-content-end mt-4 gap-3">
                  <button
                    type="submit"
                    class="btn btn-basic text-white"
                    data-bs-dismiss="modal"
                  >
                    Add item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-else
      class="vw-100 vh-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border green" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>
  </main>
</template>
<script>
import trelloDataService from "@/services/TrelloDataService";
import boardComponent from "@/components/boardComponent";
import draggable from "vuedraggable";
import unsplashService from "@/services/unsplashService";
export default {
  name: "boardDetail",
  components: {
    boardComponent,
    draggable,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      board: null,
      selectedCard: null,
      userInput: "",
      images: null,
      selectedbg: null,
      imageQuery: "minimal",
      bgOptions: [
        { name: "minimal" },
        { name: "space" },
        { name: "surreal" },
        { name: "beach" },
        { name: "spring" },
        { name: "sports" },
      ],
      currentPage: 1,
      imageSearch: "",
      unsplashPages: null,
      addCardError: null,
    };
  },
  computed: {
    cardAvailability() {
      let check = true;
      this.board.data.forEach((item) => {
        if (item.title.toLowerCase() === this.userInput.toLowerCase()) {
          check = false;
        }
      });
      return check;
    },
    hasPrevious() {
      return this.currentPage > 1;
    },
    hasNext() {
      return this.currentPage <= this.totalPages;
    },
    totalPages() {
      if (this.unsplashPages < 10) {
        return this.unsplashPages;
      } else {
        return 10;
      }
    },
  },
  methods: {
    toggleDeleteVisibility(e) {
      let del = e.target.querySelector(".deleteCard");
      del.classList.toggle("d-none");
    },
    deleteList(card) {
      let sound = new Audio(require("@/assets/Blow.mp3"));
      sound.play();
      let index = this.board.data.findIndex((item) => {
        return item.title.toLowerCase().indexOf(card.toLowerCase()) > -1;
      });
      this.board.data.splice(index, 1);
    },
    deleteTask(todo, card) {
      let cardIndex = this.board.data.findIndex((item) => {
        return item.title.toLowerCase().indexOf(card.toLowerCase()) > -1;
      });
      let todoIndex = this.board.data[cardIndex].data.findIndex((item) => {
        return item.title.toLowerCase().indexOf(todo.toLowerCase()) > -1;
      });
      this.board.data[cardIndex].data.splice(todoIndex, 1);
    },
    changeSelected(title) {
      this.selectedCard = title;
    },
    addItem() {
      let index = this.board.data.findIndex((item) => {
        return (
          item.title.toLowerCase().indexOf(this.selectedCard.toLowerCase()) > -1
        );
      });
      this.board.data[index].data.push({
        title: this.userInput,
        extra: [],
      });
      this.userInput = "";
    },
    checkCard() {
      console.log(this.cardAvailability);
      if (this.cardAvailability) {
        this.addCardError = null;
        this.addCard();
      } else {
        this.addCardError = "Cards can not have the same name";
      }
    },
    addCard() {
      this.board.data.push({ title: this.userInput, data: [] });
      this.userInput = "";
    },
    getUnsplash() {
      unsplashService.getPhotos(this.imageQuery, this.currentPage).then((r) => {
        this.images = r.data.results;
        this.selectedbg = this.images[0];
        this.unsplashPages = r.data.total_pages;
      });
    },
    async updateImages(name) {
      this.imageQuery = name;
      this.getUnsplash();
    },
    changePage(btn) {
      if (btn === "prev") {
        if (this.hasPrevious) {
          this.currentPage--;
          this.getUnsplash();
        }
      } else {
        if (this.hasNext) {
          this.currentPage++;
          this.getUnsplash();
        }
      }
    },
  },
  async created() {
    this.$emit("changePage", "");
    this.loading = true;
    trelloDataService.getBoard(this.name).then(async (r) => {
      this.board = r.data;
      this.$emit("changePage", this.board.name);
      this.loading = false;
    });
    this.getUnsplash(1);
  },
};
</script>
<style scoped>
main {
  overflow-x: auto;
  height: 85vh;
}
.item-container {
  gap: 20px;
  width: fit-content;
}
.item {
  min-height: 150px;
  width: 300px;
}
.width {
  width: 300px;
}
.drag > div {
  transform: rotate(2deg);
  opacity: 100%;
}
.ghost {
  background: rgba(0, 0, 0, 0.05);
  mix-blend-mode: multiply;
  border: rgba(0, 0, 0, 0.05) 2px dashed;
}
.ghost > div {
  visibility: hidden;
}
img {
  object-fit: cover;
}
.border-green {
  border-color: #42b983 !important;
}
.bgOption {
  min-width: 100px;
}
</style>
