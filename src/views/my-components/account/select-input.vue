<template>
  <div  id="selectInput" style="display: inline-block;">
    <div class="infoDetail" v-for="(item,index) in unitTitlt">
      <span class="detailTitle">{{item}}:</span>
      <div class="baseInfoSelect" @click="showModal">
        <!-- <input type="text" value="请选择" tabindex="0" class="baseInfoInput"> -->
        <div class="ivu-select ivu-select-single ivu-select-default" style="width: 200px;">
          <div tabindex="0" class="ivu-select-selection inputSty">
            <input type="hidden"> <div class="">
              <span class="ivu-select-placeholder" style="color:#000000">{{placeholder}}</span> 
              <i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
    v-model="modal1"
    title="请选择单位"
    @on-ok="ok"
    @on-cancel="cancel">
      <Tree :data="data1"></Tree>
  </Modal>
  </div>
</template>

<script>
export default {
  name: "selectInput",
  props: {
    unitTitlt: [],
    placeholder: {
      type: String,
      default: "请选择"
    },
    modal:Boolean
  },
  data() {
    return {
      modal1:false,
      data1: [
        {
          title: '中铁二十一局集团有限公司',
          expand: true,
          children: [
              {
                  title: '中铁二十一局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十一局集团有限公司'
                      },
                      {
                          title: '中铁二十一局集团有限公司'
                      }
                  ]
              },
              {
                  title: '中铁二十一局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十一局集团有限公司'
                      },
                      {
                          title: '中铁二十一局集团有限公司'
                      }
                  ]
              }
          ]
        },
        {
          title: '中铁二十二局集团有限公司',
          expand: true,
          children: [
              {
                  title: '中铁二十二局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十二局集团有限公司'
                      },
                      {
                          title: '中铁二十二局集团有限公司'
                      }
                  ]
              },
              {
                  title: '中铁二十二局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十二局集团有限公司'
                      },
                      {
                          title: '中铁二十二局集团有限公司'
                      }
                  ]
              }
          ]
        },
        {
          title: '中铁二十三局集团有限公司',
          expand: true,
          children: [
              {
                  title: '中铁二十三局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十三局集团有限公司'
                      },
                      {
                          title: '中铁二十三局集团有限公司'
                      }
                  ]
              },
              {
                  title: '中铁二十三局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十三局集团有限公司'
                      },
                      {
                          title: '中铁二十三局集团有限公司'
                      }
                  ]
              }
          ]
        },
        {
          title: '中铁二十局集团有限公司',
          expand: true,
          children: [
              {
                  title: '中铁二十局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十局集团有限公司'
                      },
                      {
                          title: '中铁二十局集团有限公司'
                      }
                  ]
              },
              {
                  title: '中铁二十局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十局集团有限公司'
                      },
                      {
                          title: '中铁二十局集团有限公司'
                      }
                  ]
              }
          ]
        },
        {
          title: '中铁二十一局集团有限公司',
          expand: true,
          children: [
              {
                  title: '中铁二十一局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十一局集团有限公司'
                      },
                      {
                          title: '中铁二十一局集团有限公司'
                      }
                  ]
              },
              {
                  title: '中铁二十一局集团有限公司',
                  expand: true,
                  children: [
                      {
                          title: '中铁二十一局集团有限公司'
                      },
                      {
                          title: '中铁二十一局集团有限公司'
                      }
                  ]
              }
          ]
        }
      ]
    };
  },
  methods: {
    showModal(){
      this.modal1 = this.modal
    }
  }
};
</script>

<style lang="less" scoped>
  #selectInput{
    .infoDetail{
      padding: 10px 0px 10px 0px;
      display: inline-block;
    }
    .detailTitle{
      width: 123px;
      text-align: right;
      display: inline-block;
      margin-right: 8px;
      color: #999999;
    }
    .baseInfoSelect{
      border-width: 0px;
      width: 355px;
      height: 32px;
      display: inline-block;
    }
    .baseInfoInput{
      position: absolute;
      left: 0px;
      top: 0px;
      width: 442px;
      height: 32px;
      font-family: '微软雅黑';
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      text-decoration: none;
      color: #000000;
      text-align: left;
      border-color: transparent;
      outline-style: none;
      border: none;
    }
    .inputSty{
      width: 355px !important;
    }
  }
</style>

