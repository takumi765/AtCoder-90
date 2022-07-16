//let input = require("fs").readFileSync("/dev/stdin","utf8").split("\n");
let input = require("fs").readFileSync("../txt/001.txt","utf8").split("\n");
let [[N, L], [K], ...[A]]=input.slice(0, -1).map(input=>input.trim().split(" ").map(Number));
A.unshift(0);A.push(L);

let cond=(x,c)=>{
    let s=0,cnt=0;
    for(let i=1;i<N+2;i++){
        s+=A[i]-A[i-1];
        if(s>=x) s=0,cnt++;
    }
    return cnt>=c+1;
};

//二分探索方を使用する
let binsearch=(x)=>{
    let ub=L,lb=0;
    while(ub-lb>1){
        //console.log('['+lb+','+ub+']');
        let m=Math.floor((ub+lb)/2);
        cond(m,x) ? lb=m:ub=m;
    }
    return lb;
};

//貪欲法
let greedy = (x)=>{
    let lb = binsearch(x);
    let min, cnt=0, s=0;
    for(let i=1;i<N+2;i++){
        s+=A[i]-A[i-1];
        if(s>=lb){
            if(cnt===0){
                min=s;
                cnt++;
            }else if(min>s){
                min=s;
            }
            s=0;
        }
    }
    return min;
}

console.log(greedy(K));