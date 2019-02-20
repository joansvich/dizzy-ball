var flatten = function (array){
  let vector = []
  let cont =0;
  for(i = 0; i<array.length; i++) {
    // remplazamos i por j , condición del for
    for(j = 0; j < array[i].length; j++) {
        if(array[i][j] % 2 != 0) {
            vector[cont] = array[i][j]; 
            cont++; 
        }
    }
}
}

console.log(flatten([[3, 4, 5], [[9, 9, 9]], ["a,b,c"]]))