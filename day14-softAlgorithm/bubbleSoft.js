/*
思路：
冒泡排序就很形象，遍历n次，每次循环相邻元素两两比较，把其中大的元素往后放。

*/

//其中使用冒泡排序一次的算法为：
  
let array = [5,4,3,2,1,98,7];
function swap(array,i,j){
    [array[i],array[j] = [array[j],array[i]]]  //使用解构赋值来交换两个数组元素中的位置
}
for(let i = 0; i<array.length-1;i++){
    if(array[i]>array[i+1]){
        swap(array,i,i+1)
    }
}
console.log(array)


//排序n次的算法
const utils = {
    swap(array, i, j) {
      [array[i], array[j]] = [array[j], array[i]]
    },
    randomNum() {
      return Math.floor(Math.random() * 100)
    },
    randomArray() {
      return Array.from(Array(this.randomNum()), _ => this.randomNum())
    }
  }
  
  function bubbleSort(array) {
    const length = array.length
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length -1 - i; j++) {
        if (array[j] > array[j + 1]) {
          utils.swap(array, j, j + 1)
        }
      }
    }
    return array
  }
  const array = bubbleSort(utils.randomArray())
  
  console.log(array)
  
