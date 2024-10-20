import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  text: string;
  answer?: number;
}

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  // environment vars
  apiUrl = environment.apiUrl;

  // forms var
  questions: Question[] = [];
  currentQuestions: Question[] = [];
  currentPage = 1;
  questionsPerPage = 5;
  totalPages = 0;
  startIndex = 0;

  ngOnInit() {
    // Mock data - replace with actual data fetching logic
    this.questions = Array(40).fill(0).map((_, i) => ({
      id: i + 1,
      text: `Vraag ${i + 1}: Dit is een voorbeeldvraag voor de vragenlijst.`
    }));

    this.totalPages = Math.ceil(this.questions.length / this.questionsPerPage);
    this.updateCurrentQuestions();
  }

  updateCurrentQuestions() {
    this.startIndex = (this.currentPage - 1) * this.questionsPerPage;
    this.currentQuestions = this.questions.slice(this.startIndex, this.startIndex + this.questionsPerPage);
  }

  selectAnswer(questionId: number, answer: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.answer = answer;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentQuestions();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentQuestions();
    }
  }

  onSubmit() {
    console.log('Form submitted', this.questions);
    // Implement your submission logic here
  }
}
