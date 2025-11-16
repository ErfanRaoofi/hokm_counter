import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// اینترفیس برای یک دست از بازی
interface HandHistory {
  rulingTeamName: string;
  suit: string;
  winnerName: string;
  points: number;
  isKot: boolean;
  isHakemKot: boolean;
}

// اینترفیس برای وضعیت کلی بازی (برای ذخیره‌سازی آسان)
interface GameState {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  currentRulingTeam: 'team1' | 'team2';
  currentSuit: '♠' | '♥' | '♦' | '♣' | '↑' | '↓';
  history: HandHistory[];
}

interface GameState2 {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  currentRulingTeam: 'team1' | 'team2';
  currentSuit: '♠' | '♥' | '♦' | '♣' | '↑' | '↓';
  history: HandHistory[];
}
@Component({
  imports: [RouterModule, CommonModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // کل وضعیت بازی در یک آبجکت تجمیع شده است
  gameState!: GameState;

  // متغیر برای کنترل وضعیت برنده نهایی (خارج از state ذخیره شده)
  gameWinner: 'team1' | 'team2' | null = null;
  readonly WINNING_SCORE = 7;
  readonly suits: ('♠' | '♥' | '♦' | '♣' | '↑' | '↓')[] = ['♠', '♥', '♦', '♣', '↑', '↓'];
  private readonly STORAGE_KEY = 'hokmGameState';

  ngOnInit(): void {
    this.loadState();
    this.checkForWinner(); // بررسی برنده هنگام بارگذاری اولیه
  }

  // ایجاد وضعیت اولیه بازی
  private getInitialState(): GameState {
    return {
      team1Name: 'تیم ما',
      team2Name: 'تیم حریف',
      team1Score: 0,
      team2Score: 0,
      history: [],
      currentRulingTeam: 'team1',
      currentSuit: '♠',
    };
  }

  // بارگذاری وضعیت از localStorage
  private loadState(): void {
    try {
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        this.gameState = JSON.parse(savedState);
      } else {
        this.gameState = this.getInitialState();
      }
    } catch (e) {
      console.error('Error loading state from localStorage, resetting to initial state.', e);
      this.gameState = this.getInitialState();
    }
  }

  // ذخیره وضعیت در localStorage
  private saveState(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.gameState));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  // تابع کمکی برای نمایش چوب کبریت
  getTallyArray(score: number): number[] {
    return Array(Math.min(score, 50)); // محدودیت برای جلوگیری از مشکلات عملکردی
  }

  // انتخاب تیم حاکم
  selectRulingTeam(team: 'team1' | 'team2'): void {
    if (this.gameWinner) return;
    this.gameState.currentRulingTeam = team;
    this.saveState();
  }

  // انتخاب خال حُکم
  selectSuit(suit: '♠' | '♥' | '♦' | '♣' | '↑' | '↓'): void {
    if (this.gameWinner) return;
    this.gameState.currentSuit = suit;
    this.saveState();
  }

  // فراخوانی هنگام تغییر نام تیم برای ذخیره‌سازی
  onNameChange(): void {
    this.saveState();
  }

  // ثبت دست عادی
  recordHand(winner: 'team1' | 'team2'): void {
    if (this.gameWinner) return;
    const points = 1;
    this.updateScore(winner, points);
    this.addToHistory(winner, points, false, false);
    this.checkForWinner();
    this.saveState();
  }

  // ثبت کُت
  recordKot(winner: 'team1' | 'team2'): void {
    if (this.gameWinner) return;
    let points: number;
    let isHakemKot = false;

    if (winner !== this.gameState.currentRulingTeam) {
      points = 3; // حاکم کُت شد
      isHakemKot = true;
    } else {
      points = 2; // تیم حاکم کُت کرد
    }
    this.updateScore(winner, points);
    this.addToHistory(winner, points, true, isHakemKot);
    this.checkForWinner();
    this.saveState();
  }

  // افزایش دستی امتیاز
  incrementScore(team: 'team1' | 'team2'): void {
    if (team === 'team1') {
      this.gameState.team1Score++;
    } else {
      this.gameState.team2Score++;
    }
    this.checkForWinner();
    this.saveState();
  }

  // کاهش دستی امتیاز
  decrementScore(team: 'team1' | 'team2'): void {
    if (team === 'team1' && this.gameState.team1Score > 0) {
      this.gameState.team1Score--;
    } else if (team === 'team2' && this.gameState.team2Score > 0) {
      this.gameState.team2Score--;
    }
    this.checkForWinner();
    this.saveState();
  }

  private updateScore(winner: 'team1' | 'team2', points: number): void {
    if (winner === 'team1') {
      this.gameState.team1Score += points;
    } else {
      this.gameState.team2Score += points;
    }
  }

  private addToHistory(winner: 'team1' | 'team2', points: number, isKot: boolean, isHakemKot: boolean): void {
    const handRecord: HandHistory = {
      rulingTeamName: this.gameState.currentRulingTeam === 'team1' ? this.gameState.team1Name : this.gameState.team2Name,
      suit: this.gameState.currentSuit,
      winnerName: winner === 'team1' ? this.gameState.team1Name : this.gameState.team2Name,
      points: points,
      isKot: isKot,
      isHakemKot: isHakemKot,
    };
    this.gameState.history.unshift(handRecord);
  }

  private checkForWinner(): void {
    if (this.gameState.team1Score >= this.WINNING_SCORE && this.gameState.team1Score > this.gameState.team2Score) {
      this.gameWinner = 'team1';
    } else if (this.gameState.team2Score >= this.WINNING_SCORE && this.gameState.team2Score > this.gameState.team1Score) {
      this.gameWinner = 'team2';
    } else {
      this.gameWinner = null; // اگر امتیازات تغییر کرد و دیگر برنده‌ای نبود
    }
  }

  // شروع مجدد بازی
  resetGame(): void {
    if (confirm('آیا از شروع مجدد بازی و پاک کردن تمام اطلاعات مطمئن هستید؟')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.gameState = this.getInitialState();
      this.gameWinner = null;
    }
  }
}
