var array = [1, 2, 3, 46, 4, 3, 2, 3, 9, 6, 7, 8, 10];
function quickSort(array) {
  if (array.length < 2) return array;
  let pivot = array[array.length - 1];
  let left = array.filter((v, i) => v <= pivot && i != array.length - 1);
  let right = array.filter(v => v > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
console.log(quickSort(array));


/*思路
    选择一个标准量，将数组分成两部分  pivot = array[array.lrngth-1]
    数组分成三部分left、pivot、right，使left<=pivot，right>pivot
    递归处理left
    递归处理right
    合并三者结果  使用三点运算符
    既然是递归，那么就要有递归的出口，这里选择array.length <2 作为递归的出口
*/