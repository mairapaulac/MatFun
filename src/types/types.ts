import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
}

export interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface Player {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  goal: number;
}

export interface FractionQuestion {
  id: string;
  module: 'fraction';
  type: 'fraction_operation';
  num1: number;
  den1: number;
  operator: '+' | '×' | '=';
  num2: number;
  den2: number;
}

export type Module = 'algebra' | 'geometry' | 'fraction' | 'percentage';

export interface IUserSessionData {
  id: number;
  name: string;
  email: string;
  token: string;
  gradeName: string;
  classLetter: string;
  classId:number;
}

export  interface IRegisterActionData{
  name:string;
  email:string;
  senha:string;
  dataNascimento:Date;
  classId:number;
}

export interface ISchool {
	schoolId: number;
	school_name: string;
}

export interface IGrade {
	gradeId:number;
  gradeName:string;
}

export interface IClass {
  classId:number
  classLetter: string
}

export interface IRankingPlayers{
  rank:number;
  user:{
    userId:number;
    name:string;
  };
  score:number;
}
  
export interface IUserAchievements {
  achievementId: number;
  achievementName: string;
  achievementDescription: string;
  requiredStat: string;
  requiredValue: number;
  achievementIcon: string;
  achievementCategory: string;
  iconColor: string;
  isUnlocked: false;
  progress: number;
  currentValue: number;
}