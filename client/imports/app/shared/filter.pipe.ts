import { Pipe, PipeTransform } from '@angular/core';
//import { Meteor } from 'meteor/meteor';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(birthDate:date): Number {
      birthDate = new Date(birthDate);
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

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): any {
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {
  transform(value: string): any {
      //console.log(value,'gender');
    if (value == 1)
        return 'Male';
    else
      return 'Female'
  }
}

@Pipe({name: 'genderImg'})
export class GenderImgPipe implements PipeTransform {
  transform(value: string): any {
      //console.log(value,'gender');
    if (value == 1)
        return 'no-image-male.jpg';
    else
      return 'no-image-female.jpg'
  }
}

