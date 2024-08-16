import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MarkdownComponent } from 'ngx-markdown';

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
  imports: [CommonModule, FormsModule, DragDropModule, MarkdownComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  chapters: Chapter[] = [];
  selectedContent: string = '';
  processedContent: string = '';
  isSidebarOpen: boolean = false;
  currentlyEditing: { type: 'chapter' | 'subchapter', id: string } | null = null;

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
          { id: '2-1', title: 'Subchapter 2.1', content: '## Subchapter 2.1\n\nContent of subchapter 2.1' },
        ]
      }
    ];
  }

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
    
    if (this.isSidebarOpen) {
      this.addOverlay();
    } else {
      this.removeOverlay();
    }
  }

  selectContent(content: string, type: 'chapter' | 'subchapter', id: string) {
    if (this.currentlyEditing) {
      this.saveCurrentContent();
    }
    this.selectedContent = content;
    this.currentlyEditing = { type, id };
    this.processMarkdown();
    if (window.innerWidth < 1024 && this.isSidebarOpen) {
      this.toggleSidebar();
    }
  }

  onContentChange() {
    this.processMarkdown();
    // Auto-save changes
    this.saveCurrentContent();
  }

  processMarkdown() {
    this.processedContent = this.selectedContent.replace(/\n/g, '  \n');
    this.processedContent = this.processedContent.replace(/^(#+)\s*(.+)$/gm, (match, hashes, title) => {
      return `${hashes} ${title.trim()}`;
    });
  }

  saveCurrentContent() {
    if (!this.currentlyEditing) return;

    const { type, id } = this.currentlyEditing;
    if (type === 'chapter') {
      const chapter = this.chapters.find(ch => ch.id === id);
      if (chapter) chapter.content = this.selectedContent;
    } else {
      for (const chapter of this.chapters) {
        const subchapter = chapter.subchapters.find(sub => sub.id === id);
        if (subchapter) {
          subchapter.content = this.selectedContent;
          break;
        }
      }
    }
    console.log('Content saved:', this.selectedContent);
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
      this.toggleSidebar();
    }
  }
}