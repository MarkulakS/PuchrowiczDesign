import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  isShining = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private emailService: EmailService,
    private el: ElementRef, private renderer: Renderer2) { 
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

  addAnimation() {
    this.isShining = true;

    setTimeout(() => {
      this.isShining = false;

      // Odczekaj krótko, a następnie włącz animację ponownie
      setTimeout(() => {
        this.isShining = true;
      }, 100);
    }, 1000); // 2000 ms, czyli 2 sekundy
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.handleInteraction(event);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: Event) {
    this.handleInteraction(event);
  }

  private handleInteraction(event: Event) {
    const target = event.target as HTMLElement;

    // Sprawdź, czy kliknięty element to ten, na którym chcesz uruchomić animację
    if (target.matches('.shine-class')) {
      this.addAnimation();
    }
    // Dodaj klasę na krótko w celu zresetowania pseudoelementu ::before
    this.renderer.addClass(this.el.nativeElement, 'temporary-class');

    // Usuń klasę po pewnym czasie
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'temporary-class');
    }, 100);
  }

}
