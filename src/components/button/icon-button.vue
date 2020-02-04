<template>
  <span class="icon-button">
    <span class="icon-button" v-if="pattern=='single'">
      <span
        class="icon-button icon-button-pattern"
        v-if="type=='button'"
        @click.native="buttonClick"
      >
        <Icon :type="icon" :size="size" :color="color" :custom="custom" />
        <span
          v-if="type=='button'"
          :style="{fontSize:size-2+'px',padding:padding,color:color}"
        >{{name}}</span>
      </span>
      <span class="icon-button" v-if="type=='button-down'" @click="buttonClick">
        <span
          v-if="type=='button-down'"
          :style="{fontSize:size-2+'px',padding:padding,color:color}"
        >{{name}}</span>
        <Icon :type="selectIcon" :size="size" :color="color" :custom="custom" />
      </span>
      <span class="icon-button icon-button-position" v-if="type=='select'">
        <span
          class="icon-button icon-button-pattern"
          ref="iconButton"
          @click="selectClick('iconButton')"
        >
          <Icon :type="icon" :size="size" :color="color" :custom="custom" />
          <span :style="{fontSize:size-2+'px',padding:padding,color:color}">{{selectName}}</span>
          <Icon :type="selectIcon" :size="size" :color="color" :custom="custom" />
        </span>
        <List
          border
          ref="listDown"
          class="icon-button-list-active"
          :class="{'icon-button-list-active-action':listDisplay}"
          :style="{width:listWidth,top:top}"
        >
          <ListItem
            v-for="(item,index) in  selectList"
            :key="'selectList'+index"
            @click.native="ListItemClick(item,index)"
          >
            <span>{{item.name}}</span>
          </ListItem>
        </List>
      </span>
    </span>
    <span class="icon-button" v-if="pattern=='Multiple'">
      <span class="icon-button" v-for="(item,index) in arrData">
        <span class="icon-button icon-button-pattern" v-if="item.type=='button'">
          <Icon :type="item.icon" :size="item.size" :color="item.color" :custom="item.custom" />
          <span
            :style="{fontSize:item.size-2+'px',padding:item.padding,color:item.color}"
          >{{item.name}}</span>
        </span>
        <span class="icon-button icon-button-position" v-if="item.type=='select'">
          <span
            class="icon-button icon-button-pattern"
            :ref="'iconButton'+index"
            @click="selectClick('iconButton'+index,index)"
          >
            <Icon :type="item.icon" :size="item.size" :color="item.color" :custom="item.custom" />
            <span
              :style="{fontSize:item.size-2+'px',padding:item.padding,color:item.color}"
            >{{item.name}}</span>
            <Icon
              :type="item.selectIcon"
              :size="item.size"
              :color="item.color"
              :custom="item.custom"
            />
          </span>
          <List
            border
            ref="listDown"
            class="icon-button-list-active"
            :class="{'icon-button-list-active-action':listDisplay&&index==arrDataIndex}"
            :style="{width:listWidth,top:top}"
          >
            <ListItem
              v-for="(item1,index1) in  item.selectList"
              @click.native="ListItemClick(item1,index,index1)"
              :key="'selectList'+index1"
            >
              <span>{{item1.name}}</span>
            </ListItem>
          </List>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: "icon-button",
  components: {},
  props: {
    pattern: {
      type: String,
      default: "Multiple" //single:单个模式输出单个button样式 ，Multiple多个模式利用数组进行数据驱动添加多个button
    },
    name: {
      type: String, //name 标签 文字
      default: "新增"
    },
    type: {
      type: String,
      default: "button" //button 默认点击 button 类型  ， select下拉选择类型
    },
    icon: {
      type: String, //icon 采用阿里图标库和本地库iview 使用多种自定义图标
      default: "md-add"
    },
    selectIcon: {
      type: String, //icon 采用阿里图标库和本地库iview 使用多种自定义图标
      default: "md-arrow-dropdown"
    },
    selectList: {
      type: Array, //下拉列表
      default: () => {
        return [
          {
            name: "冻结",
            id: "11"
          },
          {
            name: "解冻",
            id: "221321"
          }
        ];
      }
    },
    listWidth: {
      type: String, //list 下拉宽度
      default: "100%"
    },
    size: {
      type: Number | String, //图标字体和 文字大小
      default: 18
    },
    color: {
      type: String, //图标颜色 和文字颜色
      default: "black"
    },
    custom: {},
    padding: {
      //文字和图标间距  写在文字span标签上
      type: String,
      default: "0 0 0 5px"
    },
    data: {
      type: Array,
      default: () => {
        return [
          { name: "新增", icon: "md-add" },
          { name: "变更", icon: "md-create" },
          {
            name: "冻结/解冻",
            icon: "ios-remove-circle-outline",
            type: "select",
            selectList: [
              {
                name: "冻结",
                id: "11"
              },
              {
                name: "解冻",
                id: "221321"
              }
            ]
          },
          {
            name: "久悬/解除",
            icon: "ios-remove-circle-outline",
            type: "select",
            selectList: [
              {
                name: "久悬",
                id: "11"
              },
              {
                name: "解除",
                id: "221321"
              }
            ]
          },
          { name: "展期", icon: "ios-repeat" }
        ];
      }
    }
  },
  data() {
    return {
      arrData: [],
      listDisplay: false, //列表显隐
      top: "20px", //top 数值
      arrDataIndex: null,
      selectName: this.name
    };
  },
  watch: {
    data(val) {
      this.selectData = JSON.parse(JSON.stringify(val));
    }
  },
  computed: {},
  methods: {
    isobject() {
      let that = this;
      if (this.pattern == "Multiple") {
        //开启多个模式执行
        if (this.data.length > 0) {
          this.data.forEach((item, index) => {
            this.arrData.push({}); //给空数组添加长度
            Object.keys(this.$props).forEach(function(key) {
              //获取props全部属性默认值继承组件默认信息
              if (!that.data[index].hasOwnProperty(key)) {
                //判断是否写了该属性   如果没有或者空我们使用默认值填充
                that.$set(that.arrData[index], key, that.$props[key]);
              } else {
                that.$set(that.arrData[index], key, that.data[index][key]); //有我们就直接添加属性并接受传递属性值
              }
            });
          });
        }
      }
    },
    buttonClick() {
      this.$emit("changeClick", ...arguments);
    },
    selectClick(item, index = "default") {
      //下拉点击
      if (!(index == "default")) {
        this.arrDataIndex = index;
      }
      if (this.$refs[item] instanceof Array) {
        //refs值是否数组
        this.listDisplay = !this.listDisplay; //是否显示
        this.top = this.$refs[item][0].clientHeight + "px";
      } else {
        this.listDisplay = !this.listDisplay;
        this.top = this.$refs[item].clientHeight + "px";
      }
    },
    ListItemClick(item, index, index1 = "default") {
      let data = {
        data: item,
        index: index
      };
      this.$emit("changeClick", data); //选择点击事件
      if (!(index == "default")) {
        this.arrData[index].name = item.name;
      } else {
        this.selectName = item.name;
      }
    }
  },
  created() {
    this.isobject();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.icon-button {
  display: inline-block;
  cursor: pointer;
  &-position {
    position: relative;
  }
  &-list-active {
    position: absolute;
    left: 0;
    display: none;
    background-color: white;
    z-index: 1;
    transition: all 0.5 ease;
  }
  &-list-active-action {
    display: inline-block;
  }
  &-pattern {
    padding: 8px;
  }
}
</style>