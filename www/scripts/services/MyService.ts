/// <reference path='../_reference.ts'/>

module myNameSpace {
  "use strict";

  export class MyServiceClassName {

    public static $inject = [
      "$log"
    ];

    public pubVar: string;
    private privVar: string;

    constructor(
      private $log: ng.ILogService
    ) {
      this.privVar = '5';
    }

    public someFunction(element): number {
      return parseInt(this.privVar, 10);
    }

  }
}