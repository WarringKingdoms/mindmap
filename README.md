![](https://cdn.jsdelivr.net/gh/WarringKingdoms/photo/img/mindmap.png)

# 思维导图Vue2组件 
 ![npm (scoped)](https://img.shields.io/npm/v/@WarringKingdoms/mindmap?style=plastic) ![npm](https://img.shields.io/npm/dm/@WarringKingdoms/mindmap?style=plastic)

> 一个由[MindNode](https://mindnode.com)启发的思维导图Vue组件，基于d3.js实现  
> 目前实现的功能有基本的编辑、拖移、缩放、撤销、上下文菜单、折叠...

## 近期更新(维护日志)

> 这是hellowuxin 维护的一个思维导图插件。目前vue2的已经不在维护了。因为正在搭建个人博客。需要对vuepress的支持。我对这个项目进行以下内容增加：
> https://github.com/WarringKingdoms/mindmap
> 我对本项目FORK过来增加以下内容：

> #### **1**  、增加背景色或者背景图的修改。优先级：background-img> background-color  
增加字体颜色动态修改
>  
>  #### **2**  、增加对.opml文件格式数据的支持（后续如果有时间会增加.xmind和.freemind的支持。如果你有兴趣。可以自己增加。希望可以merge进来）
> 
>  #### **3**  、增加节点外链功能
> 
>  #### **4**  、增加初始化时，设置节点左右平衡（建议：如果使用json格式对左右节点设置。最好设置 balanceLeaf 为false）
**5**  、增加了折叠子菜单的深度
## 安装

```sh
原版本：
npm install @hellowuxin/mindmap
我fork后新增版本：
npm install @WarringKingdoms/mindmap
```

## PROPS

| Name        | Type   | Default   | Description          |
| ---         | ---    | ---       | ---                  |
| v-model     | Array  | undefined | 设置思维导图数据        |
| width       | Number | 100%      | 设置组件宽度           |
| height      | Number | undefined | 设置组件高度           |
| xSpacing    | Number | 80        | 设置节点横向间隔        |
| ySpacing    | Number | 20        | 设置节点纵向间隔        |
| strokeWidth | Number | 4         | 设置连线的宽度          |
| draggable   | Boolean| true      | 设置节点是否可拖拽      |
| gps         | Boolean| true      | 是否显示居中按钮        |
| fitView     | Boolean| true      | 是否显示缩放按钮        |
| showNodeAdd | Boolean| true      | 是否显示添加节点按钮     |
| keyboard    | Boolean| true      | 是否响应键盘事件        |
| contextMenu | Boolean| true      | 是否响应右键菜单        |
| zoomable    | Boolean| true      | 是否可缩放、拖移        |
| showUndo    | Boolean| true      | 是否显示撤销重做按钮     |
| download    | Boolean| true      | 是否显示下载按钮        |

### EXT-PROPS

| Name        | Type   | Default   | Description          |
| ---         | ---    | ---       | ---                  |
| balanceLeaf | Boolean| true | 设置左右节点平衡（初始化）  |
| backgroundcolor|string|undefined|设置背景色  |
| textColor|string|undefined|设置字体颜色|
| backgroundimg|string|undefined|设置背景图片（初始化）  |
| foldDeepth|number|-1|设置折叠的深度（-1为不折叠）                   |
## EVENTS

| Name           | arguments | Description                    |
| ---            | ---       | ---                            |
| updateNodeName | data, id  | 更新节点名称时，传入节点数据和节点id |
| click          | data, id  | 点击节点时，传入节点数据和节点id    |

## 样例(旧)

```html
<template>
  <mindmap v-model="data"></mindmap>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'

export default {
  components: { mindmap },
  data: () => ({
    data: [{
      "name":"如何学习D3",
      "children": [
        {
          "name":"预备知识",
          "children": [
            { "name":"HTML & CSS" },
            { "name":"JavaScript" },
            ...
          ]
        },
        {
          "name":"安装",
          "_children": [
            { "name": "折叠节点" }
          ]
        },
        {
          "name":"进阶",
          "left": true
        },
        ...
      ]
    }]
  })
}
</script>
```

## 键盘事件

<kbd>⇥ tab</kbd>、<kbd>⏎ enter</kbd>、<kbd>⌫ backspace</kbd>、<kbd>⌘ cmd</kbd>+<kbd>z</kbd>、<kbd>⌘ cmd</kbd>+<kbd>y</kbd>

## 交互逻辑

**鼠标**：space+左键移动、右键菜单、ctrl+滚轮缩放、左键选中

**触控板**：双指滚动移动、双指菜单、双指捏合缩放、单指选中

## 待解决


- [ ] 导出格式设置未修复。后续有时间修复...
- [ ] 后续新增主题设置，对节点和路径颜色形状进行增加
