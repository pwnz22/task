<template>
  <div>
    <div class="title">
      Комменты
    </div>
    <div class="comments flex flex-center">
      <ul class="comments__list">
        <li v-for="item in comments">
          {{ item.comment }} — <span class="comments__delete" @click="deleteMessage(item.id)">удалить</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    data() {
      return {
        comments: [
          {id: 1, comment: 'Первый коммент 1'},
          {id: 2, comment: 'Второй коммент 2'},
          {id: 3, comment: 'Третий коммент 3'},
          {id: 4, comment: 'Четвёртый коммент 4'},
          {id: 5, comment: 'Пятый коммент 5'},
          {id: 6, comment: 'Шестой коммент 6'},
          {id: 7, comment: 'Седьмой коммент 7'},
          {id: 8, comment: 'Восьмой коммент 8'},
          {id: 9, comment: 'Девятый коммент 9'},
          {id: 10, comment: 'Десятый коммент 10'}
        ],
        wsUrl: 'ws://echo.websocket.org/',
        websocket: null,
        sendedIds: [],
        waitingTimeOut: 10000,
      }
    },
    mounted() {
      this.websocket = new WebSocket(this.wsUrl)
      this.websocket.onopen = evt => console.log('Open')
      this.websocket.onclose = evt => console.log('Close')
      this.websocket.onmessage = evt => this.wsMessage(evt)
      this.websocket.onerror = evt => console.log(evt)
    },
    destroyed() {
      this.websocket.close()
    },
    methods: {
      wsMessage(evt) {
        const res = +evt.data;
        const resIsInIds = this.sendedIds.indexOf(res) !== -1;
        if (resIsInIds) {
          this.deleteComment(res)
          this.deleteIdFromArray(res)
        }
      },
      deleteComment(id) {
        this.comments = this.comments.filter(item => item.id !== id)
      },
      deleteIdFromArray(id) {
        this.sendedIds = this.sendedIds.filter(el => el !== id)
      },
      deleteMessage(id) {
        this.sendedIds.push(id)
        this.websocket.send(id)
        setTimeout(() => {
          this.deleteIdFromArray(id)
        }, this.waitingTimeOut)
      }
    }
  }
</script>

<style lang="scss">
  .comments {
    width: 400px;
    text-align: left;
    margin: 0 auto;

    &__list {
      padding: 0;
      margin: 0;
      list-style-type: none;
    }

    &__delete {
      border-bottom: 1px solid #000;

      &:hover {
        cursor: pointer;
        border-bottom: none;
        color: #ff0000;
      }
    }
  }
</style>
