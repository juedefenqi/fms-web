<template>
<div class=''>
    <Row>
  <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
          sortable="custom"
        ></Table>
        </Row>
            <Row type="flex" justify="end" class="acc-record-page">
        <Page
          :current="searchForm.current"
          :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changesize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
</div>
</template>
 <script>
  import {accLogDefer}  from "@/api/account/accLog.js";
  import { requestSuccess } from "@/libs/tool.js";
    import { dateDay } from "@/libs/date.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
//import引入的组件需要注入到对象中才能使用
name: 'extension-record',
props:{
    id:{
        type:Number|String,
        default:''
    }

},
components: {},
data() {
//这里存放数据
return {
       total:0,
    loading:false,
      data: [],
      
      columns: [
        {
          title: "操作日期",
          key: "operateDate",
          align: "left",
            render: (h, params) => {
            let time =dateDay(params.row.operateDate) ;
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {
                    }
                  },
                time
                )
              ]
            );
          }
        },
        {
          title: "操作人",
          key: "operator",
          align: "left"
        },  
            {
          title: "新到日期",//展期日期
          key: "extDate",
       align: "left",
            render: (h, params) => {
            let time =dateDay(params.row.extDate) ;
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "span",
                  {
                    style: {
                    }
                  },
                time
                )
              ]
            );
          }
        },
            {
          title: "展期原因",
          key: "extRea",
          align: "left"
        }
      
      ],
        searchForm: {
        current: 1, //页号
        size: 10, //页面大小
      }

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    id(val){
      this.getList();
    }
},
//方法集合
methods: {
     async getList() {
      let item = "";
      console.log(this.id);
      this.searchForm.accId=this.id
      if(this.id){
            this.loading = true;
          item = requestSuccess(
        this,
        await accLogDefer(this.searchForm),
        false,
      );  
      this.data=item.records;
      this.total=item.total;
      }
      },
        changePage(v) {
      this.searchForm.current = v;
      this.getList();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getList();
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  this.getList();
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import ''; //引入公共css类
.acc-record-page{
  padding-top:15px;
}
</style>