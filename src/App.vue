<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-card outlined class="fill-height" width="100%">
          <v-sheet class="fill-height">
            <v-row no-gutters class="fill-height">
              <v-col md="9" cols="12" class="d-flex flex-column">
                <div class="d-flex grey lighten-3">
                  <div class="d-flex px-3 title font-weight-regular align-center"
                    style="height: 48px; width: 100%"
                  >
                    <v-btn icon href="https://github.com/WarringKingdoms/mindmap">
                      <v-icon>mdi-github</v-icon>
                    </v-btn>
                  </div>
                  <v-divider vertical></v-divider>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-grow-1">
                  <mindmap
                    v-model="mmdata"
                    :gps="options.gps.value"
                    :fitView="options.fitView.value"
                    :draggable="options.draggable.value"
                    :keyboard="options.keyboard.value"
                    :showNodeAdd="options.showNodeAdd.value"
                    :contextMenu="options.contextMenu.value"
                    :zoomable="options.zoomable.value"
                    :showUndo="options.showUndo.value"
                    :xSpacing="xSpacing"
                    :ySpacing="ySpacing"
                    :strokeWidth="strokeWidth"
                    :download="options.download.value"
                    :balanceLeaf="options.balanceLeaf.value"
                    :backgroundcolor="backgroundcolor"
                    :textColor="textColor"
                    @updateNodeName="updateNodeName"
                    @click="click"
                  ></mindmap>
                  <v-divider vertical></v-divider>
                </div>
              </v-col>
              <v-col md="3" cols="12">
                <div class="grey lighten-3">
                  <div class="d-flex px-3 title font-weight-regular align-center"
                    style="height: 48px"
                  >Options</div>
                </div>
                <v-divider></v-divider>
                <div class="py-3">
                  <v-col class="pb-0" cols="12" v-for="(opt, key) in options" :key="key">
                    <v-switch class="mt-0"
                      hide-details
                      inset
                      v-model="opt.value"
                      :label="key"
                    ></v-switch>
                  </v-col>
                  <v-col class="pb-0" cols="12">

                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="strokeWidth"
                      label="strokeWidth"
                      :thumb-size="20"
                      thumb-label
                      min="1"
                      max="10"
                    ></v-slider>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="xSpacing"
                      label="xSpacing"
                      :thumb-size="20"
                      thumb-label
                    ></v-slider>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <v-slider
                      hide-details
                      v-model="ySpacing"
                      label="ySpacing"
                      :thumb-size="20"
                      thumb-label
                    ></v-slider>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <span style="margin-right: 8px">backgroud-color</span>
                    <v-menu v-model="menu" :close-on-content-click="false"  offset-x >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind:color="backgroundcolor" fab v-bind="attrs" v-on="on"/>
                      </template>
                      <v-card>
                        <v-color-picker class="ma-2" canvas-height="300" mode="hexa" v-model="backgroundcolor"   :value="backgroundcolor" />
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text  @click="menu = false"  >
                            确定
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-col>
                  <v-col class="pb-0" cols="12">
                    <span style="margin-right: 8px">text-color</span>
                    <v-menu v-model="textmenu" :close-on-content-click="false"  offset-x >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind:color="textColor" fab v-bind="attrs" v-on="on"/>
                      </template>
                      <v-card>
                        <v-color-picker class="ma-2" canvas-height="300" mode="hexa" v-model="textColor"   :value="textColor" />
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text  @click="textmenu = false"  >
                            确定
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import dataLearn from '../public/learn.json'
import mindmap from './components/MindMap.vue'
// import { readXML } from './ts/utils'
@Component({ components: { mindmap } })
export default class App extends Vue {
  showSource = false
  onboarding = 0
  length = 3
  mmdata = dataLearn
  items = [
    { title: 'template' },
    { title: 'script' },
  ]
  textColor = '#2627288A'
  backgroundcolor = '#03BFFFFF'
  @Watch('backgroundcolor')
  backgroundcolors(backgroundcolor: string) {
    console.log(backgroundcolor)
  }
  menu = false
  textmenu = false
  options = {
    gps: { value: true },
    fitView: { value: true },
    keyboard: { value: true },
    draggable: { value: true },
    showNodeAdd: { value: true },
    contextMenu: { value: true },
    zoomable: { value: true },
    showUndo: { value: true },
    download: { value: true },
    balanceLeaf: { value: true },
  }
  xSpacing = 50
  ySpacing = 20
  strokeWidth = 4
  readFile(filePath: string) {
    // 创建一个新的xhr对象
    var xhr = null
    var okStatus = document.location.protocol === 'file' ? 0 : 200
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xhr.open('GET', filePath, false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    return xhr.status === okStatus ? xhr.responseText : null
  }
  updateNodeName(...args: any) {
    console.log('updateNodeName', ...args)
  }
  click(...args: any) {
    console.log('click', ...args)
  }
  mounted() {}
}
</script>

<style>

</style>
