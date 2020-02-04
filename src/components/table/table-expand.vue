<style scoped lang='less'>
.expand-row {
  margin-bottom: 16px;
}
#table-expand {
  border: none !important;
  &/deep/ .ivu-table {
    border: none !important;
  }
  &/deep/ .ivu-table:before {
    height: 0px;
  }

  &/deep/ .ivu-table:after {
    width: 0px;
  }
  td {
    border: none !important;
  }
}
</style>
<template>
  <div>
    <Table
      id="table-expand"
      :columns="columns10"
      :data="data9"
      :border="false"
      :show-header="false"
    ></Table>
  </div>
</template>
<script>
export default {
  name: "table-expand",
  props: {
    row: Object
  },
  data() {
    return {
      columns10: [
        {
          width: 50
        },
        {
          title: "施工队",
          key: "name"
        },
        {
          title: "类别",
          align: "",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.type === 1 ? "内部队伍" : row.type === 2 ? "外包队伍" : "";
            return h(
              "div",
              {
                style: {}
              },
              text
            );
          }
        },
        {
          title: "人数",
          key: "",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.personCount + "人";
            return h(
              "div",
              {
                style: {}
              },
              text
            );
          }
        },
        {
          title: "操作",
          key: "oc",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            const color = "rgba(24, 144, 255, 1)";
            const color1 = "rgba(0, 0, 0, 0.35)";
            const text2 = "删除";
            const text1 = "查看";
            const text3 = "编辑";
            const text4 = "添加班组";

            return h(
              "div",
              {
                style: {
                  color: color,
                  cursor: "pointer",
                  textAlign: "right"
                },
                on: {
                  click: () => {}
                }
              },
              [
                h(
                  "span",
                  {
                    className: "",
                    style: {
                      color: color
                    },
                    on: {
                      click: () => {
                        //查看
                        this.$router.push({
                          path: "/team-check",
                          query: {
                            id: row.id
                          }
                        });
                      }
                    }
                  },
                  text1
                ),
                h(
                  "span",
                  {
                    className: "",
                    style: {
                      color: color,
                      marginLeft: "12px"
                    },
                    on: {
                      click: () => {
                        //编辑
                        this.$router.push({
                          path: "/team-modify",
                          query: {
                            data: JSON.stringify(row)
                          }
                        });
                      }
                    }
                  },
                  text3
                ),
                h(
                  "span",
                  {
                    className: "",
                    style: {
                      color: color,
                      marginLeft: "12px"
                    },
                    on: {
                      click: () => {
                        this.formItem.parentId = row.id;
                        this.formItem.name = "";
                        this.modal = true;
                      }
                    }
                  },
                  text4
                ),
                h(
                  "span",
                  {
                    className: "",
                    style: {
                      color: color1,
                      marginLeft: "12px"
                    },
                    on: {
                      click: () => {
                        //删除
                        let Id = {
                          id: row.id,
                          status: 2
                        };

                        this.teamInfoStatus(Id);
                      }
                    }
                  },
                  text2
                )
              ]
            );
          }
        }
      ],
      data9: this.dataList()
    };
  },
  watch: {
    data9() {}
  },
  created() {},
  methods: {
    dataList() {
      if (this.row.children.length > 0) {
        return this.row.children;
      } else {
        return [];
      }
    }
  }
};
</script>
