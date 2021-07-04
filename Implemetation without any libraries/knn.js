const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function shuffle(data){
    let n=data.length;
    for(let i=0;i<n;i++){
        let j=Math.floor(Math.random() * n);
        let temp=data[i];
        data[i]=data[j];
        data[j]=temp;
    }
}

function splitDataset(data, testCount) {

    let n=data.length;
    shuffle(data);
    const testSet = [];
    for(let i=0;i<testCount;i++){
        if(data[i]!=undefined){testSet.push(data[i]);}
        else{
            testCount++;
        }
    }

    const trainingSet = [];
    for(let i=testCount;i<n;i++){
        if(data[i]!=undefined){trainingSet.push(data[i]);}
    }
  
    return [testSet, trainingSet];

}

function distance(point1,point2,features){
    
    let n=features.length;
    let r=0;
    if(n==1){
        let j=features[0];
        r=Math.abs(point1[j]-point2[j]);
        return r;
    }
    for(let i=0;i<n-1;i++){
        let j=features[i];
        let r1=ads(point1[j]-point2[j]);
        r1=(r1*r1);
        r=r+r1;
    }
    r=Math.pow(r, 0.5);
    return r;
}


function merge(l,r){
    let data=[];
    let ln=l.length;
    let rn=r.length;
    let li=0;
    let ri=0;
    
    while(li<ln && ri<rn){
        if(l[li][0]<=r[ri][0]){
            data.push(l[li]);
            li++;
        }
        else{
            data.push(r[ri]);
            ri++;
        }
    }
    while(li<ln){
        data.push(l[li]);
        li++;
    }
    while(ri<rn){
        data.push(r[ri]);
        ri++;
    }
    return data;
}

function merge_sort(data){
    let n=data.length;
    //if(data[0]==undefined){
     //   return data;
    //}
    if(n<=1){
        return data;
    }
    
    let l=[];
    let r=[];
    for(let i=0;i<n/2;i++){
        l.push(data[i]);
    }
    for(let i=n/2;i<n;i++){
        //if(data[i]!=undefined){r.push(data[i]);}
        r.push(data[i]);
    }
    l=merge_sort(l);
    r=merge_sort(r);
    
    
    data=merge(l,r);
    return data;
}

function runAnalysis() {
    const testSetSize = 50;
    const k = 2;
    const features = [0];
    let [testSet, trainingSet] = splitDataset(outputs,testSetSize);
    console.log(trainingSet);
    normalise(testSet,features);
    normalise(trainingSet,features);
    console.log(trainingSet);
    
    let size=0;
    let m=testSet[0].length;
    for(let i=0;i<testSetSize;i++){
        let label=knn(trainingSet,testSet[i],k,features);
        if(label==testSet[i][m-1]){
            size++;
        }
        console.log(label, " ",testSet[i][m-1] );
    }
    let accuracy = (size/testSetSize);

    console.log("for features of ", features ,"accuracy is ", accuracy);
}  

function knn(data,point,k,features){
    let n=data.length;
    let m=data[0].length;
    console.log(data);
    for(let i=0;i<n;i++){
        data[i][0]=distance(data[i],point,features);
    }
    console.log(point);
    console.log(data);
    //data=merge_sort(data);
    data.sort((a,b)=>{return(a[0]-b[0]);});
    console.log(data);
    let d=[];
    for(let i=0;i<k;i++){

        if(data[i]!=undefined){let d1=[];d1.push(data[i][m-1]);d.push(d1);}
        else{
            k++;
        }
    }
    //d=merge_sort(d);
    d.sort((a,b)=>{return(a[0]-b[0]);});
    console.log(d);
    let max=1;
    let predicted_label=d[0][0];
    for(let i=1;i<d.length;i++){
        if(d[i][0]==d[i-1][0]){
            let m1=1;
            let p1=d[i][0];
            while(i<d.length && d[i][0]==d[i-1][0]){
                m1=m1+1;
                i++;
            }
            console.log(m1,max);
            if(m1>max){
                console.log(m1, max, p1);
                max=m1;
                predicted_label=p1;
            }
        }
    }
    console.log(predicted_label);
    return predicted_label;
}

function normalise(data,features){
    let n=data.length;
    let m=features.length;
    let max=[];
    let min=[];
    for(let i=0;i<m;i++){
        let j=features[i];
        max.push(data[0][j]);
        min.push(data[0][j]);
    }
    for(let i=1;i<n;i++){
        for(let j=0;j<m;j++){
            let k=features[j];
            if(data[i][k]<min[j]){
                min[j]=data[i][k];
            }
            if(data[i][k]>max[j]){
                max[j]=data[i][k];
            }
        }
    }
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            let k=features[j];
            data[i][k]=(data[i][k]-min[j])/(max[j]-min[j]);
        }
    }
}

