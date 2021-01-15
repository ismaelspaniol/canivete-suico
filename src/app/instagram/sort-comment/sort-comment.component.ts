import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';

// import * as puppeteer from 'puppeteer';

@Component({
  selector: 'app-sort-comment',
  templateUrl: './sort-comment.component.html',
  styleUrls: ['./sort-comment.component.scss']
})
export class SortCommentComponent implements OnInit {
  loading: boolean = false;
  

  fakeArrobas = ['@ismael',
    '@spanoil',
    '@teste',
    '@ismael',
    '@agoravai',
    '@agoravai',
    '@agoravai',
    '@agoravai',
    '@agoravai',
    '@spanoil',
    '@spanoil']

  constructor() { }

  ngOnInit(): void {
  }

  async calc(NewSalario: string): Promise<void> {
    console.log(this.sort(this.count(this.fakeArrobas)));
  }

  count(arrobas) {
    const count = {};
    arrobas.forEach(arroba => {count[arroba] = (count[arroba] || 0) +1 })
    return count;    
  }

  sort(counted){
    const entries = Object.entries(counted);
    const sorted = entries.sort(( a, b) =>  Number(b[1]) - Number(a[1]) );
    console.log(sorted)
  }

  async start(){
    // let browser =  await puppeteer.launch();
    // let page = await browser.newPage();

    // await page.goto('https://www.instagram.com/p/CJDt-Dnsqwq/')


  }


}
