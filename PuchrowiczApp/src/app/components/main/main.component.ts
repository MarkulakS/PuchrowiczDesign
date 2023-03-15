import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private router: Router) { 
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

  routeDraws() {
    this.router.navigateByUrl('/drawings');
  }

  addClass() {
    document.getElementById('letter')?.classList.add('sent');    
  }

  submitForm() {
    const message = `My name is ${this.name} and my email is ${this.email}. Message sounds: ${this.message}`;
    alert(message);
  }

}
