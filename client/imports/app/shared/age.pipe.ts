import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(birthDate: Date): Number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
  }
}
