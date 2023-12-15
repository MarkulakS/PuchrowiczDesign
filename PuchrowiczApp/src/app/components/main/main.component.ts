import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private emailService: EmailService, private el: ElementRef, private renderer: Renderer2) { 
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      })
    })

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  }

  addClass() {
    document.getElementById('letter')?.classList.add('sent');    
  }

  submitForm() {
    let reqObj = {
      name: this.name,
      email: this.email,
      message: this.message
    }
    this.emailService.sendMessage(reqObj).subscribe(data => {
      console.log(data);
    })
  }
}
