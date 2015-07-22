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
      privVar = '5';
    }

    someFunction(element): number {
      return parseInt(privVar, 10);
    }

  }
}