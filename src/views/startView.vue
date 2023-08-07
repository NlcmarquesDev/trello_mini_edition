<template>
  <main class="container-fluid my-5 w-100 h-100">
    <div class="row" v-if="!this.loading">
      <section class="col-12 col-md-10 col-lg-9 mx-auto">
        <h2 class="fw-bold position-relative d-inline">All Boards</h2>
        <div id="boards" class="d-flex flex-wrap mt-3">
          <router-link
            v-for="(board, index) in boards"
            :key="index"
            :to="{
              name: 'boardDetail',
              params: { name: board.name },
            }"
            class="board shadow rounded text-decoration-none bg-primary col-12 col-lg-4 flex-grow-1"
          >
            <article
              class="p-3 px-4 text-white d-flex flex-column justify-content-between h-100"
            >
              <h3 class="m-0">{{ board.title }}</h3>
              <p class="m-0">created: <br />{{ board.created }}</p>
            </article>
          </router-link>
        </div>
      </section>
    </div>
    <div
      v-else
      class="vw-100 vh-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border green" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </main>
</template>
<script>
import TrelloDataService from "@/services/TrelloDataService";

export default {
  name: "startView",
  data() {
    return {
      loading: false,
      boards: null,
    };
  },
  async created() {
    this.loading = true;
    TrelloDataService.getBoards().then(async (r) => {
      this.boards = r.data;
      this.$emit("changePage", "Home");
      this.loading = false;
    });
  },
};
</script>
<style scoped>
#boards {
  gap: 20px;
}
.board {
  transition: all 0.3s ease-in-out;
  min-height: 150px;
  min-width: calc(33.3333% - 20px);
  background: linear-gradient(135deg, #42b983 0%, #42b983 70%, white 70%);
  background-size: 175%;
  background-position-x: left;
}
.board:hover {
  transform: scale(1.035);
  background-position-x: right;
}
h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 50px;
  background-color: #42b983;
}
</style>
