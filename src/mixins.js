export default {
  fdx: {
    states: {
      maskPanel: 'project.maskPanel',
    }
  },
  data() {
    return {
      moment
    }
  },
  methods: {
    addMaskPanel(obj) {
      this.$fdx.project.setState("maskPanel", obj)
    },
  }
}
