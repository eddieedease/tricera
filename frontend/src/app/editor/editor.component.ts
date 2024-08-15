import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MarkdownComponent } from 'ngx-markdown';


// interface chapters
interface Chapter {
  id: string;
  title: string;
  content: string;
  subchapters: Subchapter[];
}

interface Subchapter {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, DragDropModule, MarkdownComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {

  chapters: Chapter[] = [];
  selectedContent: string = '';

  ngOnInit() {
    // Initialize with some dummy data
    this.chapters = [
      {
        id: '1',
        title: 'Chapter 1',
        content: '# Chapter 1\n\nThis is the content of chapter 1.',
        subchapters: [
          { id: '1-1', title: 'Subchapter 1.1', content: '## Subchapter 1.1\n\nContent of subchapter 1.1' },
          { id: '1-2', title: 'Subchapter 1.2', content: '## Subchapter 1.2\n\nContent of subchapter 1.2' }
        ]
      },
      {
        id: '2',
        title: 'Chapter 2',
        content: '# Chapter 2\n\nThis is the content of chapter 2.',
        subchapters: []
      }
    ];
  }

  onDrop(event: CdkDragDrop<Chapter[] | Subchapter[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  selectContent(content: string) {
    this.selectedContent = content;
  }

}
