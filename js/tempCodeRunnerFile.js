function findSum(n) {
  let sum=0;
  
  for(i=0; i<=n; i++){
    console.log(i);
    if(i%3===0){
      sum = sum+i;
      i++;
    }else if(i%5===0){
      sum = sum+i;
      i++;
    }else{
    i++;
    }
  }
  return sum;
}