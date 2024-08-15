import { Component, HostListener  } from '@angular/core';
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
  isSidebarOpen: boolean = false;

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
        subchapters: [
          { id: '2-1', title: 'Subchapter 2.1', content: '## Subchapter 1.1\n\nContent of subchapter 2.1' },
        ]
      }
    ];
  }

  // drag and drop 
  onDrop(event: CdkDragDrop<Subchapter[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onChapterDrop(event: CdkDragDrop<Chapter[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
  }

  getConnectedListIds(): string[] {
    return this.chapters.map(chapter => `${chapter.id}-subchapters`);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
    
    // Add or remove overlay
    if (this.isSidebarOpen) {
      this.addOverlay();
    } else {
      this.removeOverlay();
    }
  }

  selectContent(content: string) {
    this.selectedContent = content;
    if (window.innerWidth < 1024 && this.isSidebarOpen) {
      this.toggleSidebar(); // Close sidebar on mobile after selection
    }
  }

  private addOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    overlay.addEventListener('click', () => this.toggleSidebar());
    document.body.appendChild(overlay);
  }

  private removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 1024 && this.isSidebarOpen) {
      this.toggleSidebar(); // Close sidebar if screen becomes larger than 1024px
    }
  }

}
