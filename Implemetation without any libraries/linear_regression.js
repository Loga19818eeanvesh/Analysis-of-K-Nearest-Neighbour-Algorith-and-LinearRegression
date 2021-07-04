class LinearRegression {
    constructor(features, labels, options) {
      this.features = this.processFeatures(features);
      this.labels = tf(labels);
      this.mseHistory = [];
  
      this.options = Object.assign(
        { learningRate: 0.1, iterations: 1000, batchSize:10 },
        options
      );
  
      let m1=0;
       let m2=0;
       let m3=0;
       let b=0;
    }
  
    gradientDescent(features, labels) {
      let n=features.length;
      let b1=0;
      let m11=0;
      let m22=0;
      let m33=0;
      let mse=0;
      for(let i=0;i<n;i++){
        let temp=(this.m1)*features[i][0]+(this.m2)*features[i][1]+(this.m3)*features[i][2]+this.b;
        mse+=(temp-labels[i][0])*(temp-labels[i][0]);
        b1=b1+(temp-labels[i]);
        m11=m11+features[i][0]*(temp-labels[i][0]);
        m22=m22+features[i][1]*(temp-labels[i][0]);
        m33=m33+features[i][2]*(temp-labels[i][0]);
      }
      mse=mse/n;
      b1=b1/n;
      m11=m11/n;
      m22=m22/n;
      m33=m33/n;
      if(this.mseHistory){
          if(mse>this.mseHistory){
              this.learningRate=this.learningRate/2;
          }
          else{
              this.learningRate=1.05*this.learningRate;
          }
      }
      this.mseHistory=mse;
      this.b-=(this.options.learningRate)*b1;
      this.m1-=(this.options.learningRate)*m11;
      this.m2-=(this.options.learningRate)*m22;
      this.m3-=(this.options.learningRate)*m33;
    }
  
    train() {
      for(let i=0;i<this.iterations;i++){
          this.gradientDescent();
      }
    }
  
    predict(observations) {
        let r=this.m1*observations[0]+this.m2*observations[1]+this.m3*observations[2]+this.b;
        return r;
    }
  
  }
  
  module.exports = LinearRegression;