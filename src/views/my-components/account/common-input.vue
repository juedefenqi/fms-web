<template>
  <div style="display: inline-block;">
    <div id="infoDetail" v-for="(item,index) in inputTitle">
      <div class="infoDetail">
        <span class="detailTitle">{{item}}:</span>
        <Input v-model="value" placeholder="请输入..." class="inputSty"/>
        <Input v-model="value" placeholder="请输入..." class="inputSty"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonInput",
  props: {
    inputTitle: [],
    placeholder: {
      type: String,
      default: "请选择单位"
    }
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

  }
};
</script>

<style lang="less" scoped>
    #infoDetail{
        padding: 10px 0px 10px 0px;
        display: inline-block;
        .infoDetail{
            padding: 10px 0px 10px 0px;
            display: inline-block;
        }
        .detailTitle{
            width: 123px;
            text-align: right;
            /* border: 1px solid red; */
            display: inline-block;
            margin-right: 8px;
            color: #999999;
        }
        .baseInfoSelect{
            border-width: 0px;
            width: 355px;
            height: 32px;
            /* border: 1px solid rgba(228, 228, 228, 1); */
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

