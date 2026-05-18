// 生成部门树
export function generateDeptTree(areaArr) {
  let treeee = (function makeTree(arr, parentId) {
    var temp; //确保children无时返回undefined

    for (let i = 0; i < arr.length; i++) {
      //alert(11111)
      if (arr[i].parentId === parentId) {
        if (!temp) temp = [];
        temp.push(arr[i]);
        arr[i].label = arr[i].deptName;
        arr[i].code = arr[i].deptId;
        arr[i].children = makeTree(areaArr, arr[i].id);
      }
    }
    return temp;
  })(areaArr, null);

  return treeee;
}


export function generateWorkareaTree(areaArr) {
  let treeee = null;
  for (let j = 0; j < areaArr.length; j++) {
    //找到工厂类型的父节点
    if (areaArr[j].deptType === 7) {
      treeee = (function makeTree(arr, parentId) {
        var temp; //确保children无时返回undefined
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parentId === parentId) {
            if (!temp) temp = [];
            temp.push(arr[i]);
            arr[i].id = arr[i].deptId;
            arr[i].label = arr[i].deptName;
            arr[i].code = arr[i].deptId;
            arr[i].children = makeTree(areaArr, arr[i].deptId);
          }
        }
        return temp;
      })(areaArr, areaArr[j].parentId);
    }
  }
  return treeee;
}


export function generateFactoryTree(factData) {
  //递归成树加载厂区
  let treeee = (function makeTreeData(arr, parentId) {
    var temp; //确保children无时返回undefined

    for (let i = 0; i < arr.length; i++) {
      var processes = arr[i].processes;

      if (arr[i].parentId === parentId) {
        if (!temp) temp = [];
        temp.push(arr[i]);
        arr[i].label = arr[i].factName;
        arr[i].code = arr[i].factCode;
        arr[i].disabled = true;

        if (processes && processes.length > 0) {
          var leafArray = [];
          for (let j = 0; j < processes.length; j++) {
            leafArray.push({
              "id": processes[j].processId,
              "label": processes[j].processName,
              "code": processes[j].processCode,
              "disabled": false,
              "isLeaf": true
            })
          }

          arr[i].children = leafArray;
        } else {
          arr[i].children = makeTreeData(factData, arr[i].id);
        }
      }
    }
    return temp
  })(factData, null);
  return treeee;
}
