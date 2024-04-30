<template>
  <div class="listScroll" ref="listScroll">
    <slot></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "listScroll",
  data() {
    return {
      height: 0,
      isScroll: true,
      isPaused: false, // Add a new data property to track whether the scrolling is paused or not
    };
  },
  props: {
    speed: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    slot1() {
      return this.$refs.listScroll.children[0];
    },
    slot2() {
      return this.$refs.listScroll.children[1];
    },
    boxHeight() {
      return this.$refs.listScroll.clientHeight;
    },
  },
  mounted() {
    //数据超过容器高度才滚动
    if (this.slot1.clientHeight > this.boxHeight) {
      this.start(this.height);
      this.setEvent();
    } else {
      this.isScroll = false;
    }
  },
  methods: {
    start(height) {
      if (this.isPaused) return; // If scrolling is paused, don't continue scrolling
      if (!this.isScroll) return;
      this.slot1.style = `transform:translateY(-${height}px);`;
      this.slot2.style = `height:${this.boxHeight}px;transform:translateY(-${height}px);overflow: hidden;`;
      if (height >= this.slot1.clientHeight) {
        this.height = 0;
      } else {
        this.height += this.speed;
      }

      window.requestAnimationFrame(() => {
        if (this.isPaused) return;
        this.start(this.height);
      });
    },
    setEvent() {
      this.$refs.listScroll.onmouseenter = () => {
        this.isScroll = false;
      };
      this.$refs.listScroll.onmouseleave = () => {
        if (this.isScroll) return;
        this.isScroll = true;
        this.start(this.height);
      };
    },
    pause() {
      // Add a new method to pause scrolling
      this.isPaused = true;
    },
    resume() {
      // Add a new method to resume scrolling
      this.isPaused = false;
      this.start(this.height);
    },
  },
};
</script>

<style lang="less" scoped>
.listScroll {
  overflow: hidden;
  height: 100%;
}
</style>
