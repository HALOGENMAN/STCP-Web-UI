import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if the array length is at least 1
export function FileTypeAndSizeValidator(allowedTypes: string[], size:number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      if(file.size > size){
        return { message: "file size to too big" }
      }
      const fileName = file.name;
      
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension || '')) {
        return { invalidFileType: true };
      }
    }
    return null;
  };
} 