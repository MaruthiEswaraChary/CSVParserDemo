import { Component } from '@angular/core';
import { ELEMENT_MARKER } from '@angular/core/src/render3/interfaces/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSVParserDemo';
 
  multi: any[]= [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Xseries';
  showYAxisLabel = true;
  yAxisLabel = 'Yseries';
  inputFile:any[]=[];
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // line, area
  autoScale = true;
  
  constructor() {
    // Object.assign(this, {single, multi})   
  }
  
  // onSelect(event) {
  //   console.log(event);
  // }
  

  openFile(event) {
    this.inputFile = event.target.files;
    
}
submitFile(){
  for (var index = 0; index < this.inputFile.length; index++) {
    let reader = new FileReader();
    reader.onload = () => {
        // this 'text' is the content of the file
        var text = reader.result;
       this.multi= this.parseCSVData(text);
    }
    reader.readAsText(this.inputFile[index]);
};
}

parseCSVData(s:any){
  var data = s.split('\n');
  let obj:any[] = [];
  for(let i=0;i<data.length;i++)
  {
    let serObj:any = {};
    let line = data[i].split(",");
    for(let j =0;j<line.length;j++)
    {
      let colData = line[j]; 
      if(j==0){
        serObj.name = colData
        serObj.series= [];
      }else{
        let d = colData.split("|");
        if(d.length>=2)
        serObj.series.push( {
          "name": d[0],
          "value": d[1]
        })
      }
    }
    obj.push(serObj)
  }
  console.log(JSON.stringify(obj))
  return obj;
}

}
