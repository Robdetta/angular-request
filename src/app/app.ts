import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-request';
  inputText = '';
  popupMessage: string | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  submit() {
    if (!this.inputText.trim()) return;
    this.loading = true;
    // Replace with your API endpoint
    this.http
      .post<{ returnMessage: string }>(
        'https://sample.lteprocess.com/trythis',
        { message: this.inputText },
        { headers: { sendthis: '123Lucas' } },
      )
      .subscribe({
        next: (res) => {
          this.popupMessage = res.returnMessage;
          this.inputText = '';
          this.loading = false;
        },
        error: (err) => {
          this.popupMessage =
            'Error: ' +
            (err.error?.message || err.statusText || 'Unknown error');
          this.loading = false;
        },
      });
  }

  dismissPopup() {
    this.popupMessage = null;
  }
}
