/// <reference types="zone.js" />
/// <reference types="meteor-typings" />
/// <reference types="@types/underscore" />
/// <reference types="@types/node" />
/// <reference types="@types/jquery" />

declare module '*.html' {
  const template: string;
  export default template;
}

declare module '*.scss' {
  const style: string;
  export default style;
}

declare module '*.less' {
  const style: string;
  export default style;
}

declare module '*.css' {
  const style: string;
  export default style;
}

declare module '*.sass' {
  const style: string;
  export default style;
}

declare module 'meteor/tmeasday:publish-counts' {
  import { Mongo } from 'meteor/mongo';

  interface CountsObject {
    get(publicationName: string): number;
    publish(context: any, publicationName: string, cursor: Mongo.Cursor, options: any): number;
  }

  export const Counts: CountsObject;
}

declare module "meteor/alanning:roles" {
  export module Roles {
    function userIsInRole(id?: any,value?: any): boolean{  }
    function addUsersToRoles(id?: any,value?: any): boolean{ }
  }
}