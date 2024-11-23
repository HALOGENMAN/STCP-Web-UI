import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormArray} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileTypeAndSizeValidator } from '../../shared/validators/fileTypeAndSizeValidator'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profile: FormGroup;

  constructor(
    private messageService:MessageService,
  ){
    this.profile = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      summary: new FormControl('',[Validators.required, Validators.maxLength(500)]),
      subjectTeach: new FormControl([],[Validators.required,Validators.minLength(1)]),
      education: new FormArray([this.createEducation()],[Validators.minLength(1)]),
      languages: new FormArray([this.addLanguage()],[Validators.minLength(1)]),
      profileImage: new FormControl(null),
      resume: new FormControl(null) 
    });
  }

  ngOnInit(): void {
  }

  createEducation(): FormGroup {
    return new FormGroup({
      degree: new FormControl('', [Validators.required]),
      institution: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]), // Must be a 4-digit year
      grade: new FormControl('', [Validators.required]),
      file: new FormControl(null,[Validators.required,FileTypeAndSizeValidator(['PDF','PNG','JPG'],1024*1024*3)])
    });
  }

  addLanguage(): FormGroup {
    return new FormGroup({
      language: new FormControl('', [Validators.required]),
      speak: new FormControl(0, [Validators.required, Validators.min(0),Validators.max(5)]),
      read:new FormControl(0, [Validators.required, Validators.min(0),Validators.max(5)]), // Must be a 4-digit year
      write: new FormControl(0, [Validators.required, Validators.min(0),Validators.max(5)])
    });
  }

  get education(): FormArray {
    return this.profile.get('education') as FormArray;
  }

  get languages(): FormArray {
    return this.profile.get('languages') as FormArray;
  }

  get subjectTeach(): FormArray {
    return this.profile.get('subjectTeach') as FormArray;
  }

  get profileImage() {
    return this.profile.get('profileImage');
  }

  get resume() {
    return this.profile.get('resume');
  }

  // Add a new education entry
  addValue(value:string): void {
    if(value==='education'){
      this.education.push(this.createEducation());
    }
    if(value==='language'){
      this.languages.push(this.addLanguage());
    }
  }

  // Remove an education entry at a specified index
  removeValue(index: number,value:string): void {
    if(value==='education'){
      if (this.education.length > 1) {
        this.education.removeAt(index);
      } else {
        alert('At least one education entry is required');
      }
    }
    if(value==='language'){
      if (this.languages.length > 1) {
        this.languages.removeAt(index);
      } else {
        alert('At least one Language entry is required');
      }
    }
  }

  

  addSubject(subject:any){
    let duplica = false;
    this.subjectTeach.value.forEach((element:any)=> {
      if(subject.value === element){
        duplica = true;
      }
    });
    if(duplica){
      this.toast("error","Error",`Subject ${subject.value} already exist`)
      return
    }
    this.subjectTeach.setValue([...this.subjectTeach.value , subject.value])
    subject.value = ""
  }

  removeSubject(event:any,index:any){
    let allSubjects = this.subjectTeach.value.filter((e:any,i:number)=>{
      return i!=index
    });
    this.subjectTeach.setValue(allSubjects)
  }

  onDegreeFileChange(event:any,i:number){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.education.at(i).get('file')?.setValue(file)
    }
  }

  onProfilePicFileChange(event:any){
    console.log("onProfilePicFileChange")
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImage?.setValue(file);
    }
  }

  onResumeFileChange(event:any){
    console.log("onResumeFileChange")
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profile.get('resume')?.setValue(file);
    }
  }

  // Submit the form data
  onSubmit(): void {
    console.log(this.profile.value)
    if (this.profile.valid) {
      console.log('Form Submitted', this.profile.value);
    } else {
      console.log('Form is invalid');
    }
  }

  toast(severity='success',summary='Success',detail = 'Message Content'):void{
    console.log({ severity, summary, detail})
    this.messageService.add({ severity, summary, detail});
  }
}


