<template>
  <div id="model-wrap">
    <div id="model" />
    <div v-show="hasTool" id="bim-tool">
      <!--      <div :class="activeType === 'select' ? 'active' : ''" @click="toolClick('select')">框选</div>-->
      <div :class="['select', activeType === 'select' ? 'active' : '']" @click="toolClick('select')">框选</div>
      <!--      <div :class="activeType === 'rule' ? 'active' : ''" @click="toolClick('rule')">量尺</div>-->
      <!--      <div class="select">框选</div>-->
      <!--      <div class="rule">量尺</div>-->
    </div>
  </div>
</template>

<script>
import Event from 'event-emitter'
import store from '@/store'
const event = new Event()
import allOf from 'event-emitter/all-off'
export default {
  name: 'BimView',
  // import引入的组件
  components: {},
  props: {
    hasTool: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      viewer: null,
      modeloApp: null,
      selectEleId: [],
      selectEle: [],
      activeType: null,
      isReady: false,
      elements: []
    }
  },
  computed: {
    appToken() {
      return this.$store.state.bim.appToken
    },
    modelId() {
      return localStorage.getItem('bimModelId')
    }
  },

  // 生命周期 - 挂载完成
  mounted() {
    setTimeout(() => {
      this.loadView()
    }, 500)
  },
  beforeDestroy() {
    console.log(11111111)
    allOf(event, 'viewerUpdate')
    console.log(2222222)
    if (this.modeloApp) {
      this.modeloApp.destroy()
    }
  },
  // 方法集合
  methods: {
    //展示模型
    async loadView() {
      if (!this.modelId) return false
      if (this.modeloApp) {
        this.modeloApp.destroy()
      }
      // 初始化3D模型，多模型就实例化多次
      this.modeloApp = new Modelo.UI.ModelViewer({
        modelId: this.modelId,
        containerId: 'model',
        locale: 'zh',
        useDefaultFavicon: true,
        onReady: viewer => {
          this.viewer = viewer
          this.$emit('ready')
          //获取bim树
          this.getViewerTree()

          if (this.hasTool) {
            window.addEventListener('click', e => {
              let target = e.target
              if (target.className.includes('select')) {
                return
              }
              this.activeType = null
              this.modeloApp.tools.selectElements.setRegionSelectEnabled(false)
            })
          }
          //获取bim选中构件
          viewer.getEventEmitter().on('onElementSelected', elementNames => {
            console.log(elementNames)
            let elementIds = this.$store.state.bim.bimElementData
            this.selectEleId = elementNames
            this.selectEle = elementIds.filter(e => elementNames.includes(e.id))
          })
          //设置图形背景色
          viewer.setBackgroundColor([0.95, 0.95, 0.95])
          // viewer.setBackgroundColor([27 / 255, 28 / 255, 32 / 255, 0.8])
          viewer.setUpdateCallback(() => {
            event.emit('viewerUpdate')
          })
        }
      })
    },
    //获取bim树
    getViewerTree() {
      Modelo.BIM.getTreeInfo(this.modelId).then(bimTree => {
        let models = Object.values(bimTree.models)
        let levels = Object.values(bimTree.levels)
        let categories = Object.values(bimTree.categories)
        let families = Object.values(bimTree.families)
        let types = Object.values(bimTree.types)
        let elements = Object.values(bimTree.elements)

        models.forEach(d => ((d.children = levels.filter(l => l.modelId === d.id)), (d.name = decodeURI(d.name))))

        levels.forEach(d => (d.children = categories.filter(c => c.levelId === d.id)))

        categories.forEach(c => (c.children = families.filter(f => f.categoryId === c.id)))

        families.forEach(f => (f.children = types.filter(t => t.familyId === f.id)))

        types.forEach(t => (t.children = elements.filter(e => e.typeId === t.id)))

        this.elements = elements
        store.dispatch('bim/setBimElement', elements)
        store.dispatch('bim/setBimTree', models)
      })
    },

    getSelectEleId() {
      return {
        selectEleId: this.selectEleId,
        selectEle: this.selectEle
      }
    },

    //隐藏显示
    showModel(show = true) {
      this.viewer.getScene().setModelVisibility(this.modelId, show, show)
    },

    //显示选中构件
    showGuid(guidAry) {
      if (guidAry && guidAry.length) {
        this.showModel(false)
        this.viewer.getScene().setElementsVisibility(guidAry, true)
        return
      }
      this.showModel(false)
    },
    //清除上色
    clearColor() {
      let elementId = this.elements.map(r => r.id)
      this.viewer?.getScene().setElementsColor(elementId, null)
    },

    //构件上色
    setColor(guidAry, color) {
      if (!color) {
        return
      }
      this.viewer.getScene().setElementsColor(guidAry, [color[0] / 255, color[1] / 255, color[2] / 255])
      this.colorAry = guidAry
    },
    //清除标注
    clearMark() {
      let model = document.getElementById('model')
      let imgs = model.getElementsByTagName('img')
      //删除添加标注
      if (imgs && imgs.length) {
        _.forEachRight(imgs, img => {
          if (img.getAttribute('type') === 'icon') {
            img.remove()
          }
        })
      }
    },

    //设置标注
    setMark(elementID, imgSrc, size = 14) {
      if (!this.viewer) {
        return
      }
      let model = document.getElementById('model')
      //添加标注
      elementID.forEach(e => {
        let pos3D = this.viewer.getScene().getElementsBBox([e])
        let icon = document.createElement('img')
        icon.setAttribute('src', imgSrc)
        icon.style.width = size + 'px'
        icon.style.height = size + 'px'
        icon.setAttribute('type', 'icon')
        icon.style.position = 'absolute'
        model.appendChild(icon)
        event.on('viewerUpdate', () => {
          let position2D = this.viewer.getCamera().project(pos3D.slice(3, 6))
          icon.style.left = position2D[0] + 'px'
          icon.style.top = position2D[1] + 'px'
        })
      })
    },

    toolClick(type) {
      if (this.activeType === type) {
        this.activeType = null
        this.modeloApp.tools.selectElements.setRegionSelectEnabled(false)
        return
      }
      console.log(type)
      this.activeType = type
      this.modeloApp.tools.selectElements.setRegionSelectEnabled(false)
      if (type === 'select') {
        this.modeloApp.tools.selectElements.setRegionSelectEnabled(true)
      }
    },

    //取消框选
    cancelSelect() {
      window.addEventListener('click', e => {
        let toolView = document.getElementById('bim-tool')
        let target = e.target
        this.removeActive(toolView, target)
        this.modeloApp.tools.selectElements.setRegionSelectEnabled(false)
      })
    },

    //工具栏
    bimTool() {
      let toolView = document.getElementById('bim-tool')
      window.addEventListener('click', e => {
        console.log(e)
        let target = e.target
        this.removeActive(toolView, target)
        //框选功能
        if (target.className.includes('select')) {
          if (target.className.includes('active')) {
            this.modeloApp.tools.selectElements.setRegionSelectEnabled(true)
            return
          }
          this.modeloApp.tools.selectElements.setRegionSelectEnabled(false)
        }
      })
      this.isReady = true
    },

    //移除选中状态
    removeActive(parentEle, target) {
      if (target.className.includes('active')) {
        target.classList.remove('active')
        return
      }
      let childNode = parentEle.getElementsByTagName('div')
      childNode.forEach(ele => {
        ele.classList.remove('active')
      })
      target.classList.add('active')
    }
  }
}
</script>

<style scoped lang="less">
#model-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  #model {
    width: 100%;
    height: 100%;
  }
  #bim-tool {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 20px;
    top: 20px;
    box-shadow: 0 0.5px 2px 0 rgba(0, 0, 0, 0.28);
    cursor: pointer;
    background-color: #fff;
    border-radius: 3px;
    opacity: 0.76;
    z-index: 88;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 60px;
      &.active {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
