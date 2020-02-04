export function requestSuccess(Vue, res, flag = false, key = "loading") {
  if (res.success) {
    if (Vue[key]) {
      //如果有该属性为真值就变假
      Vue[key] = false;
    }
    if (flag) {
      Vue.$Message.success(res.message);
    } else {
      return res.result;
    }
  } else {
    Vue[key] = false;
    Vue.$Message.error(res.message);
  }
}
export function statusBack(status, item, number, content) {
  //状态转换文字//状态转换路由status,item ,number 比较值, content 内容
  if (status == number) {
    item.push(content);
  }
}
export function statusRouter(status, number, item, content) {
  //状态转换路由
  if (status == number) {
    item.push(content);
  }
}
export function returnNumber(val) {
  //真假值转换 0,1
  if (val) {
    return 1;
  } else {
    return 0;
  }
}
export function returnBoolean(val) {
  //真假值转换 0,1
  if (val) {
    return true;
  } else {
    return false;
  }
}
export function onSize(e, item) {
  //监听屏幕尺寸
  const that = e;
  const screenWidth = item;
  let timer = false;
  window.onresize = () => {
    return (() => {
      window.screenWidth = document.body.clientWidth;
      if (!timer) {
        //延时函数
        timer = true;
        setTimeout(function() {
          that[screenWidth] = window.screenWidth;
          timer = false;
        }, 400);
      }
    })();
  };
}
export function objectAttr(val, item) {
  //  遍历添加对象
  Object.keys(item).forEach(function(key) {
    val[key] = item[key];
  });
}
export function objectIsAttr(val, item) {
  //  遍历对象判断是否存在值
  let data = false;
  Object.keys(item).forEach(function(key) {
    if (val == key) {
      return (data = true);
    }
  });
  return data;
}
// export const isStore = that => {//需要添加自己需要的this指向
//   //是否有store
//   //保存  store/
//   let name = that.$options.name; //根据模块组件name定义store 缓存名字
//   let id = that.$route.params.id; //
//   let key = that.getStore(name);
//   if (id != "" && id != null && id != undefined) {
//     that.setStore(name, id);
//     return that.getStore(name);
//   } else {
//     if (key == "" || key == null) {
//       alert("参数不存在！");
//     } else {
//       return that.getStore(name);
//     }
//   }
// };
export function isStore() {
  //挂载到vue 对象上 直接 this 指向  局部 vue 的this
  //是否有store
  //保存  store/
  let name = this.$options.name; //根据模块组件name定义store 缓存名字
  let id = this.$route.params.id; //
  let key = this.getStore(name);
  if (id != "" && id != null && id != undefined) {
    this.setStore(name, id);
    return this.getStore(name);
  } else {
    if (key == "" || key == null) {
      alert("参数不存在！");
    } else {
      return this.getStore(name);
    }
  }
}
export function getIndex(data, child, key = "id") {
  //data 数组数据 child 点击选中返回的单条子数据, key = "id" es6默认参数 传递唯一标识字符 id
  let _index = null;
  data.forEach((item, index) => {
    if (data[index][key] == child[key]) {
      _index = index;
    }
  });
  return _index;
}
